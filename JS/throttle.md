# throttle

```html
<body>
    <div style="background-color: red">
        <h2>1</h2>
    </div>
    <div style="background-color: orange">
        <h2>2</h2>
    </div>
    <div style="background-color: yellow">
        <h2>3</h2>
    </div>
	<div style="background-color: green">
        <h2>4</h2>
    </div>
	<div style="background-color: blue">
        <h2>5</h2>
    </div>
	<div style="background-color: navy">
        <h2>6</h2>
    </div>
	<div style="background-color: violet">
        <h2>7</h2>
    </div>
</body>
```



```js
let i = 0;

window.addEventListener('scroll' throttle(() => {
    	i = i + 1;
	    console.log(i); // API 호출로 생각
	}, 1000),
);

/*
	이벤트 발생이 많을 때 특정 밀리세컨드 이벤트를 차단하고 단 한번만 실행시킨다.
	
	실행시킬 함수, 밀리세컨드
*/
function throttle(callback, wait){
    let timeout = null;
    
    return function(...args) {
        const context = this;
        
        if(!timeout){
            timeout = setTImeout(() => {
                callback.apply(this, args);
                timeout = null;
			}, wait)	
        }
    }
}
```



※ 참고 : lodash.com
