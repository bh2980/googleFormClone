import { useEffect, useRef, useCallback } from 'react';

interface useDnDProps {
  handleItem: (fromIdx: number, toIdx: number) => void;
  ghost?: boolean;
}

export interface DnDAction {
  fromIdx: number;
  toIdx: number;
}

export const isTouchScreen = 'ontouchstart' in document.documentElement;

// Utility functions
const setStyle = (target: HTMLElement, style: Partial<CSSStyleDeclaration>) => {
  Object.assign(target.style, style);
};

const makePx = (px: number) => `${px}px`;

const makeTransition = (x: number, y: number) => `translate3d(${makePx(x)}, ${makePx(y)}, 0)`;

const getDragIdx = (item: HTMLElement) => Number(item.dataset.dragIdx);

const isMoved = (item: HTMLElement) => item.classList.contains('moved');

// Event handling
const DRAG_MOVE_EVENT = isTouchScreen ? 'touchmove' : 'mousemove';
const DRAG_END_EVENT = isTouchScreen ? 'touchend' : 'mouseup';

const extractClientPos = (e: TouchEvent | MouseEvent) => {
  if (isTouchScreen) {
    const { clientX, clientY } = (e as TouchEvent).touches[0];
    return { clientX, clientY };
  }
  const { clientX, clientY } = e as MouseEvent;
  return { clientX, clientY };
};

// Drag state management
interface DragState {
  dragIdx: number;
  moveToIdx: number;
  placeholder: HTMLElement;
  dragItem: HTMLElement;
  aboveItems: HTMLElement[];
  belowItems: HTMLElement[];
  aboveItemSet: Set<number>;
  belowItemSet: Set<number>;
  placeholderMove: number;
  itemGap: number;
  itemMoveDistance: number;
  itemList: HTMLElement[];
  dragStartX: number;
  dragStartY: number;
}

// Initialize drag items and categorize them
const initializeDragItems = (
  itemList: HTMLElement[],
  dragTarget: HTMLElement
): Omit<
  DragState,
  'moveToIdx' | 'dragItem' | 'placeholderMove' | 'itemGap' | 'itemMoveDistance' | 'itemList' | 'dragStartX' | 'dragStartY'
> => {
  const aboveItems: HTMLElement[] = [];
  const belowItems: HTMLElement[] = [];
  const aboveItemSet = new Set<number>();
  const belowItemSet = new Set<number>();

  let dragIdx = -1;

  itemList.forEach((item, idx) => {
    item.dataset.dragIdx = String(idx);
    setStyle(item, { transition: 'transform 0.2s' });

    if (item === dragTarget.closest('[data-drag-idx]')) {
      dragIdx = idx;
      return;
    }

    if (dragIdx < 0) {
      aboveItems.push(item);
      aboveItemSet.add(idx);
    } else {
      belowItems.push(item);
      belowItemSet.add(idx);
    }
  });

  belowItems.reverse(); // for easier pop/push operations

  return {
    dragIdx,
    placeholder: itemList[dragIdx],
    aboveItems,
    belowItems,
    aboveItemSet,
    belowItemSet,
  };
};

// Create and setup drag item clone
const createDragClone = (placeholder: HTMLElement): HTMLElement => {
  const dragItem = placeholder.cloneNode(true) as HTMLElement;
  const { top, left, width, height } = placeholder.getBoundingClientRect();

  setStyle(dragItem, {
    position: 'fixed',
    top: makePx(top),
    left: makePx(left),
    width: makePx(width),
    height: makePx(height),
    pointerEvents: 'none',
    zIndex: '9999',
    transition: '',
  });

  return dragItem;
};

// Setup placeholder styling
const setupPlaceholder = (placeholder: HTMLElement, ghost: boolean) => {
  if (ghost) {
    setStyle(placeholder, {
      opacity: '0.5',
      pointerEvents: 'none',
    });
  } else {
    setStyle(placeholder, {
      visibility: 'hidden',
      pointerEvents: 'none',
    });
  }
};

// Calculate gap between items
const calculateItemGap = (itemList: HTMLElement[]): number => {
  if (itemList.length <= 1) return 0;

  const firstRect = itemList[0].getBoundingClientRect();
  const secondRect = itemList[1].getBoundingClientRect();
  return secondRect.top - firstRect.bottom;
};

// Check if two elements are overlapping (50% threshold)
const isOverlapping = (dragItem: HTMLElement, targetItem: HTMLElement): boolean => {
  const { top: itemTop, height: itemHeight } = targetItem.getBoundingClientRect();
  const { top: dragTop, height: dragHeight } = dragItem.getBoundingClientRect();

  return dragTop < itemTop + itemHeight / 2 && itemTop < dragTop + dragHeight / 2;
};

// Handle item repositioning during drag
const handleItemReposition = (targetIdx: number, dragState: DragState): void => {
  const { aboveItemSet, belowItemSet, aboveItems, belowItems, placeholder, itemMoveDistance } = dragState;

  const direction = aboveItemSet.has(targetIdx) ? 1 : -1;
  const [currentList, currentSet] = aboveItemSet.has(targetIdx) ? [aboveItems, aboveItemSet] : [belowItems, belowItemSet];
  const [nextList, nextSet] = !aboveItemSet.has(targetIdx) ? [aboveItems, aboveItemSet] : [belowItems, belowItemSet];

  while (currentSet.has(targetIdx)) {
    const movingItem = currentList.pop()!;
    const movingIdx = getDragIdx(movingItem);

    currentSet.delete(movingIdx);
    nextList.push(movingItem);
    nextSet.add(movingIdx);

    dragState.moveToIdx += -direction;
    dragState.placeholderMove += (movingItem.getBoundingClientRect().height + dragState.itemGap) * -direction;

    setStyle(placeholder, {
      transform: makeTransition(0, dragState.placeholderMove),
    });

    // Animate item movement
    if (isMoved(movingItem)) {
      setStyle(movingItem, {
        transform: makeTransition(0, 0),
        pointerEvents: 'none',
      });
      movingItem.classList.remove('moved');
    } else {
      const itemMove = itemMoveDistance * direction;
      movingItem.classList.add('moved');
      setStyle(movingItem, {
        transform: makeTransition(0, itemMove),
        pointerEvents: 'none',
      });
    }

    // Reset pointer events after animation
    movingItem.addEventListener('transitionend', () => setStyle(movingItem, { pointerEvents: '' }), { once: true });
  }
};

export const useDnDList = <T extends HTMLElement = HTMLDivElement>({ handleItem, ghost = false }: useDnDProps) => {
  const dragListContainerRef = useRef<T>(null);
  const dragStateRef = useRef<DragState | null>(null);

  // Prevent scroll behavior on touch devices
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => e.preventDefault();
    document.addEventListener('touchmove', preventScroll, { passive: false });
    return () => document.removeEventListener('touchmove', preventScroll);
  }, []);

  // Drag move handler - now at hook level
  const dragMoveHandler = useCallback((moveEvent: MouseEvent | TouchEvent) => {
    if (!dragStateRef.current) return;

    moveEvent.preventDefault();
    const dragState = dragStateRef.current;

    const { clientX, clientY } = extractClientPos(moveEvent);
    const deltaX = clientX - dragState.dragStartX;
    const deltaY = clientY - dragState.dragStartY;

    setStyle(dragState.dragItem, { transform: makeTransition(deltaX, deltaY) });

    const targetElement = document.elementFromPoint(clientX, clientY)?.closest('[data-drag-idx]') as HTMLElement;

    if (targetElement && isOverlapping(dragState.dragItem, targetElement)) {
      const targetIdx = getDragIdx(targetElement);
      handleItemReposition(targetIdx, dragState);
    }
  }, []);

  // Drag end handler - now at hook level
  const dragEndHandler = useCallback(() => {
    if (!dragStateRef.current) return;

    const dragState = dragStateRef.current;

    // Remove move event listener
    document.removeEventListener(DRAG_MOVE_EVENT, dragMoveHandler);

    setStyle(dragState.dragItem, {
      transform: makeTransition(0, dragState.placeholderMove),
      transition: 'all 0.2s',
    });

    dragState.dragItem.addEventListener(
      'transitionend',
      () => {
        if (!dragStateRef.current) return;

        dragState.dragItem.remove();

        // Reset all styles
        setStyle(dragState.placeholder, {
          opacity: '',
          pointerEvents: '',
          visibility: '',
        });

        dragState.itemList.forEach((item) => {
          setStyle(item, { transform: '', transition: '' });
          item.removeAttribute('data-drag-idx');
          item.classList.remove('moved');
        });

        handleItem(dragState.dragIdx, dragState.moveToIdx);

        // Clear drag state
        dragStateRef.current = null;
      },
      { once: true }
    );
  }, [dragMoveHandler, handleItem]);

  // Drag start handler - now focused only on initialization
  const dragStartHandler = useCallback(
    (dragStartEvent: React.MouseEvent | React.TouchEvent) => {
      if (!isTouchScreen) dragStartEvent.preventDefault();
      if (!dragListContainerRef.current) return;

      const { clientX: dragStartX, clientY: dragStartY } = extractClientPos(dragStartEvent.nativeEvent);
      const itemList = Array.from(dragListContainerRef.current.childNodes) as HTMLElement[];

      // Initialize drag state
      const initialState = initializeDragItems(itemList, dragStartEvent.target as HTMLElement);
      const dragItem = createDragClone(initialState.placeholder);
      const itemGap = calculateItemGap(itemList);
      const itemMoveDistance = initialState.placeholder.getBoundingClientRect().height + itemGap;

      // Store complete drag state
      dragStateRef.current = {
        ...initialState,
        moveToIdx: initialState.dragIdx,
        dragItem,
        placeholderMove: 0,
        itemGap,
        itemMoveDistance,
        itemList,
        dragStartX,
        dragStartY,
      };

      setupPlaceholder(dragStateRef.current.placeholder, ghost);
      dragListContainerRef.current.appendChild(dragItem);

      // Attach event listeners
      document.addEventListener(DRAG_MOVE_EVENT, dragMoveHandler, { passive: false });
      document.addEventListener(DRAG_END_EVENT, dragEndHandler, { once: true });
    },
    [dragMoveHandler, dragEndHandler, ghost]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (dragStateRef.current) {
        document.removeEventListener(DRAG_MOVE_EVENT, dragMoveHandler);
        document.removeEventListener(DRAG_END_EVENT, dragEndHandler);
      }
    };
  }, [dragMoveHandler, dragEndHandler]);

  return {
    handleDrag: dragStartHandler,
    dragListContainerRef,
  };
};
