import { useRef } from "react";

interface useDnDProps {
  handleItem: (fromIdx: number, toIdx: number) => void;
}

//DND는 container를 가져오기
const useDnDList = ({ handleItem }: useDnDProps) => {
  const indexRef = useRef(-1);
  const constainerRef = useRef<HTMLDivElement>(null);

  const DnDList = ({ children, ...props }: React.PropsWithChildren & React.ComponentPropsWithoutRef<"div">) => {
    return (
      <div ref={constainerRef} {...props}>
        {children}
      </div>
    );
  };

  const handleDrag = (clickEvent: React.MouseEvent<Element, MouseEvent>, dragIdx: number) => {
    clickEvent.preventDefault();

    if (!constainerRef.current) return;

    indexRef.current = dragIdx;

    const itemList = [...constainerRef.current.childNodes] as HTMLElement[];
    const dragItem = itemList[dragIdx];
    const belowDragItemList = itemList.slice(dragIdx + 1);

    const GAP =
      itemList.length > 1 ? itemList[1].getBoundingClientRect().top - itemList[0].getBoundingClientRect().bottom : 0;

    const { width, height, top, left } = dragItem.getBoundingClientRect();

    dragItem.style.position = "fixed";
    dragItem.style.width = `${width}px`;
    dragItem.style.height = `${height}px`;
    dragItem.style.top = `${top}px`;
    dragItem.style.left = `${left}px`;
    dragItem.style.pointerEvents = "none";
    dragItem.style.zIndex = "9999";

    const tempDiv = document.createElement("div");
    tempDiv.style.width = `${width}px`;
    tempDiv.style.height = `${height}px`;
    tempDiv.style.pointerEvents = "none";

    constainerRef.current.appendChild(tempDiv);

    const MOVE_DISTANCE = height + GAP;

    //클릭 아이템 하단 아이템들 translateY
    belowDragItemList.forEach((item) => {
      item.style.transform = `translateY(${MOVE_DISTANCE}px)`;
    });

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - clickEvent.clientY;

      if (!dragItem) return;

      dragItem.style.transform = `translateY(${deltaY}px)`;

      const { height: dragHeight, top: dragTop } = dragItem.getBoundingClientRect();

      itemList.forEach((item) => {
        if (item === dragItem) return;

        const { height: itemHeight, top: itemTop } = item.getBoundingClientRect();

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

        if (!dragItem || !constainerRef.current) return;

        constainerRef.current.removeChild(tempDiv);

        dragItem.style.pointerEvents = "";
        dragItem.style.opacity = "";
        dragItem.style.zIndex = "";
        dragItem.style.top = "";
        dragItem.style.left = "";
        dragItem.style.width = "";
        dragItem.style.height = "";
        dragItem.style.position = "";

        itemList.forEach((block) => {
          block.style.transform = "";
        });

        handleItem(dragIdx, indexRef.current);
      },
      { once: true }
    );
  };

  return {
    handleDrag,
    DnDList,
  };
};

export default useDnDList;
