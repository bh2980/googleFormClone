/** AnswerManager는 질문 부분을 관리하는 매니저
 * questionID를 이용해 type과 answerIDLIst를 가져온다
 * answer 상태에서 answerIDLIst를 순회하면서 answer을 뽑아 알맞게 렌더링한다
 */

import { useEffect, useRef } from 'react';
import { EDITOR_QUESTION_TYPE } from '../../constants';
import { AnswerInterface, addAnswer, editAnswer, removeAnswer } from '../../store/reducer/answerSlice';
import ChooseAnswer from './ChooseAnswer';
import { v4 as uuidv4 } from 'uuid';
import { editAnswerOrder } from '../../store/reducer/questionSlice';
import useChangeEditBlockID from '../../hook/useChangeEditBlockID';
import { Checkbox, Radio, classMerge } from '@google-form-clone/shared-ui';
import { store } from '../../store/store';
import { useDnDList, useRedux } from '@google-form-clone/hooks';

interface AnswerManagerProps {
  questionID: string;
}

// TODO 기타 추가 구현
const AnswerManager = ({ questionID }: AnswerManagerProps) => {
  const { useDispatch, useSelector } = useRedux<typeof store>();

  const dispatch = useDispatch();
  const { type, answerIDList } = useSelector((store) => store.question[questionID]);
  const answerMap = useSelector((store) => store.answer);
  const prevAnswerLength = useRef(answerIDList.length);

  const { isEditing } = useChangeEditBlockID(questionID);

  const { dragListContainerRef, handleDrag } = useDnDList({
    handleItem: (fromIdx: number, toIdx: number) => {
      dispatch(editAnswerOrder({ questionID, fromIdx, toIdx }));
    },
  });

  const chooseAnswerRef = useRef<(null | HTMLInputElement)[]>([]);

  const changeAnswer = (e: React.ChangeEvent<HTMLInputElement>, { answerID, questionID }: AnswerInterface) => {
    dispatch(editAnswer({ answerID, content: e.target.value, questionID }));
  };

  const addAnswerItem = () => {
    const NEW_ANSWER_ID = uuidv4();
    dispatch(addAnswer({ answerID: NEW_ANSWER_ID, content: '', questionID }));
  };

  const removeAnswerItem = (aID: string, idx: number) => {
    if (chooseAnswerRef && chooseAnswerRef.current) {
      if (idx < chooseAnswerRef.current.length && chooseAnswerRef.current[idx + 1] instanceof HTMLInputElement) {
        chooseAnswerRef.current[idx + 1]!.focus();
      } else {
        chooseAnswerRef.current[idx - 1]!.focus();
      }
    }

    if (chooseAnswerRef && chooseAnswerRef.current) {
      chooseAnswerRef.current = chooseAnswerRef.current.filter((_, i) => i !== idx);
    }

    dispatch(removeAnswer(answerMap[aID]));
  };

  useEffect(() => {
    if (!prevAnswerLength.current) return;

    if (prevAnswerLength.current < answerIDList.length) {
      chooseAnswerRef.current[answerIDList.length - 1]!.focus();
    }

    prevAnswerLength.current = answerIDList.length;
  }, [answerIDList.length]);

  return (
    <fieldset
      className={classMerge([
        'flex flex-col gap-4',
        (type === EDITOR_QUESTION_TYPE.short || type === EDITOR_QUESTION_TYPE.long) && 'mx-[32px]',
      ])}
    >
      {type === EDITOR_QUESTION_TYPE.short && <div className="text-gray-400">단답형 메시지</div>}
      {type === EDITOR_QUESTION_TYPE.long && <div className="text-gray-400">장문형 메시지</div>}
      {type !== EDITOR_QUESTION_TYPE.short && type !== EDITOR_QUESTION_TYPE.long && (
        <>
          <div ref={dragListContainerRef}>
            {answerIDList.map((aID, idx) => {
              const answerInfo = answerMap[aID];
              return (
                <ChooseAnswer
                  key={aID}
                  idx={idx + 1}
                  type={type}
                  value={answerInfo.content}
                  placeholder={`옵션 ${idx + 1}`}
                  onChange={(e) => changeAnswer(e, answerInfo)}
                  isEditing={isEditing}
                  deletable={answerIDList.length > 1}
                  onDeleteButton={() => removeAnswerItem(aID, idx)}
                  handleDrag={handleDrag}
                  innerRef={(el) => (chooseAnswerRef.current[idx] = el)}
                />
              );
            })}
          </div>
          {isEditing && (
            <div className="items-center flex gap-4 mx-[32px]">
              <div className="flex items-center gap-4">
                {type === EDITOR_QUESTION_TYPE.radio && <Radio disabled />}
                {type === EDITOR_QUESTION_TYPE.checkbox && <Checkbox disabled />}
                {type === EDITOR_QUESTION_TYPE.dropdown && <div className="w-[24px]"></div>}
                <span className="w-full text-gray-500 cursor-text hover:underline decoration-gray-400" onClick={addAnswerItem} tabIndex={0}>
                  옵션 추가
                </span>
              </div>
              {/* <span>또는</span>
              <button type="button" className="text-blue-500">
                '기타' 추가
              </button> */}
            </div>
          )}
        </>
      )}
    </fieldset>
  );
};

export default AnswerManager;
