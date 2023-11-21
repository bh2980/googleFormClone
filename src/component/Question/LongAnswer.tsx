import classMerge from "../../utils/classMerge";
import TextArea from "../common/TextArea";

interface LongAnswerProps extends React.ComponentPropsWithRef<"textarea"> {
  isForm?: boolean;
}

const LongAnswer = ({ isForm, className, rows = 1, ...props }: LongAnswerProps) => {
  return (
    <TextArea
      className={classMerge(["bg-white focus:border-b-2 border-violet-800 focus:py-2 outline-none", className])}
      placeholder="장문형 텍스트"
      rows={rows}
      {...props}
      disabled={!isForm}
    />
  );
};

export default LongAnswer;
