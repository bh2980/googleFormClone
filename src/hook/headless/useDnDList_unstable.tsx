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

const isMoved = (item: HTMLElement) => item.classList.contains("moved");

const makeTranslate = (x: number, y: number) => `translate(${makePx(x)}, ${makePx(y)})`;

const useDnDList_unstable = <T extends HTMLElement = HTMLDivElement>({ handleItem }: useDnDProps) => {
  const containerRef = useRef<T>(null);
  const stackRef = useRef<number[]>([]);

  const getDragIdx = (item: HTMLElement) => Number(item.dataset.dragIdx);
  const getStackTop = () => stackRef.current[stackRef.current.length - 1];

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

    stackRef.current.push(dragItemIdx);

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

    const GAP =
      containerRef.current.childNodes.length <= 1
        ? 0
        : (containerRef.current.childNodes[1] as HTMLElement).getBoundingClientRect().top -
          (containerRef.current.childNodes[0] as HTMLElement).getBoundingClientRect().bottom;

    const MOVE_DISTANCE = height + GAP;

    const mouseMove = (e: MouseEvent) => {
      e.preventDefault();

      const deltaX = e.clientX - dragStartPoint.clientX;
      const deltaY = e.clientY - dragStartPoint.clientY;
      setStyle(moveItem, { transform: makeTranslate(deltaX, deltaY) });

      const belowElement = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-drag-idx]") as HTMLElement;

      if (belowElement) {
        const belowItemIdx = getDragIdx(belowElement);
        const stackTop = getStackTop();

        if (belowItemIdx === stackTop || belowItemIdx === dragItemIdx) return; // stack에 이미 들어갔을 경우 처리 X

        console.log(belowItemIdx);
        // stacktop부터 현재 드래그까지 모든 idx에 대해 처리
        const diff = belowItemIdx > stackTop ? 1 : -1;

        if (isMoved(belowElement)) {
        } else {
          const processIdxArr = Array.from(
            { length: (belowItemIdx - stackTop) / diff },
            (_, i) => stackTop + (i + 1) * diff
          ).forEach((itemIdx) => {
            const movingElement = containerRef.current?.childNodes[itemIdx] as HTMLElement;
            const movingDistance = MOVE_DISTANCE * diff * -1;

            const ghostDistance = MOVE_DISTANCE * (itemIdx - dragItemIdx);

            setStyle(placeholder, { transform: makeTranslate(0, ghostDistance) });

            setStyle(movingElement, { transform: makeTranslate(0, movingDistance) });
            movingElement.classList.add("moved");
          });
          console.log(processIdxArr);
        }

        // 드래그 idx면 제거
        // stacktop과 idx가 같으면 빼고 translate 적용 제거
        // stacktop과 idx과 다르면 stack에 넣고 translate 적용
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
