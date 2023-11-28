import { EDITOR_QUESTION_TYPE } from "../../constants";
import Checkbox from "../common/Checkbox";
import Radio from "../common/Radio/Radio";

interface RadioAnswerProps extends Omit<React.ComponentPropsWithRef<"input">, "type"> {
  type: EDITOR_QUESTION_TYPE.radio | EDITOR_QUESTION_TYPE.checkbox;
  label?: string;
}

const ChooseAnswer = ({ type, label, checked, ...props }: RadioAnswerProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="relative flex items-center w-full gap-4">
        <div className="flex gap-4 px-[32px] py-1 w-full items-center">
          {type === EDITOR_QUESTION_TYPE.radio ? (
            <Radio label={label} defaultChecked={checked} {...props} />
          ) : (
            <Checkbox label={label} {...props} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChooseAnswer;
