import { RiCloseFill, RiDraggable } from "react-icons/ri";
import Input from "../common/Input";
import IconButton from "../common/IconButton";
import { EDITOR_QUESTION_TYPE, ICON_CLASS } from "../../constants";

interface RadioAnswerProps extends Omit<React.ComponentPropsWithRef<"input">, "type"> {
  type: EDITOR_QUESTION_TYPE.radio | EDITOR_QUESTION_TYPE.checkbox | EDITOR_QUESTION_TYPE.dropdown;
  idx?: number;
  deletable?: boolean;
  isForm?: boolean; //에디터인지 설문폼인지 확인
  isEditing?: boolean;
  onDeleteButton?: (...params: unknown[]) => unknown;
  innerRef?: React.ComponentPropsWithRef<"input">["ref"];
  handleDrag?: (e: React.MouseEvent) => void;
}

const ChooseAnswer = ({
  type,
  idx,
  deletable = true,
  isForm,
  onDeleteButton,
  handleDrag,
  isEditing,
  innerRef,
  ...props
}: RadioAnswerProps) => {
  return (
    <div className="flex items-center justify-between group/item">
      <div className="relative flex items-center w-full gap-4">
        {!isForm && isEditing && (
          <RiDraggable
            onMouseDown={handleDrag}
            tabIndex={0}
            className={`absolute outline-none cursor-move hidden group-hover/item:flex ${ICON_CLASS}`}
          />
        )}
        <div className="flex gap-4 px-[32px] w-full">
          {isForm ? (
            <Input className="w-full" disabled={isForm} innerRef={innerRef} />
          ) : (
            <Input className="w-full" disabled={isForm} {...props} innerRef={innerRef} />
          )}
          {deletable && !isForm && isEditing && (
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
