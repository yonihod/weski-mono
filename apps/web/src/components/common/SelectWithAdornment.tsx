import { ComponentProps } from "react";
import Select, { components } from "react-select";

export type ReactSelectProps = ComponentProps<typeof Select>;

const DropdownIndicator = ({ icon, ...props }: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {icon}
      </components.DropdownIndicator>
    )
  );
};

const CustomSelect: React.FC<
  {
    icon: React.ReactElement;
  } & ReactSelectProps
> = ({ icon, ...props }) => (
  <Select
    {...props}
    options={props.options}
    components={{
      IndicatorSeparator: () => null,
      DropdownIndicator: (props) => (
        <DropdownIndicator icon={icon} {...props} />
      ),
    }}
    styles={{
      singleValue: (provided) => ({
        ...provided,
      }),
      control: (provided) => ({
        ...provided,
        flexDirection: "row-reverse",
      }),
    }}
  />
);

export default CustomSelect;
