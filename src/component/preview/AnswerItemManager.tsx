/** AnswerManager는 질문 부분을 관리하는 매니저
 * questionID를 이용해 type과 answerIDLIst를 가져온다
 * answer 상태에서 answerIDLIst를 순회하면서 answer을 뽑아 알맞게 렌더링한다
 */

import { EDITOR_QUESTION_TYPE } from "../../constants";
import LongAnswer from "../common/answer/LongAnswer";
import ShortAnswer from "../common/answer/ShortAnswer";
import classMerge from "../../utils/classMerge";
import { useAppSelector } from "../../hook/storeHook";
import ChooseAnswer from "./ChooseAnswer";
import { v4 } from "uuid";
import Dropdown from "../common/Dropdown";

interface AnswerManagerProps {
  questionID: string;
  name?: string;
}

const AnswerManager = ({ questionID, name = v4() }: AnswerManagerProps) => {
  const { type, answerIDList } = useAppSelector((store) => store.question[questionID]);
  const answerMap = useAppSelector((store) => store.answer);

  const itemList = answerIDList.reduce((acc: { content: string }[], cur: string) => {
    const { content } = answerMap[cur];
    acc.push({ content });

    return acc;
  }, []);

  return (
    <fieldset
      className={classMerge([
        "flex flex-col gap-4",
        (type === EDITOR_QUESTION_TYPE.short ||
          type === EDITOR_QUESTION_TYPE.long ||
          type === EDITOR_QUESTION_TYPE.dropdown) &&
          "mx-[32px]",
      ])}
    >
      {type === EDITOR_QUESTION_TYPE.short && <ShortAnswer name={name} />}
      {type === EDITOR_QUESTION_TYPE.long && <LongAnswer name={name} />}
      {type === EDITOR_QUESTION_TYPE.dropdown && <Dropdown itemList={itemList} />}
      {(type === EDITOR_QUESTION_TYPE.radio || type === EDITOR_QUESTION_TYPE.checkbox) &&
        answerIDList.map((aID, idx) => {
          const answerInfo = answerMap[aID];
          return (
            <ChooseAnswer
              key={aID}
              type={type}
              value={answerInfo.content}
              placeholder={`옵션 ${idx + 1}`}
              name={name}
            />
          );
        })}
    </fieldset>
  );
};

export default AnswerManager;
