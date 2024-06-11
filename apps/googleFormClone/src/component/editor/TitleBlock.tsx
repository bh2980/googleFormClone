import useChangeEditBlockID from '../../hook/useChangeEditBlockID';
import { editContent, editTitle } from '../../store/reducer/docsSlice';
import useBlockAutoFocus from '../../hook/useBlockAutoFocus';
import { Block, Input, TextArea } from '@google-form-clone/shared-ui';
import { useRedux } from '@google-form-clone/hooks';
import { store } from '../../store/store';

const TitleBlock = () => {
  const TITLE_BLOCK_ID = 'title';

  const { useDispatch, useSelector } = useRedux<typeof store>();

  const dispatch = useDispatch();
  const { title, content } = useSelector((store) => store.docs);
  const { changeEditingBlockID, isEditing } = useChangeEditBlockID(TITLE_BLOCK_ID);
  const { containerRef, questionInputRef } = useBlockAutoFocus(TITLE_BLOCK_ID);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editTitle(e.target.value));
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(editContent(e.target.value));
  };

  return (
    <Block
      className="flex flex-col w-full gap-2 p-6"
      onClick={changeEditingBlockID}
      isTitleBlock
      isEditing={isEditing}
      innerRef={containerRef}
    >
      <Input className="text-3xl" onChange={changeTitle} defaultValue={title} placeholder="제목을 입력하세요" innerRef={questionInputRef} />
      <TextArea defaultValue={content} onChange={changeContent} placeholder="설명을 입력하세요" />
    </Block>
  );
};

export default TitleBlock;
