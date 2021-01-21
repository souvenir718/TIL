# GraphQL

> REST API 설계 패러다임을 대체하고, 서버의 데이터와 기능을 노출하기 위한 새로윤 표준으로 거듭나고 있다.

- `graphql-yoga` : 손쉬운 설정, 성능, 그리고 탁월한 개발자 경험에 초점을 둔 전기능 GraphQL 서버다. `Express`, `apollo-server`, `graphql-js` 등을 기반으로 한다.
- **Prisma** : 기존의 ORM을 대체한다. Prisma 클라이언트를 사용하여 GraphQL 리졸버를 구현하고 데이터베이스 접근을 간소화할 수 있다.
- **GraphQL Playground** : 쿼리와 뮤테이션을 전송하면서 GraphQL API의 기능을 직접 사용해 볼 수 있는 "GraphQL IDE"다. (Postman과 유사한 기능)
  - 사용 가능한 API 동작을 설명하는 문서를 자동 생성한다.
  - 쿼리, 뮤테이션, 구독을 작성할 수 있는 에디터를 제공한다.
    - 자동 완성, 문법 강조 기능도 제공한다.
  - API 동작을 간단히 공유할 수 있다.



## graphql-yoga

### 제공 기능

- GraphQL 명세의 준수
- 파일 업로드 지원
- GraphQL 구독을 사용한 실시간 기능
- TypeScrpit 지원
- GraphQL Playground을 훌륭하게 지원
- Express 미들웨어를 통한 확장성
- GraphQL 스키마에서 별도로 정의한 지시자(Directive)를 리졸브
- 쿼리 성능 추적
- `application/json`과 `application/graphql`의 Content-type를 모두 허용
- `now`, `up` AWS Lambda, Heroku 등 다양한 서비스에서 작동



## GraphQL 스키마

  GraphQL 스키마는 주로 **스키마 정의 언어(SDL)**를 사용하여 작성한다. SDL은 데이터 구조를 정의할 수 있는 타입 체계를 갖추고 있다.

  모든 GraphQL 스키마는 3가지의 특별한 **최상위 타입**을 갖는다. 각각은 `Query`, `Mutation`, `Subscription`이다. 각 최상위 타입은 GraphQL이 제공하는 3가지 동작 타입인 쿼리, 뮤테이션, 구독에 대응한다. 각 최상위 타입이 가지는 필드를 **최상위 필드**라고 부르며 사용가능한 API 동작을 정의한다.

```javascript
type Query {
	info: String!
}
```

>  위 스키마는 `info`라는 단 하나의 최상위 필드만을 갖는다.
>
> 지금의 경우 최상위 필드가 하나만 존재하기 때문에 API가 허용할 수 있는 쿼리는 단 하나이다.



```javascript
type Query {
    users: [User!]!
    user(id: ID!): User
}

type Mutation {
    createUser(name: String!): User!
}
    
type User {
    id:ID!
    name: String!
}
```

> 위의 코드는 3가지 최상위 필드를 갖는다. `Query` 타입의 `users`와 `user` 그리고 `Mutation` 타입의 `createUser`다.
>
> `User` 타입은 반드시 추가적으로 정의가 이루어져야 한다. 그렇지 않으면 스키마 정의가 완성되지 않는다.



- 최상위 필드의 타입이 `User` 같은 객체 타입인 경우

  > `info`의 경우는 `String` 타입이었고, 이것은 **Scalar**타입이다.

  - 해당 객체 타입에 포함된 필드를 사용하여 쿼리(뮤테이션/구독)을 확장할 수 있다.
  - 이렇게 확장된 부분을 **선택 집합**이라 부른다.



- 위의 스키마를 구현한 GraphQL API에 허용되는 동작들의 예시는 아래와 같다.

```javascript
# 모든 사용자 정보에 대한 쿼리
query {
    users {
        id
        name
    }
}

# ID를 사용하여 단일 사용자 정보에 대한 쿼리
query {
    user(id: "user-1") {
        id
        name
    }
}

# 새로운 사용자 생성
mutation {
    createUser(name : "Bob"){
        id
        name
    }
}
```

> 선택 집합 내의 필드들의 경우, 최상위 필드가 반드시 `null` 이외의 값을 반환하는지 또는 여러 항목을 반환하는 지 등의 여부는 중요하지 않다.
>
> 예를 들어 위의 스키마의 경우 3가지 최상위 필드는 모두 똑같은 `User` 타입에 대하여 각기 다른 **타입 한정자**를 사용하고 있다.
>
> - `users` 필드의 경우, 반환 타입이 `[User!]!`인 것은 반환값이 `User` 항목으로 이루어진 리스트(리스트 자체도 `null`일 수 없다.)라는 의미다.
>   - 빈 리스트를 받거나, `null`이 아닌 `User` 객체로 이루어진 리스트를 받는다.
> - `user(ud: ID!)` 필드의 경우, 반환 타입이 `User` 인 것은 반환값이 `null` 또는 `User` 객체라는 의미다.
>   - `createUser(name: String!)` 필드의 경우, 반환 타입이 `User!`인 것은 이 동작이 항상 `User` 객체를 반환한다는 의미다.

이러한 정보를 제대로 제공한다면, `Prisma` 인스턴스는 데이터베이서 서비스에 완전히 접근할 수 있고 들어오는 요청을 리졸브하는 데에 사용될 수 있게 된다.



### 스키마 정의의 확장

- `feed`쿼리는 `Link` 요소의 리스트를 반환받는다.
  - 새로운 최상위 필드(필요의 경우, 새로운 데이터 타입도 추가)를 추가하여 GraphQL 스키마 정의를 확장한다.
  - 새로 추가된 필드에 대응하는 리졸버 함수를 구현한다.
- 위 과정은 스키마 주도(Schema-Driven) 또는 스키마 우선(Schema-First) 개발이라고 불린다.

```javascript
const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!        // 수정
  }

  type Link {             // 수정
    id: ID!               // 수정
    description: String!  // 수정
    url: String!          // 수정
 }                        // 수정
`
```

- `feed` 쿼리를 위한 리졸버 함수를 구현해야 한다. 
  - GraphQL 스키마는 모든 필드가 리졸버 함수를 갖는다.



### 쿼리 리졸브 과정

  GraphQL 서버가 하는 일은 바로 쿼리에 포함된 모든 필드에 대하여 리졸버 함수를 각각 호출하고, 쿼리의 모양에 따라 데이터를 잘 포장하여 응답으로 만드는 것이다. 따라서 쿼리를 처리한다는 것은 리졸버 함수들의 호출을 잘 조율하는 일이다.

#### `Link`타입의 리졸버

```javascript
Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
}
```

> 모든 GraphQL 리졸버 함수는 4개의 인자를 입력받아야 한다.

- `parent`라고 불리는 첫번째 인자는 바로 직전 리졸버 실행 수준에서의 결과값이다.

  GraphQL 쿼리는 중첩될 수 있다. 각 중첩 수준(중첩된 괄호들)은 리졸버 하나의 실행 수준에 대응한다. 아래의 쿼리는 2개의 실행 수준을 갖는다.

  ```javascript
  query {
      feed {
          id
          url
          description
      }
  }
  ```

  - 첫번째 수준에서는 `feed` 리졸버를 호출하고 `links`에 포함된 모든 데이터를 반환한다. 
  - 두번째 수준에서는 직전의 리졸버 실행 수준에서 반환된 리스트에 포함된 각각의 항목들에 대하여 `Link` 타입의 리졸버를 호출한다.
  - `Link`가 가지는 3개의 리졸버에서 인자로 들어오는 `parent` 객체는 `links` 리스트의 각 항목이다.



### Prisma

> Prisma는 쿼리 리졸빙을 처리해주는 편리한 데이터 접근 계층을 제공한다.
>
> Prisma를 사용하면, 서버로 들어온 쿼리를 Prisma에 전달하고, Prisma는 이를 받아 실제 데이터베이스에 맞추어 쿼리를 리졸브하는 식으로 리졸버를 구현하게 된다. Prisma Client 덕분에, 리졸브 구현은 대부분의 경우 한두 줄로 구현이 가능할 정도로 간단하다.

#### 구조

Prisma를 사용하여 GraphQL 서버를 구축할 때에 사용되는 구조다.

![](C:\Users\INNOGRID\AppData\Roaming\Typora\typora-user-images\image-20210121103331496.png) 

- Prisma 서버는 어플리케이션 구조 상에 데이터 접근 계층을 제공, API 서버가 Prisma를 거쳐서 데이터베이스와 상호작용하기 쉽게 만들어준다.
- Prisma 서버의 API는 우리의 API 서버 구현 안에서 작동하는 Prisma Client가 사용하게 된다.(ORM과 유사)



- `prisma.yml` : Prisma를 설정에 사용되는 주요 구성 파일.
- `datamodel.prisma` : 데이터 모델의 정의를 포함한다.
  - Prisma 데이터 모델은 어플리케이션의 모델을 정의한다.
  - 각 모델은 데이터베이스 상의 한 테이블에 대응된다

```javascript
# schemal.graphql
type Link {
    id: ID!
    description: String!
    url: String!
}

# datamodel.prisma
type Link {
    id: ID! @id
    createdAt: DateTime! @createdAt
    description: String!
    url: String!
}
```

`schema.graphql`에서의 `Link`와 비교했을 때 2가지 차이점이 있다.

- `id: ID!` 필드에 추가한 `@id` 지시자다. 
  - Prisma가 DB 상의 `Link` 레코드가 가지는 `id` 필드에 대하여 전역적으로 고유한 ID값을 자동 생성하고 저장한다는 의미다.
- `createdAt: DateTime! @createdAt` 필드의 추가
  - `@createdAt` 지시자 덕분에 이 필드는 Prisma가 관리하고 API 상에서 읽기 전용이 된다.
  - 특정 `Link`가 생성된 시간을 저장한다.
  - 어떤 레코드가 갱신되었을 때를 추적하기 위하여 `@updatedAt` 지시자를 사용할 수 있다.



```yaml
# prisma.yml

# 사용할 Prisma API의 HTTP 엔드포인드
endpoint: ''

# 데이터 모델을 포함하고 있는 파일의 이름
datamodel: datamodel.prisma

# 생성될 Prisma Client의 언어와 생성 위치 지정
generate:
  - generator: javascript-client
    output: ../src/generated/prisma-client
```

- `endpoint` : 사용할 Prisma API의 HTTP 엔드포인트.
- `datamodel` : 데이터 모델이 포함된 파일을 저장한다.
  - 이 파일을 기반으로 API 서버에서 사용할 Prisma Client가 생성된다.

- `generate` : 생성되는 Prisma Client의 사용 언어와 생성 위치를 지정한다.



```javascript
# 데이터베이스로부터의 실제 데이터 반환하기 위해, resolver 객체 수정
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        }
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description
            })
        }
    }
}
```

#### context 인자

- `context` 인자는 리졸버 체인 상의 모든 리졸버가 읽기/쓰기를 할 수 있는 자바스크립트 객체를 말한다. 리졸버 간에 정보를 교환할 수 있도록 해주는 수단이다.
  - GraphQL 서버가 초기화되는 시점에 `context` 객체에 값을 쓰는 것도 가능하다.
- `context`를 사용하면 임의의 데이터나 함수를 리졸버에 전달할 수 있다.

#### post 리졸버의 이해

- Prisma Client API의 `createLink` 메서드를 실행하고 그 반환값을 그대로 돌려준다.
  - `createLink`의 인자로는 리졸버가 받은 `args` 매개변수를 통하여 받은 데이터를 전달한다

- Prisma의 클라이언트는 DB에 읽기/쓰기할 수 있도록 데이터 모델상의 각 모델에 대한 CRUD API를 노출한다.
  - 사용되는 메서드들은 `datamodel.prisma` 상에서 정의된 모델 정의에 따라 자동으로 생성된다.



#### 인증 리졸버

```javascript
# Mutation.js
async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.createUser({ ...args, password });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user({ email: args.email });
    if (!user) {
        throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, APP + SECRET);

    return {
        token,
        user,
    };
}
```

##### `signup`

- `User`의 비밀 번호를 암호화한다. 암호화에는 `brcypt` 라이브러리 사용.
- `prisma` 클라이언트를 사용하여 데이터베이스에 새로운 `User`를 저장
- `APP_SECRET` 값으로 서명된 JWT를 생성한다. 여기서 사용되는 `APP_SECRET`는 별도로 설정해야 하며, `jwt` 라이브러리도 설치해야 한다.
- GraphQL 스키마에 정의된 `AuthPayload` 객체 형태에 부합하도록, `token`과 `user`를 포함하는 객체를 반환한다.

##### `login`

- 새로운 `User` 객체를 생성하는 것이 아니라, `prisma` 클라이언트를 사용하여 기존의 `User` 레코드를 검색하여 반환한다.
  - `User` 레코드를 검색할 때는 `login` 뮤테이션에 인자로 전달되는 `email` 주소가 사용된다.
- 제공된 비밀번호와 DB에 저장된 비밀 번호를 비교한다.
- `token`과 `user`를 반환한다.



```javascript
# utils.js
const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'

function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
}
```

- `APP_SECRET`은 사용자들에게 발급해줄 JWT를 서명하는데 사용

- `getUserId` 함수는 인증이 요구되는 리졸버(`post` 등)에서 호출할 수 있는 헬퍼 함수다.

  - 우선 `context` 객체로부터 `Authorization` 헤더를 가져온다.
  - 헤더에는 `User`의 JWT가 들어있다.
  - JWT를 검증하고 해당 `User`의 ID를 가져온다.

  > 인증을 필요로 하는 리졸버를 **보호**하는데 이 함수를 사용할 수 있다.



```javascript
# index.js
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {prisma}
})

// 아래와 같이 변경
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})
```

  `request`를 `context` 객체에 직접 추가하지 않고, `context` 객체를 반환하는 함수로 바꾼다. 이러한 접근 방식의 장점은 GraphQL 쿼리를 전달하는 HTTP 요청을 `context`에 직접 추가할 수 있다는 점이다.

  이렇게 되면 `Authorization` 헤더를 읽고 요청을 보낸 사용자가 해당 요청에 상응하는 동작을 수행할 수 있는지 여부를 검증할 수 있게 된다.



#### post 뮤테이션에 대하여 인증 요구하기

```javascript
# Mutation.js
function post(parent, args, context, info) {
  const userId = getUserId(context)
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  })
}
```

- `getUserId` 함수를 사용하여 `User`의 ID를 가져오고 있다.
  - 이 ID는 JWT 토큰에 저장된 것이고, 이 토큰은 서버로 들어오는 HTTP 요청의 `authorization` 헤더에 설정되어 있다.
  - 어떤 `User`가 `Link`를 생성했는지 알 수 있다.
- `userId`를 사용하여, 생성될 `Link`와 `Link`를 생성한 `User`를 연결한다.

 

### 관계 리졸브하기

```javascript
# Link.js
function postedBy(parent, args, context) {
  return context.prisma.link({ id: parent.id }).postedBy()
}

module.exports = {
  postedBy,
}
```

1. `postedBy` 리졸버에서는 우선 `prisma` 클라이언트를 사용하여 `Link`를 불러온다.
2. 해당 `Link`에 대하여 `postedBy` 메서드를 호출한다.
3. 이 리졸버는 `schema.graphql`에 정의된 `Link` 타입이 가지는 `postedBy` 필드를 리졸브 해야 하므로, `postedBy` 라는 이름을 가져야한다.



## GraphQL 전송

### 구독(Subscription)

   특정 이벤트가 발생했을 때 서버가 클라이언트로 데이터를 전송해주는 GraphQL 기능이다.

> WebSocket을 사용하여 구현하는것이 일반적이다.

- 처음에 클라이언트는 관심있는 이벤트를 명시한 구독 쿼리를 전송하여, 서버와 길게 지속되는 연결을 형성한다. 
- 특정 이벤트가 발생할 때마다, 서버는 이 연결을 사용하여 구독 중인 클라이언트에 이벤트 데이터를 푸시한다.



### Prisma를 활용한 구독

#### 구독할 수 있는 이벤트

- 새로운 모델이 **생성되었을 때 (created)**
- 기존의 모델이 **수정되었을 때 (updated)**
- 기존의 모델이 **삭제되었을 때 (deleted)**

Prisma 클라이언트가 가지는 `$subscribe` 메서드를 사용화면 위의 이벤트들을 구독할 수 있다.



#### 구독을 다루는 리졸버

- 데이터를 직접 반환하지 않고, `AsyncIterator` 를 반환한다.
  - 이것은 이후에 GraphQL 서버 측에서 클라이언트에 이벤트 데이터를 푸시하는데 사용된다.
- 구독 리졸버는 객체로 감싸지며, `subscribe` 필드를 통하여 제공된다.
  - `AsyncIterator`가 발생시키는 데이터로부터 실제로 데이터를 반환하는 `resolve` 필드를 별도로 제공해야 한다.



```javascript
# Mutation.js
async function vote(parent, args, context, info) {
  // 1
  const userId = getUserId(context)

  // 2
  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId },
  })
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`)
  }

  // 3
  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } },
  })
}
```

1. 요청으로 들어오는 JWT가 유효한지 `getUserId` 헬퍼 함수를 사용하여 검증한다.

2. `prisma` 클라이언트는 각 모델에 대한 CRUD 메서드 뿐 아니라, 각 모델마다 `$exists` 함수도 생성한다.`$exists` 함수는 `where` 라는 필터 객체를 인자로 받는데, 이를 통하여 해당 타입 요소와 관련된 특정 조건을 명시할 수 있다.
   - DB 내에서 적어도 1개 이상의 요소가 해당 조건을 만족한다면 `$exists` 함수는 `true`를 반환한다.
   - 위 코드는 요청을 보낸 `User`가 `args.linkId`로 식별되는 `Link`를 추천하였는지 여부를 확인하는 데 사용된다.
3. `$exists` 함수가 `false`를 반환한다면, `createVote` 메서드를 사용하여 새로운 `Vote`를 생성하고 이 `Vote`는 `User`와 `Link`에 연결된다.



## 필터링, 페이지네이션, 정렬

### 필터링

  Prisma를 사용하면, 큰 수고를 들이지 않더라도 필터링 기능을 API에 구현할 수 있다. 첫번째 할일은, API를 통하여 노출시킬 필터에 대하여 생각해보는 것이다.

  지금의 경우, API의 `feed` 쿼리는 필터링 문자열을 받을 수 있다. 이제 이 쿼리는 해당 필터링 문자열 상에 적힌 `url` 또는 `description`을 포함하고 있는 `Link` 요소만을 반환한다.

```javascript
# schema.graphql
type Query {
    info: String!
    feed(filter: String): [Link!]!
}

# Query.js
async function feed(parent, args, context, info) {
  const where = args.filter ? {               
    OR: [                                    
      { description_contains: args.filter }, 
      { url_contains: args.filter },       
    ],                                      
  } : {}                                     
                                             
  const links = await context.prisma.links({  
    where
  })
  return links
}
```

  `filter` 문자열이 제공되지 않는다면, `where` 객체는 단지 빈 객체가 되며 `links` 쿼리에 대한 응답을 반환할 때에 필터링을 위한 조건이 Prisma 엔진에 적용되지 않게 된다.

  `args`를 통하여 `filter`가 전달되는 경우, 앞서 논의한 바와 같이 2개의 필터링 조건을 표현하는 `where` 객체를 구성하게 된다. 여기서 `where` 인자는 명시된 조건에 부합하지 않는 `Link` 요소를 걸러내기 위하여 Prisma가 사용된다.

```javascript
# 예시 쿼리
query {
  feed(filter:"QL") {
    id
  	description
    url
    postedBy {
      id
      name
    }
  }
}
```



### 페이지네이션

#### Limit-Offset

 : 반환될 항목들에 대한 인덱스를 제공하여 전체 목록 중 특정 부분을 요청

  (대부분의 경우, 반환될 항목들에 대한 시작 인덱스(offset)와 개수(limit)를 제공)

#### Cursor-based

  : 목록 내의 모든 요소는 고유 ID(지시자)로서 연관된다. 클라이언트에서는 시작 위치의 요소에 대한 지시자와 항목 개수를 제공한다.



#### Limit와 Offset은 Prisma API 상에서 다르게 불린다.

- **Limit**는 `first`라고 불리며 시작 인덱스 이후에 등장하는 첫번째 x개의 요소를 가져온다.
  - `last` 인자를 사용하면 마지막 x개의 요소를 반환한다.
- **Offset** 인덱스는 `skip`이라고 불리며, 전체 목록 상에서 해당 개수 만큼의 요소를 건너뛴다.
  - `skip`이 제공되지 않는다면 기본값으로 **0**이 사용된다.

```javascript
# schema.graphql
type Query {
    info: String!
    feed(filter: String, skip: Int, first: Int): [Link!]!
}

# Query.js
async function feed(parent, args, context, info) {
    const where = args.filter ? {
        OR: [
            { description_contains: args.filter },
            { url_contains: args.filter }
        ],
    } : {}
    
    const links = await context.prisma.links({
        where,
        skip: args.skip,
        first: args.first
    })
    return links
}

# 예시 쿼리
query {
  feed(
    first: 1
    skip: 1
  ) {
    id
    description
    url
  }
}
```



### 정렬

  Prisma를 사용하면 요소들의 목록을 특정 기준에 따라 정렬하여 반환할 수 있다. 예를 들어, `Link`의 목록을 `url` 또는 `description`의 가나다 순 기준으로 정렬할 수 있다. Hacker News API의 경우, GraphQL 서버 상의 Prisma API가 어떤 정렬 방식을 사용할 것인지 등을 클라이언트 측에서 결정할 수 있도록 해준다. 정렬방식을 가리키는 열거자(`enum`)을 사용한다.

```javascript
# schema.graphql
enum LinkOrderByInput {
  description_ASC
  description_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
}

type Query {
  info: String!
  feed(filter: String, skip: Int, first: Int, orderBy: LinkOrderByInput): [Link!]! 
}

#Query.js
async function feed(parent, args, context, info) {
    const where = args.filter
        ? {
              OR: [{ description_contains: args.filter }, { url_contains: args.filter }],
          }
        : {};

    const links = await context.prisma.links({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy,
    });
    return links;
}

module.exports = {
    feed,
};

# 쿼리 예시
query {
  feed(orderBy: createdAt_ASC) {
    id
    description
    url
  }
}
```



### Link 요소의 총 개수 반환

```javascript
# schema.graphql
type Query {
  info: String!
  feed(filter: String, skip: Int, first: Int, orderBy: LinkOrderByInput): Feed! 
}

type Feed {        
  links: [Link!]! 
  count: Int!    
} 
    
# Query.js
async function feed(parent, args, context) {
  // 1
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter },
        ],
      }
    : {}

  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  })
  const count = await context.prisma 
    // 2
    .linksConnection({              
      where,                        
    })                              
    .aggregate()                     
    .count()                        
  // 3
  return {                          
    links,                          
    count,                          
  }                                  
}
```

1. 필터링, 정렬, 페이지네이션을 위하여 제공된 인자를 사용하여 `Link` 요소의 개수를 반환할 때에 사용할 객체를 만들고 있다.
2. Prisma 클라이언트 API의 `linksConnection` 쿼리를 사용한다. 이를 통하여 현재 DB상에 저장된 `Link` 요소의 총 개수를 가져올 수 있다.
3. `links`와 `count`는 GraphQL 스키마 상에 추가된 `Feed` 타입의 명세와 부합하도록 하나의 객체로 감싸진다.



### shema.graphql

: 프론트엔드 어플리케이션에서 서버에 전송할 수 있는 모든 동작들(쿼리, 뮤테이션, 구독 등)을 정의하는 GraphQL 스키마를 포함한다.



- Queries
  - `feed` : 백엔드로부터 모든 링크들을 반환한다. 참고로 이 쿼리는 필터링, 정렬, 페이지 매기기 기능을 위한 인자를 받을 수 있다.
- Mutations
  - `post` : 인증된 사용자가 새로운 링크를 생성한다.
  - `signup` : 새로운 사용자를 위한 계정을 생성한다.
  - `login` : 기존의 사용자가 로그인한다.
  - `vote` : 인증된 사용자가 어떤 링크에 대하여 투표한다.
- Subscriptions
  - `newLink` : 새로운 링크가 생성되었을 때 실시간 갱신을 받는다.
  - `newVote` : 새로운 투표가 이루어졌을 때 실시간 갱신을 받는다.



#### ex.

```javascript
{
    feed(skip: 0, first: 10){
        links {
            description
            url
            postedBy {
                name
            }
        }
    }
}
```

> 위의 `feed` 쿼리를 전송하여 서버로부터 첫 10개의 링크를 받을 수 있다



```javascript
mutation {
    signup(
    name: "Sarah",
    email: "sarah@graph.cool",
    password:'graphql'
    ){
        token
        user{
            id
        }
    }
}
```

> 위의 `signup` 뮤테이션을 전송하여 새로운 사용자를 생성한다.





- `typeDefs` : 어플리케이션의 스키마에서 가져온 타입 정의
- `resolvers` : 어플리케이션의 스키마로부터 `Query`, `Mutation`, `Subscription` 타입과 각 타입이 가진 필드들을 반영한 자바스크립트 객체다. 이 객체에는 어플리케이션 스키마상의 각 필드와 동일한 이름을 가진 함수가 들어있다.
- `context` : 리졸버 체인을 거쳐서 전달된 객체로, 모든 리졸버는 이 객체에 대하여 읽기 및 쓰기 동작을 수행할 수 있다.