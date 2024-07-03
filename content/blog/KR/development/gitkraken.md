---
title: 'GitKraken 알차게 활용하기 🦑'
date: 2021-12-28 16:05:67
category: development
draft: false
---

![](https://velog.velcdn.com/images/chaerin00/post/ac2c9fdf-d6b8-4552-b6a3-9de13b490ec8/gitkraken.png)

처음 git을 사용할 때 작업 내용을 통째로 날려먹기도 하고 충돌을 해결하다가 중요한 코드들을 삭제해버리기도 했습니다.
그러다가 많은 사람들과 프로젝트를 하면서 git을 제대로 사용하기 위해 gitkraken을 사용하기 시작했고 벌써 1년째 애용하는 중입니다.

지금은 터미널과 gitkraken을 번갈아쓰는 중인데 Git GUI를 쓰다보면 git에 대한 전반적인 이해가 높아져서 나중에 터미널에서 작업할 때도 실수할 일이 적어지는 것 같습니다.

# 기본적인 사용법

## Open Repo

![](https://images.velog.io/images/chaerin00/post/02544dac-ebfe-45ba-81ce-2a24eaec36f3/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.46.24.png)
홈 화면에서는 레포지토리를 열거나 `git clone`이 가능합니다.
![](https://images.velog.io/images/chaerin00/post/89d6ea81-2f1c-4e22-8bbd-2c04596699cb/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.48.25.png)
`Open a Repository`를 이용해 레포를 열어주면
![](https://images.velog.io/images/chaerin00/post/b156efc4-e9d7-49ff-9273-436cefd57768/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.49.58.png)
다음과 같은 화면이 나옵니다. 이제 각 부분의 의미하는 것들을 살펴보겠습니다.

## Branch

브랜치는 `local`과 `remote`로 나뉩니다. 브랜치는 더블클릭을 하면 checkout이 가능합니다. 만일 `remote`에 있는 브랜치로 checkout하면 `local`의 브랜치 리스트에도 해당 브랜치가 추가됩니다.
![](https://images.velog.io/images/chaerin00/post/60f85c1c-4f59-4909-9ae4-836b3eaecd5a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.51.39.png)

## Git Graph

가운데 그래프는 지금 브랜치들이 어떻게 뻗어나오고 있고 합쳐지고 있는지를 보여줍니다.![](https://images.velog.io/images/chaerin00/post/7721cf68-8a2b-45d0-988f-81cbe324e690/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.00.28.png)
체크표시가 되어있는 곳은 내가 현재 checkout 되어있는 브랜치임을 뜻합니다. 각각의 브랜치 옆에는 아이콘들이 있는데 아이콘들의 의미는 다음과 같습니다.

- **local 아이콘**
  노트북 모양의 아이콘은 현재 로컬 브랜치의 위치를 알려줍니다.
  ![](https://images.velog.io/images/chaerin00/post/3e518bc6-5038-40b1-8f7f-7064ca8e5288/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.08.23.png)

- **remote 아이콘**
  local 아이콘을 제외한 나머지 아이콘들(github의 organization 로고 등)은 해당 브랜치의 remote의 위치를 알려줍니다.
  ![](https://images.velog.io/images/chaerin00/post/d0e4ae13-087c-4199-a436-c1157b03b083/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.02.51.png)![](https://images.velog.io/images/chaerin00/post/e1130efd-a086-4ec0-8bd9-a6930aa75ade/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.05.48.png)

이 아이콘들을 사용해서 현재 로컬 브랜치가 remote 브랜치와 차이가 있는지 알 수 있습니다.

## 변경사항 & commit

가장 오른쪽에는 commit에서 변경된 파일이나 현재 작성 중인 코드의 변경사항을 볼 수 있습니다.

![](https://images.velog.io/images/chaerin00/post/cce622bc-5ac2-4bfa-a09f-b21db6301e6e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.41.15.png)

`view change`을 누르면 다음과 같은 화면이 나옵니다. 파일을 선택하면 각각의 파일의 변경사항도 확인 가능합니다.
![](https://images.velog.io/images/chaerin00/post/a2727b29-c305-4281-beb4-a3066eb11e3d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.47.29.png)
여기서는 변경사항들을 stage / unstage하고 commit 메세지를 입력하여 commit할 수 있습니다. 여기서 stage는 `git add` 명령어로 수행하는 동작입니다. 각각의 파일을 stage할 수도 있고 ** stage all changes** 버튼을 사용하여 `git add .`를 할 수도 있습니다.

빨간색 휴지통 버튼은 모든 변경사항을 **discard** 시키는 동작을 합니다. 저는 주로 코드들의 변경사항을 확인하고 필요한 변경사항만 stage하여 commit한 후 필요없는 코드는 **discard**할 때 사용합니다.👍🏻
(하지만 잘못 누르면 필요한 코드까지 날라가기 때문에 주의해야 합니다.)

## Push & Pull & Stash & Pop

![](https://images.velog.io/images/chaerin00/post/4af482ae-643a-4e0b-8bcc-bafbfa3eab93/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.52.59.png)
상단의 버튼에서는 현재 브랜치에서 `push`, `pull`이 가능하고 지금 commit 되어있지 않은 변경사항들을 `stash`, `pop` 할 수 있습니다.
아까 위에서 설명한 remote, local 아이콘을 이용해 graph에서 현재 브랜치와 remote 브랜치의 상태를 확인하고 push 또는 pull을 해주면 됩니다.
![](https://images.velog.io/images/chaerin00/post/263afbdc-3887-4891-98a7-302dbde290ad/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.14.29.png)
위의 사진은 로컬이 remote보다 뒤쳐져 있는 상황이므로 `pull` 버튼을 누르거나 브랜치를 우클릭하여 `pull(fase-forward if possible)`을 클릭 해줍니다.

![](https://images.velog.io/images/chaerin00/post/91f84bd8-ec05-4a13-b66f-866c71878243/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.59.07.png)

그리고 가끔 다른 브랜치로 이동해서 작업해야할 때 위에 사진처럼 현재 브랜치의 변경사항 때문에 checkout이 안될 때가 있는데 이럴 때는 `stash`를 이용하면 됩니다.![](https://images.velog.io/images/chaerin00/post/f8630e9b-f35c-42f0-bb86-7db3ad31170b/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.00.22.png)
`stash` 버튼을 눌러주면 이렇게 박스가 생겨나는데 저기 변경사항들이 안전하게 담겨있게 됩니다. 그리고 다시 `pop` 버튼을 누르면 변경사항이 돌아옵니다. stash 해놓은 내용은 저 박스 아이콘을 우클릭하여 삭제도 할 수 있습니다.

# 추가적인 사용법

## Rebase

저는 pull request를 생성하기 전에 `rebase`하여 develop 브랜치와의 충돌을 미리 해결하고 pr을 생성하는 편입니다.

rebase는 현재 브랜치의 시작지점(base)을 변경시키는 명령어입니다. rebase를 진행하게 되면 브랜치의 commit들을 내가 선택한 시작지점에서 하나하나 적용시켜 줍니다.
![](https://images.velog.io/images/chaerin00/post/c3bf50e8-ae90-4afa-a7ef-34e3e821886c/rebase.png)

아래 사진처럼 develop에 업데이트가 일어나서 현재 브랜치가 remote develop의 최신 변경사항이 적용이 안되어있는 경우 충돌이 날 가능성이 있기 때문에 `rebase`를 이용하여 현재 브랜치를 remote develop에서 시작되게 만들어줍니다.

![](https://images.velog.io/images/chaerin00/post/e276ceb3-ca00-462d-93f9-3d5c16e64a86/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.35.57.png)

rebase-test 브랜치에 checkout 되어있는 상태에서 remote 아이콘이 붙어있는 develop을 우클릭 해준 뒤 `Rebase 현재 브랜치명 onto origin/develop`을 클릭해줍니다.
![](https://images.velog.io/images/chaerin00/post/cdeda57d-0e61-4e6a-899e-76cb3a1fdde4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.40.11.png)

만일 이 과정에서 충돌이 난다면 다음과 같은 화면이 나오게 됩니다.
![](https://images.velog.io/images/chaerin00/post/d2039377-96d2-41f7-bd97-8527fc95172f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.48.40.png)

충돌이 난 파일을 선택하고 원하는 변경사항을 선택한 후 오른쪽 상단의 save를 눌러 줍니다.
![](https://images.velog.io/images/chaerin00/post/a57007e1-d5e8-4528-9c2d-49765aa0d301/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.49.27.png)
rebase가 완료되고 난 후에는 rebase-test브랜치가 remote develop에서 시작되고 있는 것을 볼 수 있습니다.
![](https://images.velog.io/images/chaerin00/post/31b65447-5dff-477e-9d78-be56b59aa6c1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.53.34.png)

+) 만약 rebase-test가 remote에 push된 적이 있다면 rebase 후에 다시 push할 때 force-push를 해주어야 합니다.

## Cherry Pick

만약 다른 브랜치의 commit을 현재 브랜치에도 적용시키고 싶다면 `cherry pick`이라는 기능을 사용하면 됩니다.![](https://images.velog.io/images/chaerin00/post/a454b73f-9533-4cd7-9397-7bd5578e0f9e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.00.04.png)
예를 들어 나는 지금 `mine` 브랜치에 있는데 `cherry-pick-test`에 있는 저 commit을 `mine` 브랜치에도 적용하고 싶다면 *cherry pick test commit*이라는 commit을 우클릭하고 `Cherry pick commit`을 선택해줍니다.
![](https://images.velog.io/images/chaerin00/post/b64984fc-fb4a-4514-9f45-bde1578d4669/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.03.13.png)

그럼 다음과 같이 동일한 commit이 mine 브랜치에도 적용된 것을 볼 수 있습니다.
![](https://images.velog.io/images/chaerin00/post/4f504549-c36c-42c2-ab5c-89b51f0eae2d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-12-28%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.04.08.png)

<hr/>
제가 GitKraken을 1년 간 사용하면서 발견한 이용법을 정리해보았습니다.
혹시 수정사항이나 추가할 만한 내용이 있다면 언제든 댓글로 알려주시면 감사하겠습니다 😊
