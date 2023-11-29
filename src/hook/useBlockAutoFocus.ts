import { useEffect, useRef } from "react";
import useChangeEditBlockID from "./useChangeEditBlockID";
import { useAppDispatch } from "./storeHook";
import { changeSidebarPosition } from "../store/reducer/sideBarPosition";

const useBlockAutoFocus = (questionID: string) => {
  const dispatch = useAppDispatch();

  const containerRef = useRef<HTMLElement>(null);
  const questionInputRef = useRef<HTMLInputElement>(null);

  const { isEditing } = useChangeEditBlockID(questionID);

  useEffect(() => {
    if (!containerRef?.current || !questionInputRef?.current) return;

    //자동 focus 처리
    if (isEditing) {
      const focusElement = document.activeElement;

      if (!containerRef.current.contains(focusElement)) {
        questionInputRef.current.focus();
      }

      const updateSidebarPosition = () => {
        if (!containerRef.current) return;

        const { top, left, width } = containerRef.current.getBoundingClientRect();

        dispatch(changeSidebarPosition({ top, left: left + width + 20 }));
      };

      updateSidebarPosition();

      window.addEventListener("resize", updateSidebarPosition);

      return () => {
        window.removeEventListener("resize", updateSidebarPosition);
      };
    }
  }, [isEditing]);

  return { containerRef, questionInputRef };
};

export default useBlockAutoFocus;
