/** AnswerManager는 질문 부분을 관리하는 매니저
 * questionID를 이용해 type과 answerIDLIst를 가져온다
 * answer 상태에서 answerIDLIst를 순회하면서 answer을 뽑아 알맞게 렌더링한다
 */

import { EDITOR_QUESTION_TYPE } from "../../constants";
import LongAnswer from "./answer/LongAnswer";
import ShortAnswer from "./answer/ShortAnswer";
import classMerge from "../../utils/classMerge";
import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import ChooseAnswer from "./ChooseAnswer";
import { v4 } from "uuid";
import Dropdown from "../common/Dropdown";
import { editResponse } from "../../store/reducer/responseSlice";
import RadioGroup from "../common/Radio/RadioGroup";

interface AnswerManagerProps {
  questionID: string;
  name?: string;
}

const AnswerManager = ({ questionID, name = v4() }: AnswerManagerProps) => {
  const dispatch = useAppDispatch();
  const { type, answerIDList } = useAppSelector((store) => store.question[questionID]);
  const answerMap = useAppSelector((store) => store.answer);
  const response = useAppSelector((store) => store.response[questionID]);

  const itemList = answerIDList.reduce((acc: { content: string }[], cur: string) => {
    const { content } = answerMap[cur];
    acc.push({ content });

    return acc;
  }, []);

  const changeTextResponse = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(editResponse({ questionID, content: event.target.value }));
  };

  const changeClickResponse = (idx: number) => {
    if (type === EDITOR_QUESTION_TYPE.dropdown) {
      dispatch(editResponse({ questionID, content: idx }));
    } else if (type === EDITOR_QUESTION_TYPE.radio) {
      if (response === idx) dispatch(editResponse({ questionID, content: null }));
      else dispatch(editResponse({ questionID, content: idx }));
    } else {
      const prevState = response === null ? [] : (response as number[]);

      if (prevState.includes(idx)) {
        const nextState = prevState.filter((checkedIdx) => checkedIdx !== idx);

        dispatch(editResponse({ questionID, content: nextState }));
      } else {
        dispatch(editResponse({ questionID, content: [...prevState, idx] }));
      }
    }
  };

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
      {type === EDITOR_QUESTION_TYPE.short && (
        <ShortAnswer className="w-full" name={name} onChange={changeTextResponse} />
      )}
      {type === EDITOR_QUESTION_TYPE.long && (
        <LongAnswer className="w-full" name={name} onChange={changeTextResponse} />
      )}
      {type === EDITOR_QUESTION_TYPE.dropdown && <Dropdown itemList={itemList} onChange={changeClickResponse} />}
      {type === EDITOR_QUESTION_TYPE.checkbox &&
        answerIDList.map((aID, idx) => {
          const answerInfo = answerMap[aID];
          return (
            <ChooseAnswer
              key={aID}
              type={type}
              label={answerInfo.content}
              placeholder={`옵션 ${idx + 1}`}
              name={name}
              onClick={() => changeClickResponse(idx)}
            />
          );
        })}
      {type === EDITOR_QUESTION_TYPE.radio && (
        <RadioGroup>
          {answerIDList.map((aID, idx) => {
            const answerInfo = answerMap[aID];
            return (
              <ChooseAnswer
                key={aID}
                type={type}
                label={answerInfo.content}
                placeholder={`옵션 ${idx + 1}`}
                name={name}
                onClick={() => changeClickResponse(idx)}
              />
            );
          })}
        </RadioGroup>
      )}
    </fieldset>
  );
};

export default AnswerManager;
