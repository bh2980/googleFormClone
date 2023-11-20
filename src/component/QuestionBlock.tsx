import { RiDeleteBin6Line, RiDraggable, RiFileCopyLine } from "react-icons/ri";
import Block from "./common/Block";
import Input from "./common/Input";
import Divider from "./common/Divider";
import { EDITOR_DROPDOWN_LIST, ICON_CLASS } from "../constants";
import IconButton from "./common/IconButton";
import Switch from "./common/Switch";
import Dropdown from "./common/Dropdown";
import { useState } from "react";

type BlockType = "short" | "long" | "radio" | "checkbox" | "dropdown";

interface QuestionBlockProps extends React.ComponentPropsWithRef<"div"> {
  type?: BlockType;
  isForm?: boolean;
}
/**
 * QuestionBlock은 BlockID를 받아서 QuestionManager에게 전달
 */
const QuestionBlock = ({ type = "short", ...props }: QuestionBlockProps) => {
  const [blockType, setBlockType] = useState<BlockType>(type);

  const changeBlockType = (idx: number) => {
    //blockType이 변경되면 block의 questionList 초기화
    console.log(idx, EDITOR_DROPDOWN_LIST[idx]);
    setBlockType(EDITOR_DROPDOWN_LIST[idx].type);
  };

  // 나중에
  const dragBlock = () => {
    console.log(type);
  };

  return (
    <Block className="w-full" {...props}>
      <div className="flex justify-center w-full py-2 cursor-move" onClick={dragBlock}>
        <RiDraggable className="rotate-90" />
      </div>
      <div className="flex flex-col gap-6 px-6 pb-6">
        <div className="flex items-center justify-between gap-4 group">
          <Input placeholder="질문" className="focus:hover:bg-gray-200 focus:bg-gray-100 focus:p-4 w-[440px]" />
          <Dropdown
            className="hidden group-focus-within:flex"
            itemList={EDITOR_DROPDOWN_LIST}
            onChange={changeBlockType}
          />
        </div>
        {/** 여기를 어떻게 처리한담 */}
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
          </div>
        </div>
      </div>
    </Block>
  );
};

export default QuestionBlock;
