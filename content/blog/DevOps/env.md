---
title: 'Github Actions .env 생성하기'
date: 2022-02-18 17:05:98
category: DevOps
thumbnail: { thumbnailSrc }
draft: false
---

.env가 .gitignore에 포함되어있다면 github actions에서 build하고 배포할 때 해당 내용이 추가되지 않습니다.

예를 들어 위의 코드에서 env파일을 포함하지 않고 build를 한다면 `process.env.REACT_APP_GOOGLE_CLIENTID` 가 없기 때문에 runtime에서 오류가 발생하게 됩니다.
오류를 없애기 위해서는 yml 파일에서 .env를 생성하는 step을 작성해주어야 합니다.

github에서 actions secrets을 활용하여 .env 환경변수를 설정하는 방법을 정리해보도록 하겠습니다.

## 1. github의 action secrets에 환경변수 등록

github secrets를 사용하면 access token이나 소셜 로그인의 client_id와 같이 민감한 정보들을 암호화할 수 있습니다.
등록은 다음과 같이 github repository의 **settings** → **secrets** → **actions** 에서 진행해주면 됩니다.

![](https://images.velog.io/images/chaerin00/post/4e7d4deb-a309-4afd-8b60-2856dffe826d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-18%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.05.01.png)![](https://images.velog.io/images/chaerin00/post/1d61077f-f0fb-4546-aefa-263747ef52f3/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-25%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2011.36.13.png)

❗️React app안에서 사용되는 환경변수는 이름 앞에 **REACT_APP**을 붙여주어야 합니다❗️

## 2. yml 파일에서 .env setting step추가

```yml
name: CI for pr dev
on:
  pull_request:
    branches:
      - dev
jobs:
  build:
    runs-on: ubuntu-latest
    steps:

      ...

      - name: Setting .env
        run: |
          echo "REACT_APP_GOOGLE_CLIENTID=${{ secrets.REACT_APP_GOOGLE_CLIENTID }}" >> .env
          echo "REACT_APP_API_DOMAIN=${{ secrets.REACT_APP_API_DOMAIN }}" >> .env
          echo "REACT_APP_KAKAO_REDIRECT=${{ secrets.REACT_APP_KAKAO_REDIRECT }}" >> .env
          echo "REACT_APP_KAKAO_CLIENTID=${{ secrets.REACT_APP_KAKAO_CLIENTID }}" >> .env
          echo "REACT_APP_NAVER_REDIRECT=${{ secrets.REACT_APP_NAVER_REDIRECT }}" >> .env
          echo "REACT_APP_NAVER_CLIENTID=${{ secrets.REACT_APP_NAVER_CLIENTID }}" >> .env
          echo "REACT_APP_NAVER_STATE_STRING=${{ secrets.REACT_APP_NAVER_STATE_STRING }}" >> .env
          cat .env

      ...

```

`echo "[Environment variable]=${{ secrets.[secret name]}}" >> .env` 명령어를 이용하여 필요한 환경변수들을 등록하여 줍니다.
생성된 .env 파일 확인을 위해 `cat .env`를 추가했습니다. (생략 가능)
github actions에서 실행결과를 보면 다음과 같이 등록한 secret이 암호화되어 나오는 것을 확인할 수 있습니다
![](https://images.velog.io/images/chaerin00/post/d836987e-871f-4097-a423-4a377893c3fb/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-02-18%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.16.50.png)
