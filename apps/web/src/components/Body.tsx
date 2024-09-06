import Hotel from "./Hotel";
import { Accommodation } from "shared-types";

const Body: React.FC<{ data: Accommodation[] }> = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <Hotel key={index} {...item} />
      ))}
    </div>
  );
};

export default Body;
