import { memo } from "react";
import classMerge from "../../utils/classMerge";

interface BlockProps extends React.ComponentPropsWithRef<"div"> {
  isTitleBlock?: boolean;
  isEditing?: boolean;
  innerRef?: React.LegacyRef<HTMLElement>;
}

const Block = memo(({ isTitleBlock = false, isEditing, innerRef, className, children, ...props }: BlockProps) => {
  return (
    <section
      ref={innerRef}
      className={classMerge([
        "w-full bg-white rounded-xl flex flex-col justify-between overflow-hidden",
        isEditing ? "shadow-2xl" : "shadow-md",
      ])}
    >
      {isTitleBlock && <div className="w-full h-[8px] bg-violet-800"></div>}
      <div className="flex group">
        <div
          className="max-h-full transition-all bg-blue-500"
          style={{ width: isEditing ? "8px" : "0", transition: "width 0.2s" }}
        />
        <div className={className} {...props}>
          {children}
        </div>
      </div>
    </section>
  );
});

export default Block;
