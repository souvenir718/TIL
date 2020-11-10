# React Native Image Tag

```react
import { Image } from "react-native";

<Image source={{uri : 'https://~~~~'}}/>
```



```react
import { Image } from "react-native";

<Image source={require('./img/~~~.png')}/>
```

> 높이, 너비를 지정해야 한다.



#### 예제 1. Simple

```react
import { View, Image } from "react-native";

class ImageExample extends Component {
  render() {
    return (
      <View>
        <Image style={{width: 30, height: 30}}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
        />
      </View>
    );
  }
}
```



#### 예제 2. 조건부 이미지

```react
<Image style={[this.props.imageStyle]}
        source={this.props.imagePath
        ? this.props.imagePath
        : require('../theme/images/resource.png')}
    />
```

> 경로가 `imagePath` 에서 사용 가능한 경우 소스에 할당되고 그렇지 않으면 기본 이미지 경로가 할당



#### 예제 3. 이미지 경로에 변수 사용

```react
let imagePath = require("../../assets/list.png");

<Image style={{height: 50, width: 50}} source={imagePath} />
```



#### 예제 4. 이미지 맞추기

```React
<Image 
    resizeMode="contain" 
    style={{height: 100, width: 100}} 
    source={require('../assets/image.png')} />
```

