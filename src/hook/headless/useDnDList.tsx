import { useEffect, useRef } from "react";

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

//https://www.youtube.com/watch?v=PyGqKt86gU0&t=1589s
const useDnDList = <T extends HTMLElement = HTMLDivElement>({ handleItem }: useDnDProps) => {
  const indexRef = useRef(-1);
  const constainerRef = useRef<T>(null);

  const DRAG_MOVING_EVENT = "mousemove";
  const DRAG_END_EVENT = "mouseup";

  const handleDrag = (clickEvent: React.MouseEvent<Element, MouseEvent>, dragIdx: number) => {
    clickEvent.preventDefault();

    if (!constainerRef.current) return;

    indexRef.current = dragIdx;

    const itemList = [...constainerRef.current.childNodes] as HTMLElement[];
    const dragItem = itemList[dragIdx];

    const GAP =
      itemList.length > 1 ? itemList[1].getBoundingClientRect().top - itemList[0].getBoundingClientRect().bottom : 0;

    const { width, height, top, left } = dragItem.getBoundingClientRect();

    const MOVE_DISTANCE = height + GAP;

    setStyle(dragItem, {
      position: "fixed",
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
      pointerEvents: "none",
      zIndex: "9999",
      opacity: "0.5",
    });

    const tempDiv = document.createElement("div");

    setStyle(tempDiv, {
      width: `${width}px`,
      height: `${height}px`,
      pointerEvents: "none",
    });

    dragItem.parentElement?.appendChild(tempDiv);

    itemList.forEach((item, idx) => {
      if (idx === dragIdx) return;

      if (idx > dragIdx) {
        item.style.transform = `translateY(${MOVE_DISTANCE}px)`;
        item.classList.add("moved");
      }
    });

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - clickEvent.clientY;

      if (!dragItem) return;

      dragItem.style.transform = `translateY(${deltaY}px)`;

      const { height: dragHeight, top: dragTop } = dragItem.getBoundingClientRect();

      itemList.forEach((item) => {
        if (item === dragItem) return;

        if (item.style.transition.length === 0) setStyle(item, { transition: "all 0.2s" });

        const { height: itemHeight, top: itemTop } = item.getBoundingClientRect();

        //위에서 아래로 갈 경우 드래그 중인 아이템의 1/2이 하단 아이템에 겹칠 경우
        //아래서 위로 갈 경우 하단 아이템의 1/2이 드래그 아이템에 겹칠 경우
        const isOverlapping = dragTop < itemTop + itemHeight / 3 && itemTop < dragTop + dragHeight / 3;

        // 일단, moving이 없는 상태에서 체크
        // moved가 있는지 아닌지 체크
        // moved가 있다면, translateY 초기화 0px - moved 제거, moving 추가 -> moving 제거
        // moved가 없다면, translateY MOVE_DISTANCE px + moving 추가 -> moving 제거, moved 추가
        if (!item.classList.contains("moving") && isOverlapping) {
          if (item.classList.contains("moved")) {
            item.style.transform = ``;
            item.classList.remove("moved");
            item.classList.add("moving");

            item.addEventListener(
              "transitionend",
              () => {
                item.classList.remove("moving");
              },
              { once: true }
            );

            setTimeout(() => {
              item.classList.remove("moving");
            }, 200);

            indexRef.current++;
          } else {
            item.style.transform = `translateY(${MOVE_DISTANCE}px)`;
            item.classList.add("moving");

            item.addEventListener(
              "transitionend",
              () => {
                item.classList.remove("moving");
                item.classList.add("moved");
              },
              { once: true }
            );

            setTimeout(() => {
              item.classList.remove("moving");
              if (!item.classList.contains("moved")) item.classList.add("moved");
            }, 200);

            indexRef.current--;
          }
        }
      });
    };

    document.addEventListener(DRAG_MOVING_EVENT, mouseMoveHandler);
    document.addEventListener(
      DRAG_END_EVENT,
      () => {
        document.removeEventListener(DRAG_MOVING_EVENT, mouseMoveHandler);

        if (!dragItem || !constainerRef.current) return;

        constainerRef.current.removeChild(tempDiv);

        setStyle(dragItem, {
          position: "",
          width: "",
          height: "",
          top: "",
          left: "",
          pointerEvents: "",
          zIndex: "",
          opacity: "",
        });

        itemList.forEach((item) => {
          item.style.transform = "";
          item.style.transition = "";

          item.classList.remove("moving");
          item.classList.remove("moved");
        });

        handleItem(dragIdx, indexRef.current);
      },
      { once: true }
    );
  };

  return {
    handleDrag,
    constainerRef,
  };
};

export default useDnDList;
