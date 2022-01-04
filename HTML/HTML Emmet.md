# HTML Emmet

마크업 개발의 속도를 붙여줄 단축키!



1. **자동완성 : tab키**
   - ex) div(tab키)
2. **텍스트 : {}** 
   - ex) div{텍스트}

3. **자식(하위) 요소 : >**

   - ex) : div>div

4. **형제 요소 : +**

   - ex) : div>p+a

   ```html
   <div>
       <p></p>
       <a href=""></a>
   </div>
   ```

   

5. 올라가기 : ^

   - ex) : div>p^div

   ```html
   <div>
       <p></p>
   </div>
   <div></div>
   ```

   

6. **반복하기 : ***

   - ex) : ul>li*4

7. 그룹화 : ()

   - ex) : ul>(li>a)*4

   ```html
   <ul>
       <li><a href=""></a></li>
       <li><a href=""></a></li>
       <li><a href=""></a></li>
       <li><a href=""></a></li>
   </ul>
   ```

   

8. **클래스 : .**

   - ex) : div.class-name

9. **아이디 : #**

   - ex) : div#id

10. 속성 : [attr]

    - ex) : img[alt="이미지 내용"]

    ```html
    <img src="" alt="이미지 내용">
    ```

    

11. 넘버링 : $

    - ex) : div.item$*6

    ```html
    <div class="item1"></div>
    <div class="item2"></div>
    <div class="item3"></div>
    <div class="item4"></div>
    <div class="item5"></div>
    <div class="item6"></div>
    ```

    
