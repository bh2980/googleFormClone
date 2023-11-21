import { RiCloseFill, RiDraggable } from "react-icons/ri";
import Input from "../common/Input";
import IconButton from "../common/IconButton";
import { EDITOR_QUESTION_TYPE, ICON_CLASS } from "../../constants";

interface RadioAnswerProps extends React.ComponentPropsWithRef<"input"> {
  inputType: EDITOR_QUESTION_TYPE.radio | EDITOR_QUESTION_TYPE.checkbox | EDITOR_QUESTION_TYPE.dropdown;
  idx?: number;
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
  onDeleteButton,
  innerRef,
  ...props
}: RadioAnswerProps) => {
  return (
    <div className="flex items-center justify-between group">
      <div className="relative flex items-center w-full gap-4">
        {!isForm && (
          <RiDraggable
            tabIndex={0}
            className={`absolute outline-none cursor-move hidden group-focus-within:flex ${ICON_CLASS} left-[-22px]`}
          />
        )}
        <div className="flex justify-center w-[16px]">
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
      </div>
      {deletable && !isForm && (
        <IconButton onClick={onDeleteButton} className="hidden group-focus-within:flex">
          <RiCloseFill className={ICON_CLASS} />
        </IconButton>
      )}
    </div>
  );
};

export default ChooseAnswer;
