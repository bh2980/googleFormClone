import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { ICON_CLASS } from "../../constants";
import { useEffect, useRef, useState } from "react";
import classMerge from "../../utils/classMerge";

// 외부에서 Dropdown이 설정한 값을 참조할 수 있도록 만들어야함
interface DropdownItem {
  content: string;
}

interface DropdownProps {
  className?: string;
  itemList: DropdownItem[];
  onChange?: (idx: number) => void;
}

const Dropdown = ({ className, itemList = [], onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectIdx, setSelectIdx] = useState(0);
  const dropdownListRef = useRef<HTMLDivElement>(null);

  const selectItem = (idx: number) => {
    setSelectIdx(idx);
    setIsOpen(false);
    if (onChange) onChange(idx); // 외부 함수에 idx 전달
  };

  const changeOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        dropdownListRef.current &&
        !dropdownListRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="z-50 group" tabIndex={0}>
      <div
        ref={dropdownListRef}
        className={classMerge([
          "w-[200px] border-2 h-[56px] bg-white flex items-center px-4 rounded-lg justify-between hover:bg-gray-100 active:bg-gray-200 cursor-pointer",
          className,
        ])}
        onClick={changeOpen}
      >
        <span>{itemList[selectIdx]?.content}</span>
        {isOpen ? <RiArrowDropUpFill className={ICON_CLASS} /> : <RiArrowDropDownFill className={ICON_CLASS} />}
      </div>
      {isOpen ? (
        <div className="absolute w-[200px] border-2 bg-white hidden flex-col rounded-lg shadow-2xl group-focus-within:flex">
          {itemList.map((item, idx) => (
            <div
              key={item.content}
              className={classMerge([
                "flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 active:bg-gray-200",
                idx === selectIdx && "bg-sky-50",
              ])}
              onClick={() => selectItem(idx)}
            >
              <span>{item.content}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
