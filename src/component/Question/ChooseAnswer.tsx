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
  handleDrag: (e: React.MouseEvent) => void;
}

const ChooseAnswer = ({
  inputType,
  idx,
  deletable = true,
  isForm,
  onDeleteButton,
  handleDrag,
  draggable,
  innerRef,
  ...props
}: RadioAnswerProps) => {
  return (
    <div className="flex items-center justify-between group/item">
      <div className="relative flex items-center w-full gap-4">
        {!isForm && draggable && (
          <RiDraggable
            onMouseDown={handleDrag}
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
