import { RiDeleteBin6Line, RiDraggable, RiFileCopyLine } from "react-icons/ri";
import Block from "./common/Block";
import Input from "./common/Input";
import Divider from "./common/Divider";
import { EDITOR_DROPDOWN_LIST, ICON_CLASS } from "../constants";
import IconButton from "./common/IconButton";
import Switch from "./common/Switch";
import Dropdown from "./common/Dropdown";
import { useEffect } from "react";

import { removeQuestion, type QuestionKindType, editQuestion, copyQuestion } from "../store/questionSlice";
import { useAppDispatch, useAppSelector } from "../hook/storeHook";
import AnswerManager from "./AnswerItemManager";

interface QuestionBlockProps extends React.ComponentPropsWithRef<"div"> {
  questionID: string;
  type?: QuestionKindType;
  isForm?: boolean;
}
/**
 * QuestionBlock은 BlockID를 받아서 QuestionManager에게 전달
 */
const QuestionBlock = ({ questionID, type = "short", ...props }: QuestionBlockProps) => {
  const dispatch = useAppDispatch();
  const questionInfo = useAppSelector((store) => store.question[questionID]);
  const { questionContent, required } = questionInfo;
  const answerMap = useAppSelector((store) => store.answer);

  const removeQuestionBlock = () => {
    dispatch(removeQuestion(questionInfo));
  };

  const copyQuestionBlock = () => {
    // answerList로부터 answer를 가져와 deepcopy -> answerMap에 새로 등록
    // 새 uuid 발급
    // 그 외 정보 그대로 복사해서 copyQuestion
    // REDUX에서는 copyQuestion시 questionMap에 신규 등록
    // docsSlice에서 splice를 통해 이전 questionID 이후에 삽입
    // dispatch(copyQuestion(questionInfo));
  };

  const changeQuestionType = (idx: number) => {
    //questionType이 변경되면 question의 answerList 초기화
    //answerMap에서 answerList 항목 제거 delete
    //answerList를 빈 배열로 변경
    dispatch(editQuestion({ ...questionInfo, type: EDITOR_DROPDOWN_LIST[idx].type }));
  };

  const changeQuestionContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editQuestion({ ...questionInfo, questionContent: e.target.value }));
  };

  const changeRequired = () => {
    dispatch(editQuestion({ ...questionInfo, required: !required }));
  };

  useEffect(() => {
    console.log("정보 변경", questionInfo);
  }, [questionInfo]);

  // 나중에
  const dragBlock = () => {
    console.log(type);
  };

  return (
    <Block className="w-full group" {...props}>
      <div className="flex justify-center w-full py-2 cursor-move group" onClick={dragBlock}>
        <RiDraggable className="invisible rotate-90 group-hover:visible" />
      </div>
      <div className="flex flex-col gap-6 px-6 pb-6">
        <div className="flex items-center justify-between gap-4 group">
          <Input
            placeholder="질문"
            className="group-focus-within:border-gray-300 group-focus-within:border-b-2 group-focus-within:hover:bg-gray-200 group-focus-within:bg-gray-100 group-focus-within:p-4 w-[440px]"
            onChange={changeQuestionContent}
            value={questionContent}
          />
          <Dropdown
            className="hidden group-focus-within:flex"
            itemList={EDITOR_DROPDOWN_LIST}
            onChange={changeQuestionType}
          />
        </div>
        <AnswerManager questionID={questionID} isForm={false} />
        <div className="flex-col hidden group-focus-within:flex group-focus-within:flex-col group-focus-within:gap-4">
          <Divider />
          <div className="flex items-center justify-end gap-2 pt-4 h-[48px]">
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
      </div>
    </Block>
  );
};

export default QuestionBlock;
