import { FORM_STATE } from "../store/reducer/formStateSlice";
import { useAppSelector } from "./storeHook";

const useCheckViewer = () => {
  const formState = useAppSelector((store) => store.formState.value);

  return formState === FORM_STATE.viewer;
};

export default useCheckViewer;
