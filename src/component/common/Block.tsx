import classMerge from "../../utils/classMerge";

interface BlockProps extends React.ComponentPropsWithRef<"div"> {
  isTitleBlock?: boolean;
  isEditing?: boolean;
  innerRef?: React.LegacyRef<HTMLElement>;
}

const Block = ({ isTitleBlock = false, isEditing, innerRef, className, children, ...props }: BlockProps) => {
  return (
    <section
      ref={innerRef}
      className={classMerge([
        "max-w-[800px] bg-white rounded-xl flex flex-col justify-between overflow-hidden",
        isEditing && "shadow-lg",
      ])}
    >
      {isTitleBlock && <div className="w-full h-[8px] bg-violet-800"></div>}
      <div className="flex group">
        {isEditing && <div className="w-[8px] max-h-full bg-blue-500" />}
        <div className={className} {...props}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Block;
