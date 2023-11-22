import { changeEditBlockID } from "../store/editBlockIDSlice";
import { useAppDispatch } from "./storeHook";

const useChangeEditBlockID = () => {
  const dispatch = useAppDispatch();

  const editBlockID = (id: string) => dispatch(changeEditBlockID(id));

  return { changeEditBlockID: editBlockID };
};

export default useChangeEditBlockID;
