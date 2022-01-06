# CSS 선택자

### 기본 선택자

- `*` - 전체
- `div` - 요소
- `.` - 클래스
- `#` - 아이디
- `[attr]` - 특성



### 그룹 선택자 : `,`



### 결합자

- ` ` - 자손 결합자 `div p`
- `>` - 자식 결합자
- `~` - 일반 형제 결합자
- `+` - 인접 형제 결합자



### 가상 클래스 선택자

- `:hover`, `:focus`, `:focus-visible`, `:active`, `:checked`, `:disabled`, `:not()`

- `:first-child`, `:last-child`, `:only-child`



### 가상 요소 선택자

- `::before`,  `::after`, `::placeholder`

#### example

```html
<ul>
    <li>이용약관</li>
    <li>개인정보처리방침</li>
</ul>
```

```css
ul {
    display: flex;
    list-style: none;
}
li + li {
    &::before {
        content: '|';
        margin: 0 8px;
        color: #ddd
    }
}
```

