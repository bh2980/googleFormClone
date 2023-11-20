import {
  RiDeleteBin6Line,
  RiDraggable,
  RiDropdownList,
  RiFileCopyLine,
  RiGalleryFill,
  RiMore2Fill,
} from "react-icons/ri";
import Block from "./common/Block";
import Input from "./common/Input";
import Divider from "./common/Divider";
import { ICON_CLASS } from "../constants";
import classMerge from "../utils/classMerge";
import IconButton from "./common/IconButton";
import Switch from "./common/Switch";

interface QuestionBlockProps extends React.ComponentPropsWithRef<"div"> {
  type?: "short" | "long" | "radio" | "checkbox" | "dropdown";
}

const QuestionBlock = ({ type = "short", ...props }: QuestionBlockProps) => {
  return (
    <Block className="w-full" {...props}>
      <button className="flex justify-center w-full py-2 cursor-move">
        <RiDraggable className="rotate-90" />
      </button>
      <div className="flex flex-col gap-6 px-6 pb-6">
        <div className="flex items-center justify-between gap-4 group">
          <Input placeholder="질문" className="focus:hover:bg-gray-200 focus:bg-gray-100 focus:p-4 w-[380px]" />
          <IconButton>
            <RiGalleryFill className={classMerge([ICON_CLASS, "hidden group-focus-within:flex"])} />
          </IconButton>
          <div className="w-[200px] bg-gray-100 gap-4 justify-between p-4 items-center hidden group-focus-within:flex">
            <RiDropdownList />
            드롭박스
          </div>
        </div>
        <input placeholder="단답형 메시지" readOnly /> {/** 여기게 type 렌더링 */}
        <div className="flex-col hidden group-focus-within:flex group-focus-within:flex-col group-focus-within:gap-4">
          <Divider />
          <div className="flex items-center justify-end gap-2 pt-4 h-[48px]">
            <IconButton>
              <RiFileCopyLine className={ICON_CLASS} />
            </IconButton>
            <IconButton>
              <RiDeleteBin6Line className={ICON_CLASS} />
            </IconButton>
            <Divider direction="vertical" className="mx-2" />
            <Switch description="필수" descriptionPos="before" />
            <IconButton>
              <RiMore2Fill className={ICON_CLASS} />
            </IconButton>
          </div>
        </div>
      </div>
    </Block>
  );
};

export default QuestionBlock;
