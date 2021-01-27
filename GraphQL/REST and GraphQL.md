# REST and GraphQL



## Resources

  **Rest**의 핵심은 **Resource**다. 각각의 리소스는 **URL endpoint**로 정의 되고, 해당 endpoint에 특정 **HTTP Method**로서 요청하여 데이터를 검색할 수 있다. 대부분의 **REST API** 서버는 **JSON**형식으로 제공한다.

### GET `/books/1`

```json
{
    "title": "Romance of Three Kingdoms",
    "author":{
        "firstName": "Luo",
        "lastName": "Guanzhong"
    }
}
```



### GraphQL

  위의 예시를 GraphQL에서는 `Book`과 `Author` 타입을 정의해야 한다.

```json
type Book {
    id: ID
    title: String
    author: Author
}
type Author {
	id: ID
    firstName: String
    lastName: String
    books: [Book]
}
```



  GraphQL에서는 리소스의 유형과 리소스를 가져오는 방식이 완전하게 분리되어 있다. 리소스에 접근하려면 `Query` 타입이 필요하다

```json
type Query {
    book(id: ID!): Book
    author(id: ID!): Author
}
```

- `/graphql?query={ book(id: "1") {title, author { firstName } } }`
  - 위와 같은 방식으로 **REST**와 동일하게 받을 수 있다.
  - **REST**와는 다르게 `/books` 등과 같이 **Resourse**에 대한 엔드포인트가 따로 존재하지 않고 하나의 엔드포인트만 존재한다.
  - 원하는 리소스와 해당 리소스에서 원하는 필드를 특정하는 GraphQL query를 함께 보낸다.



## URL Routes vs GraphQL Schema

  모든 API 서비스는 해당 API에 대한 명세가 있다. **GraphQL**에서는 **GraphQL introspection**이, **REST API**에서는 **Swagger**가 문서화를 쉽게 도와준다.

```
GET /books/:id
GET /authors/:id
GET /books/:id/comments
POST /books/:id/comments
```

  **REST API**에서 어떤 데이터를 조회하거나 추가하는 것과 같은 작업을 하려고 할 때, 가장 먼저 생각해야 하는 것은 어떤 **엔드포인트**로 요청을 보내야 하는지다. 각 엔드포인트는 해당 리소스를 가리키며, 요청 **HTTP method**에 따라 어떤 작업을 진행하는지 달라진다.

  **GraphQL**에서는 URL을 리소스를 특정 짓는 것에 사용하지 않는다. **GraphQL Schema**가 Resource를 특정 짓는다. 또한, **HTTP Method**로 어떤 작업을 진행하게 되는지 구분하지 않고, Query, Mutation이라는 타입을 사용해 구분한다.

  **GraphQL**은 한번의 요청으로 여러 리소스에 대해 접근할 수 있다. 반면에 **REST API**에서는 여러 리소스에 접근하기 위해서는 여러 번의 요청을 해야 한다.



## Route Handlers vs Resolvers

### REST API

```js
app.get('/books/:id', function(req, res){
    const { id } = req.params;
    
    const result = {
        title: "Romance of the Three Kingdoms",
        author: {
            firstName: "Luo",
            lastName: "Guanzhong"
        }
    };
    
    res.send(result);
})
```

  `/books` 엔드포인트는 **GET** 방식 요청에만 반응한다. 클라이언트에서 이 서버의 `GET /books/1` 로 요청하면 아래와 같이 응답을 받을 수 있다.

```json
{
    "title": "Romance of Three Kingdoms",
    "author":{
        "firstName": "Luo",
        "lastName": "Guanzhong"
    }
}
```



### GraphQL

```js
const resolvers = {
    Query: {
        book: (parent, args) => {
            const result = {
                title: "Romance of the Tree Kingdoms",
            }
            return result;
        },
        author: (parent, args) => ({ firstName: "Luo", lastName: "Guanzhong" })
    }
}
```

  **REST**와는 다르게 특정 엔드포인트에 대한 어떤 함수를 제공하는 대신, **Query**타입의 `books`와 같은 특정 필드에 해당하는 함수를 제공한다. **GraphQL**에서는 이런 함수를 **resolver**라고 한다. 

  클라이언트에서 아래의 쿼리를 통해 요청하여 응답 받을 수 있다.

```js
query{
    book(id: "1") {
        title
        author {
            firstName
            lastName
        }
    }
}
```

  서버로부터 요청이 들어오면, 서버는 요청에서 **GraphQL Query**를 찾는다. **query**에 존재하는 **field**들의 **resolver**를 호출하고 각 필드마다 호출된 **resolver의 반환값**을 모아 query의 형태와 일치하는 **json 데이터**를 응답한다. **REST API**와 같은 결과값으로 응답 받을 수 있다.



#### 그림으로 표현하면 아래와 같다.

![](../images/graphql&restapi.png) 