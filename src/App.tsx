import {
  RiGalleryFill,
  RiFileCopyLine,
  RiDeleteBin6Line,
  RiMore2Fill,
  RiAlignLeft,
  RiBold,
  RiUnderline,
  RiItalic,
  RiAttachment2,
  RiFormatClear,
  RiCloseFill,
  RiAddCircleLine,
  RiDraggable,
  RiCheckboxLine,
  RiArrowDropDownFill,
  RiRadioButtonLine,
  RiDropdownList,
} from "react-icons/ri";
import TitleBlock from "./component/TitleBlock";

function App() {
  return (
    <>
      <div className="w-full bg-white h-[72px] flex justify-center items-center">미리보기</div>

      <form className="flex flex-col items-center w-full gap-4 p-2 bg-violet-100">
        <div className="flex justify-center p-3 bg-white rounded-md shadow-md ">
          <RiAddCircleLine className="w-[24px] h-[24px]" />
        </div>

        <TitleBlock />

        <fieldset className="w-[720px] bg-white rounded-xl p-8 flex flex-col gap-8 justify-between">
          <div>
            질문1<span className="text-xl font-bold text-red-500">*</span>
          </div>
          <input placeholder="단답형 메시지" />
        </fieldset>

        <fieldset className="w-[720px] bg-white rounded-xl p-8 flex flex-col gap-6 justify-between">
          <div>질문2</div>
          <div className="flex gap-4">
            <input type="radio" name="hello" disabled />
            <input value="옵션1" />
          </div>
          <div className="flex gap-4">
            <input type="radio" name="hello" disabled />
            <input value="옵션1" />
          </div>
          <div className="flex gap-4">
            <input type="radio" name="hello" disabled />
            <input value="옵션1" />
          </div>
          <div className="flex gap-4">
            <input type="radio" name="hello" disabled />
            <input value="옵션1" />
          </div>
        </fieldset>

        <fieldset className="w-[720px] bg-white rounded-xl p-8 flex flex-col gap-6 justify-between">
          <div>질문3</div>
          <div className="flex gap-4">
            <input type="checkbox" name="hello" disabled />
            <input value="옵션1" />
          </div>
          <div className="flex gap-4">
            <input type="checkbox" name="hello" disabled />
            <input value="옵션1" />
          </div>
          <div className="flex gap-4">
            <input type="checkbox" name="hello" disabled />
            <input value="옵션1" />
          </div>
          <div className="flex gap-4">
            <input type="checkbox" name="hello" disabled />
            <input value="옵션1" />
          </div>
        </fieldset>

        <fieldset className="w-[720px] bg-white rounded-xl p-8 flex flex-col gap-6 justify-between">
          <div>질문3</div>
          <div className="flex w-full gap-4">
            <span>1</span>
            <input className="w-full" value="옵션1" />
            <RiCloseFill />
          </div>
          <div className="flex w-full gap-4">
            <span>2</span>
            <input className="w-full" value="옵션1" />
            <RiCloseFill />
          </div>
          <div className="flex w-full gap-4">
            <span>3</span>
            <input className="w-full" value="옵션1" />
            <RiCloseFill />
          </div>
          <div className="flex w-full gap-4">
            <span>4</span>
            <input className="w-full" value="옵션1" />
            <RiCloseFill />
          </div>
        </fieldset>

        <fieldset className="flex overflow-hidden bg-white rounded-xl">
          <div className="w-[8px] max-h-full bg-blue-500"></div>
          <div className="flex flex-col w-[720px] justify-between gap-4 pt-2 pb-8 px-8">
            <RiDraggable className="w-full rotate-90" />
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-4">
                <div className="bg-gray-100 p-4 border-gray-300 border-b-2 w-[400px]">
                  <span>질문1</span>
                </div>
                <RiGalleryFill />
                <div className="w-[200px] bg-gray-100 flex gap-4 justify-between p-4 items-center">
                  <RiDropdownList />
                  드롭박스
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <RiBold className="w-[20px] h-[20px]" />
                <RiItalic className="w-[20px] h-[20px]" />
                <RiUnderline className="w-[20px] h-[20px]" />
                <RiAttachment2 className="w-[20px] h-[20px]" />
                <RiFormatClear className="w-[20px] h-[20px]" />
              </div>
            </div>
            <input placeholder="단답형 메시지" />
            <div className="w-full border-[1px]" />
            <div className="flex items-center justify-end gap-8">
              <RiFileCopyLine />
              <RiDeleteBin6Line />
              <span>필수</span>
              <div>스위치</div>
              <RiMore2Fill />
            </div>
          </div>
        </fieldset>

        <fieldset className="flex overflow-hidden bg-white rounded-xl">
          <div className="w-[8px] max-h-full bg-blue-500"></div>
          <div className="flex flex-col w-[720px] justify-between gap-4 pt-2 pb-8 px-8">
            <RiDraggable className="w-full rotate-90" />
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-4">
                <div className="bg-gray-100 p-4 border-violet-800 border-b-2 w-[400px]">
                  <span>질문1</span>
                </div>
                <RiGalleryFill />
                <div className="w-[200px] bg-gray-100 flex gap-4 justify-between p-4 items-center">
                  <RiDropdownList />
                  드롭박스
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <RiBold className="w-[20px] h-[20px]" />
                <RiItalic className="w-[20px] h-[20px]" />
                <RiUnderline className="w-[20px] h-[20px]" />
                <RiAttachment2 className="w-[20px] h-[20px]" />
                <RiFormatClear className="w-[20px] h-[20px]" />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center w-full gap-4 ">
                  <RiDraggable />
                  <input type="radio" name="hello" disabled />
                  <input className="w-full" value="옵션1" />
                  <RiGalleryFill />
                </div>
                <RiCloseFill />
              </div>
              <div className="flex items-center justify-between gap-4 ">
                <div className="flex items-center w-full gap-4 ">
                  <RiDraggable />
                  <input type="radio" name="hello" disabled />
                  <input className="w-full" value="옵션1" />
                  <RiGalleryFill />
                </div>
                <RiCloseFill />
              </div>
              <div className="flex items-center justify-between gap-4 ">
                <div className="flex items-center w-full gap-4 ">
                  <RiDraggable />
                  <input type="radio" name="hello" disabled />
                  <input className="w-full" value="옵션1" />
                  <RiGalleryFill />
                </div>
                <RiCloseFill />
              </div>
            </div>
            <div className="w-full border-[1px]" />
            <div className="flex items-center justify-end gap-8">
              <RiFileCopyLine />
              <RiDeleteBin6Line />
              <div className="h-full border-[1px]" />
              <span>필수</span>
              <div>스위치</div>
              <RiMore2Fill />
            </div>
          </div>
        </fieldset>

        <div className="w-[720px] h-[480px] bg-white rounded-xl">
          <div className="w-[240px] border-2 h-[72px] bg-white flex items-center px-8 rounded-lg justify-between">
            <div className="flex items-center gap-4">
              <RiCheckboxLine />
              <span>안녕</span>
            </div>
            <RiArrowDropDownFill />
          </div>
          <div className="w-[240px] border-2 bg-white flex flex-col px-4 rounded-lg shadow-2xl">
            <div className="flex items-center gap-4 p-4">
              <RiCheckboxLine />
              <span>단답형</span>
            </div>
            <div className="flex items-center gap-4 p-4">
              <RiAlignLeft />
              <span>장문형</span>
            </div>
            <div className="w-full border-[1px]" />
            <div className="flex items-center gap-4 p-4">
              <RiRadioButtonLine />
              <span>객관식 질문</span>
            </div>
            <div className="flex items-center gap-4 p-4">
              <RiCheckboxLine />
              <span>체크박스</span>
            </div>
            <div className="flex items-center gap-4 p-4">
              <RiDropdownList />
              <span>드롭박스</span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
