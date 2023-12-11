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

const makePx = (px: number) => `${px}px`;

const makeTransition = (x: number, y: number) => `translate3d(${makePx(x)}, ${makePx(y)}, 0)`;

const useDnDList_unstable = <T extends HTMLElement = HTMLDivElement>({ handleItem }: useDnDProps) => {
  const indexRef = useRef(-1);
  const constainerRef = useRef<T>(null);

  const mouseDownHandler = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();

    if (!constainerRef.current) return;

    const { clientX: dragStartX, clientY: dragStartY } = e;

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

    const placeholder = itemList[dragIdx];

    //cloneItem for drag

    const handleItem = placeholder.cloneNode(true) as HTMLElement;

    const { top, left, width, height } = placeholder.getBoundingClientRect();

    setStyle(handleItem, {
      position: "fixed",
      top: makePx(top),
      left: makePx(left),
      width: makePx(width),
      height: makePx(height),
      pointerEvents: "none",
      zIndex: "9999",
    });

    setStyle(placeholder, {
      opacity: "0.5",
    });

    constainerRef.current.appendChild(handleItem);

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();

      const { clientX, clientY } = moveEvent;

      const deltaX = clientX - dragStartX;
      const deltaY = clientY - dragStartY;

      setStyle(handleItem, { transform: makeTransition(deltaX, deltaY) });
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      handleItem.remove();
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  };

  return {
    handleDrag: mouseDownHandler,
    constainerRef,
  };
};

export default useDnDList_unstable;
