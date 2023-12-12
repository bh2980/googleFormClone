import { useRef } from "react";

interface useDnDProps {
  handleItem: (fromIdx: number, toIdx: number) => void;
  ghost?: boolean;
}

export interface DnDAction {
  fromIdx: number;
  toIdx: number;
}

const useDnDList_unstable = <T extends HTMLElement = HTMLDivElement>({ handleItem, ghost = false }: useDnDProps) => {
  const constainerRef = useRef<T>(null);

  const setStyle = (target: HTMLElement, style: Partial<CSSStyleDeclaration>) => {
    Object.assign(target.style, style);
  };

  const makePx = (px: number) => `${px}px`;

  const makeTransition = (x: number, y: number) => `translate3d(${makePx(x)}, ${makePx(y)}, 0)`;

  const getDragIdx = (item: HTMLElement) => Number(item.dataset.dragIdx);

  const isMoved = (item: HTMLElement) => item.classList.contains("moved");

  const mouseDownHandler = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();

    if (!constainerRef.current) return;

    const { clientX: dragStartX, clientY: dragStartY } = e;

    const itemList = [...constainerRef.current.childNodes] as HTMLElement[];
    const aboveItemList: HTMLElement[] = [];
    const belowItemList: HTMLElement[] = [];

    const aboveItemSet = new Set();
    const belowItemSet = new Set();

    // drag start idx
    let dragIdx = -1;

    // set data-drag-idx attribute to item and transition
    // also set above item list, below item list and drag item idx
    itemList.forEach((item, idx) => {
      item.dataset.dragIdx = String(idx);
      setStyle(item, { transition: "transform 0.2s" });

      if (item === (e.target as HTMLElement).closest("[data-drag-idx]")) {
        dragIdx = idx;
        return;
      }

      if (dragIdx < 0) {
        aboveItemList.push(item);
        aboveItemSet.add(idx);
      } else {
        belowItemList.push(item);
        belowItemSet.add(idx);
      }
    });

    // arrive idx
    let moveToIdx = dragIdx;
    const placeholder = itemList[dragIdx];

    // reverse belowItemList to pop and push
    belowItemList.reverse();

    //clone item for drag
    const dragItem = placeholder.cloneNode(true) as HTMLElement;

    const { top, left, width, height } = placeholder.getBoundingClientRect();

    // set clone style
    setStyle(dragItem, {
      position: "fixed",
      top: makePx(top),
      left: makePx(left),
      width: makePx(width),
      height: makePx(height),
      pointerEvents: "none",
      zIndex: "9999",
      transition: "",
    });

    // set ghost(placeholder) style
    if (ghost)
      setStyle(placeholder, {
        opacity: "0.5",
        pointerEvents: "none",
      });
    else
      setStyle(placeholder, {
        visibility: "hidden",
        pointerEvents: "none",
      });

    constainerRef.current.appendChild(dragItem);

    // calculate gap between item and move distance
    const GAP =
      itemList.length > 1 ? itemList[1].getBoundingClientRect().top - itemList[0].getBoundingClientRect().bottom : 0;

    //TODO MOVE_DISTANCE가 일정하지 않을 경우 대비
    const MOVE_DISTANCE = height + GAP;

    // calc ghost move distance
    let placeholderMove = 0;

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();

      const { clientX, clientY } = moveEvent;

      // move dragItem to follow mouse only vertical
      const deltaY = clientY - dragStartY;

      setStyle(dragItem, { transform: makeTransition(0, deltaY) });

      // find data-drag-idx element and update
      const belowItem = document.elementFromPoint(clientX, clientY)?.closest("[data-drag-idx]") as HTMLElement;

      if (belowItem) {
        const belowDragIdx = getDragIdx(belowItem);

        // calc below item move direction
        const diff = aboveItemSet.has(belowDragIdx) ? 1 : -1;

        const [currentPosList, currentPosSet] = aboveItemSet.has(belowDragIdx)
          ? [aboveItemList, aboveItemSet]
          : [belowItemList, belowItemSet];
        const [nextPosList, nextPosSet] = !aboveItemSet.has(belowDragIdx)
          ? [aboveItemList, aboveItemSet]
          : [belowItemList, belowItemSet];

        // move all item from currentPos to nextPos until pop below item
        // ex: above -> below
        while (currentPosSet.has(belowDragIdx)) {
          const popItem = currentPosList.pop() as HTMLElement;
          const popItemDragIdx = getDragIdx(popItem);
          currentPosSet.delete(popItemDragIdx);

          nextPosList.push(popItem);
          nextPosSet.add(popItemDragIdx);

          // update current drag position idx
          moveToIdx += -diff;

          placeholderMove += (popItem.getBoundingClientRect().height + GAP) * -diff;

          setStyle(placeholder, { transform: makeTransition(0, placeholderMove) });

          //set below list item transform ans class
          if (isMoved(popItem)) {
            // if already moved(item has 'moved' class), remove transition and 'moved' class
            // set pointerEvent 'none' to avoid unintended behavior while running animation
            setStyle(popItem, { transform: makeTransition(0, 0), pointerEvents: "none" });

            popItem.classList.remove("moved");
          } else {
            // if move yet, set transition and add 'moved' class
            const popItemMove = MOVE_DISTANCE * diff;

            popItem.classList.add("moved");

            setStyle(popItem, { transform: makeTransition(0, popItemMove), pointerEvents: "none" });
          }

          // reset pointerEvent when animation finished
          popItem.addEventListener(
            "transitionend",
            () => {
              setStyle(popItem, { pointerEvents: "" });
            },
            { once: true }
          );
        }
      }
    };

    const mouseUpHandler = () => {
      // remove mousemove event listener
      document.removeEventListener("mousemove", mouseMoveHandler);

      // move dragItem to current placeholder location
      setStyle(dragItem, { transform: makeTransition(0, placeholderMove), transition: "all 0.2s" });

      // when animation finish
      dragItem.addEventListener(
        "transitionend",
        () => {
          // remove dragItem
          dragItem.remove();

          // reset item style, class and attribute
          setStyle(placeholder, { opacity: "", pointerEvents: "", visibility: "" });

          itemList.forEach((item) => {
            setStyle(item, { transform: "", transition: "" });
            item.removeAttribute("data-drag-idx");
            item.classList.remove("moved");
          });

          // call callback function to tell fromIdx and toIdx
          handleItem(dragIdx, moveToIdx);
        },
        { once: true }
      );
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
