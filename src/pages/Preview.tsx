import { RiEdit2Line } from "react-icons/ri";
import IconButton from "../component/common/IconButton";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook/storeHook";
import QuestionBlock from "../component/preview/QuestionBlock";
import TitleBlock from "../component/preview/TitleBlock";
import { editResponse } from "../store/reducer/responseSlice";
import { useEffect } from "react";

// TODO 질문별 답변 상태 정의 후 저장
// TODO Preview~로 변경
const Form = () => {
  const dispatch = useAppDispatch();
  const questionIDList = useAppSelector((store) => {
    return store.docs.questionIDList;
  });

  useEffect(() => {
    // 응답 상태 초기화
    questionIDList.map((qID) => dispatch(editResponse({ questionID: qID, content: null })));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-violet-100">
      <div className="w-full h-[56px] flex justify-end shadow-sm border-b-gray-200 border-b-[1px] p-4 items-center bg-gray-50">
        <IconButton>
          <Link to={"/editor"}>
            <RiEdit2Line className="w-[20px] h-[20px] text-gray-600" />
          </Link>
        </IconButton>
      </div>
      <div className="flex w-full p-8">
        <div className="flex-1" />
        <form className="flex flex-[2] gap-4 flex-col items-end">
          <TitleBlock />
          {questionIDList.map((qID) => (
            <QuestionBlock key={qID} questionID={qID} />
          ))}
          <Link to={"/result"}>
            <button className="w-[120px] p-3 text-white text-md bg-violet-800 rounded-xl hover:bg-violet-500 active:bg-violet-900">
              제출
            </button>
          </Link>
        </form>
        <div className="flex-1" />
      </div>
    </div>
  );
};

export default Form;
