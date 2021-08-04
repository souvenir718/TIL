# Snap Scroll



```html
<div id="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
    <div class="item">4</div>
    <div class="item">5</div>
    <div class="item">6</div>
</div>
```

```css
#container{
    width: 500px;
    height: 500px;
    overflow: auto;
    scroll-snap-type: y mandatory;
}
.item {
    scroll-snap-align:center;
}
```



sticky
