import { RiDeleteBin6Line, RiDraggable, RiFileCopyLine } from "react-icons/ri";
import Block from "./common/Block";
import Input from "./common/Input";
import Divider from "./common/Divider";
import { EDITOR_DROPDOWN_LIST, ICON_CLASS } from "../constants";
import IconButton from "./common/IconButton";
import Switch from "./common/Switch";

import { removeQuestion, editQuestion, copyQuestion } from "../store/questionSlice";
import { useAppDispatch, useAppSelector } from "../hook/storeHook";
import AnswerManager from "./AnswerItemManager";
import { addAnswer, removeAnswer } from "../store/answerSlice";
import { v4 } from "uuid";
import useDnDList from "../hook/useDnDList";
import { editQuestionBlockOrder } from "../store/docsSlice";
import Dropdown from "./common/Dropdown";
import useChangeEditBlockID from "../hook/useChangeEditBlockID";
import { useRef } from "react";

interface QuestionBlockProps extends React.ComponentPropsWithRef<"div"> {
  questionID: string;
  isForm?: boolean;
  isEditing?: boolean;
}
/**
 * QuestionBlock은 BlockID를 받아서 QuestionManager에게 전달
 */
const QuestionBlock = ({ questionID, isEditing, ...props }: QuestionBlockProps) => {
  const dispatch = useAppDispatch();
  const GAP = 16;

  const questionInfo = useAppSelector((store) => store.question[questionID]);
  const answerMap = useAppSelector((store) => store.answer);
  const questionIDList = useAppSelector((store) => store.docs.questionIDList);

  const inputRef = useRef<HTMLInputElement>(null);

  const { questionContent, required, answerIDList, type } = questionInfo;

  const changeDnDOrder = (fromIdx: number, toIdx: number) => {
    console.log(fromIdx, toIdx);
    dispatch(editQuestionBlockOrder({ fromIdx, toIdx }));
  };

  const { handleDrag, divRef } = useDnDList({
    itemIDList: questionIDList,
    itemID: questionID,
    gap: GAP,
    dataAttrName: "data-question-id",
    orderItem: changeDnDOrder,
  });

  const removeQuestionBlock = () => {
    dispatch(removeQuestion(questionInfo));
  };

  const copyQuestionBlock = () => {
    const NEW_QUESTION_ID = v4();

    dispatch(
      copyQuestion({ ...questionInfo, questionID: NEW_QUESTION_ID, answerIDList: [], parentQuestionID: questionID })
    );

    answerIDList.map((aID) => {
      dispatch(addAnswer({ ...answerMap[aID], answerID: v4(), questionID: NEW_QUESTION_ID }));
    });
  };

  const changeQuestionType = (idx: number) => {
    answerIDList.map((aID) => {
      dispatch(removeAnswer(answerMap[aID]));
    });

    dispatch(editQuestion({ ...questionInfo, type: EDITOR_DROPDOWN_LIST[idx].type, answerIDList: [] }));
    dispatch(addAnswer({ answerID: v4(), content: "", questionID }));
  };

  const changeQuestionContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editQuestion({ ...questionInfo, questionContent: e.target.value }));
  };

  const changeRequired = () => {
    dispatch(editQuestion({ ...questionInfo, required: !required }));
  };

  const clickInput = () => {};

  const { changeEditBlockID } = useChangeEditBlockID();

  return (
    <div
      className={`hover:shadow-lg`}
      ref={divRef}
      data-question-id={questionID}
      onClick={() => changeEditBlockID(questionID)}
    >
      <Block className="w-full group" isEditing={isEditing} {...props}>
        <div className="flex justify-center w-full py-2 cursor-move group" onMouseDown={handleDrag}>
          <RiDraggable className="invisible rotate-90 group-hover:visible" />
        </div>
        <div className="flex flex-col gap-4 pb-8">
          <div className="flex items-center justify-between gap-4 group mx-[32px]">
            {isEditing ? (
              <Input
                innerRef={inputRef}
                placeholder="질문"
                className="w-full p-4 bg-gray-100 hover:bg-gray-200"
                onChange={changeQuestionContent}
                value={questionContent}
              />
            ) : (
              <div className="flex items-center cursor-text" onClick={clickInput}>
                {questionContent.length === 0 ? "질문" : questionContent}
                {required && <span className="p-1 font-bold text-red-600 class">*</span>}
              </div>
            )}
            {isEditing && (
              <Dropdown
                className="flex"
                itemList={EDITOR_DROPDOWN_LIST}
                onChange={changeQuestionType}
                initialIdx={type}
              />
            )}
          </div>
          <AnswerManager questionID={questionID} isForm={false} isEditing={isEditing} />
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
    </div>
  );
};

export default QuestionBlock;
