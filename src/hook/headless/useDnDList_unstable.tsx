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

const makePx = (number: number) => `${number}px`;

const makeTranslate = (x: number, y: number) => `translate(${makePx(x)}, ${makePx(y)})`;

const useDnDList_unstable = <T extends HTMLElement = HTMLDivElement>({ handleItem }: useDnDProps) => {
  const containerRef = useRef<T>(null);

  const getDragIdx = (item: HTMLElement) => item.dataset.dragIdx!;

  const dragStart = (e: React.MouseEvent) => {
    if (!containerRef?.current) return;

    e.preventDefault();

    const dragStartPoint = { clientX: e.clientX, clientY: e.clientY };

    containerRef.current.childNodes.forEach((item, idx) => {
      const dragListItem = item as HTMLElement;

      dragListItem.dataset.dragIdx = String(idx);
      setStyle(dragListItem, { transition: "transform 0.2s" });
    });

    const dragItem = e.target as HTMLElement;
    const dragItemIdx = getDragIdx(dragItem);

    const cloneNode = dragItem.cloneNode(true) as HTMLElement;
    const { width, height, top, left } = dragItem.getBoundingClientRect();

    setStyle(cloneNode, {
      position: "fixed",
      pointerEvents: "none",
      zIndex: "9999",
      width: makePx(width),
      height: makePx(height),
      top: makePx(top),
      left: makePx(left),
      transition: "",
    });

    setStyle(dragItem, { opacity: "0.5", border: "1px solid blue" });

    containerRef.current.appendChild(cloneNode);

    const mouseMove = (e: MouseEvent) => {
      e.preventDefault();

      const deltaX = e.clientX - dragStartPoint.clientX;
      const deltaY = e.clientY - dragStartPoint.clientY;
      setStyle(cloneNode, { transform: makeTranslate(deltaX, deltaY) });

      const belowElement = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      const dragListItemIdx = getDragIdx(belowElement);

      if (dragListItemIdx && dragListItemIdx !== dragItemIdx) {
        console.log(dragListItemIdx);
      }
    };

    const mouseUp = (e: MouseEvent) => {
      document.removeEventListener("mousemove", mouseMove);
      cloneNode.remove();

      dragItem.removeAttribute("style");
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  return { containerRef, dragStart };
};

export default useDnDList_unstable;
