import { RiEdit2Line } from "react-icons/ri";
import IconButton from "../component/common/IconButton";

import { Link } from "react-router-dom";
import { useAppSelector } from "../hook/storeHook";
import TitleBlock from "../component/editor/TitleBlock";
import QuestionBlock from "../component/form/QuestionBlock";

const Form = () => {
  const questionIDList = useAppSelector((store) => store.docs.questionIDList);
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
        <div className="flex-1"></div>
        <form className="flex flex-[2] gap-4 flex-col ">
          <TitleBlock disabled />
          {questionIDList.map((qID) => (
            <QuestionBlock key={qID} questionID={qID} />
          ))}
        </form>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Form;
