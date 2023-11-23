import { changeEditBlockID as changeEditBlockIDAction } from "../store/reducer/editBlockIDSlice";
import { useAppDispatch, useAppSelector } from "./storeHook";

const useChangeEditBlockID = (blockID: string) => {
  const dispatch = useAppDispatch();
  const edtingBlockID = useAppSelector((store) => store.editBlockID.editBlockID);
  const isEditing = edtingBlockID === blockID;

  const changeEditingBlockID = () => dispatch(changeEditBlockIDAction(blockID));

  return { edtingBlockID, changeEditingBlockID, isEditing };
};

export default useChangeEditBlockID;
