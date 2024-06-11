import { useRedux } from '@google-form-clone/hooks';
import { changeEditBlockID as changeEditBlockIDAction } from '../store/reducer/docsSlice';
import { store } from '../store/store';

const useChangeEditBlockID = (blockID: string) => {
  const { useDispatch, useSelector } = useRedux<typeof store>();

  const dispatch = useDispatch();
  const edtingBlockID = useSelector((store) => store.docs.editBlockID);
  const isEditing = edtingBlockID === blockID;

  const changeEditingBlockID = () => dispatch(changeEditBlockIDAction(blockID));

  return { edtingBlockID, changeEditingBlockID, isEditing };
};

export default useChangeEditBlockID;
