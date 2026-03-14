# 🔑 열려라 참깨, Open Sesame

**누구나 질문하고, 솔직하게 답하는 오픈마인드 커뮤니티 서비스**

---

## 📖 프로젝트 소개

'열려라 참깨'는 사용자가 피드를 생성하고, 다른 사용자들로부터 질문을 받으며 소통할 수 있는 플랫폼입니다. 
익명 혹은 기명으로 마음을 열고 대화하는 공간을 지향합니다.

### ✨ 주요 기능

- 🙋 **피드 생성**: 이름을 입력하여 나만의 질문 피드 생성
- 💬 **질문하기**: 다른 사용자에게 익명으로 질문 작성
- ✍️ **답변 관리**: 받은 질문에 답변 작성/수정/삭제
- 👍 **반응하기**: 답변에 좋아요 반응
- 🔗 **공유하기**: 카카오톡, 페이스북, 링크 복사로 피드 공유
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화

---

## 🛠 기술 스택

### Frontend

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/react_router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">

- **Library**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Routing**: React Router DOM 7.13.1
- **Styling**: CSS Modules, CSS Variables
- **HTTP Client**: Axios 1.13.6

### Development Tools

<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black"> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> 

- **Code Quality**: ESLint, Prettier
- **Version Control**: Git, GitHub
- **Design System**: Figma

### Collaboration

<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/zep-6B4EFF?style=for-the-badge">  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> 

- **Communication**: ZEP, Discord
- **Documentation**: Notion
- **Project Management**: GitHub Projects

---

## 📁 프로젝트 구조

```
Open-Sesame/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── home/
│   │   ├── list/
│   │   ├── post/
│   │   └── answer/
│   ├── pages/
│   │   ├── HomePage/
│   │   ├── ListPage/
│   │   ├── PostPage/
│   │   └── AnswerPage/
│   ├── hooks/
│   ├── api/
│   ├── styles/
│   │   ├── color.js
│   │   └── typography.js
│   ├── utils/
│   ├── assets/
│   └── global.css
├── vite.config.js
└── package.json
```

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
<a href="https://github.com/Choiyuhyeon">
<img src="https://github.com/Choiyuhyeon.png" width="100px" style="border-radius:50%"/>
</a>
<br/>
<b>최유현</b>
<br/>
<sub>팀 리더<br/>답변 페이지 구현</sub>
</td>

<td align="center" width="150px">
<a href="https://github.com/isuzzi">
<img src="https://github.com/isuzzi.png" width="100px" style="border-radius:50%"/>
</a>
<br/>
<b>이수진</b>
<br/>
<sub>디자인 총괄<br/>답변 목록 페이지</sub>
</td>

<td align="center" width="150px">
<a href="https://github.com/douk9909">
<img src="https://github.com/douk9909.png" width="100px" style="border-radius:50%"/>
</a>
<br/>
<b>김도욱</b>
<br/>
<sub>프로젝트 세팅<br/>답변 목록 페이지</sub>
</td>

</tr>

<tr>

<td align="center" width="150px">
<a href="https://github.com/imyoonsoo">
<img src="https://github.com/imyoonsoo.png" width="100px" style="border-radius:50%"/>
</a>
<br/>
<b>서윤수</b>
<br/>
<sub>답변 페이지 구현</sub>
</td>

<td align="center" width="150px">
<a href="https://github.com/chahyunlee">
<img src="https://github.com/chahyunlee.png" width="100px" style="border-radius:50%"/>
</a>
<br/>
<b>이차현</b>
<br/>
<sub>프로젝트 구조 설정<br/>공통 컴포넌트</sub>
</td>

<td align="center" width="150px">
<a href="https://github.com/moonky-1">
<img src="https://github.com/moonky-1.png" width="100px" style="border-radius:50%"/>
</a>
<br/>
<b>최문경</b>
<br/>
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
