# Apollo



### Apollo 클라이언트

- `apollo-boost` : Apollo 클라이언트를 다루는 데 필요한 패키지들을 한번에 설치해 주는 패키지.
  - `apollo-client` : 모든 마술이 이루어지는 곳
  - `apollo-cache-inmemory` : 추천하는 캐시 라이브러리
  - `apollo-link-http` : 원격 데이터를 불러오기에 필요한 Apollo Link
  - `apollo-link-error` : 오류 처리를 위한 Apollo Link
  - `apollo-link-state` : 로컬 상태 관리를 위한 Apollo Link
  - `graphql-tag` : 쿼리와 뮤테이션에 사용될 `gql` 함수를 내보내 준다.
- `react-apollo` : Apollo 클라이언트를 React에서 사용하기 위한 바인딩을 제공한다.
- `graphql`은 Facebook이 작성한 GraphQL의 참조 구현이다.



  쿼리와 뮤테이션을 작성하고 `ApolloClient` 인스턴스를 사용하여 전송한다.

   `Apollo`를 사용할 때 가장 먼저 할 일은 `ApolloClient` 인스턴스를 구성하는 것이다. 우선, 네트워크 연결을 형성할 수 있도록 `GraphQL` API 엔드포인트를 알아야 한다.

```jsx
# index.js
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
```

- `httpLink`는 GraphQL API를 사용하여 `ApolloClient` 인스턴스에 연결한다. GraphQL 서버는 `http://localhost:4000`에서 동작하고 있어야 한다.
- `httpLink`를 인자로 전달하여 `ApolloClient` 인스턴스를 생성하고, `InMemoryCache` 인스턴스를 새로 생성한다.
- React 어플리케이션의 최상위 컴포넌트를 렌더링한다. `App`은 고차 컴포넌트 `ApolloProvider`로 감싸지고 `client`를 props로 전달받는다.



### GraphQL 쿼리

```javascript
{
  feed {
    links {
      id
      createdAt
      description
      url
    }
  }
}
```



#### Apollo 클라이언트와 함께 쿼리 사용

##### 1) `ApolloClient`의 `.query()` 메서드를 직접 사용

- 데이터를 불러올 수 있는 직접적인 방법이며 응답 결과는 Promise 형태로 받게 된다.

```javascript
client.query({
    query:gql`
	{
		feed {
			links {
				id
			}
		}
	}
	`
}).then(response => console.log(response.data.allLinks))
```



##### 2) Render Prop API

  React를 사용시 보다 선언적인 방법은 Apollo의 새로운 **Render Prop API**를 사용하여 컴포넌트만으로 GraphQL 데이터를 관리하는 것이다.

  이 방식으로 데이터를 불러오면, `props`에 GraphQL 쿼리를 전달하는 것만으로 `<Query/>` 컴포넌트가 알아서 데이터를 불러온 뒤 컴포넌트의 **Render Prop** 함수 내에서 사용할 수 있게 해준다.

1. `gql` 파서 함수를 사용하여 자바스크립트 상수 형태로 쿼리 작성
2. `props`로 GraphQL 쿼리를 전달한 `<Query/>` 컴포넌트를 사용
3. 컴포넌트의 `Render Prop` 함수를 거쳐서 주입된 쿼리 결과에 접근

```jsx
# LinkList.js
import { gql } from 'apollo-boost';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from './Link';

const FEED_QUERY = gql`
    {
        feed {
            links {
                id
                createdAt
                url
                description
            }
        }
    }
`;

class LinkList extends Component {
    render() {
        return (
            <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>;
                    if (error) return <div>Error</div>;

                    const linksToRender = data.feed.links;

                    return (
                        <div>
                            {linksToRender.map((link) => (
                                <Link key={link.id} link={link} />
                            ))}
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default LinkList;
```

1. `FEED_QUERY` 라는 상수를 선언하여 쿼리를 저장한다. `gql` 함수는 GraphQL 코드를 포함하는 평문 String을 파싱하는데 사용된다. 
2. 반환되는 코드를 `<Query/>` 컴포넌트로 감싼다. 여기서 `FEED_QUERY`는 `props`로 전달된다.

`Render Props` 함수내의 `props`

- `loading` :  요청이 현재 이루어지고 있으며 응답이 반환되지 않았다면 항상 **true**

- `error` : 요청이 실패했을 경우, 무엇이 잘못되었는지에 대한 정보를 포함한다.
- `data` : 서버로부터 반환된 실제 데이터다. 지금의 경우  `Link` 요소로 이루어진 리스트를 나타내는 `links` 속성이 들어있다.



### 뮤테이션: 링크 생성

#### Apollo를 사용하여 뮤테이션 정송하는 방법

1. `gql` 파서 함수를 사용하여 자바스크립트 상수로 뮤테이션을 작성
2. `<Mutation/>` 컴포넌트에 GrpahQL 뮤테이션과 (필요한 경우) 변수를 `props`로 전달하여 사용
3. 컴포넌트의 `Render Props` 함수에 주입된 뮤테이션 함수를 사용

```jsx
# CreateLink.js
import { gql } from 'apollo-boost';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

const POST_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`;

class CreateLink extends Component {
    state = {
        description: '',
        url: '',
    };
    render() {
        const { description, url } = this.state;
        return (
            <div>
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={description}
                        onChange={(e) => this.setState({ description: e.target.value })}
                        type="text"
                        placeholder="A description for the link"
                    />
                    <input
                        className="mb2"
                        value={url}
                        onChange={(e) => this.setState({ url: e.target.value })}
                        type="text"
                        placeholder="The URL for the link"
                    />
                </div>
                <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
                    {(postMutation) => <button onClick={postMutation}>Submit</button>}
                </Mutation>
            </div>
        );
    }
}

export default CreateLink;
```

1. `POST_MUTATION` 이라는 자바스크립트 상수를 만들어 뮤테이션을 저장한다.
2. `POST_MUTATION` 을 `props`로 전달하는 `<Mutation/>` 컴포넌트의 `Render Prop` 함수로 `button` 요소를 감싼다
3. `description`과 `url`를 `variables`라는 이름의 `props`로 전달한다.