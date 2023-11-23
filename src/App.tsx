import { RiAddCircleLine, RiEyeLine } from "react-icons/ri";
import TitleBlock from "./component/TitleBlock";
import QuestionBlock from "./component/QuestionBlock";
import { EDITOR_QUESTION_TYPE, ICON_CLASS } from "./constants";
import IconButton from "./component/common/IconButton";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "./hook/storeHook";
import { addQuestion } from "./store/reducer/questionSlice";
import { addAnswer } from "./store/reducer/answerSlice";
import useDnDList from "./hook/useDnDList";
import { editQuestionBlockOrder } from "./store/reducer/docsSlice";

function App() {
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
    <div className="flex flex-col min-h-screen bg-violet-100">
      <div className="w-full h-[72px] flex justify-end shadow-sm border-b-gray-200 border-b-[1px] p-2 items-center bg-gray-50">
        <IconButton>
          <RiEyeLine className="w-[32px] h-[32px] text-gray-600" />
        </IconButton>
      </div>
      <div className="flex w-full pt-8">
        <div className="flex-1"></div>
        <form className="flex flex-[2] gap-4 flex-col">
          <TitleBlock />
          <DnDList className="flex flex-col gap-4">
            {questionIDList.map((qID, idx) => (
              <QuestionBlock key={qID} questionID={qID} handleDrag={(e) => handleDrag(e, idx)} />
            ))}
          </DnDList>
        </form>
        <div className="flex-1 pl-4">
          <div className="flex justify-center bg-white rounded-xl shadow-md w-[48px] h-[48px]">
            <IconButton onClick={addQuestionBlock}>
              <RiAddCircleLine className={ICON_CLASS} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
