import { TextArea, classMerge } from '@google-form-clone/shared-ui';

type LongAnswerProps = React.ComponentPropsWithRef<'textarea'>;

const LongAnswer = ({ className, rows = 1, ...props }: LongAnswerProps) => {
  return (
    <TextArea
      className={classMerge([
        'bg-white focus:border-b-2 border-violet-800 focus:py-2 outline-none',
        className,
      ])}
      placeholder="장문형 텍스트"
      rows={rows}
      {...props}
    />
  );
};

export default LongAnswer;
