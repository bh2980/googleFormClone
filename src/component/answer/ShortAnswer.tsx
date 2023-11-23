// readonly나 disabled를 풀면 미리보기 폼에서 재활용할 수 있도록 만들기

import Input from "../common/Input";

interface ShortAnswerProps extends React.ComponentPropsWithRef<"input"> {
  isForm?: boolean;
}

const ShortAnswer = ({ isForm, ...props }: ShortAnswerProps) => {
  return <Input className="bg-white" placeholder="단답형 메시지" {...props} disabled={!isForm} />;
};

export default ShortAnswer;
