# debounce

이벤트 발생이 많을 때 가장 마지막 이벤트만을 실행시킨다.

debounce를 사용하여 불필요한 API 호출을 줄여주며, 최적화가 가능하다.

```js
let i = 0;

document.querySelector('input').addEventListener('keyup', debounce(() => {
	    i = i + 1;
    	console.log(i);
	}, 500),
)

/*
	실행시킬 함수, 밀리세컨드
*/
function debounce(callback, wait){
    let timeout;
    
    // 함수가 호출시 매번 반환
    return function(...args){
        const context = this;
        
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    }
}
```

