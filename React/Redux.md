# Redux

- store, dispatch, action, reducer
- `store`의 데이터를 변경하기 위해 `action` 을 `dispatch` 해야 하는데, 그것을 받아 처리하는 함수를 `reducer` 라고 합니다.
- `action` 은 데이터의 변화를 알려주는 객체이며, `reducer` 는 그 객체로 애플리케이션의 `state` 를 어떻게 바꿀지 정의한다.



## Redux in Vanilla JS

```js
import { createStore } from 'redux'

// Action type
const ADD_TODO = 'ADD_TODO'

const addToDo = (text) => {
    return {
        type: ADD_TODO,
        text,
    }
}

// reducer function
const reducer = (state = [], action) => {
    switch(action.type) {
        case ADD_TODO:
            const newToDo = {text: action.text, id: Date.now()};
            return [newToDoObj, ...state];
        default:
            return state;
    }
}

const store = createStore(reducer);

// dispatch action
const dispatchAddToDo = (text) => {
    store.dispatch(addToDo(text));
}

// state가 변경될때 실행될 함수 설정
store.subscribe(paintToDos);
```



## Redux in React

### 기본적인 Redux 사용 - store

```react
import { createStore } from 'redux';

// type 지정
const ADD = 'ADD';
const DELETE = 'DELETE';

const addToDo = (text) => {
    return {
        type: ADD,
        text,
    }
}

const reducer = (state = [], action) => {
    switch(action.type) {
        case ADD:
            return [{ text: action.text, id: Date.now() }, ...state];
        default:
            return state;
    }
}

const store = createStore(reducer);

export const actionCreators = {
    addToDo,
};
export default store;
```



### 기본적인 Redux 사용 - state 이용

```react
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

```react
// Home.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import ToDo from '../components/ToDo';
import { actionCreators } from '../store';

function Home({ toDos, addToDo }) {
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addToDo(text);
        setText('');
    };
    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((todo) => (
                    <ToDo key={todo.id} {...todo} />
                ))}
            </ul>
        </>
    );
}

//return -> props
function mapStateToProps(state, ownProps) {
    return { toDos: state };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addToDo: (text) => dispatch(actionCreators.addToDo(text)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```



### Redux Toolkit 사용 - store

```react
import { configureStore, createAction, createReducer, createSlice } from '@reduxjs/toolkit';

const toDos = createSlice({
    name: 'toDosReducer',
    initialState: [],
    reducers: {
        add: (state, action) => {
            state.push({ text: action.payload, id: Date.now() });
        },
        remove: (state, action) => state.filter((toDo) => toDo.id !== action.payload),
    },
});

const store = configureStore({ reducer: toDos.reducer });

export const { add, remove } = toDos.actions;
export default store;
```



### Redux Toolkit 사용 - state 이용

```react
import React, { useState } from 'react';
import { connect } from 'react-redux';
import ToDo from '../components/ToDo';
import { add, remove } from '../store';

function Home({ toDos, addToDo }) {
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addToDo(text);
        setText('');
    };
    return (
        <>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((todo) => (
                    <ToDo key={todo.id} {...todo} />
                ))}
            </ul>
        </>
    );
}

//return -> props
function mapStateToProps(state, ownProps) {
    return { toDos: state };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addToDo: (text) => dispatch(add(text)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```



---

### redux-thunk

- 비동기 처리 작업을 도와주는 미들웨어

![간단예제](https://woowabros.github.io/img/2018-05-19/redux-thunk.png)

> `redux-thunk` 는 `dispatch` 된 `action` 이 함수라면 `dispatch` 와 `getState` 를 함께 전달한다.
>
> 이로써 전달된 함수 내부에서는 여러가지 일을 할 수 있다. 
>
> 네트워크 작업 등을 통해 여러번 `dispatch` 가 수행될 수 있다.



- 미들웨어
  - `action` 과 `reducer` 의 중간에 존재
  - `reducer` 가 `dispatch` 된 `action` 을 처리하기 전에 작업을 수행하기 위한 중간자 역할