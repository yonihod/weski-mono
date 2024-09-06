import React from "react";
import { Accommodation } from "shared-types";
import { Star } from "@components/icons";

type StarBarProps = {
  rating: Accommodation["HotelInfo"]["Rating"];
};

const StarBar: React.FC<StarBarProps> = ({ rating }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i}>
          <Star />
        </span>
      );
    }
    return stars;
  };

  return <div>{renderStars(parseInt(rating))}</div>;
};

export default React.memo(StarBar);
