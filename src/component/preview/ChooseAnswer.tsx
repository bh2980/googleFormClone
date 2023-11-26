import { EDITOR_QUESTION_TYPE } from "../../constants";
import Checkbox from "../common/Checkbox";
import Radio from "../common/Radio";

interface RadioAnswerProps extends Omit<React.ComponentPropsWithRef<"input">, "type"> {
  type: EDITOR_QUESTION_TYPE.radio | EDITOR_QUESTION_TYPE.checkbox | EDITOR_QUESTION_TYPE.dropdown;
  value?: string;
}

const ChooseAnswer = ({ type, value, ...props }: RadioAnswerProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="relative flex items-center w-full gap-4">
        <div className="flex gap-4 px-[32px] py-1 w-full items-center">
          {type === EDITOR_QUESTION_TYPE.radio ? (
            <Radio label={value} {...props} />
          ) : (
            <Checkbox label={value} {...props} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChooseAnswer;
