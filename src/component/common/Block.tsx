interface BlockProps extends React.ComponentPropsWithRef<"div"> {
  isTitleBlock?: boolean;
  isEditing?: boolean;
}

const Block = ({ isTitleBlock = false, isEditing, className, children, ...props }: BlockProps) => {
  return (
    <section className="min-w-[720px] bg-white rounded-xl flex flex-col justify-between overflow-hidden">
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
