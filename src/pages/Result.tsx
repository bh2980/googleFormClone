import { Link } from "react-router-dom";
import Block from "../component/common/Block";
import IconButton from "../component/common/IconButton";
import { EDITOR_QUESTION_TYPE } from "../constants";
import { useAppSelector } from "../hook/storeHook";
import { RiEdit2Line, RiEyeLine } from "react-icons/ri";

// TODO 질문과 질문별 답변 상태를 불러와 보여주기
const Result = () => {
  const { docs, question, answer, response } = useAppSelector((store) => store);

  const makeAnswerView = (qID: string) => {
    if (response[qID] === null) return "미응답";

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
    <div className="flex flex-col min-h-screen">
      <div className="fixed w-full h-[56px] flex justify-end shadow-sm border-b-gray-200 border-b-[1px] p-4 items-center bg-gray-50">
        <IconButton>
          <Link to={"/editor"}>
            <RiEdit2Line className="w-[20px] h-[20px] text-gray-600" />
          </Link>
        </IconButton>
        <IconButton>
          <Link to={"/preview"}>
            <RiEyeLine className="w-[20px] h-[20px] text-gray-600" />
          </Link>
        </IconButton>
      </div>
      <div className="flex flex-col items-center min-h-screen gap-4 pt-[120px] bg-violet-100">
        <div className="flex flex-col gap-4 ">
          <Block className="p-6 text-3xl font-bold">{docs.title} - 응답 내역</Block>
          {docs.questionIDList.map((qID) => {
            return (
              <Block className="flex flex-col gap-3 p-6" key={qID}>
                <div className="text-2xl font-bold">{question[qID].questionContent}</div>
                <div>{makeAnswerView(qID)}</div>
              </Block>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Result;
