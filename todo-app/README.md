# Todo App
FxJS, FxDOM, FxSQL로 만들어보는 Todo App
- [Getting Started](#getting-started)
  - [Run](#run)
  - [URL](#url)
  - [.env](#env)
- [TIL](#til)
  - [1) 데이터베이스 네이밍 컨벤션](#1-데이터베이스-네이밍-컨벤션)
  - [2) 변수명 컨벤션](#2-변수명-컨벤션)
  - [3) 삭제된 항목 다루기](#3-삭제된-항목-다루기)
  - [4) 에러 처리](#4-에러-처리)

<br>

## Getting Started
### Run
```bash
npm i
npm start
```

### URL
- client: http://localhost:1234
- server: http://localhost:3000

### .env
```
PORT=3000

DB_USER=""
DB_DATABASE=""
DB_TABLE=""
DB_PASSWORD=""
```

<br>

## TIL
### 1) 데이터베이스 네이밍 컨벤션
- 테이블명은 복수형으로 (테이블도 array의 개념이므로)
  - todo 👉todos
- 컬럼명은 snake_case로 작성
  - todo_id
  - is_hidden

### 2) 변수명 컨벤션
- boolean 값을 나타내는 변수는 is_XXX
- 데이터는 snake_case
- 함수명은 camelCase

### 3) 삭제된 항목 다루기
- 마플에서는 `deleted` 보다는 `is_hidden`이라는 이름을 주로 사용한다.
- 혹은 삭제된 날짜를 저장하는 `deleted_at` 컬럼을 만들어서, 삭제되지 않은 항목을 조회할 때는 `deleted_at is null`을 사용하기도 한다. 
- `${VALUES(todo)}`를 사용할 때는 `pick`을 사용하여 원하지 않는 값이 들어가지 않도록 하면 좋다.

### 4) 에러 처리
`QUERY`를 try catch로 감싸서 처리한다. 크게 두 가지 방법이 있는데
1. `next(e)`를 사용하여 오류를 넘겨서 공통으로 처리하거나
2. `res.status(500).json(e)`로 처리할 수 있다.

