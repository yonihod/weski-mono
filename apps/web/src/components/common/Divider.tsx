import { cn } from "@utils/index";

const Divider: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn("w-full h-[1px] bg-slate-400", className)} {...props} />
  );
};

export default Divider;
