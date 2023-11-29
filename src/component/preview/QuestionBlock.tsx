import Block from "../common/Block";
import AnswerManager from "./AnswerItemManager";
import { useAppSelector } from "../../hook/useRedux";

interface QuestionBlockProps extends React.ComponentPropsWithRef<"div"> {
  questionID: string;
  handleDrag?: (e: React.MouseEvent) => void;
}
/**
 * QuestionBlock은 BlockID를 받아서 QuestionManager에게 전달
 */
const QuestionBlock = ({ questionID, ...props }: QuestionBlockProps) => {
  const questionInfo = useAppSelector((store) => store.question[questionID]);

  const { questionContent, required } = questionInfo;

  return (
    <Block className="w-full group" {...props}>
      <div className="flex flex-col gap-4 py-8">
        <div className="flex items-center justify-between gap-4 group mx-[32px]">
          <div className="flex items-center cursor-text">
            {questionContent.length === 0 ? "질문" : questionContent}
            {required && <span className="p-1 font-bold text-red-600">*</span>}
          </div>
        </div>
        <AnswerManager questionID={questionID} />
        {required && <div className="pr-8 font-bold text-right text-red-600">* 필수 질문입니다</div>}
      </div>
    </Block>
  );
};

export default QuestionBlock;
