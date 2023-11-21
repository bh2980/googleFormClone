import { useRef, useState } from "react";

interface useDnDProps {
  itemIDList: string[];
  itemID: string;
  gap: number;
  dataAttrName: string;
  orderItem: (fromIdx: number, toIdx: number) => void;
}

const useDnDList = ({ itemIDList, itemID, gap, dataAttrName, orderItem }: useDnDProps) => {
  const findItemIdx = (findQID: string) => itemIDList.findIndex((qID) => qID === findQID);

  const divRef = useRef<HTMLDivElement>(null);
  const lastUnderBlockIdx = useRef<number>(findItemIdx(itemID));

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleDrag = (clickEvent: React.MouseEvent<Element, MouseEvent>) => {
    clickEvent.preventDefault();

    if (!divRef?.current) return;

    divRef.current.style.pointerEvents = "none";
    divRef.current.style.opacity = "80%";
    divRef.current.style.zIndex = "999";

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - clickEvent.clientY;

      setMousePos({
        x: mousePos.x,
        y: mousePos.y + deltaY,
      });

      const itemUnderCursor = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY) as HTMLElement;

      const itemBlock = itemUnderCursor.closest(`[${dataAttrName}]`) as HTMLElement;

      if (itemBlock) {
        const underQBlockIdx = findItemIdx(itemBlock.getAttribute(dataAttrName)!);

        // 같을 때 처리
        if (lastUnderBlockIdx.current === underQBlockIdx || !divRef.current) return;

        const draggedElementHeight = divRef.current.offsetHeight;

        itemBlock.style.position = "relative";

        const top = parseInt((itemBlock.style.top ? itemBlock.style.top : "0px").replace("px", ""));

        if (lastUnderBlockIdx.current > underQBlockIdx) {
          //위로
          itemBlock.style.top = `${top + draggedElementHeight + gap}px`;
          lastUnderBlockIdx.current = underQBlockIdx - 0.1;
          console.log("위로", lastUnderBlockIdx.current);
        } else {
          // 아래로 가는 경우
          itemBlock.style.top = `${top - draggedElementHeight - gap}px`;
          lastUnderBlockIdx.current = underQBlockIdx + 0.1;
          console.log("아래로", lastUnderBlockIdx.current);
        }
      }
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", mouseMoveHandler);

        if (!divRef?.current) return;

        divRef.current.style.pointerEvents = "";
        divRef.current.style.opacity = "100%";
        divRef.current.style.position = "";
        divRef.current.style.zIndex = "auto";

        setMousePos({
          x: 0,
          y: 0,
        });

        const dragQBlockIdx = findItemIdx(itemID);

        const allItemBlocks = document.querySelectorAll(`[${dataAttrName}]`);
        allItemBlocks.forEach((block) => {
          (block as HTMLElement).style.top = "0px";
          (block as HTMLElement).style.position = "";
        });

        if (lastUnderBlockIdx.current === dragQBlockIdx) return;

        const targetIdx =
          lastUnderBlockIdx.current < 0
            ? 0
            : lastUnderBlockIdx.current > itemIDList.length - 1
            ? itemIDList.length - 1
            : ((lastUnderBlockIdx.current + 1) * 10) % 10 === 9
            ? lastUnderBlockIdx.current + 0.1
            : lastUnderBlockIdx.current - 0.1;

        orderItem(dragQBlockIdx, targetIdx);
      },
      { once: true }
    );
  };

  return {
    handleDrag,
    divRef,
    WrapperStyle: { transform: `translateX(${mousePos.x}px) translateY(${mousePos.y}px)` },
  };
};

export default useDnDList;
