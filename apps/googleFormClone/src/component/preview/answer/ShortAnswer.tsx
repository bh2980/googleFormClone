// readonly나 disabled를 풀면 미리보기 폼에서 재활용할 수 있도록 만들기

import { Input } from '@google-form-clone/shared-ui';

type ShortAnswerProps = React.ComponentPropsWithRef<'input'>;

const ShortAnswer = ({ ...props }: ShortAnswerProps) => {
  return <Input placeholder="단답형 메시지" {...props} />;
};

export default ShortAnswer;
