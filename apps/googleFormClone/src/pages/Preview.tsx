import { RiEdit2Line } from 'react-icons/ri';

import { Link, useNavigate } from 'react-router-dom';
import QuestionBlock from '../component/preview/QuestionBlock';
import TitleBlock from '../component/preview/TitleBlock';
import { editResponse } from '../store/reducer/responseSlice';
import { useEffect } from 'react';
import { IconButton } from '@google-form-clone/shared-ui';
import { useRedux } from '@google-form-clone/hooks';
import { store } from '../store/store';

const Preview = () => {
  const { useDispatch, useSelector } = useRedux<typeof store>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questionIDList = useSelector((store) => {
    return store.docs.questionIDList;
  });

  const question = useSelector((store) => store.question);
  const response = useSelector((store) => store.response);

  const submitForm = () => {
    let checkRequired = true;

    questionIDList.forEach((qID) => {
      const { required } = question[qID];
      const responseContent = response[qID];

      if (required && responseContent === null) checkRequired = false;
    });

    if (!checkRequired) {
      alert('필수 질문에 응답해주세요');
      return;
    }

    navigate('/result');
  };

  useEffect(() => {
    // 응답 상태 초기화
    questionIDList.map((qID) => dispatch(editResponse({ questionID: qID, content: null })));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-violet-100">
      <div className="fixed w-full h-[56px] flex justify-end shadow-sm border-b-gray-200 border-b-[1px] p-4 items-center bg-gray-50 z-50">
        <Link to={'/editor'}>
          <IconButton>
            <RiEdit2Line className="w-[20px] h-[20px] text-gray-600" />
          </IconButton>
        </Link>
      </div>
      <div className="flex justify-center w-full px-4 py-20">
        <form className="flex flex-[2] gap-4 flex-col items-end  max-w-[720px]">
          <TitleBlock />
          {questionIDList.map((qID) => (
            <QuestionBlock key={qID} questionID={qID} />
          ))}
          <button
            type="button"
            onClick={submitForm}
            className="w-[120px] p-3 text-white text-md bg-violet-800 rounded-xl hover:bg-violet-500 active:bg-violet-900"
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
};

export default Preview;
