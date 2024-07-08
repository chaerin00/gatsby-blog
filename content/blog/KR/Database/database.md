---
title: Database 내용 복습
date: 2023-05-01 11:05:43
category: Database
thumbnail: { thumbnailSrc }
draft: false
---

**데이터베이스 제약조건(Constraint)**
제약조건이란 데이터의 무결성을 지키기위해 입력받은 데이터에 대한 제한을 두는 것을 의미한다.

### 제약조건의 종류

- NOT NULL : NULL값 입력 금지
  ```sql
  CREATE TABLE PRODUCT(
      id INT NOT NULL
  );
  ```
- UNIQUE : 중복값 입력 금지 (NULL값은 중복입력 가능)
  ```sql
  CREATE TABLE PRODUCT(
      id INT UNIQUE
  );
  ```
- PRIMARY KEY : 기본키를 지정하는 constraint, NOT NULL + UNIQUE 특성을 모두 지님
  ```sql
  CREATE TABLE PRODUCT(
      id INT PRIMARY KEY
  );
  ```
- FOREIGN KEY : 한 테이블을 다른 테이블과 연결하여 외래키를 지정하는 제약조건, 다른 테이블의 컬럼을 조회해서 무결성 검사, 해당 테이블은 다른 테이블에 의존됨.

  ```sql
  CREATE TABLE PRODUCT(
      id INT PRIMARY KEY
      user_id INT
      FOREIGN KEY user_id
      PREFERENCES USER(id) ON UPDATE CASCADE
  );
  ```

  테이블 간의 의존성 때문에 테이블의 삭제, 수정이 일어났을 때 수행할 동작을 지정해주어야 한다.

  1.  ON DELETE: 참조되는 테이블의 값이 삭제될 경우의 동작을 ON DELETE 구문으로 설정
  2.  ON UPDATE 참조되는 테이블의 값이 수정될 경우의 동작을 ON UPDATE 구문으로 설정

  설정할 수 있는 동작은 아래와 같다.

  1.  CASCADE : 참조되는 테이블에서 데이터를 삭제하거나 수정하면 참조하는 테이블에서도 삭제와 수정이 같이 이루어짐
  2.  SET NULL : 참조되는 테이블에서 데이터를 삭제하거나 수정하면 참조하는 테이블의 데이터는 NULL로 변경됨
  3.  NO ACTION : 참조되는 테이블에서 데이터를 삭제하거나 수정하면 참조하는 테이블의 데이터는 변경되지 않음
  4.  SET DEFAULT : 참조되는 테이블에서 데이터를 삭제하거나 수정하면 참조하는 테이블의 데이터는 필드의 기본값으로 설정
  5.  RESTRICT : 참조하는 테이블에 데이터가 남아 있으면 참조되는 테이블의 데이터를 삭제하거나 수정할 수 없음

- DEFAULT : 해당 필드의 디폴트값을 설정
  ```sql
  CREATE TABLE USER(
      name VARCHAR(30) DEFAULT 'Anonymous'
  );
  ```

## 관계형 데이터베이스의 정규화

### 제 3 정규화 (3NF)

> 키에 종속되지 않는 필드를 제거한다. (이행적 종속을 없애도록 테이블을 분해하는 것)

레코드 내에서 해당 레코드 키의 일부분이 아닌 값은 테이블에 속하지 않는다. 일반적으로는 필드 그룹의 내용이 테이블의 단일 레코드에 적용될 수 있는 경우 항상 해당 필드를 별도의 테이블에 배치하는 것이 좋다.

**Candidates**

| id  | name | age | address  | university |
| :-: | :--: | :-: | :------: | :--------: |
|  1  |  A   | 23  |  Seoul   |    SNU     |
|  2  |  B   | 25  |  Pusan   |    SNU     |
|  3  |  C   | 24  | New York |    NYU     |

예를 들어 Employee Recruitment 테이블에 입사 지원자의 대학 이름과 주소가 포함되어 있을 수 있다. 하지만 그룹에 메일을 보내려면 전체 대학 목록이 필요하다. 대학 정보가 Candidates 테이블에 저장되어 있는 경우 현재 입사 지원자를 포함하지 않고 대학 목록만 생성할 수 있는 방법은 없다. 이 경우에는 별도의 Universities 테이블을 만든 후 대학 코드 키를 사용하여 Candidates 테이블과 연결한다.

**Candidates**

| id  | name | age | address  | university_id |
| :-: | :--: | :-: | :------: | :-----------: |
|  1  |  A   | 23  |  Seoul   |       1       |
|  2  |  B   | 25  |  Pusan   |       1       |
|  3  |  C   | 24  | New York |       2       |

**Universities**

| id  | name | Country |
| :-: | :--: | :-----: |
|  1  | SNU  |  Korea  |
|  2  | NYU  |   USA   |

예외: 이론적으로는 세 번째 정규 형식을 따르는 것이 좋지만, 실제로 항상 해당 형식을 따를 수 있는 것은 아니다. 예를 들어 Customers 테이블에서 발생 가능한 모든 필드 간 종속성을 제거하려는 경우에는 도시, 우편 번호, 영업 사원, 고객 등급 및 여러 레코드에서 중복될 수 있는 기타 모든 요소에 대해 별도의 테이블을 만들어야 한다. 물론 이론적으로는 정규화를 수행하는 것이 좋습니다. 그러나 대부분의 작은 테이블에서는 정규화를 수행하면 성능이 저하되거나 열린 파일 및 메모리 용량이 초과될 수 있다.
