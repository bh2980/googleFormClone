import { useEffect, useRef } from 'react';
import useChangeEditBlockID from './useChangeEditBlockID';
import { changeSidebarPosition } from '../store/reducer/sideBarPosition';
import { store } from '../store/store';
import { useRedux } from '@google-form-clone/hooks';

const useBlockAutoFocus = (questionID: string) => {
  const { useDispatch } = useRedux<typeof store>();
  const dispatch = useDispatch();

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

      window.addEventListener('resize', updateSidebarPosition);

      return () => {
        window.removeEventListener('resize', updateSidebarPosition);
      };
    }
  }, [isEditing]);

  return { containerRef, questionInputRef };
};

export default useBlockAutoFocus;
