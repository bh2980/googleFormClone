import { v4 as uuidv4 } from "uuid";

import { RiAddCircleLine, RiEyeLine } from "react-icons/ri";
import TitleBlock from "../component/editor/TitleBlock";
import QuestionBlock from "../component/editor/QuestionBlock";
import { ICON_CLASS, EDITOR_QUESTION_TYPE } from "../constants";
import IconButton from "../component/common/IconButton";

import { useAppDispatch, useAppSelector } from "../hook/storeHook";
import { addQuestion } from "../store/reducer/questionSlice";
import { addAnswer } from "../store/reducer/answerSlice";
import useDnDList from "../hook/useDnDList";
import { editQuestionBlockOrder } from "../store/reducer/docsSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// TODO 관련 컴포넌트 EDITOR로 변경
const Editor = () => {
  const dispatch = useAppDispatch();
  const questionIDList = useAppSelector((store) => store.docs.questionIDList);
  const [prevLength, setPrevLength] = useState(questionIDList.length);

  const handleItem = (fromIdx: number, toIdx: number) => {
    dispatch(editQuestionBlockOrder({ fromIdx, toIdx }));
  };

  const { handleDrag, DnDList } = useDnDList({ handleItem });

  const addQuestionBlock = () => {
    const QUESTION_ID = uuidv4();
    const ANSWER_ID = uuidv4();

    dispatch(
      addQuestion({
        questionID: QUESTION_ID,
        type: EDITOR_QUESTION_TYPE.short,
        required: false,
        answerIDList: [],
        questionContent: "",
        parentQuestionID: null,
      })
    );

    dispatch(
      addAnswer({
        answerID: ANSWER_ID,
        content: "",
        questionID: QUESTION_ID,
      })
    );
  };

  useEffect(() => {
    if (prevLength < questionIDList.length) window.scrollTo(0, document.body.scrollHeight);

    setPrevLength(questionIDList.length);
  }, [questionIDList.length]);

  return (
    <div className="flex flex-col min-h-screen bg-violet-100">
      <div className="fixed w-full h-[56px] flex justify-end shadow-sm border-b-gray-200 border-b-[1px] p-4 items-center bg-gray-50 z-50">
        <Link to="/preview">
          <IconButton>
            <RiEyeLine className="w-[20px] h-[20px] text-gray-600" />
          </IconButton>
        </Link>
      </div>
      <div className="flex w-full p-20">
        <div className="flex-1"></div>
        <form className="flex flex-[2] gap-4 flex-col ">
          <TitleBlock />
          <DnDList className="flex flex-col gap-4">
            {questionIDList.map((qID, idx) => (
              <QuestionBlock key={qID} questionID={qID} handleDrag={(e) => handleDrag(e, idx)} />
            ))}
          </DnDList>
        </form>
        <div className="relative flex-1 pl-4">
          <div className="fixed flex flex-col justify-center items-center bg-white shadow-md rounded-xl w-[48px] py-1 gap-2">
            <IconButton onClick={addQuestionBlock} className="w-[40px] h-[40px]">
              <RiAddCircleLine className={ICON_CLASS} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
