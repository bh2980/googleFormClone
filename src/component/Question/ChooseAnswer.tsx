import { RiCloseFill, RiDraggable } from "react-icons/ri";
import Input from "../common/Input";
import IconButton from "../common/IconButton";
import { ICON_CLASS } from "../../constants";

interface RadioAnswerProps extends React.ComponentPropsWithRef<"input"> {
  isForm?: boolean; //에디터인지 설문폼인지 확인
  onDeleteButton?: (...params: unknown[]) => unknown;
  inputType: "radio" | "checkbox";
}

//드래그는 나중에
const ChooseAnswer = ({ inputType, isForm, onDeleteButton, ...props }: RadioAnswerProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 ">
        <div className="flex items-center w-full gap-4">
          {!isForm && (
            <RiDraggable
              tabIndex={0}
              className={`outline-none cursor-move hidden group-focus-within:flex ${ICON_CLASS}`}
            />
          )}
          {isForm ? (
            <input type={inputType} disabled={!isForm} {...props} />
          ) : (
            <input type={inputType} disabled={!isForm} />
          )}
          {isForm ? (
            <Input className="w-full" disabled={isForm} />
          ) : (
            <Input className="w-full" disabled={isForm} {...props} />
          )}
        </div>
        {!isForm && (
          <>
            <IconButton onClick={onDeleteButton} className="hidden group-focus-within:flex">
              <RiCloseFill className={ICON_CLASS} />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};

export default ChooseAnswer;
