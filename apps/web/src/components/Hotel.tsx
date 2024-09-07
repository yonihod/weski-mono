import { useMemo } from "react";
import { PLACEHOLDER_HOTEL_IMAGE } from "@constants";
import { useTranslation } from "react-i18next";
import StarBar from "./StarBar";
import Tag from "./common/Tag";
import { Ski } from "./icons";
import { Accommodation } from "shared-types";
import Divider from "./common/Divider";

const Hotel: React.FC<Accommodation> = ({
  HotelName,
  HotelDescriptiveContent,
  HotelInfo,
  PricesInfo,
}) => {
  const { t } = useTranslation();
  const mainImageUrl = useMemo(() => {
    return (
      HotelDescriptiveContent.Images.find((img) => img.MainImage === "True")
        ?.URL || PLACEHOLDER_HOTEL_IMAGE
    );
  }, [HotelDescriptiveContent]);

  const tags = useMemo(() => {
    const _tags = [];
    if (HotelInfo.Position.Distances.length) {
      for (const { type, distance } of HotelInfo.Position.Distances) {
        switch (type) {
          case "ski_lift":
            _tags.push({
              text: t("tags.from-ski", { distance }),
              type: "primary",
              icon: <Ski className="h-4" />,
            } as const);
            break;
          case "city_center":
            _tags.push({
              text: t("tags.city-center", { distance }),
              type: "secondary",
            } as const);
            break;
          default:
            break;
        }
      }
    }
    return _tags;
  }, [HotelInfo.Position.Distances]);

  return (
    <div className="flex my-2 md:flex-row flex-col w-full aspect-[3/1] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img
        className="w-1/3 object-cover"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = PLACEHOLDER_HOTEL_IMAGE;
        }}
        src={mainImageUrl}
        alt={HotelName}
      />
      <div className="flex flex-col flex-1 p-4">
        <div className="flex gap-1 items-center">
          <span className="text-xxs text-gray-500 tracking-wide font-normal">
            {t("hotel.residence")}
          </span>
        </div>
        <h3 className="text-lg font-semibold">{HotelName}</h3>
        <span className="mt-[-6px]">
          <StarBar rating={HotelInfo.Rating} />
        </span>
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <Tag key={index} {...tag} />
          ))}
        </div>
        <div className="mt-auto">
          <Divider className="my-4" />
        </div>
        <div className="text-red-500 font-semibold text-lg ml-auto">
          {t("hotel.price", {
            price: Math.round(parseInt(PricesInfo.AmountAfterTax)),
          })}
        </div>
      </div>
    </div>
  );
};

export default Hotel;
