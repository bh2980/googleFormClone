import { useRef } from "react";

interface useDnDProps {
  itemIDList: string[];
  itemID: string;
  gap: number;
  dataAttrName: string;
  orderItem: (fromIdx: number, toIdx: number) => void;
}

//DND는 List를 ref로 가져오거나 div 배열로 가져오자... id로 하지말고...
const useDnDList = ({ itemIDList, itemID, gap, dataAttrName, orderItem }: useDnDProps) => {
  const findItemIdx = (findID: string) => itemIDList.findIndex((itemID) => itemID === findID);

  const divRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<number>(findItemIdx(itemID));

  const handleDrag = (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    clickEvent.preventDefault();

    if (!divRef?.current) return;

    const { width, height, top, left } = divRef.current.getBoundingClientRect();

    divRef.current.style.position = "fixed";
    divRef.current.style.width = `${width}px`;
    divRef.current.style.height = `${height}px`;
    divRef.current.style.top = `${top}px`;
    divRef.current.style.left = `${left}px`;
    divRef.current.style.pointerEvents = "none";
    divRef.current.style.zIndex = "9999";

    const MOVE_DISTANCE = height + gap;

    let flag = false;
    const allItemBlocks: NodeListOf<HTMLElement> = document.querySelectorAll(`[${dataAttrName}]`);

    //클릭 아이템 하단 아이템들 translateY
    allItemBlocks.forEach((item) => {
      if (item === divRef.current) {
        flag = true;
        return;
      }

      if (flag) {
        item.style.transform = `translateY(${MOVE_DISTANCE}px)`;
      }
    });

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - clickEvent.clientY;

      if (!divRef.current) return;

      divRef.current.style.transform = `translateY(${deltaY}px)`;

      const { height: dragHeight, top: dragTop } = divRef.current.getBoundingClientRect();

      const allItemBlocks: NodeListOf<HTMLElement> = document.querySelectorAll(`[${dataAttrName}]`);

      allItemBlocks.forEach((item) => {
        if (item === divRef.current) return;

        const { height: itemHeight, top: itemTop } = item.getBoundingClientRect();

        if (!divRef.current) return;

        const isBelowOverlapping = dragTop < itemTop + itemHeight / 2 && itemTop < dragTop + dragHeight / 2;

        if (isBelowOverlapping) {
          if (item.getAttribute("style")) {
            item.style.transform = "";
            indexRef.current++;
          } else {
            item.style.transform = `translateY(${MOVE_DISTANCE}px)`;
            indexRef.current--;
          }
        }
      });
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", mouseMoveHandler);

        if (!divRef?.current) return;

        divRef.current.style.pointerEvents = "";
        divRef.current.style.opacity = "";
        divRef.current.style.zIndex = "";
        divRef.current.style.top = "";
        divRef.current.style.left = "";
        divRef.current.style.width = "";
        divRef.current.style.height = "";
        divRef.current.style.position = "";

        const allItemBlocks = document.querySelectorAll(`[${dataAttrName}]`);
        allItemBlocks.forEach((block) => {
          (block as HTMLElement).style.transform = "";
        });

        const dragQBlockIdx = findItemIdx(itemID);

        orderItem(dragQBlockIdx, indexRef.current);
      },
      { once: true }
    );
  };

  return {
    handleDrag,
    divRef,
  };
};

export default useDnDList;
