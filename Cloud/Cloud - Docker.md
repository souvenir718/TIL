# 도커

- 도커는 **컨테이너 기반의 오픈소스 가상화 플랫폼**이다.
- 다양한 프로그램, 실행환경을 컨테이너로 추상화하고 동일한 인터페이스를 제공하여 프로그램의 배포 및 관리를 단순하게 해준다.



### 컨테이너

- 격리된 공간에서 프로세스가 동작하는 기술이다.

- 기존의 가상머신은 운영체제 위에 하드웨어를 에뮬레이션하고 그 위에 운영체제를 올리고 프로세스를 실행하는 반면에, 도커 컨테이너는 하드웨어 에뮬렝션 없이 리눅스 커널을 공유해서 바로 프로세스를 실행한다.

![](http://192.168.100.42:12346/uploads/images/gallery/2020-08/scaled-1680-/image-1596706613366.png)

- 별도의 OS를 올리지 않음으로 overhead를 방지할 수 있다.



### 이미지

- **컨테이너 실행에 필요한 파일과 설정값 등을 포함하고 있는 것**으로 상태값을 가지지 않고 변하지 않는다.
- 컨테이너는 이미지를 실행한 상태라고 볼 수 있고 추가되거나 변하는 값은 컨테이너에 저장된다.
- 같은 이미지에서 여러 개의 컨테이너를 생성할 수 있고 컨테이너의 상태가 바뀌거나 컨테이너가 삭제되더라도 이미지는 변하지 않고 그대로 남아있다.
- 컨테이너를 실행하기 위한 모든 정보를 가지고 있기 때문에 새로운 서버가 추가될 때 미리 만들어 놓은 이미지를 다운로드하고 컨테이너를 생성하면 기존의 컨테이너와 같은 환경을 구축할 수 있다.
- 이미지는 Docker hub에 등록하거나 Docker Registry 저장소를 직접 만들어 관리할 수 있다.



### 이미지 레이어

![](https://subicura.com/assets/article_images/2017-01-19-docker-guide-for-beginners-1/image-layer.png)

- 도커의 이미지는 컨테이너를 실행하기 위한 모든 정보를 가지고 있기 때문에 용량이 수백메가에 이른다.
- 처음 다운받을 땐 크게 부담이 안되지만 기존 이미지에 파일 하나 추가했을 때 다시 수백메가를 다운 받는다면 매우 비효율적일 수 밖에 없다.
- 도커는 이런 문제를 해결하기 위해 **레이어**라는 개념을 사용하고 유니온 파일 시스템을 이용하여 여러개의 레이어를 하나의 파일 시스템으로 사용할 수 있게 해준다.
- 레이어를 나누어 컨테이너를 구성해서 변경되는 레이어만 관리한다.



### 이미지 경로

![](https://subicura.com/assets/article_images/2017-01-19-docker-guide-for-beginners-1/image-url.png)

- 이미지는 url방식으로 관리하여 태그를 붙일 수 있다.
- ubuntu 14.04 이미지는 `docker.io/library/ubuntu:14.04` 또는 `docker.io/library/ubuntu:trusty` 이고 `docker.io/library` 는 생략 가능하여 `ubuntu:14.04` 로 사용할 수 있다.
- 이런 방식은 이해하기 쉽고 편리하게 사용할 수 있으며 태그 기능을 잘 이용하면 **테스트나 롤백**도 쉽게 할 수 있다.



### Dockerfile

```dockerfile
# vertx/vertx3 debian version
From subicura/vertx3:3.3.1
MAINTAINER chungsub.kim@purpleworks.co.kr

ADD build/distributions/app-3.3.1.tar /
ADD config.template.json /app-3.3.1/bin/config.json
ADD docker/script/start.sh /usr/local/bin
RUN ln -s /usr/local/bin/start.sh /start.sh

EXPOSE 8080
EXPOSE 7000

CMD ["start.sh"]
```

- 도커는 이미지를 만들기 위해 `Dockerfile` 이라는 파일에 자체 DSL(Domain-specific language) 언어를 이용하여 이미지 생성과정을 적는다.

- 서버에 어떤 프로그램을 설치하려고 의존성 패키지를 설치하고 설정파일을 만들었던 경험이 있다면 더이상 그 과정을 블로깅하거나 메모장에 적지말고 `Dockerfile`로 관리하면 된다.
- 이 파일은 소스와 함께 버전 관리되고 원한다면 누구나 이미지 생성과정을 보고 수정할 수 있다.





### 컨테이너 실행하기

 도커 실행 명령어

```
docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
```

> `run` 명령어를 사용하면 이미지가 저장되어있는지 확인하고 다운로드( `pull` )를 한 후 컨테이너를 생성( `create` )하고 시작( `start` ) 합니다.	

 자주 사용하는 옵션

| 옵션  | 설명                                                   |
| :---- | :----------------------------------------------------- |
| -d    | detached mode 흔히 말하는 백그라운드 모드              |
| -p    | 호스트와 컨테이너의 포트를 연결(포워딩)                |
| -v    | 호스트와 컨테이너의 디렉터리를 연결(마운트)            |
| -e    | 컨테이너 내에서 사용할 환경변수 설정                   |
| -name | 컨테이너 이름 설정                                     |
| -rm   | 프로세스 종료시 컨테이너 자동 제거                     |
| -it   | -i와 -t를 동시에 사용한 것으로 터미널 입력을 위한 옵션 |
| -link | 컨테이너 연결 [컨테이너명:별칭]                        |



### 도커 기본 명령어

- 컨테이너 목록 확인하기 `docker ps [OPTIONS]` 
  - `ps` 명령어는 실행중인 컨테이너 목록을 보여준다. detached mode로 실행중인 컨테이너들이 보인다.
  - `-a` 옵션 : 종료된 컨테이너가 (Exited (0))으로 추가로 보인다. 컨테이너는 종료되어도 삭제되지 않고 남이있다.
- 컨테이너 중지하기 `docker stop [OPTIONS] CONTAINER [CONTAINER...]`
  - 중지하려면 ID 또는 이름을 입력하면 된다. ex) `docker stop ${CONTAINER_ID}`
- 컨테이너 제거하기 `docker rm [OPTIONS] CONTAINER [CONTINAER...]`
  - ex) `docker rm ${CONTAINER_ID}`
  - 중지된 컨테이너 삭제 `docker rm -v $(docker ps -a -q -f status=exited)`
- 이미지 목록 확인하기 `docker images [OPTIONS] [REPOSITORY[:TAG]]`
- 이미지 다운로드하기 `docker pull [OPTIONS] NAME[:TAG|DIGEST]`
  - 최신 버전으로 업데이트할때 `pull` 명령어를 통해 새로 다운받는다.
- 이미지 삭제하기 `docker rmi [OPTIONS] IMAGE [IMAGE...]`
  - 이미지 ID를 입력하면 삭제가 된다.
  - 단, 컨테이너가 실행중인 이미지는 삭제되지 않는다.

- 컨테이너 로그보기 `docker logs [OPTIONS] CONTAINER`
  - `--tail` : `docker logs --tail 10 ${CONTAINER_ID}` 마지막 10줄의 로그만 출력
  - `-f` : `docker logs -f ${CONTAINER_ID}` 실시간으로 로그 출력  

- 컨테이너 명령어 실행 `docker exec [OPTIONS] CONTAINER COMMAND [ARG...]`
  - `run` 명령어와 유사하지만 `run`은 새로 컨테이너를 만들어서 실행하고 `exec`는 실행중인 컨테이너에 명령어를 내리는 정도.



### Docker Compose

 도커는 복잡한 설정을 쉽게 관리하기 위해 **YAML** 방식의 설정파일을 이용한 **Docker Compose** 툴을 제공

- `docker-compose.yml` 파일을 만들어 설정을 입력한다.

ex) wordpress

```yaml
version: '2'

services:
	db:
		image: mysql:5.7
		volumes:
			- db_data:/var/lib/mysql
		restart: always
		environment:
			MYSQL_ROOT_PASSWORD: wordpress
			MYSQL_DATABASE: wordpress
			MYSQL_USER: wordpress
			MYSQL_PASSWORD: wordpress
			
	wordpress:
		depens_on:
			-db
		image: wordpress:latest
		volumes:
			-wp_data:/var/www/html
		ports:
			- "8000:80"
		restart: always
		environment:
			WORDPRESS_DB_HOST: db:3306
			WORDPRESS_DB_PASSWORD: wordpress
volumes:
	db_data:
	wp_data:
```

