import { RiEyeLine } from "react-icons/ri";
import IconButton from "./component/common/IconButton";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-violet-100">
      <div className="w-full h-[56px] flex justify-end shadow-sm border-b-gray-200 border-b-[1px] p-2 items-center bg-gray-50">
        <IconButton>
          <RiEyeLine className="w-[20px] h-[20px] text-gray-600" />
        </IconButton>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
