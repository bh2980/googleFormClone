interface DividerProps {
  direction?: "horizontal" | "vertical";
}

const Divider = ({ direction = "horizontal" }: DividerProps) => {
  return <div className={`${direction === "horizontal" ? "w-full" : "h-full"} border-[1px]`} />;
};

export default Divider;
