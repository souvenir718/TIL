# GraphQL

 GraphQL(gql)은 Structed Query Language(sql)과 마찬가지로 쿼리언어다. 하지만 gql과 sql의 언어적 구조 차이는 매우 크다. sql은 **데이터베이스 시스템**에 저장된 데이터를 효율적으로 가져오는 것이 목적이고, gql은 **웹 클라이언트**가 데이터를 서버로부터 효율적으로 가져오는 것이 목적이다. sql은 주로 백앤드 시스템에서 작성하고 호출하는 반면, gql은 주로 클라이언트 시스템에서 작성하고 호출한다.

##### sql 예시

```sql
SELECT plot_id, specieds_id, weight, ROUND(weight / 1000.0, 2) FROM surveys;
```



##### gql 예시

```javascript
{
    hero {
        name
        friends {
            name            
        }
    }
}
```



 서버사이드 gql 어플리케이션은 gql로 작성된 쿼리를 입력으로 받아 처리한 결과를 다시 클라이언트로 돌려준다. HTTP API 자체가 특정 데이터베이스나 플랫폼에 종속적이지 않은것처럼 마찬가지로 gql 역시 어떠한 특정 데이터베이스나 플랫폼에 종속적이지 않는다.



##### GraphQL 파이프라인

![](http://tech.kakao.com/files/graphql-pipeline.png)



### REST API와 비교

 REST API는 URL, METHOD 등을 조합하기 때문에 다양한 Endpoint가 존재한다. 반면, gql은 단 하나의 Endpoint가 존재한다. 또한 gql API에서는 불러오는 데이터의 종류를 쿼리 조합을 통해서 결정한다. 예를 들면, REST API에서는 각 Endpoint마다 데이터베이스 SQL 쿼리가 달라지는 반면, gql API는 gql 스키마의 타입마다 데이터베이스 SQL 쿼리가 달라진다.



##### HTTP와 gql의 기술스택 비교

![](http://tech.kakao.com/files/graphql-stack.png)

##### REST API와 GraphQL API 사용

![](http://tech.kakao.com/files/graphql-mobile-api.png)

 위 그림처럼, gql API를 사용하면 여러번 네트워크 호출을 할 필요 없이, 한번의 네트워크 호출로 처리할 수 있다.





### GraphQL의 구조





[출처](https://tech.kakao.com/2019/08/01/graphql-basic/)