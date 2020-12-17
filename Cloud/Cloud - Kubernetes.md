# Kubernetes ( k8s )

![](https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/kubernetes-logo.png)

### 쿠버네티스란 ? 

- 컨테이너를 쉽고 빠르게 배포 / 확장하고 관리를 자동화해주는 오픈소스 플랫폼



## 쿠버네티스 기본 개념

 ![](https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/desired-state.png)

  쿠버네티스에서 가장 중요한 것은 **desired state - 원하는 상태**라는 개념이다. **원하는 상태**라 함은 관리자가 바라는 환경을 의미하고 좀 더 구체적으로는 얼마나 많은 웹서버가 떠있으면 좋은지, 몇 번 포트로 서비스하기를 원하는지 등을 말한다.

  쿠버네티스는 복잡하고 다양한 작업을 하지만 자세히 들여다보면 **current state - 현재 상태**를 모니터링하면서 관리자가 설정한 **원하는 상태**를 유지하려고 내부적으로 여러 작업을 하는 로직을 가지고 있다.

  이러한 개념 때문에 관리자가 서버를 배포할 때 직접적인 동작을 명령하지 않고 상태를 선언하는 방식을 사용한다. 예를 들어 "nginx 컨테이너를 실행해줘. 그리고 80 포트로 오픈해줘."는 현재 상태를 원하는 상태로 바꾸기 위한 **명령( imperative )** 이고 "80 포트를 오픈한 nginx 컨테이너 1개를 유지해줘"는 원하는 상태를 **선언 ( declarative )** 한 것이다.

```bash
docker run # 명령
kubectl create # 상태 생성
```

  쿠버네티스의 핵심은 **상태**이며 쿠버네티스를 사용하려면 어떤 상태가 있고 어떻게 상태를 선언하는지를 알아야 한다.





### Kubernetes Object

  쿠버네티스는 상태를 관리하기 위한 대상을 오브젝트로 정의한다.

> 쿠버네티스의 YAML 파일은 일반적으로  apiVersion, kind, metadata, spec 네가지 항목으로 구성된다
>
> - apiVersion : YAML 파일에서 정의한 오브젝트의 API 버전을 나타냅니다. 오브젝트의 종류 및 개발 성숙도에 따라  apiVersion의 설정값이 달라질 수 있다
> - kind : 리소스의 종류를 나타낸다. 
> - metadata : 라벨, 주석, 이름 등과 같은 리소스의 부가 정보들을 입력한다. 
> - spec : 리소스를 생성하기 위한 자세한 정보를 입력합니다. 



#### 1. Pod

<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/pod.png" style="zoom:50%;" />

  쿠버네티스에서 배포할 수 있는 가장 작은 단위로, 한 개 이상의 컨테이너와 스토리지, 네트워크 속성을 갖는다. **Pod**에 속한 컨테이너는 스토리지와 네트워크를 공유하고 서로 localhost로 접근할 수 있다. 컨테이너를 하나만 사용하는 경우도 반드시 **Pod**로 감싸서 관리한다.



```yaml
apiVersion: v1
kind: Pod
metadata:
	name: my-nginx-pod
spec:
	containers:
	- name: my-nginx-container
	  image: nginx:latest
	  ports:
	  	- containerPort: 80
	  	  protocol: TCP
```





#### 2. ReplicaSet

<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/replicaset.png" style="zoom:50%;" />

  **Pod**를 여러 개(한 개 이상) 복제하여 관리하는 오브젝트다. **Pod**를 생성하고 개수를 유지하려면 반드시 **ReplicaSet**을 사용해야 한다. **ReplicaSet**은 복제할 개수, 개수를 체크할 라벨 선택자, 생성할 **Pod**의 설정값(템플릿) 등을 가지고 있다. 직접적으로 **ReplicaSet**을 사용하기보다는 **Deployment** 등 다른 오브젝트에 의해서 사용되는 경우가 많다



```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
	name: replicaset-nginx
spec:
	replicas: 3
	selector:
		matchLabels:
			app: my-nginx-pods-label
	template:
		metadata:
			name: my-nginx-pod
			labels:
				app: my-nginx-pods-label
		spec:
			containers:
				- name: nginx
				  image: nginx:latest
				  ports:
				  	- containerPort: 80
```



#### 3. Service

  네트워크와 관련된 오브젝트다. **Pod**를 외부 네트워크와 연결해주고 여러 개의 **Pod**를 바라보는 내부 로드 밸런서를 생성할 때 사용한다. 내부 DNS에 서비스 이름을 도메인으로 등록하기 때문에 **서비스 디스커버리** 역할도 한다.



#### 4. Volume

  저장소와 관련된 오브젝트다. 호스트 디렉토리를 그대로 사용할 수 있고 EBS 같은 스토리지를 동적으로 생성하여 사용할 수 있다. 사실상 인기있는 대부분의 저장 방식을 지원한다.



#### 5. Deployment

  **ReplicaSet**과 **Pod**의 배포를 관리하는 오브젝트다. **Deployment**는 ReplicaSet의 상위 오브젝트이기 때문에 **Deployment**를 생성하면 해당 Deployment에 대응하는 ReplicaSet도 함께 생성된다. 따라서 Deployment를 사용하면  Pod와 ReplicaSet을 직접 생성할 필요가 없다.

```yaml
apiVersion: apps/vq
kind: Deployment
metadata:
	name: my-nginx-deployment
spec:
	replicas: 3
	selector:
		matchLabels:
			app: my-nginx
		template:
			metadata:
				name: my-nginx-pod
				labels:
					app: my-nginx
			spec:
				containers:
					- name: nginx
					  image: nginx:1.10
					  ports:
					  - containerPort: 80
```



### Object Spec - YAML

```yaml
apiVersion: v1
kind: Pod
metadata:
	name: example
spec:
	containers:
		- name: busybox
			image: busybox:1.25
```

  오브젝트의 명세는 YAML 파일로 정의하고 여기에 오브젝트의 종류와 원하는 상태를 입력한다. 이러한 명세는 생성, 조회, 삭제로 관리할 수 있기 때문에 REST API로 쉽게 노출할 수 있다. 접근 권한 설정도 같은 개념을 적용하여 누가 어떤 오브젝트에 어떤 요청을 할 수 있는지 정의할 수 있다.



### 쿠버네티스 배포방식

  쿠버네티스는 애플리케이션을 배포하기 위해 **원하는 상태(desired state )** 를 다양한 오브젝트에 라벨을 붙여 정의(yaml)하고 API 서버에 전달하는 방식을 사용한다.

   "컨테이너를 2개 배포하고 80 포트로 오픈해줘"

라는 간단한 작업을 위해 다음과 같은 구체적인 명령을 전달해야 한다.

> "컨테이너를 Pod로 감싸고 type=app, app=web이라는 라벨을 달아줘. type=app, app=web이라는 라벨이 달린 Pod가 2개 있는지 체크하고 없으면 Deployment Spec에 정의된 템플릿을 참고해서 Pod를 생성해줘. 그리고 해당 라벨을 가진 Pod를 바라보는 가상의 서비스 IP를 만들고 외부의 80 포트를 방금 만든 서비스 IP랑 연결해줘."





## 쿠버네티스 아키텍처

 

### 서버 - 클라이언트 구조

: 컨테이너를 관리하는 에이전트를 만들고 중앙에서 API를 이용하여 원격으로 관리하는 구조

<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/server-agent.png" style="zoom:50%;" />

### 마스터 - 노드 구조

<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/master-node.png" style="zoom:50%;" />

  쿠버네티스는 전체 클러스터를 관리하는 **마스터**와 컨테이너가 배포되는 **노드**로 구성되어 있다. 모든 명령은 **API Server**를 호출하고 노드는 마스터와 통신하면서 필요한 작업을 수행한다. 



#### Master

  마스터 서버는 다양한 모듈이 확장성을 고려하여 기능별로 쪼개져 있는 것이 특징이다. 관리자만 접속할 수 있도록 보안 설정을 해야 하고 마스터 서버가 죽으면 클러스터를 관리할 수 없기 때문에 보통 3대를 구성하여 안정성을 높인다. AWS EKS같은 경우 마스터를 AWS에서 자체관리하여 안정성을 높였고 개발 환경이나 소규모 환경에선 마스터와 노드를 분리하지 않고 같은 서버에 구성하기도 한다.



##### Master 구성요소

<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/kubernetes-master.png" style="zoom:33%;" />

###### 1. API 서버 kube-apiserver

  API 서버는 모든 요청을 처리하는 마스터의 핵심 모듈이다. kubectl의 오청뿐만 아니라 내부 모듈의 요청도 처리하며 권한을 체크하여 요처을 거부할 수 있다. 실제로 하는 일은 **원하는 상태**를 **key-value** 저장소에 저장하고 저장된 상태를 조회하는 일이다. Pod를 노드에 할당하고 상태를 체크하는 일은 다른 모듈로 분리되어 있다. 노드에서 실행 중인 컨테이너의 로그를 보여주고 명령을 보내는 등 디버거 역할도 수행한다.



###### 2. 분산 데이터 저장소 etcd

  **RAFT 알고리즘**을 이용한 **key-value** 저장소다. 여러 개로 분산하여 복제할 수 있기 때문에 안정성이 높고 속도도 빠르다. 단순히 값을 저장하고 읽는 기능뿐 아니라 **watch** 기능이 있어 어떤 상태가 변경되면 바로 체크하여 로직을 실행할 수 있다.

  클러스터의 모든 설정, 상태 데이터는 여기 저장되고 나머지 모듈은 **stateless**하게 동작하기 때문에 **etcd**만 잘 백업해두면 언제든지 클러스터를 복구할 수 있다. **etcd**는 오직 **API 서버**와 통신하고 다른 모듈은 **API 서버**를 거쳐 **etcd** 데이터에 접근한다.

> RAFT 알고리즘 : 뗏목처럼 운용중인 여러 서버들 중 일부에 장애가 발생하더라도 제 기능을 유지하도록 하는 **합의 알고리즘 (합의 프로토콜)** 이다. Raft와 같은 합의 알고리즘이 적용된 시스템은 특정 서버에 장애가 발생하더라도 전체 서비스를 중단하지 않고 서버를 복구할 수 있다.



**스케쥴러, 컨트롤러** : API 서버는 요청을 받으면 etcd 저장소와 통신할 뿐 실제로 상태를 바꾸는 건 스케쥴러와 컨트롤러다. 현재 상태를 모니터링하다가 원하는 상태와 다르면 각자 맡은 작업을 수행하고 상태를 갱신한다.



###### 3. 스케줄러 kube-scheduler

  할당되지 않은 Pod를 여러가지 조건(필요한 자원, 라벨)에 따라 적절한 노드 서버에 할당해주는 모듈이다.



###### 4. 큐브 컨트롤러 kube-controller-manager

​    쿠버네티스에 있는 거의 모든 오브젝트의 상태를 관리한다. 오브젝트별로 철저하게 분업화되어 Deployment는 ReplicaSet을 생성하고 ReplicaSet은 Pod를 생성하고 Pod는 스케줄러가 관리하는 식이다.



###### 5. 클라우드 컨트롤러 cloud-controller-manager

  AWS, GCE, Azure 등 클라우드에 특화된 모듈이다. 노드를 추가 / 삭제하고 로드 밸런서를 연결하거나 볼륨을 붙일 수 있다. 각 클라우드 업체에서 인터페이스에 맞게 구현하면 되기 때문에 확장성이 좋고 많은 곳에서 자체 모듈을 만들어 제공하고 있다.



#### Node

  노드 서버는 마스터 서버와 통신하면서 필요한 Pod를 생성하고 네트워크와 볼륨을 설정한다. 실제 컨테이너들이 생성되는 곳으로 수백, 수천대로 확장할 수 있다. 각각의 서버에 라벨을 붙여 사용목적을 정의할 수 있다.



##### Node 구성요소

<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/kubernetes-node.png" style="zoom:33%;" />

###### 1. 큐블릿 kubelet

  노드에 할당된 **Pod**의 생명주기를 관리한다. Pod를 생성하고 Pod 안의 컨테이너에 이상이 없는지 확인하면서 주기적으로 마스터에 상태를 전달한다. API 서버의 요청을 받아 컨테이너의 로그를 전달하거나 특정 명령을 대신 수행한다.



###### 2. 프록시 [kube-proxy](https://github.com/souvenir718/Cloud-Study/blob/master/Cloud%20-%20kube-proxy.md)

  **Pod**로 연결되는 네트워크를 관리한다. TCP, UDP, SCTP 스트림을 포워딩하고 여러 개의 Pod를 라운드로빈 형태로 묶어 서비스를 제공할 수 있다. 초기에는 kube-proxy 자체가 프록시 서버로 동작하면서 실제 요청을 프록시 서버가 받고 각 Pod에 전달해 주었는데 시간이 지나면서 **iptables**를 설정하는 방식으로 변경되었다. iptables에 등록된 규칙이 많아지면서 느려지는 문제 때문에 최근 **IPVS**를 지원하기 시작했다.

> **iptables** : 리눅스 상에서 방화벽을 설정하는 도구
>
> **IPVS** : 리눅스 커널에 있는 L4 로드밸런싱 기술로 Netfilter에 포함되어 있다.



###### 3. 추상화

  쿠버네티스는 CRI(Container runtime interface)를 구현한 다양한 컨테이너 런타임을 지원한다. containerd(사실상 도커), rkt, CRI-O등이 있다.





## 하나의 **Pod**가 생성되는 과정

  관리자가 애플리케이션을 배포하기 위해 **ReplicaSet**을 생성하면 다음과 같은 과정을 거쳐 **Pod**를 생성한다.

<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/create-replicaset.png" style="zoom:35%;" />

  흐름을 보면 각 모듈은 서로 통신하지 않고 오직 **API Server**와 통신하는 것을 알 수 있다. **API Server**를 통해 **etcd**에 저장된 상태를 체크하고 현재 상태와 원하는 상태가 다르면 필요한 작업을 수행한다. 각 모듈이 하는 일을 보면 다음과 같다.



### 1. kubectl

- ReplicaSet 명세를 yaml 파일로 정의하고 kubectl 도구를 이용하여 API Server에 명령을 전달한다.
- API Server는 새로운 ReplicaSet Object를 etcd에 저장한다.



### 2. Kube Controller

- Kube Controller에 포함된 ReplicaSet Controller가 ReplicaSet을 감시하다가 ReplicaSet에 정의된 Label Selector 조건을 만족하는 Pod가 존재하는지 체크한다.
- 해당하는 Label의 Pod가 없으면 ReplicaSet의 Pod 템플릿을 보고 새로운 Pod를 생성한다.
- 생성은 API Server에 전달하고 API Server는 etcd에 저장한다.



### 3. Scheduler

- Scheduler는 할당되지 않은 Pod가 있는지 체크한다.
- 할당되지 않은 Pod가 있으면 조건에 맞는 Node를 찾아 Pod를 할당한다.



### 4. Kubelet

- Kubelet은 자신의 Node에 할당되었지만 아직 생성되지 않은 Pod가 있는지 체크한다.
- 생성되지 않은 Pod가 있으면 명세를 보고 Pod를 생성한다.
- Pod의 상태를 주기적으로 API Server에 전달한다.





## 인그레스(Ingress)

  서비스 오브젝트가 외부 요청을 받아들이기 위한 것이었다면 **인그레스**는 외부 요청을 어떻게 처리할 것인지 네트워크 7계층 레벨에서 정의하는 쿠버네티스 오브젝트다. 외부 요청에 대한 처리 규칙을 쿠버네티스 자체의 기능으로 편리하게 관리할 수 있다는 것이 **인그레스**의 핵심이다.

  예를 들면, 디플로이먼트가 3개 생성돼 있을 때, 서비스마다 세부적인 설정, 보안 연결 등을 일일이 설정해 주지 않고 인그레스에 설정하여 요청은 인그레스에서 정의한 규칙에 따라 처리된 뒤 적절한 디플로이먼트의 포드로 전달된다.

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlnXym%2FbtqBj6rZveA%2FUKNt7GykAnGuC5YQsC0jTK%2Fimg.png" style="zoom:67%;" />





###  인그레스 오브젝트가 담당할 수있는 기본적인 기능

- 외부 요청의 라우팅 : /apple, /apple/red 등과 같이 특정 경로로 들어온 요청을 어떠한 서비스로 전달할지 정의하는 라우팅 규칙을 설정할 수 있다
- 가상 호스트 기반의 요청 처리 : 같은 IP에 대해 다른 도메인 이름으로 요청이 도착했을 때, 어떻게 처리할 것인지 정의할 수 있다
- SSL / TLS 보안 연결 처리 : 여러 개의 서비스로 요청을 라우팅할 때, 보안 연결을 위한 인증서를 쉽게 적용할 수 있다.



> 인그레스는 외부로부터 들어오는 요청에 대한 로드밸런싱, TLS/SSL 인증서 처리, 도메인 기반 가상 호스팅 제공, 특정 HTTP 경로의 라우팅 등의 규칙들을 **정의** 해 둔 자원이며, 이런 규칙들을 실제로 동작해주는건 **인그레스 컨트롤러** 다. 즉, 실제로 외부 요청을 받아들이는 것은 인그레스 컨트롤러 서버이며, 이 서버가 인그레스 규칙을 로드해 사용한다. 대표적으로는 **Nginx 웹 서버 인그레스 컨트롤러** 가 있다.



```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
	name: minimal-ingress
	annotations:
		nginx.ingress.kubernetes.io/rewrite-target: /
spec:
	rules:
	- http:
		paths:
		- path: /testpath
		  pathType: Prefix
		  backend:
		  	service:
		  		name: test
		  		port:
		  			number: 80
```

