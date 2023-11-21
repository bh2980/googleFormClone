/** AnswerManager는 질문 부분을 관리하는 매니저
 * questionID를 이용해 type과 answerIDLIst를 가져온다
 * answer 상태에서 answerIDLIst를 순회하면서 answer을 뽑아 알맞게 렌더링한다
 */

import { EDITOR_QUESTION_TYPE } from "../constants";
import { useAppDispatch, useAppSelector } from "../hook/storeHook";
import { AnswerInterface, addAnswer, editAnswer, removeAnswer } from "../store/answerSlice";
import ChooseAnswer from "./Question/ChooseAnswer";
import LongAnswer from "./Question/LongAnswer";
import ShortAnswer from "./Question/ShortAnswer";
import { v4 as uuidv4 } from "uuid";

interface AnswerManagerProps {
  isForm: boolean;
  questionID: string;
}

const AnswerManager = ({ isForm, questionID }: AnswerManagerProps) => {
  const dispatch = useAppDispatch();
  const { type, answerIDList } = useAppSelector((store) => store.question[questionID]);
  const answerMap = useAppSelector((store) => store.answer);

  const changeAnswer = (e: React.ChangeEvent<HTMLInputElement>, { answerID, questionID }: AnswerInterface) => {
    dispatch(editAnswer({ answerID, content: e.target.value, questionID }));
  };

  const addAnswerItem = () => {
    //옵션 추가 시 새 answer에 focus가 위치하도록 수정
    const NEW_ANSWER_ID = uuidv4();
    dispatch(addAnswer({ answerID: NEW_ANSWER_ID, content: "", questionID }));
  };

  const removeAnswerItem = (aID: string) => {
    //remove시 마지막 answer에 focus가 위차하도록 수정
    dispatch(removeAnswer(answerMap[aID]));
  };

  return (
    <>
      {type === EDITOR_QUESTION_TYPE.short ? (
        <ShortAnswer isForm={isForm} />
      ) : type === EDITOR_QUESTION_TYPE.long ? (
        <LongAnswer isForm={isForm} />
      ) : (
        <>
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
                onDeleteButton={() => removeAnswerItem(aID)}
              />
            );
          })}
          <div className="items-center hidden gap-4 group-focus-within:flex">
            <div className="flex items-center w-[104px] gap-4">
              <div className="flex justify-center w-[16px]">
                {type !== EDITOR_QUESTION_TYPE.dropdown && (
                  <input type={EDITOR_QUESTION_TYPE.radio ? "radio" : "checkbox"} disabled />
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
        </>
      )}
    </>
  );
};

export default AnswerManager;
