# Google Form 클론코딩
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/Redux Tool Kit-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">

개발 인원 : 1명

프로젝트 기간 : 2023.11.18 ~ 2023.11.29

설명 : 구글 폼 클론 코딩 토이 프로젝트입니다.

배포 링크 : https://mygoogleformclone.netlify.app

- 기능
  1. 질문 생성, 삭제, 복제
     - 질문 타입
        - 단답형
        - 장문형
        - 객관식
        - 체크박스
        - 드롭박스
     - 필수 여부
  3. 제출폼 미리보기
  4. 답변 확인하기
  5. 반응형 레이아웃 지원
     -  ~ 767px : 모바일
     - 767px ~ 991px : 태블릿
     - 992px ~ : 데스크탑
       

## 에디터 화면
![Editor](https://github.com/bh2980/googleFormClone/assets/74360958/726aab02-ce24-49d4-abff-9273d00a1c79)

|태블릿 에디터|모바일 에디터|
|-----|-----|
|![image](https://github.com/bh2980/googleFormClone/assets/74360958/d9bd891b-40d0-4440-9ce4-0eb7fa50663a)|![image](https://github.com/bh2980/googleFormClone/assets/74360958/56976879-a70b-4af8-8b4d-3b8648dda3ce)|

## 미리보기 화면
![제출폼](https://github.com/bh2980/googleFormClone/assets/74360958/b056ec43-7f05-4997-a047-7e70b4f1ae19)

## 응답 내역 화면
![응답내역](https://github.com/bh2980/googleFormClone/assets/74360958/f1b1d62e-49ec-4c6c-ada5-4826e88e6544)

### 파일 구조

```
📦src
 ┣ 📂component
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂Radio
 ┃ ┃ ┃ ┣ 📜Radio.tsx
 ┃ ┃ ┃ ┗ 📜RadioGroup.tsx
 ┃ ┃ ┣ 📜Block.tsx
 ┃ ┃ ┣ 📜Checkbox.tsx
 ┃ ┃ ┣ 📜Divider.tsx
 ┃ ┃ ┣ 📜Dropdown.tsx
 ┃ ┃ ┣ 📜IconButton.tsx
 ┃ ┃ ┣ 📜Input.tsx
 ┃ ┃ ┣ 📜Switch.tsx
 ┃ ┃ ┗ 📜TextArea.tsx
 ┃ ┣ 📂editor
 ┃ ┃ ┣ 📜AnswerItemManager.tsx
 ┃ ┃ ┣ 📜ChooseAnswer.tsx
 ┃ ┃ ┣ 📜QuestionBlock.tsx
 ┃ ┃ ┗ 📜TitleBlock.tsx
 ┃ ┗ 📂preview
 ┃ ┃ ┣ 📂answer
 ┃ ┃ ┃ ┣ 📜LongAnswer.tsx
 ┃ ┃ ┃ ┗ 📜ShortAnswer.tsx
 ┃ ┃ ┣ 📜AnswerItemManager.tsx
 ┃ ┃ ┣ 📜ChooseAnswer.tsx
 ┃ ┃ ┣ 📜QuestionBlock.tsx
 ┃ ┃ ┗ 📜TitleBlock.tsx
 ┣ 📂hook
 ┃ ┣ 📜storeHook.ts
 ┃ ┣ 📜useChangeEditBlockID.ts
 ┃ ┣ 📜useDnDList.tsx
 ┃ ┗ 📜useFluidTextArea.ts
 ┣ 📂pages
 ┃ ┣ 📜Editor.tsx
 ┃ ┣ 📜Preview.tsx
 ┃ ┗ 📜Result.tsx
 ┣ 📂store
 ┃ ┣ 📂reducer
 ┃ ┃ ┣ 📜answerSlice.ts
 ┃ ┃ ┣ 📜docsSlice.ts
 ┃ ┃ ┣ 📜questionSlice.ts
 ┃ ┃ ┣ 📜responseSlice.ts
 ┃ ┃ ┗ 📜sideBarPosition.ts
 ┃ ┗ 📜store.ts
 ┣ 📂utils
 ┃ ┗ 📜classMerge.ts
 ┣ 📜constants.ts
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```
