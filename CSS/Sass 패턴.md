# Sass 패턴

```
sass/
- abstracts/
	- _variables.scss		# Sass 변수
	- _functions.scss		# Sass 함수
	- _mixins.scss			# Sass 믹스인
	- _placeholders.scss	# Sass 플레이스 홀더

- base/
	- _reset.scss			# 리셋/정규화
	- _typography.scss		# 타이포그래피 규칙
	-						# 기타
	
- compoments/
	- _button.scss			# 버튼
	- _carousel.scss		# 캐러셀
	- _cover.scss			# 커버
	- _dropdown.scss		# 드롭다운
	-						# 기타
	
- layout/
	- _navigation.scss		# 네비게이션
	- _grid.scss			# 그리드 시스템
	- _header.scss			# 헤더
	- _footer.scss			# 푸터
	- _sidebar.scss			# 사이드바
	- _forms.scss			# 폼
	
- pages/
	- _home.scss			# 홈 한정 스타일
	- _contact.scss			# 연락처 한정 스타일
	
- themes/
	- _theme.scss			# 디폴터 테마
	- _admin.scss			# 관리자 테마
	
- vendors/
	- _bootstrap.scss		# 부트스트랩

- main.scss					# main Scss파일
```

>  파일명에 _가 붙는경우 @import 되어 사용될 것으로 파악
