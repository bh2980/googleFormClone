import { useRedux } from '@google-form-clone/hooks';
import AnswerManager from './AnswerItemManager';
import { Block } from '@google-form-clone/shared-ui';
import { store } from '../../store/store';

interface QuestionBlockProps extends React.ComponentPropsWithRef<'div'> {
  questionID: string;
  handleDrag?: (e: React.MouseEvent) => void;
}

const QuestionBlock = ({ questionID, ...props }: QuestionBlockProps) => {
  const { useSelector } = useRedux<typeof store>();

  const questionInfo = useSelector((store) => store.question[questionID]);

  const { questionContent, required } = questionInfo;

  return (
    <Block className="flex flex-col w-full gap-4 p-8 group" {...props}>
      <div className="flex items-center justify-between gap-4 group">
        <div className="flex items-center cursor-text">
          {questionContent.length === 0 ? '질문' : questionContent}
          {required && <span className="p-1 font-bold text-red-600">*</span>}
        </div>
      </div>
      <AnswerManager questionID={questionID} />
      {required && <div className="font-bold text-right text-red-600">* 필수 질문입니다</div>}
    </Block>
  );
};

export default QuestionBlock;
