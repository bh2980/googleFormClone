import { v4 as uuidv4 } from "uuid";

import { RiAddCircleLine } from "react-icons/ri";
import TitleBlock from "../component/TitleBlock";
import QuestionBlock from "../component/QuestionBlock";
import { ICON_CLASS, EDITOR_QUESTION_TYPE } from "../constants";
import IconButton from "../component/common/IconButton";

import { useAppDispatch, useAppSelector } from "../hook/storeHook";
import { addQuestion } from "../store/reducer/questionSlice";
import { addAnswer } from "../store/reducer/answerSlice";
import useDnDList from "../hook/useDnDList";
import { editQuestionBlockOrder } from "../store/reducer/docsSlice";

const Editor = () => {
  const dispatch = useAppDispatch();
  const questionIDList = useAppSelector((store) => store.docs.questionIDList);

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

  return (
    <div className="flex w-full p-8">
      <div className="flex-1"></div>
      <form className="flex flex-[2] gap-4 flex-col ">
        <TitleBlock />
        <DnDList className="flex flex-col gap-4">
          {questionIDList.map((qID, idx) => (
            <QuestionBlock key={qID} questionID={qID} handleDrag={(e) => handleDrag(e, idx)} />
          ))}
        </DnDList>
      </form>
      <div className="flex-1 pl-4">
        <div className="flex justify-center bg-white shadow-md rounded-xl w-[48px] h-[48px]">
          <IconButton onClick={addQuestionBlock}>
            <RiAddCircleLine className={ICON_CLASS} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Editor;
