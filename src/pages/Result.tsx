import Block from "../component/common/Block";
import { EDITOR_QUESTION_TYPE } from "../constants";
import { useAppSelector } from "../hook/storeHook";

// TODO 질문과 질문별 답변 상태를 불러와 보여주기
const Result = () => {
  const { docs, question, answer, response } = useAppSelector((store) => store);

  const makeAnswerView = (qID: string) => {
    if (!response[qID]) return "미응답";

    if (question[qID].type === EDITOR_QUESTION_TYPE.short || question[qID].type === EDITOR_QUESTION_TYPE.long) {
      return response[qID];
    } else if (
      question[qID].type === EDITOR_QUESTION_TYPE.radio ||
      question[qID].type === EDITOR_QUESTION_TYPE.dropdown
    ) {
      return answer[question[qID].answerIDList[response[qID] as number]].content;
    } else {
      const answerArray: string[] = [];

      (response[qID] as number[]).map((rID) => answerArray.push(answer[question[qID].answerIDList[rID]].content));

      return answerArray.join(",");
    }
  };

  return (
    <div className="flex flex-col">
      <Block>{docs.title} 응답 내역</Block>
      {docs.questionIDList.map((qID) => {
        return (
          <Block key={qID}>
            <div>{question[qID].questionContent}</div>
            <div>{makeAnswerView(qID)}</div>
          </Block>
        );
      })}
    </div>
  );
};

export default Result;
