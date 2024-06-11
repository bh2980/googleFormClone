import { RiDeleteBin6Line, RiDraggable, RiFileCopyLine } from 'react-icons/ri';
import { EDITOR_DROPDOWN_LIST, EDITOR_QUESTION_TYPE, ICON_CLASS } from '../../constants';

import { removeQuestion, editQuestion, copyQuestion } from '../../store/reducer/questionSlice';
import AnswerManager from './AnswerItemManager';
import { addAnswer, removeAnswer } from '../../store/reducer/answerSlice';
import { v4 } from 'uuid';
import useChangeEditBlockID from '../../hook/useChangeEditBlockID';
import useBlockAutoFocus from '../../hook/useBlockAutoFocus';
import { Block, Divider, Dropdown, IconButton, Input, Switch, classMerge } from '@google-form-clone/shared-ui';
import { isTouchScreen, useRedux } from '@google-form-clone/hooks';
import { store } from '../../store/store';

interface QuestionBlockProps extends React.ComponentPropsWithRef<'div'> {
  questionID: string;
  handleDrag?: (e: React.MouseEvent | React.TouchEvent) => void;
}

const QuestionBlock = ({ questionID, handleDrag, ...props }: QuestionBlockProps) => {
  const { useDispatch, useSelector } = useRedux<typeof store>();

  const dispatch = useDispatch();
  const { changeEditingBlockID, isEditing } = useChangeEditBlockID(questionID);
  const { containerRef, questionInputRef } = useBlockAutoFocus(questionID);

  const questionInfo = useSelector((store) => store.question[questionID]);
  const answerMap = useSelector((store) => store.answer);

  const { questionContent, required, answerIDList, type } = questionInfo;

  const removeQuestionBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeQuestion(questionInfo));
  };

  const copyQuestionBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    const NEW_QUESTION_ID = v4();

    dispatch(
      copyQuestion({
        ...questionInfo,
        questionID: NEW_QUESTION_ID,
        answerIDList: [],
        parentQuestionID: questionID,
      })
    );

    answerIDList.map((aID) => {
      dispatch(
        addAnswer({
          ...answerMap[aID],
          answerID: v4(),
          questionID: NEW_QUESTION_ID,
        })
      );
    });
  };

  const changeQuestionType = (idx: number) => {
    dispatch(editQuestion({ ...questionInfo, type: EDITOR_DROPDOWN_LIST[idx].type }));

    if (EDITOR_DROPDOWN_LIST[idx].type === EDITOR_QUESTION_TYPE.long || EDITOR_DROPDOWN_LIST[idx].type === EDITOR_QUESTION_TYPE.short) {
      answerIDList.map((aID) => {
        dispatch(removeAnswer(answerMap[aID]));
      });

      dispatch(addAnswer({ answerID: v4(), content: '', questionID }));
    }
  };

  const changeQuestionContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editQuestion({ ...questionInfo, questionContent: e.target.value }));
  };

  const changeRequired = () => {
    dispatch(editQuestion({ ...questionInfo, required: !required }));
  };

  return (
    <Block className="w-full group" isEditing={isEditing} onClick={changeEditingBlockID} innerRef={containerRef} {...props}>
      <div className="z-50 flex justify-center w-full py-2 cursor-move group/dragHandle" onMouseDown={handleDrag} onTouchStart={handleDrag}>
        <RiDraggable className={classMerge(['rotate-90', !isTouchScreen && 'invisible group-hover/dragHandle:visible'])} />
      </div>
      <div className="flex flex-col gap-4 pb-8 mt-2">
        <div className="flex items-center justify-between gap-4 group mx-[32px] mobile:flex-col mobile:items-start">
          {isEditing ? (
            <>
              <Input
                placeholder="질문"
                className="w-full px-3 bg-gray-100 hover:bg-gray-200"
                onChange={changeQuestionContent}
                value={questionContent}
                innerRef={questionInputRef}
              />
              <Dropdown className="flex mobile:w-full" itemList={EDITOR_DROPDOWN_LIST} onChange={changeQuestionType} initialIdx={type} />
            </>
          ) : (
            <div className="flex items-center cursor-text">
              {questionContent.length === 0 ? '질문' : questionContent}
              {required && <span className="p-1 font-bold text-red-600 class">*</span>}
            </div>
          )}
        </div>
        <AnswerManager questionID={questionID} />
        {isEditing && (
          <div className="flex-col mx-[32px] flex gap-4">
            <Divider />
            <div className="flex items-center justify-end gap-2 pt-4 h-[32px]">
              <IconButton onClick={copyQuestionBlock}>
                <RiFileCopyLine className={ICON_CLASS} />
              </IconButton>
              <IconButton onClick={removeQuestionBlock}>
                <RiDeleteBin6Line className={ICON_CLASS} />
              </IconButton>
              <Divider direction="vertical" className="mx-2" />
              <Switch description="필수" descriptionPos="before" checked={required} onChange={changeRequired} />
            </div>
          </div>
        )}
      </div>
    </Block>
  );
};

export default QuestionBlock;
