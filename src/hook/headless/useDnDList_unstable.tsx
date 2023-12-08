import { useMemo, useRef } from "react";

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
  const prevDiff = useRef(0);

  const isReverse = (diff: number, stackTop: number, belowItemIdx: number) => {
    if (stackTop === belowItemIdx) {
      prevDiff.current = prevDiff.current * -1;
      return true;
    }

    if (prevDiff.current === 0) {
      prevDiff.current = diff;
      return false;
    }

    if (prevDiff.current !== diff) {
      prevDiff.current = diff;
      return true;
    } else return false;
  };

  const getDragIdx = (item: HTMLElement) => Number(item.dataset.dragIdx);
  const getStackTop = () => stackRef.current[stackRef.current.length - 1];

  const dragStart = (e: React.MouseEvent) => {
    if (!containerRef?.current) return;

    e.preventDefault();

    // TODO 추후 수정 -> useMemo를 통한 성능 최적화
    // const itemList = [...containerRef.current.childNodes] as HTMLElement[];

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

    setStyle(placeholder, { opacity: "0.5", border: "1px solid blue", pointerEvents: "none" });

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

        if (belowItemIdx === dragItemIdx) return;

        // console.log(belowItemIdx);
        // stacktop부터 현재 드래그까지 모든 idx에 대해 처리
        const diff = belowItemIdx > stackTop ? 1 : -1;

        const tempIsReverse = isReverse(diff, stackTop, belowItemIdx);

        const progressIdx = tempIsReverse
          ? Array.from({ length: Math.abs(belowItemIdx - stackTop) + 1 }, (_, i) => stackTop + i * diff)
          : Array.from({ length: Math.abs(belowItemIdx - stackTop) }, (_, i) => stackTop + (i + 1) * diff);

        console.log("progressIdx :", progressIdx, "stackTop :", stackTop);
        console.log("diff", diff, "prevDiff", prevDiff.current, "isReverse :", tempIsReverse);

        progressIdx.forEach((itemIdx) => {
          if (itemIdx === dragItemIdx) return;

          const targetItem = containerRef.current?.childNodes[itemIdx] as HTMLElement;

          if (isMoved(targetItem)) {
            // 왕복 로직 -> 한 번 이동된 아이들을 다시 처리
            const backItemIdx = stackRef.current.pop();
            // 한 번 이동된 아이들은 moved 클래스가 추가된다.
            const placeholderMove = (backItemIdx! - dragItemIdx + diff) * MOVE_DISTANCE;

            setStyle(placeholder, { transform: makeTranslate(0, placeholderMove) });
            setStyle(targetItem, { transform: makeTranslate(0, 0), pointerEvents: "none" });
            targetItem.classList.remove("moved");

            targetItem.addEventListener(
              "transitionend",
              () => {
                setStyle(targetItem, { pointerEvents: "" });
              },
              { once: true }
            );

            // moved 클래스를 빼고 translate이 적용되어있던 것을 제거하면 원래 위치로 돌아온다.
            // 기존 것들도 반복하면서 로직이 꼬임
          } else {
            // 편도 로직
            const placeholderMove = (belowItemIdx - dragItemIdx) * MOVE_DISTANCE;
            const targetMove = MOVE_DISTANCE * diff * -1;

            setStyle(placeholder, { transform: makeTranslate(0, placeholderMove) });
            setStyle(targetItem, { transform: makeTranslate(0, targetMove), pointerEvents: "none" });
            targetItem.classList.add("moved");

            targetItem.addEventListener(
              "transitionend",
              () => {
                setStyle(targetItem, { pointerEvents: "" });
              },
              { once: true }
            );

            stackRef.current.push(itemIdx);
          }
        });

        // 드래그 idx면 제거
        // stacktop과 idx가 같으면 빼고 translate 적용 제거
        // stacktop과 idx과 다르면 stack에 넣고 translate 적용
      }
    };

    const mouseUp = (e: MouseEvent) => {
      document.removeEventListener("mousemove", mouseMove);
      moveItem.remove();

      placeholder.removeAttribute("style"); // style을 다 제거하면 안됨
      placeholder.removeAttribute("data-drag-idx");

      containerRef.current?.childNodes.forEach((item) => {
        const listItem = item as HTMLElement;
        listItem.removeAttribute("style"); // style을 다 제거하면 안됨
        listItem.classList.remove("moved");
        listItem.classList.remove("moving");
      });

      console.log(stackRef.current, dragItemIdx, getStackTop());

      handleItem(dragItemIdx, getStackTop());

      stackRef.current = [];
      prevDiff.current = 0;
    };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp, { once: true });
  };

  return { containerRef, dragStart };
};

export default useDnDList_unstable;
