import { useTranslation } from "react-i18next";
import Hotel from "./Hotel";
import { Accommodation, Query } from "shared-types";
import React from "react";
import { ski_site_json } from "@constants";

const Body: React.FC<{ data: Accommodation[]; searchInput?: Query }> = ({
  data,
  searchInput,
}) => {
  const { t } = useTranslation();
  const renderSearchInput = () => {
    if (!searchInput) return null;
    const resortName = ski_site_json.find(
      (site) => site.id === searchInput.ski_site
    )?.name;
    const fromDate = new Date(searchInput.from_date).toLocaleDateString();
    const toDate = new Date(searchInput.to_date).toLocaleDateString();
    return (
      <div className="py-2 text-sm text-neutral-400 flex gap-1">
        <span>{t("body.ski_options", { options: data?.length })}</span>
        <span>•</span>
        <span>{resortName}</span>
        <span>•</span>
        <span>
          {fromDate} - {toDate}
        </span>
        <span>•</span>
        <span>
          {t("header.numberOfPeople", { number: searchInput.group_size })}
        </span>
      </div>
    );
  };

  return (
    <div className="w-5/6">
      <div className="py-4">
        <h6 className="text-2xl">{t("body.title")}</h6>
      </div>
      {searchInput && renderSearchInput()}
      {data.map((item, index) => (
        <Hotel key={index} {...item} />
      ))}
    </div>
  );
};

export default React.memo(Body);
