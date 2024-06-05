export const ICON_CLASS = 'w-[20px] h-[20px] text-gray-600';

export enum EDITOR_QUESTION_TYPE {
  'short' = 0,
  'long',
  'radio',
  'checkbox',
  'dropdown',
}

export const EDITOR_DROPDOWN_LIST = [
  { content: '단답형', type: EDITOR_QUESTION_TYPE.short },
  { content: '장문형', type: EDITOR_QUESTION_TYPE.long },
  { content: '객관식 질문', type: EDITOR_QUESTION_TYPE.radio },
  { content: '체크박스', type: EDITOR_QUESTION_TYPE.checkbox },
  { content: '드롭박스', type: EDITOR_QUESTION_TYPE.dropdown },
];
