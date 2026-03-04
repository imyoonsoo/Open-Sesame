# 🔑 열려라 참깨 (Open Sesame)

> **누구나 질문하고, 솔직하게 답하는 오픈마인드 커뮤니티 서비스**

'열려라 참깨'는 사용자가 피드를 생성하고, 다른 사용자들로부터 질문을 받으며 소통할 수 있는 플랫폼입니다. 익명 혹은 기명으로 마음을 열고 대화하는 공간을 지향합니다.

---

## 🔗 주요 링크

- **Repository**: [Open-Sesame GitHub](https://github.com/Choiyuhyeon/Open-Sesame)
- **Design**: [Figma Link](https://www.figma.com/design/abJyeeWMrJw2YN9wZFHst8/-AAA--%E1%84%8B%E1%85%A9%E1%84%91%E1%85%B3%E1%86%AB%E1%84%86%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3?node-id=0-1&p=f&t=FavAKzFoAI4freHp-0)
- **API Documentation**: [Swagger](https://openmind-api.vercel.app/docs/) / [Notion API 명세](https://www.notion.so/API-f431f6b5e2a84d1fbc483eb87742261d?pvs=21)

---

## 👥 팀원 및 역할 (R&R)

| 팀원       | 역할 | 담당 업무                           |
| :--------- | :--: | :---------------------------------- |
| **최유현** | 팀장 | 프로젝트 총괄 및 공통 컴포넌트 관리 |
| **김도욱** | 팀원 | 메인 페이지 구현, 피드 생성 로직    |
| **서윤수** | 팀원 | 로그인 및 회원가입 기능 구현        |
| **이차현** | 팀원 | 링크 페이지 구현                    |
| **최문경** | 팀원 | 즐겨찾기 페이지 구현                |
| **이수진** | 팀원 | 발표 자료(PPT) 제작 및 발표         |

---

## 🛠 기술 스택 및 협업 도구

### Tech Stack

- **Library**: `React`
- **Build Tool**: `Vite`
- **Styling**: `CSS`
- **Routing**: `React Router`
- **Linting**: `ESLint`, `Prettier`

### Co-work Tools

- **Communication**: `ZEP`, `Discord`
- **Documentation**: `Notion`
- **Version Control**: `GitHub`

---

## 🛣 라우팅 구조 (URL)

| 경로               | 페이지         | 주요 기능                                           |
| :----------------- | :------------- | :-------------------------------------------------- |
| `/`                | **HomePage**   | 이름 입력 및 피드 생성                              |
| `/list`            | **ListPage**   | 질문 피드 목록 조회 (정렬, 페이지네이션/무한스크롤) |
| `/post/:id`        | **PostPage**   | 특정 피드 질문 조회, 좋아요/싫어요, 공유            |
| `/post/:id/answer` | **AnswerPage** | 답변 작성/수정/삭제 (관리자 페이지)                 |

---

## 🔄 데이터 흐름 및 구조

### Data Flow

1. **ListPage**: 카드 클릭 시 해당 피드의 `:id`를 가지고 이동
2. **PostPage**: `useParams`로 `id` 추출 후 `useEffect`를 통해 API 호출
3. **State**: 받아온 데이터를 상태에 저장하여 UI 렌더링

### Commit Convention

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가
- `chore`: 빌드 과정 또는 보조 도구 변경

---

## 🚀 문제점 및 개선 사항 (멘토링 반영)

### 💡 문제점 & 아쉬운 점

- 상세 내용에 대한 기획 디테일 부족
- R&R 분배까지의 프로세스 기간이 다소 긴 점
- 중간 점검 횟수 조율 필요

### ✅ 개선 사항

- R&R 분배 시간 조정을 통한 빠른 개발 착수
- 상세 기획 단계에서 기능적 디테일 요소 추가 보완
