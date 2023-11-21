import { RiDeleteBin6Line, RiDraggable, RiFileCopyLine } from "react-icons/ri";
import Block from "./common/Block";
import Input from "./common/Input";
import Divider from "./common/Divider";
import { EDITOR_DROPDOWN_LIST, ICON_CLASS } from "../constants";
import IconButton from "./common/IconButton";
import Switch from "./common/Switch";
import Dropdown from "./common/Dropdown";

import { removeQuestion, editQuestion, copyQuestion } from "../store/questionSlice";
import { useAppDispatch, useAppSelector } from "../hook/storeHook";
import AnswerManager from "./AnswerItemManager";
import { addAnswer, removeAnswer } from "../store/answerSlice";
import { v4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { editQuestionBlockOrder } from "../store/docsSlice";

interface QuestionBlockProps extends React.ComponentPropsWithRef<"div"> {
  questionID: string;
  isForm?: boolean;
}
/**
 * QuestionBlock은 BlockID를 받아서 QuestionManager에게 전달
 */
const QuestionBlock = ({ questionID, ...props }: QuestionBlockProps) => {
  const dispatch = useAppDispatch();
  const questionInfo = useAppSelector((store) => store.question[questionID]);
  const { questionContent, required, answerIDList, type } = questionInfo;
  const answerMap = useAppSelector((store) => store.answer);

  const questionIDList = useAppSelector((store) => store.docs.questionIDList);

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

  // 이하 드래그 앤 드롭 낙서장

  const findQuestionIdx = (findQID: string) => questionIDList.findIndex((qID) => qID === findQID);

  const divRef = useRef<HTMLDivElement>(null);
  const lastUnderBlockIdx = useRef<number>(findQuestionIdx(questionID));

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const onMouseDown = (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    clickEvent.preventDefault();

    if (!divRef?.current) return;

    divRef.current.style.pointerEvents = "none";
    divRef.current.style.zIndex = "50";
    divRef.current.style.opacity = "80%";

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - clickEvent.clientY;

      setMousePos({
        x: mousePos.x,
        y: mousePos.y + deltaY,
      });

      const itemUnderCursor = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY) as HTMLElement;

      const questionBlock = itemUnderCursor.closest("[data-question-id]") as HTMLElement;

      if (questionBlock) {
        const underQBlockIdx = findQuestionIdx(questionBlock.dataset.questionId!);

        // 같을 때 처리
        if (lastUnderBlockIdx.current === underQBlockIdx || !divRef.current) return;

        const draggedElementHeight = divRef.current.offsetHeight;

        // 모듈화 시 받을 것
        const gap = 16;

        if (lastUnderBlockIdx.current > underQBlockIdx) {
          console.log("hello");
          questionBlock.style.transform = `translateY(${
            draggedElementHeight + (findQuestionIdx(questionID) - underQBlockIdx) * gap
          }px)`;
        } else {
          console.log("below");
          questionBlock.style.transform = `translateY(-${
            draggedElementHeight - (findQuestionIdx(questionID) - underQBlockIdx) * gap
          }px)`;
        }

        lastUnderBlockIdx.current = underQBlockIdx;
        console.log("Update", lastUnderBlockIdx.current);
      }
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener(
      "mouseup",
      (upEvent) => {
        document.removeEventListener("mousemove", mouseMoveHandler);

        if (!divRef?.current) return;

        divRef.current.style.pointerEvents = "";
        divRef.current.style.zIndex = "0";
        divRef.current.style.opacity = "100%";

        setMousePos({
          x: 0,
          y: 0,
        });

        if (lastUnderBlockIdx.current === null) return;

        const dragQBlockIdx = findQuestionIdx(questionID);
        dispatch(editQuestionBlockOrder({ fromIdx: dragQBlockIdx, toIdx: lastUnderBlockIdx.current }));

        const allQuestionBlocks = document.querySelectorAll("[data-question-id]");
        allQuestionBlocks.forEach((block) => {
          (block as HTMLElement).style.transform = "";
        });
      },
      { once: true }
    );
  };

  return (
    <div
      style={{ transform: `translateX(${mousePos.x}px) translateY(${mousePos.y}px)` }}
      className={`hover:shadow-lg`}
      ref={divRef}
      data-question-id={questionID}
    >
      <Block className="w-full group" {...props}>
        <div className="flex justify-center w-full py-2 cursor-move group" onMouseDown={onMouseDown}>
          <RiDraggable className="invisible rotate-90 group-hover:visible" />
        </div>
        <div className="flex flex-col gap-4 pb-8">
          <div className="flex items-center justify-between gap-4 group  mx-[32px]">
            <Input
              placeholder="질문"
              className="w-full group-focus-within:hover:bg-gray-200 group-focus-within:bg-gray-100 group-focus-within:p-4"
              onChange={changeQuestionContent}
              value={questionContent}
            />
            <Dropdown
              className="hidden group-focus-within:flex"
              itemList={EDITOR_DROPDOWN_LIST}
              onChange={changeQuestionType}
              initialIdx={type}
            />
          </div>
          <AnswerManager questionID={questionID} isForm={false} />
          <div className="flex-col mx-[32px] hidden group-focus-within:flex group-focus-within:flex-col group-focus-within:gap-4">
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
        </div>
      </Block>
    </div>
  );
};

export default QuestionBlock;
