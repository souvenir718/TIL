# Containerd



## Containerd : Kubernetes 표준 컨테이너 런타임

  컨테이너형 가상화 환경에서 컨테이너 런타임을 특정 벤더에 의존하지 않고 중립적인 입장에서 컨테이너 표준인 OCI (Open Container Initiative)에 기준으로 구현하는 것을 목적으로 한다. 

>   OCI ( Open Container Initiative )는 컨테이너의 런타임, 컨테이너 포맷의 표준을 만드는 것이 목적이며 리눅스 재단의 후원을 받아 만들어진 경량화 및 오픈 관리 구조다.

### Containerd는?

<img src="https://i1.wp.com/www.opennaru.com/wp-content/uploads/2019/07/docker_containerd.png?fit=947%2C711" style="zoom:50%;" />

  **Containerd는** 컨테이너를 실행하고 노드에서 이미지를 관리하는데 필요한 최소한의 기능 세트를 제공하는 OCI 호환 코어 컨테이너 런타임 중 하나다. **containerd**는 Docker 1.11 이후 Docker 코어 컨테이너 런타임이다. **RunC**기반이다.

> RunC : OCI (Open Container Initiative ) 사양에 따라 컨테이너를 생성하고 실행하기 위한 CLI 도구다.