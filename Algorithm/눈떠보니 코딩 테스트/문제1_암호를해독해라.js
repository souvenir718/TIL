/*
섬으로 향하라
' +--+-+- '
' +---+-+ '
' +--+-+- '
' +-+-+-+ '
해(1)와 달(0),
Code의 세상 안으로!(En-coding)
*/
/* 
    인코딩 문제
    문자를 2진법으로
    2진법을 10진법으로
    10진법을 다시 문자로
*/

let data = ['   + -- + - + -   ','   + --- + - +   ','   + -- + - + -   ','   + - + - + - +   ']
// 주어진 입력들을 이용해서 정답을 반환하는 함수

let result = '';
const start = () => {
    for (const s of data) {
        // console.log(s.replace(/ /g, '').replace(/\+/g, '1').replace(/-/g, '0'));
        // console.log(parseInt(s.replace(/ /g, '').replace(/\+/g, '1').replace(/-/g, '0'), 2));
        // console.log(String.fromCharCode(parseInt(s.replace(/ /g, '').replace(/\+/g, '1').replace(/-/g, '0'), 2)));
        result += String.fromCharCode(parseInt(s.replace(/ /g, '').replace(/\+/g, '1').replace(/-/g, '0'), 2));
    }
    console.log(result);
};

// 프로그램 동작
start();
