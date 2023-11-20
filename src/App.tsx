import {
  RiGalleryFill,
  RiFileCopyLine,
  RiDeleteBin6Line,
  RiMore2Fill,
  RiBold,
  RiUnderline,
  RiItalic,
  RiAttachment2,
  RiFormatClear,
  RiCloseFill,
  RiAddCircleLine,
  RiDraggable,
  RiDropdownList,
} from "react-icons/ri";
import TitleBlock from "./component/TitleBlock";
import QuestionBlock from "./component/QuestionBlock";
import { ICON_CLASS } from "./constants";
import IconButton from "./component/common/IconButton";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, useAppSelector } from "./hook/storeHook";
import { addQuestion } from "./store/questionSlice";

function App() {
  const dispatch = useAppDispatch();
  const questionIDList = useAppSelector((store) => store.docs.questionIDList);

  const addQuestionBlock = () => {
    //questionID 발급
    const QUESTION_ID = uuidv4();
    dispatch(
      addQuestion({
        questionID: QUESTION_ID,
        type: "short",
        required: false,
        answerIDList: [],
        questionContent: "",
        parentQuestionID: null,
      })
    );
    //questionID 기본 상태 설정
    //questionMap에 question 상태 설정
    //docsSlice에 questionID를 추가 -> extraReducer
  };

  return (
    <div className="flex w-full min-h-screen py-16 bg-violet-100">
      <div className="flex-1"></div>
      <div className="flex flex-[3] gap-4 flex-col">
        <TitleBlock />
        {questionIDList.map((qID) => (
          <QuestionBlock key={qID} questionID={qID} />
        ))}
      </div>
      <div className="flex-1 pl-4">
        <div className="flex justify-center bg-white rounded-xl shadow-md w-[48px] h-[48px]">
          <IconButton onClick={addQuestionBlock}>
            <RiAddCircleLine className={ICON_CLASS} />
          </IconButton>
        </div>
      </div>
    </div>
    // <>
    //   <div className="w-full bg-white h-[72px] flex justify-center items-center">미리보기</div>

    //   <form className="flex flex-col items-center w-full gap-4 p-2 bg-violet-100">
    //     <div className="flex justify-center p-3 bg-white rounded-md shadow-md ">
    //       <RiAddCircleLine className="w-[24px] h-[24px]" />
    //     </div>

    //     <TitleBlock />
    //     <QuestionBlock />

    //     <fieldset className="w-[720px] bg-white rounded-xl p-8 flex flex-col gap-8 justify-between">
    //       <div>
    //         필수 질문 예시<span className="text-xl font-bold text-red-500">*</span>
    //       </div>
    //       <input placeholder="단답형 메시지" />
    //     </fieldset>

    //     <fieldset className="w-[720px] bg-white rounded-xl p-8 flex flex-col gap-6 justify-between">
    //       <div>드롭다운 에디터 예시</div>
    //       <div className="flex w-full gap-4">
    //         <span>1</span>
    //         <input className="w-full" value="옵션1" />
    //         <RiCloseFill />
    //       </div>
    //       <div className="flex w-full gap-4">
    //         <span>2</span>
    //         <input className="w-full" value="옵션1" />
    //         <RiCloseFill />
    //       </div>
    //       <div className="flex w-full gap-4">
    //         <span>3</span>
    //         <input className="w-full" value="옵션1" />
    //         <RiCloseFill />
    //       </div>
    //       <div className="flex w-full gap-4">
    //         <span>4</span>
    //         <input className="w-full" value="옵션1" />
    //         <RiCloseFill />
    //       </div>
    //     </fieldset>

    //     <fieldset className="flex overflow-hidden bg-white rounded-xl">
    //       <div className="w-[8px] max-h-full bg-blue-500"></div>
    //       <div className="flex flex-col w-[720px] justify-between gap-4 pt-2 pb-8 px-8">
    //         <RiDraggable className="w-full rotate-90" />
    //         <div className="flex flex-col">
    //           <div className="flex items-center justify-between gap-4">
    //             <div className="bg-gray-100 p-4 border-gray-300 border-b-2 w-[400px]">
    //               <span>질문1</span>
    //             </div>
    //             <RiGalleryFill />
    //             <div className="w-[200px] bg-gray-100 flex gap-4 justify-between p-4 items-center">
    //               <RiDropdownList />
    //               드롭박스
    //             </div>
    //           </div>
    //           <div className="flex items-center gap-4 p-4">
    //             <RiBold className="w-[20px] h-[20px]" />
    //             <RiItalic className="w-[20px] h-[20px]" />
    //             <RiUnderline className="w-[20px] h-[20px]" />
    //             <RiAttachment2 className="w-[20px] h-[20px]" />
    //             <RiFormatClear className="w-[20px] h-[20px]" />
    //           </div>
    //         </div>
    //         <input placeholder="단답형 메시지" />
    //         <div className="w-full border-[1px]" />
    //         <div className="flex items-center justify-end gap-8">
    //           <RiFileCopyLine />
    //           <RiDeleteBin6Line />
    //           <span>필수</span>
    //           <div>스위치</div>
    //           <RiMore2Fill />
    //         </div>
    //       </div>
    //     </fieldset>
    //   </form>
    // </>
  );
}

export default App;
