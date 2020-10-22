### 리액트 네이티브 컴포넌트 만들기

#### 1. 뷰 작업하기

> 일반적인 HTML요소가 아닌 플랫폼에 종속적인 리액트 컴포넌트를 사용한다.

| 리액트     | 리액트 네이티브 |
| ---------- | --------------- |
| <div>      | <View>          |
| <span>     | <Text>          |
| <li>, <ul> | <FlatList>      |
| <img>      | <Image>         |

- 다른 컴포넌트들은 특정 플랫폼에서만 동작한다.



#### 2. JSX(JavaScript XML) 사용하기

```javascript
class Hello extends React.Component {
    render() {
        return React.createElement(
        "div",
        null,
        "Hello",
        this.props.name
        );
    }
}

ReactDOM.render(
	React.createElement(Hello, {name:"Bonnie"}), mountNode);
```

- JSX 사용

```react
class Hello extends Component {
    render(){
        return <div>Hello {this.props.name}</div>;
    }
}

ReactDOM.render(<Hello name="Bonnie"/>, mountNode);
```



#### 3. CSS

- 인라인 스타일 사용 강조

```react
// 스타일 정의
const style = {
    backgroundColor: 'white'.
    fontSize : '16px'
};

// 스타일 적용
const txt = (
	<Text style = {style}>
    	Styled Text
    </Text>
)
```



### 애플리케이션 만들기

#### 1. 환경설정

- Create React Native App 사용

  - 자바스크립트만 사용하는 앱만 지원
  - 손쉽게 테스트 및 프로토타이핑 가능
  - eject 명령어를 실행하여 전형적인 리액트 네이티브 프로젝트로 바꿀 수 있다.

  ```js
  npm install -g create-react-natvie-app
  // Create React Native App을 이용하여 새로운 프로젝트 생성
  create-react-native-app first-project
  ```

  > 보일러플레이트 : 동작을 위해 반드시 포함되어야 하는, 필수 내용이 포함된 코드
  >
  > 필요에 따라 이 코드를 바탕으로 수정하여 사용하게 되는 기본 틀

  - 프로젝트 디렉터리 구조

    - App.js
    - App.test.js
    - README.md
    - app.json
    - node_modules
    - package.json
    - yarn.lock

    > package.json : 프로젝트 관련 메타데이터, 디펀덴시 정보
    >
    > App.js : 실제 앱 코드

- react-native init

  - 리액트 네이티브와 디펜던시 모두 설치하게 되는 방법

  ```js
  npm install -g react-native-cli
  // iOS와 안드로이드 보일러플레이트가 포함된 새로운 리액트 네이티브 프로젝트 생성
  react-native init FirstProject
  ```

  - 디렉터리 구조
    - ios/ 와 /android 디렉터리에는 각 플랫폼별로 자동 생성된 기본 코드가 있다.
  
- expo

```js
expo init (project name)

npm start
```





#### live reloading

- 저장하면 자동으로 리프레쉬가 되고 변경된걸 확인할 수 있다.



#### styles

- 리액트 네이티브에서 모든 flex box의 디폴트는 `flexDirection:column`

  > 웹사이트에서 모든 flex박스의 디폴트는 row

- `flex:1` 
  - 모든 공간을 사용할 수 있다.
- `flex:2`
  - 차지하려는 영역에 따라 뒤에 숫자를 변경해준다.
  - 자리 경쟁하는 형제들이고 더 큰애가 대부분의 자리를 차지한다.

- `paddingHorizontal`
  - left, right
- `paddingVertical`
  - top, bottom





#### Geofencing

