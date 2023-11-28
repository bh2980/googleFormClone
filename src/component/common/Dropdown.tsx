import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { EDITOR_QUESTION_TYPE, ICON_CLASS } from "../../constants";
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
  initialIdx?: EDITOR_QUESTION_TYPE;
}

const Dropdown = ({ className, itemList = [], onChange, initialIdx = EDITOR_QUESTION_TYPE.short }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectIdx, setSelectIdx] = useState(initialIdx);
  const dropdownSelectorRef = useRef<HTMLDivElement>(null);
  const dropdownListRef = useRef<HTMLUListElement>(null);

  const selectItem = (idx: number) => {
    setSelectIdx(idx);
    setIsOpen(false);
    if (onChange) onChange(idx); // 외부 함수에 idx 전달
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

      const { height, top } = dropdownSelectorRef.current.getBoundingClientRect();
      const { height: listHeight } = dropdownListRef.current.getBoundingClientRect();

      if (dropdownSelectorRef.current.offsetTop + height + listHeight >= window.innerHeight) {
        dropdownListRef.current.style.top = `${height + top - listHeight / 2}px`;
      } else {
        dropdownListRef.current.style.top = `${height + top}px`;
      }
    }
  }, [isOpen]);

  return (
    <div className="relative group" tabIndex={0} ref={dropdownSelectorRef}>
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
      <ul
        ref={dropdownListRef}
        className={classMerge([
          [isOpen ? "fixed" : "hidden", "z-50 w-[200px] border-2 bg-white flex-col rounded-lg shadow-2xl"],
        ])}
      >
        {itemList.map((item, idx) => (
          <li
            key={item.content}
            className={classMerge([
              "flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 active:bg-gray-200",
              idx === selectIdx && "bg-sky-50",
            ])}
            onClick={() => selectItem(idx)}
          >
            <span>{item.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
