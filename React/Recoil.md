# Recoil

Recoil은 API가 단순하여 배우기 쉽고 hook을 사용해본 사람들에겐 익숙하다. Recoil을 시작하기 위해서는 애플리케이션을 `RecoilRoot`로 감싸고 데이터를 `atom` 단위로 선언하여 `useRecoilState`로 대체해야 한다.



## 기본 기능

**atom**은 하나의 상태로 컴포넌트가 구독할 수 있는 state라고 생각할 수 있다. atom의 값을 변경하면 그것을 구독하고 있는 컴포넌트들이 다시 렌더링된다. 

atom을 생성하기 위해 애플리케이션에서 고유한 키 값과 디폴트 값을 설정해야 한다. 디폴트 값은 정적인 값, 함수가 될 수 있다.

```jsx
export const nameState = atom({
    key: 'nameState',
    default: 'Subin Kim'
})
```



**useRecoilState**는 atom의 값을 구독하여 업데이트할 수 있는 hook으로 `useState`와 동일한 방식으로 사용할 수 있다.

**useRecoilValue**는 setter 함수 없이 atom의 값을 반환 한다.

**useSetRecoilState**는 setter 함수를 반환한다.

```jsx
import {nameState} from "./state"

const NameInput = () => {
    const [name, setName] = useRecoilState(nameState);
    const onChante = (event) => {
        setName(event.target.name);
    };
    
    return (
    	<>
        	<input type="text" value={name} onChange={onChange}/>
        	<div>name: {name}</div>
        </>
    );
}
// Value
const OtherComponentWithName = () => {
    const name = useRecoilValue(nameState);
    return <div>{name}</div>
}
// Setter
const OtherComponentWithSetter = () => {
    const setName = useSetRecoilState(nameState);
    return <button onClick={() => setName('KKK')}>Setter</button>
}
```



**selector**는 상태에서 파생된 데이터로, 다른 atom에 의존하여 동적 데이터를 만들 수 있다.

```jsx
const animalsState = atom({
    key: 'animalState',
    default: [{
        name: 'Rexy',
        type: 'dog'
    }, {
        name: 'Oscar',
        type: 'cat'
    }]
});

const animalFilterState = atom({
    key: 'animalFilterState',
    default: 'dog',
})

const filteredAnimalState = selector({
    key: 'animalListState',
    get: ({get}) => {
        const filter = get(animalFilterState);
        const animals = get(animalsState);
        
        return animals.filter(animal => animal.type === filter);
    }
})

const Animals = () => {
    const animals = useRecoilValue(filteredAnimalsState);
    return animals.map(animal => <div>{animal.name}, {animal.type}</div>)
}
```





---

**출처**

1. [https://ui.toast.com/weekly-pick/ko_20200616](https://ui.toast.com/weekly-pick/ko_20200616)

