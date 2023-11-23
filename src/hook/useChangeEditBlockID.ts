import { changeEditBlockID as changeEditBlockIDAction } from "../store/reducer/docsSlice";
import { useAppDispatch, useAppSelector } from "./storeHook";

const useChangeEditBlockID = (blockID: string) => {
  const dispatch = useAppDispatch();
  const edtingBlockID = useAppSelector((store) => store.docs.editBlockID);
  const isEditing = edtingBlockID === blockID;

  console.log("hook", blockID, edtingBlockID);

  const changeEditingBlockID = () => dispatch(changeEditBlockIDAction(blockID));

  return { edtingBlockID, changeEditingBlockID, isEditing };
};

export default useChangeEditBlockID;
