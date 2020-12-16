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

##### 쿼리 / 뮤테이션 (query / mutation)

 쿼리와 뮤테이션 그리고 응답 내용의 구조는 상당히 직관적이다. 요청하는 쿼리문의 구조와 응답 내용의 구조는 거의 일치한다.

#####     GraphQL 쿼리문(좌측)과 응답 데이터 형식(우측)

![](https://tech.kakao.com/files/graphql-example.png)



 gql에서는 굳이 쿼리와 뮤테이션을 나누는데 내부적으로 들어가면 사실상 이 둘은 별 차이가 없다. 쿼리는 데이터를 읽는데(R) 사용하고, 뮤테이션은 데이터를 변조(CUD)하는데  사용한다는 개념적인 규약을 정해놓은 것이다.



```javascript
{
    human(id: "1000") {
        name
        height
    }
}

query HeroNameAndFriends($episode: Episode) {
    hero(episode: $episode) {
        name
        friends {
            name
        }
    }
}
```

 주로 정보를 불러올 때 id값이나, 다른 **인자** 값을 가지고 데이터를 불러온다. gql에는 쿼리에 **변수**라는 개념이 있다. gql을 구현한 클라이언트에서는 이 변수에 프로그래밍으로 값을 할당 할 수 있는 함수 인터페이스가 존재한다. react apollo client의 경우에는 variables라는 파라미터에 원하는 값을 넣어주면 된다.



```javascript
query getStudentInformation($studentId: ID) {
    personalInfo(studentId: $studentId) {
        name
        address1
        address2
        major
    }
    classInfo(year: 2018, studentId: $studentId) {
        classCode
        className
        teacher {
            name
            major
        }
        classRoom {
            id
            maintainer {
                name
            }
        }
    }
    SATInfo(schoolCode: 0412, studentId: $studentId) {
        totalScore
        dueDate
    }
}
```

 **오퍼레이션** 네임 쿼리는 매우 편리하다. 비유하자면 쿼리용 함수다. 데이터베이서에서의 프로시져 개념과 유사하다고 생각하면 된다. 이 개념으로 REST API를 호출할 때와 다르게 한번의 인터넷 네트워크 왕복으로 원하는 데이터를 가져올 수 있다.  REST API에서는 프론트앤드 프로그래머는 백앤드 프로그래머가 작성하여 전달하는 API의 request / response의 형식에 의존하게 되지만 gql을 사용한 방식에서는 이러한 의존도가 많이 사라진다. 다만 데이터 스키마에 대한 협업 의존성은 존재한다.



### 스키마 / 타입 ( schema / type )

 ##### 오브젝트 타입과 필드

```javascript
type Character {
    name: String!
    appearsIn: [Episode!]!
}
```

- 오브젝트 타입 : Character
- 필드 : name, appearsIn
- 스칼라 타입 : String, ID, Int 등
- 느낌표 : 필수 값을 의미
- 대괄호 : 배열을 의미

[출처](https://tech.kakao.com/2019/08/01/graphql-basic/)