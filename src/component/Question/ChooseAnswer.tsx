import { RiCloseFill, RiDraggable } from "react-icons/ri";
import Input from "../common/Input";
import IconButton from "../common/IconButton";
import { EDITOR_QUESTION_TYPE, ICON_CLASS } from "../../constants";
import { useAppSelector } from "../../hook/storeHook";
import useDnDList from "../../hook/useDnDList";

interface RadioAnswerProps extends React.ComponentPropsWithRef<"input"> {
  inputType: EDITOR_QUESTION_TYPE.radio | EDITOR_QUESTION_TYPE.checkbox | EDITOR_QUESTION_TYPE.dropdown;
  idx?: number;
  questionID: string;
  answerID: string;
  deletable?: boolean;
  isForm?: boolean; //에디터인지 설문폼인지 확인
  onDeleteButton?: (...params: unknown[]) => unknown;
  innerRef?: React.ComponentPropsWithRef<"input">["ref"];
}

//드래그는 나중에
const ChooseAnswer = ({
  inputType,
  idx,
  deletable = true,
  isForm,
  questionID,
  answerID,
  onDeleteButton,
  innerRef,
  ...props
}: RadioAnswerProps) => {
  const answerIDList = useAppSelector((store) => store.question[questionID].answerIDList);
  const GAP = 8;

  const changeDnDOrder = (from: number, to: number) => {
    console.log(from, to);
  };

  const { handleDrag, divRef } = useDnDList({
    itemIDList: answerIDList,
    itemID: answerID,
    gap: GAP,
    dataAttrName: "data-answer-id",
    orderItem: changeDnDOrder,
  });

  return (
    <div className="flex items-center justify-between group/item" ref={divRef}>
      <div className="relative flex items-center w-full gap-4">
        {!isForm && (
          <RiDraggable
            onClick={handleDrag}
            tabIndex={0}
            className={`absolute outline-none cursor-move hidden group-hover/item:flex ${ICON_CLASS}`}
          />
        )}
        <div className="flex gap-4 px-[32px] w-full">
          <div className="flex justify-center w-[16px] items-center">
            {inputType === EDITOR_QUESTION_TYPE.dropdown ? (
              idx
            ) : isForm ? (
              <input
                type={inputType === EDITOR_QUESTION_TYPE.radio ? "radio" : "checkbox"}
                disabled={!isForm}
                {...props}
              />
            ) : (
              <input type={inputType === EDITOR_QUESTION_TYPE.radio ? "radio" : "checkbox"} disabled={!isForm} />
            )}
          </div>
          {isForm ? (
            <Input className="w-full" disabled={isForm} innerRef={innerRef} />
          ) : (
            <Input className="w-full" disabled={isForm} {...props} innerRef={innerRef} />
          )}
          {deletable && !isForm && (
            <IconButton onClick={onDeleteButton} className="flex">
              <RiCloseFill className={ICON_CLASS} />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChooseAnswer;
