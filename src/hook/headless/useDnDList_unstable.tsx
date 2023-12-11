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

const getDragIdx = (item: HTMLElement) => Number(item.dataset.dragIdx);

const isMoved = (item: HTMLElement) => item.classList.contains("moved");

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

    indexRef.current = dragIdx;

    belowItemList.reverse();

    const placeholder = itemList[dragIdx];

    //cloneItem for drag

    const dragItem = placeholder.cloneNode(true) as HTMLElement;

    const { top, left, width, height } = placeholder.getBoundingClientRect();

    setStyle(dragItem, {
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
      pointerEvents: "none",
    });

    constainerRef.current.appendChild(dragItem);

    const GAP =
      itemList.length > 1 ? itemList[1].getBoundingClientRect().top - itemList[0].getBoundingClientRect().bottom : 0;

    const MOVE_DISTANCE = height + GAP;

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();

      const { clientX, clientY } = moveEvent;

      const deltaX = clientX - dragStartX;
      const deltaY = clientY - dragStartY;

      setStyle(dragItem, { transform: makeTransition(deltaX, deltaY) });

      const belowItem = document.elementFromPoint(clientX, clientY)?.closest("[data-drag-idx]") as HTMLElement;

      if (belowItem) {
        const belowDragIdx = getDragIdx(belowItem);

        const diff = aboveItemSet.has(belowDragIdx) ? 1 : -1;

        const [currentPosList, currentPostSet] = aboveItemSet.has(belowDragIdx)
          ? [aboveItemList, aboveItemSet]
          : [belowItemList, belowItemSet];
        const [nextPosList, nextPosSet] = !aboveItemSet.has(belowDragIdx)
          ? [aboveItemList, aboveItemSet]
          : [belowItemList, belowItemSet];

        while (currentPostSet.has(belowDragIdx)) {
          const popItem = currentPosList.pop() as HTMLElement;
          const popItemDragIdx = getDragIdx(popItem);
          currentPostSet.delete(popItemDragIdx);

          nextPosList.push(popItem);
          nextPosSet.add(popItemDragIdx);

          indexRef.current += -diff;

          const placeholderMove = (indexRef.current - dragIdx) * MOVE_DISTANCE;

          setStyle(placeholder, { transform: makeTransition(0, placeholderMove) });

          if (isMoved(popItem)) {
            setStyle(popItem, { transform: makeTransition(0, 0) });

            popItem.classList.remove("moved");
          } else {
            const popItemMove = MOVE_DISTANCE * diff;

            popItem.classList.add("moved");

            setStyle(popItem, { transform: makeTransition(0, popItemMove) });
          }
        }
      }
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      dragItem.remove();

      setStyle(placeholder, { opacity: "", pointerEvents: "" });

      handleItem(dragIdx, indexRef.current);

      itemList.forEach((item) => {
        setStyle(item, { transform: "" });
        item.removeAttribute("data-drag-idx");
        item.classList.remove("moved");
      });
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
