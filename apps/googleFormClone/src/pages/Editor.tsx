import { v4 as uuidv4 } from 'uuid';

import { RiAddCircleLine, RiEyeLine } from 'react-icons/ri';
import TitleBlock from '../component/editor/TitleBlock';
import QuestionBlock from '../component/editor/QuestionBlock';
import { ICON_CLASS, EDITOR_QUESTION_TYPE } from '../constants';

import { addQuestion } from '../store/reducer/questionSlice';
import { addAnswer } from '../store/reducer/answerSlice';
import { editQuestionBlockOrder } from '../store/reducer/docsSlice';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { IconButton } from '@google-form-clone/shared-ui';
import { store } from '../store/store';
import { useDnDList, useRedux } from '@google-form-clone/hooks';

// TODO 관련 컴포넌트 EDITOR로 변경
const Editor = () => {
  const { useDispatch, useSelector } = useRedux<typeof store>();

  const dispatch = useDispatch();
  const questionIDList = useSelector((store) => store.docs.questionIDList);
  const sidebarPosition = useSelector((store) => store.sidebarPosition);
  const prevLength = useRef(questionIDList.length);

  const floatingSideBarRef = useRef<HTMLDivElement>(null);

  const handleItem = (fromIdx: number, toIdx: number) => {
    dispatch(editQuestionBlockOrder({ fromIdx, toIdx }));
  };

  const { handleDrag, dragListContainerRef } = useDnDList({
    handleItem,
    ghost: true,
  });

  const addQuestionBlock = () => {
    const QUESTION_ID = uuidv4();
    const ANSWER_ID = uuidv4();

    dispatch(
      addQuestion({
        questionID: QUESTION_ID,
        type: EDITOR_QUESTION_TYPE.short,
        required: false,
        answerIDList: [],
        questionContent: '',
        parentQuestionID: null,
      })
    );

    dispatch(
      addAnswer({
        answerID: ANSWER_ID,
        content: '',
        questionID: QUESTION_ID,
      })
    );
  };

  useEffect(() => {
    if (prevLength.current < questionIDList.length) window.scrollTo(0, document.body.scrollHeight);

    prevLength.current = questionIDList.length;
  }, [questionIDList.length]);

  useEffect(() => {
    if (!floatingSideBarRef.current) return;

    if (window.innerWidth <= 991) {
      const { width } = floatingSideBarRef.current.getBoundingClientRect();
      floatingSideBarRef.current.style.bottom = `0px`;
      floatingSideBarRef.current.style.left = `${(window.innerWidth - width) / 2}px`;
      floatingSideBarRef.current.style.top = ``;
      return;
    }

    floatingSideBarRef.current.style.top = `${sidebarPosition.top}px`;
    floatingSideBarRef.current.style.left = `${sidebarPosition.left}px`;
    floatingSideBarRef.current.style.bottom = ``;
    if (!floatingSideBarRef.current.style.transition) {
      floatingSideBarRef.current.style.transition = 'top 0.2s';
    }
  }, [sidebarPosition]);

  return (
    <div className="flex flex-col min-h-screen bg-violet-100">
      <div className="fixed w-full h-[56px] flex justify-end shadow-sm border-b-gray-200 border-b-[1px] p-4 items-center bg-gray-50 z-50">
        <Link to="/preview">
          <IconButton>
            <RiEyeLine className="w-[20px] h-[20px] text-gray-600" />
          </IconButton>
        </Link>
      </div>
      <div className="relative flex justify-center w-full px-4 py-20">
        <form className="flex flex-col w-full gap-4 max-w-[720px]">
          <TitleBlock />
          <div ref={dragListContainerRef} className="flex flex-col gap-4">
            {questionIDList.map((qID) => (
              <QuestionBlock key={qID} questionID={qID} handleDrag={handleDrag} />
            ))}
          </div>
        </form>
        <div
          className="fixed flex flex-col items-center justify-center gap-2 p-1 bg-white shadow-md rounded-xl tablet:flex-row tablet:rounded-b-none tablet:border-t-2 tablet:border-x-2 tablet:border-gray-300"
          ref={floatingSideBarRef}
        >
          <IconButton onClick={addQuestionBlock} className="w-[40px] h-[40px]">
            <RiAddCircleLine className={ICON_CLASS} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Editor;
