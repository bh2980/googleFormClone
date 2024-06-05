import { changeEditBlockID as changeEditBlockIDAction } from '../store/reducer/docsSlice';
import { useAppDispatch, useAppSelector } from './useRedux';

const useChangeEditBlockID = (blockID: string) => {
  const dispatch = useAppDispatch();
  const edtingBlockID = useAppSelector((store) => store.docs.editBlockID);
  const isEditing = edtingBlockID === blockID;

  const changeEditingBlockID = () => dispatch(changeEditBlockIDAction(blockID));

  return { edtingBlockID, changeEditingBlockID, isEditing };
};

export default useChangeEditBlockID;
