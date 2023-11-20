import { useAppDispatch, useAppSelector } from "../hook/storeHook";
import { editContent, editTitle } from "../store/titleSlice";
import Input from "./common/Input";

const TitleBlock = () => {
  const dispatch = useAppDispatch();
  const { title, content } = useAppSelector((store) => store.title);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editTitle(e.target.value));
  };

  const changeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editContent(e.target.value));
  };

  return (
    <div className="w-[720px] bg-white rounded-xl flex flex-col justify-between overflow-hidden">
      <div className="w-full h-[8px] bg-violet-800"></div>
      <div className="flex flex-col gap-6 p-8">
        <Input className="text-3xl" onChange={changeTitle} value={title} placeholder="제목을 입력하세요" />
        <Input value={content} onChange={changeContent} placeholder="설명을 입력하세요" />
      </div>
    </div>
  );
};

export default TitleBlock;
