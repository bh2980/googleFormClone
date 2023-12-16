import { RiCloseFill, RiDraggable } from "react-icons/ri";
import IconButton from "../common/IconButton";
import { EDITOR_QUESTION_TYPE, ICON_CLASS } from "../../constants";
import Checkbox from "../common/Checkbox";
import Radio from "../common/Radio/Radio";
import Input from "../common/Input";
import classMerge from "../../utils/classMerge";
import { isTouchScreen } from "../../hook/headless/useDnDList";

interface RadioAnswerProps extends Omit<React.ComponentPropsWithRef<"input">, "type"> {
  type: EDITOR_QUESTION_TYPE.radio | EDITOR_QUESTION_TYPE.checkbox | EDITOR_QUESTION_TYPE.dropdown;
  idx?: number;
  deletable?: boolean;
  isEditing?: boolean;
  onDeleteButton?: (...params: unknown[]) => unknown;
  innerRef?: React.ComponentPropsWithRef<"input">["ref"];
  handleDrag?: (e: React.MouseEvent) => void;
}

const ChooseAnswer = ({
  type,
  idx,
  deletable = true,
  isEditing,
  onDeleteButton,
  handleDrag,
  innerRef,
  ...props
}: RadioAnswerProps) => {
  return (
    <div className="flex items-center justify-between group/item">
      <div className="relative flex items-center w-full gap-4">
        {isEditing && (
          <RiDraggable
            onMouseDown={handleDrag}
            onTouchStart={handleDrag}
            tabIndex={0}
            className={classMerge([
              `absolute outline-none cursor-move ${ICON_CLASS}`,
              !isTouchScreen && "hidden group-hover/item:flex",
            ])}
          />
        )}
        <div className="flex gap-4 px-[32px] w-full items-center">
          {type === EDITOR_QUESTION_TYPE.radio && <Radio disabled />}
          {type === EDITOR_QUESTION_TYPE.checkbox && <Checkbox disabled />}
          {type === EDITOR_QUESTION_TYPE.dropdown && (
            <div className="w-[20px] h-[20px] justify-center flex text-gray-500">{idx}</div>
          )}
          <Input innerRef={innerRef} className="w-full" {...props} />
          {deletable && isEditing && (
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
