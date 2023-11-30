import { Link } from "react-router-dom";
import Block from "../component/common/Block";
import IconButton from "../component/common/IconButton";
import { EDITOR_QUESTION_TYPE } from "../constants";
import { useAppSelector } from "../hook/useRedux";
import { RiEdit2Line, RiEyeLine } from "react-icons/ri";

const Result = () => {
  const docs = useAppSelector((store) => store.docs);
  const question = useAppSelector((store) => store.question);
  const answer = useAppSelector((store) => store.answer);
  const response = useAppSelector((store) => store.response);

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
        <Link to={"/editor"}>
          <IconButton>
            <RiEdit2Line className="w-[20px] h-[20px] text-gray-600" />
          </IconButton>
        </Link>
        <Link to={"/preview"}>
          <IconButton>
            <RiEyeLine className="w-[20px] h-[20px] text-gray-600" />
          </IconButton>
        </Link>
      </div>
      <div className="flex flex-col items-center w-full min-h-screen gap-4 px-4 py-20 bg-violet-100">
        <div className="flex flex-col w-full gap-4 max-w-[720px]">
          <Block className="p-6 text-3xl font-bold" isTitleBlock>
            {docs.title.length === 0 ? "제목 없음" : docs.title} - 응답 내역
          </Block>
          {docs.questionIDList.map((qID) => {
            return (
              <Block className="flex flex-col gap-3 p-6" key={qID}>
                <div className="text-xl font-bold">
                  {question[qID].questionContent.length === 0 ? "질문" : question[qID].questionContent}
                </div>
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
