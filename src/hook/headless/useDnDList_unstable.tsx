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
  const stackRef = useRef<number[]>([]);

  const getDragIdx = (item: HTMLElement) => Number(item.dataset.dragIdx);

  const dragStart = (e: React.MouseEvent) => {
    if (!containerRef?.current) return;

    e.preventDefault();

    const dragStartPoint = { clientX: e.clientX, clientY: e.clientY };

    containerRef.current.childNodes.forEach((item, idx) => {
      const dragListItem = item as HTMLElement;

      dragListItem.dataset.dragIdx = String(idx);
      setStyle(dragListItem, { transition: "transform 0.2s" });
    });

    const placeholder = e.target as HTMLElement;
    const dragItemIdx = getDragIdx(placeholder);

    const moveItem = placeholder.cloneNode(true) as HTMLElement;
    const { width, height, top, left } = placeholder.getBoundingClientRect();

    setStyle(moveItem, {
      position: "fixed",
      pointerEvents: "none",
      zIndex: "9999",
      width: makePx(width),
      height: makePx(height),
      top: makePx(top),
      left: makePx(left),
      transition: "",
    });

    setStyle(placeholder, { opacity: "0.5", border: "1px solid blue" });

    containerRef.current.appendChild(moveItem);

    const mouseMove = (e: MouseEvent) => {
      e.preventDefault();

      const deltaX = e.clientX - dragStartPoint.clientX;
      const deltaY = e.clientY - dragStartPoint.clientY;
      setStyle(moveItem, { transform: makeTranslate(deltaX, deltaY) });

      const belowElement = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-drag-idx]") as HTMLElement;

      if (belowElement) {
        const dragListItemIdx = getDragIdx(belowElement);
        console.log(dragListItemIdx);
      }
    };

    const mouseUp = (e: MouseEvent) => {
      document.removeEventListener("mousemove", mouseMove);
      moveItem.remove();

      placeholder.removeAttribute("style");
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  return { containerRef, dragStart };
};

export default useDnDList_unstable;
