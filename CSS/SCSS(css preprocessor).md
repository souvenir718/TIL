# SCSS(css preprocessor)

### Variables

```scss
$bg: #e7473c;


/// styles.scss
@import "_variables.scss";

body {
    background: $bg;4
}
```



### Nesting

```html
<body>
    <h2>Title</h2>
    <div class="box">
    	<h2>Another Title</h2>
        <button>Hello</button>
    </div>
    <button>Bye Bye</button>
</body>
```

```scss
h2{
    color: $bg
}

.box {
    margin-top: 20px;
    h2 {
        color: blue;
    }
    button {
        color: red;
    }
    &:hover {
        background-color: green;
    }
}
```



### Mixins

> 상황에 따라 다르게 코딩을 하고 싶을때 사용

```scss
// _mixins.scss
@mixin Title($color) {
	color: $color;
    font-size: 30px;
    margin-bottom: 12px;
    // if/else 문도 사용 가능.
    @if $word == 'odd' {
        
    } @else {
        
    }
}

// styles.scss
@import "_mixins";

h1{
    &:nth-child(odd) {
   	 @include Title(blue);
	}
    &::nth-child(even) {
    	@include Title(red);
    }
}
```



### Extends

>  같은 코드를 중복하고 싶지 않을때 사용

```html
<a href='#'>Log In</a>
<button>
    Log Out
</button>
```

```scss
// _button.scss
%button {
    border-radius: 7px;
    font-size: 12px;
    text-transform: uppercase;
    padding: 5px 10px;
    background-color: peru;
    color: white;
    font-weight: 500;
}

// styles.scss
@import "_button";

a {
    @extend %button;
    text-decoration: none;
}
button{
    @extend %button;
    border: none;
}
```



### Responsive Mixins

```scss
// _mixins.scss
$minIphone: 500px;
$maxIphone: 690x;
$minTablet: $maxIphone + 1;
$maxTablet: 1120px;

@mixin responsive($device) {
    @if $device == 'iphone' {
        @media screen and (min-width: $minIphone) and  (max-width: $maxIphone) {
            @content;
        }
    } @else if $device == 'tablet' {
        @media screen and (min-width: $minTablet) and (max-width: $maxTablet){
            @content;
        }
    } @else if $device == 'iphone-l' {
        @media screen and (min-width: $minIphone) and (max-width: $maxIphone) and (orientation: landscape){
            @content;
        }
    } @else if $device == 'ipad-l' {
        @media screen and (min-width: $minTablet) and (max-width: $maxTablet) and (orientation: landscape){
            @content;
        }
    } 
    color: blue;
    @contnet;
}

// styles.scss
@import "_mixins";

h1 {
    color: red;
    @include responsive('iphone') {
        color: yellow;
    }
    @include responsive('iphone-l'){
        font-size: 60px;
    }
    @include responsive('tablet'){
        color: green;
    }
    
}
```
