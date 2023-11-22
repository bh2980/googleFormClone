import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { EDITOR_QUESTION_TYPE, ICON_CLASS } from "../../constants";
import { useEffect, useRef, useState } from "react";
import classMerge from "../../utils/classMerge";
import { createPortal } from "react-dom";

// 외부에서 Dropdown이 설정한 값을 참조할 수 있도록 만들어야함
interface DropdownItem {
  content: string;
}

interface DropdownProps {
  className?: string;
  itemList: DropdownItem[];
  onChange?: (idx: number) => void;
  initialIdx?: EDITOR_QUESTION_TYPE;
}

//Portal을 통한 dropdown list 렌더링
//focus 때문에 망했음 바꾸기
const Dropdown = ({ className, itemList = [], onChange, initialIdx = EDITOR_QUESTION_TYPE.short }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectIdx, setSelectIdx] = useState(initialIdx);
  const dropdownSelectorRef = useRef<HTMLDivElement>(null);
  const dropdownListRef = useRef<HTMLDivElement>(null);

  const selectItem = (e: React.MouseEvent, idx: number) => {
    setSelectIdx(idx);
    setIsOpen(false);
    if (onChange) onChange(idx); // 외부 함수에 idx 전달
    console.log(dropdownSelectorRef.current);
    if (dropdownSelectorRef.current) dropdownSelectorRef.current.focus();
  };

  const changeOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        dropdownSelectorRef.current &&
        !dropdownSelectorRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (!dropdownSelectorRef?.current || !dropdownListRef?.current) return;

      const { height, top, left } = dropdownSelectorRef.current.getBoundingClientRect();
      dropdownListRef.current.style.top = `${top + height}px`;
      dropdownListRef.current.style.left = `${left}px`;
    }

    console.log(document.activeElement);
  }, [isOpen]);

  return (
    <div className="group" tabIndex={0} ref={dropdownSelectorRef}>
      <div
        className={classMerge([
          "w-[200px] border-2 h-[56px] bg-white flex items-center px-4 rounded-lg justify-between hover:bg-gray-100 active:bg-gray-200 cursor-pointer",
          className,
        ])}
        onClick={changeOpen}
      >
        <span>{itemList[selectIdx]?.content}</span>
        {isOpen ? <RiArrowDropUpFill className={ICON_CLASS} /> : <RiArrowDropDownFill className={ICON_CLASS} />}
      </div>
      {isOpen
        ? createPortal(
            <div
              ref={dropdownListRef}
              className="z-50 absolute top-0 left-0 w-[200px] border-2 bg-white flex-col rounded-lg shadow-2xl"
            >
              {itemList.map((item, idx) => (
                <div
                  key={item.content}
                  className={classMerge([
                    "flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 active:bg-gray-200",
                    idx === selectIdx && "bg-sky-50",
                  ])}
                  onClick={(e) => selectItem(e, idx)}
                >
                  <span>{item.content}</span>
                </div>
              ))}
            </div>,
            document.body
          )
        : null}
    </div>
  );
};

export default Dropdown;
