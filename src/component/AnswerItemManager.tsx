/** AnswerManager는 질문 부분을 관리하는 매니저
 * questionID를 이용해 type과 answerIDLIst를 가져온다
 * answer 상태에서 answerIDLIst를 순회하면서 answer을 뽑아 알맞게 렌더링한다
 */

import { useRef } from "react";
import { EDITOR_QUESTION_TYPE } from "../constants";
import { useAppDispatch, useAppSelector } from "../hook/storeHook";
import { AnswerInterface, addAnswer, editAnswer, removeAnswer } from "../store/answerSlice";
import ChooseAnswer from "./question/ChooseAnswer";
import LongAnswer from "./question/LongAnswer";
import ShortAnswer from "./question/ShortAnswer";
import { v4 as uuidv4 } from "uuid";
import classMerge from "../utils/classMerge";
import useDnDList from "../hook/useDnDList";

interface AnswerManagerProps {
  isForm: boolean;
  questionID: string;
  isEditing?: boolean;
}

const AnswerManager = ({ isForm, questionID, isEditing }: AnswerManagerProps) => {
  const dispatch = useAppDispatch();
  const { type, answerIDList } = useAppSelector((store) => store.question[questionID]);
  const answerMap = useAppSelector((store) => store.answer);
  const { DnDList, handleDrag } = useDnDList({ handleItem: console.log });

  const chooseAnswerRef = useRef<(null | HTMLInputElement)[]>([]);

  const changeAnswer = (e: React.ChangeEvent<HTMLInputElement>, { answerID, questionID }: AnswerInterface) => {
    dispatch(editAnswer({ answerID, content: e.target.value, questionID }));
  };

  const addAnswerItem = () => {
    const NEW_ANSWER_ID = uuidv4();
    dispatch(addAnswer({ answerID: NEW_ANSWER_ID, content: "", questionID }));
  };

  const removeAnswerItem = (aID: string, idx: number) => {
    if (chooseAnswerRef && chooseAnswerRef.current) {
      if (idx >= 1 && chooseAnswerRef.current[idx - 1] instanceof HTMLInputElement) {
        chooseAnswerRef.current[idx - 1]!.focus();
      } else {
        chooseAnswerRef.current[idx + 1]!.focus();
      }
    }

    if (chooseAnswerRef && chooseAnswerRef.current) {
      chooseAnswerRef.current = chooseAnswerRef.current.filter((_, i) => i !== idx);
    }

    dispatch(removeAnswer(answerMap[aID]));
  };

  return (
    <fieldset
      className={classMerge([
        "flex flex-col gap-4",
        (type === EDITOR_QUESTION_TYPE.short || type === EDITOR_QUESTION_TYPE.long) && "mx-[32px]",
      ])}
    >
      {type === EDITOR_QUESTION_TYPE.short ? (
        <ShortAnswer isForm={isForm} />
      ) : type === EDITOR_QUESTION_TYPE.long ? (
        <LongAnswer isForm={isForm} />
      ) : (
        <DnDList>
          {answerIDList.map((aID, idx) => {
            const answerInfo = answerMap[aID];
            return (
              <ChooseAnswer
                key={aID}
                idx={idx + 1}
                inputType={type}
                value={answerInfo.content}
                placeholder={`옵션 ${idx + 1}`}
                onChange={(e) => changeAnswer(e, answerInfo)}
                deletable={answerIDList.length > 1}
                onDeleteButton={() => removeAnswerItem(aID, idx)}
                innerRef={(el) => (chooseAnswerRef.current[idx] = el)}
                handleDrag={(e) => handleDrag(e, idx)}
              />
            );
          })}

          {isEditing && (
            <div className="items-center flex gap-4 mx-[32px] mt-2">
              <div className="flex items-center w-full gap-4">
                <div className="flex justify-center w-[16px]">
                  {type !== EDITOR_QUESTION_TYPE.dropdown && (
                    <input type={type === EDITOR_QUESTION_TYPE.radio ? "radio" : "checkbox"} disabled />
                  )}
                </div>
                <span
                  className="w-full text-gray-500 cursor-text hover:underline decoration-gray-400"
                  onClick={addAnswerItem}
                  tabIndex={0}
                >
                  옵션 추가
                </span>
              </div>
              {/* <span>또는</span>
            <button type="button" className="text-blue-500">
              '기타' 추가
            </button> */}
            </div>
          )}
        </DnDList>
      )}
    </fieldset>
  );
};

export default AnswerManager;
