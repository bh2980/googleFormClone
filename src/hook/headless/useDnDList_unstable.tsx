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

//https://www.youtube.com/watch?v=PyGqKt86gU0&t=1589s
const useDnDList_unstable = <T extends HTMLElement = HTMLDivElement>() => {
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

    containerRef.current.appendChild(cloneNode);

    const mouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartPoint.clientX;
      const deltaY = e.clientY - dragStartPoint.clientY;
      setStyle(cloneNode, { transform: `translate(${makePx(deltaX)}, ${makePx(deltaY)})` });
    };

    const mouseUp = (e: MouseEvent) => {
      document.removeEventListener("mousemove", mouseMove);
      cloneNode.remove();
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  return { containerRef, dragStart };
};

export default useDnDList_unstable;
