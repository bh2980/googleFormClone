import { useRef } from "react";

interface useDnDProps {
  handleItem: (fromIdx: number, toIdx: number) => void;
}

export interface DnDAction {
  fromIdx: number;
  toIdx: number;
}

const setStyle = (target: HTMLElement, style: Partial<CSSStyleDeclaration>) => {
  Object.assign(target.style, style);
};

const useDnDList_unstable = <T extends HTMLElement = HTMLDivElement>({ handleItem }: useDnDProps) => {
  const indexRef = useRef(-1);
  const constainerRef = useRef<T>(null);

  const onMouseDown = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();

    if (!constainerRef.current) return;

    const itemList = [...constainerRef.current.childNodes] as HTMLElement[];
    const aboveItemList: HTMLElement[] = [];
    const belowItemList: HTMLElement[] = [];

    const aboveItemSet = new Set();
    const belowItemSet = new Set();

    let dragIdx = -1;

    itemList.forEach((item, idx) => {
      if (item === (e.target as HTMLElement)) {
        dragIdx = idx;
        return;
      }

      item.dataset.dragIdx = String(idx);

      if (dragIdx < 0) {
        aboveItemList.push(item);
        aboveItemSet.add(idx);
      } else {
        belowItemList.push(item);
        belowItemSet.add(idx);
      }
    });

    const dragItem = itemList[dragIdx];

    console.log(aboveItemList, aboveItemSet);
    console.log(belowItemList, belowItemSet);
    console.log(dragItem, dragIdx);

    const mouseMoveHandler = (moveEvent: MouseEvent) => {};

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", () => {}, { once: true });
  };

  return {
    handleDrag: onMouseDown,
    constainerRef,
  };
};

export default useDnDList_unstable;
