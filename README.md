# 🔑 열려라 참깨 (Open Sesame)

<div align="center">

**누구나 질문하고, 솔직하게 답하는 오픈마인드 커뮤니티 서비스**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.13.1-CA4245?logo=react-router)](https://reactrouter.com/)

[🔗 Repository](https://github.com/Choiyuhyeon/Open-Sesame) • [🎨 Figma Design](https://www.figma.com/design/abJyeeWMrJw2YN9wZFHst8) • [📚 API Docs](https://openmind-api.vercel.app/docs/)

</div>

---

## 📖 프로젝트 소개

'열려라 참깨'는 사용자가 피드를 생성하고, 다른 사용자들로부터 질문을 받으며 소통할 수 있는 플랫폼입니다. 익명 혹은 기명으로 마음을 열고 대화하는 공간을 지향합니다.

### ✨ 주요 기능

- 🙋 **피드 생성**: 이름을 입력하여 나만의 질문 피드 생성
- 💬 **질문하기**: 다른 사용자에게 익명으로 질문 작성
- ✍️ **답변 관리**: 받은 질문에 답변 작성/수정/삭제
- 👍 **반응하기**: 답변에 좋아요/싫어요 반응
- 🔗 **공유하기**: 카카오톡, 페이스북, 링크 복사로 피드 공유
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화

---

## 🛠 기술 스택

### Frontend

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.13.1-CA4245?logo=react-router&logoColor=white)

- **Library**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Routing**: React Router DOM 7.13.1
- **Styling**: CSS Modules, CSS Variables
- **HTTP Client**: Axios 1.13.6

### Development Tools

![ESLint](https://img.shields.io/badge/ESLint-9.39.1-4B32C3?logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-3.8.1-F7B93E?logo=prettier)

- **Code Quality**: ESLint, Prettier
- **Version Control**: Git, GitHub
- **Design System**: Figma

### Collaboration

- **Communication**: ZEP, Discord
- **Documentation**: Notion
- **Project Management**: GitHub Projects

---

## 📁 프로젝트 구조

```
Open-Sesame/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── common/         # 공통 컴포넌트 (Input, Modal, etc.)
│   │   ├── home/           # HomePage 전용 컴포넌트
│   │   ├── list/           # ListPage 전용 컴포넌트
│   │   ├── post/           # PostPage 전용 컴포넌트
│   │   └── answer/         # AnswerPage 전용 컴포넌트
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── HomePage/
│   │   ├── ListPage/
│   │   ├── PostPage/
│   │   └── AnswerPage/
│   ├── hooks/              # Custom Hooks
│   │   ├── useInfiniteScroll.js
│   │   ├── useLocalStorage.js
│   │   └── useShare.js
│   ├── api/                # API 
│   ├── styles/             # 글로벌 스타일 및 Design Tokens
│   │   ├── color.css
│   │   └── typography.css
│   ├── utils/              # 유틸리티 함수
│   ├── assets/             # 정적 파일 (이미지, 아이콘)
│   └── global.css          # 글로벌 스타일
├── vite.config.js
└── package.json
```

### 🎨 디자인 시스템

#### Color Tokens
```css
/* Primitive Colors */
--gray-900, --gray-800, --gray-600, --gray-500, ...
--brown-100, --brown-200, --brown-300, --brown-400, --brown-500

/* Semantic Colors */
--color-primary, --color-bg, --color-text-primary, ...
```

#### Typography Tokens
```css
/* Headings */
.typo-h1, .typo-h2, .typo-h3

/* Body */
.typo-body1-regular, .typo-body1-bold
.typo-body2-regular, .typo-body2-bold
.typo-body3-regular, .typo-body3-bold

/* Caption */
.typo-caption1-regular, .typo-caption1-medium, .typo-caption1-bold
```

---

## 🛣 라우팅 구조

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | **HomePage** | 이름 입력 및 피드 생성 |
| `/list` | **ListPage** | 질문 피드 목록 조회 (정렬, 페이지네이션) |
| `/post/:id` | **PostPage** | 특정 피드 질문 조회, 좋아요/싫어요, 공유 |
| `/post/:id/answer` | **AnswerPage** | 답변 작성/수정/삭제 (관리자 페이지) |

---

## 🚀 시작하기

### Prerequisites

- Node.js 18.x 이상
- npm 또는 yarn

### Installation

```bash
# 저장소 클론
git clone https://github.com/Choiyuhyeon/Open-Sesame.git
cd Open-Sesame

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### Available Scripts

```bash
npm run dev       # 개발 서버 실행 (http://localhost:5173)
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 결과 미리보기
npm run lint      # ESLint 검사
npm run lint:fix  # ESLint 자동 수정
npm run format    # Prettier 포맷팅
```

---

## 👥 팀원 및 역할

<table>
  <tr>
    <td align="center" width="150px">
      <img src="https://via.placeholder.com/100" width="100px" alt="최유현"/><br />
      <b>👑 최유현</b><br />
      <sub>Team Leader</sub><br />
      <sub>팀 리더 및 답변 페이지 구현</sub>
    </td>
    <td align="center" width="150px">
      <img src="https://via.placeholder.com/100" width="100px" alt="이수진"/><br />
      <b>🎨 이수진</b><br />
      <sub>Designer</sub><br />
      <sub>디자인 총괄 및 답변 목록 페이지 구현</sub>
    </td>
    <td align="center" width="150px">
      <img src="https://via.placeholder.com/100" width="100px" alt="김도욱"/><br />
      <b>⚙️ 김도욱</b><br />
      <sub>Developer</sub><br />
      <sub>프로젝트 세팅 및 답변 목록 페이지 구현</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="150px">
      <img src="https://via.placeholder.com/100" width="100px" alt="서윤수"/><br />
      <b>💻 서윤수</b><br />
      <sub>Developer</sub><br />
      <sub>답변 페이지 구현</sub>
    </td>
    <td align="center" width="150px">
      <img src="https://via.placeholder.com/100" width="100px" alt="이차현"/><br />
      <b>🏗️ 이차현</b><br />
      <sub>Developer</sub><br />
      <sub>프로젝트 구조 담당 및 공통 컴포넌트 구현</sub>
    </td>
    <td align="center" width="150px">
      <img src="https://via.placeholder.com/100" width="100px" alt="최문경"/><br />
      <b>🖥️ 최문경</b><br />
      <sub>Developer</sub><br />
      <sub>메인 페이지 구현</sub>
    </td>
  </tr>
</table>

---

## 📝 코딩 컨벤션

### Commit Convention

| Type | Description |
|------|-------------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 코드 리팩토링 |
| `style` | 코드 포맷팅, 세미콜론 누락 등 |
| `docs` | 문서 수정 |
| `test` | 테스트 코드 추가 |
| `chore` | 빌드 과정 또는 보조 도구 변경 |

---

## 📄 라이선스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---