import { cn } from "@utils/index";

type TagProps = {
  text: string;
  type: "primary" | "secondary";
  icon?: React.ReactElement;
  className?: string;
};

const Tag: React.FC<TagProps> = ({
  text,
  type = "primary",
  icon,
  className = {},
}) => {
  return (
    <div
      className={cn(
        "py-1 px-2 border border-gray-200 text-gray-700 rounded-md flex items-center gap-1",
        className,
        {
          "text-green-500": type === "secondary",
        }
      )}
    >
      <span>{icon && icon}</span>
      <span className="text-sm font-normal">{text}</span>
    </div>
  );
};

export default Tag;
