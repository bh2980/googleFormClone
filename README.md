# Google Form 클론코딩
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white">



구글 폼 클론 코딩 토이 프로젝트입니다.

배포 링크 : https://mygoogleformclone.netlify.app

## 에디터 화면
![Editor](https://github.com/bh2980/googleFormClone/assets/74360958/726aab02-ce24-49d4-abff-9273d00a1c79)

## 미리보기 화면
![제출폼](https://github.com/bh2980/googleFormClone/assets/74360958/b056ec43-7f05-4997-a047-7e70b4f1ae19)

## 응답 내역 화면
![응답내역](https://github.com/bh2980/googleFormClone/assets/74360958/f1b1d62e-49ec-4c6c-ada5-4826e88e6544)


## 파일 구조

```
📦src
 ┣ 📂component
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂answer
 ┃ ┃ ┃ ┣ 📜LongAnswer.tsx
 ┃ ┃ ┃ ┗ 📜ShortAnswer.tsx
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
 ┃ ┃ ┣ 📜AnswerItemManager.tsx
 ┃ ┃ ┣ 📜ChooseAnswer.tsx
 ┃ ┃ ┣ 📜QuestionBlock.tsx
 ┃ ┃ ┗ 📜TitleBlock.tsx
 ┣ 📂hook
 ┃ ┣ 📜storeHook.ts
 ┃ ┣ 📜useChangeEditBlockID.ts
 ┃ ┗ 📜useDnDList.tsx
 ┣ 📂pages
 ┃ ┣ 📜Editor.tsx
 ┃ ┣ 📜Preview.tsx
 ┃ ┗ 📜Result.tsx
 ┣ 📂store
 ┃ ┣ 📂reducer
 ┃ ┃ ┣ 📜answerSlice.ts
 ┃ ┃ ┣ 📜docsSlice.ts
 ┃ ┃ ┣ 📜questionSlice.ts
 ┃ ┃ ┗ 📜responseSlice.ts
 ┃ ┗ 📜store.ts
 ┣ 📂utils
 ┃ ┗ 📜classMerge.ts
 ┣ 📜constants.ts
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```
