import { Query } from "shared-types";
import Logo from "./common/Logo";
import CustomSelect from "./common/SelectWithAdornment";
import { Group, Search } from "./icons";
import { Mountains } from "@components/icons";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ski_site_json } from "@constants";

export type HeaderProps = {
  onSubmit: (query: Query) => void;
};

export default function Header({ onSubmit }: HeaderProps) {
  const fromDateDefaultValue = new Date().toISOString().split("T")[0];
  const toDateDefaultValue = new Date(
    new Date().setDate(new Date().getDate() + 1)
  )
    .toISOString()
    .split("T")[0]
    .toString();
  const [query, setQuery] = useState<Partial<Query>>({
    from_date: fromDateDefaultValue,
    to_date: toDateDefaultValue,
  });

  const { t } = useTranslation();

  const SKI_SITE_OPTIONS = useMemo(() => {
    return ski_site_json.map((site) => ({
      value: site.id,
      label: site.name,
    }));
  }, []);

  const GROUP_OPTIONS = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      value: i + 1,
      label: t("header.numberOfPeople", { number: i + 1 }),
    }));
  }, []);

  const handleSearch = () => {
    if (
      !query?.ski_site ||
      !query.group_size ||
      !query.from_date ||
      !query.to_date
    )
      return;
    onSubmit(query as Query);
  };

  const handleSkiSiteChange: any = (event: {
    label: string;
    value: Query["ski_site"];
  }) => {
    setQuery((prevQuery) => ({ ...prevQuery, ski_site: event.value }));
  };

  const handleGroupChange: any = (event: {
    label: string;
    value: Query["group_size"];
  }) => {
    console.log(event);
    setQuery((prevQuery) => ({ ...prevQuery, group_size: event.value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuery((prevQuery) => ({ ...prevQuery, [name]: value }));
  };

  return (
    <header className="container p-4 flex gap-2 justify-between mx-auto items-center w-full bg-white border-b border-b-[#E0E3EB]">
      <Logo />
      <div className="flex gap-2">
        <CustomSelect
          className="w-[160px]"
          onChange={handleSkiSiteChange}
          options={SKI_SITE_OPTIONS}
          icon={<Mountains />}
        />
        <CustomSelect
          className="w-[160px]"
          onChange={handleGroupChange}
          options={GROUP_OPTIONS}
          icon={<Group />}
        />
        <input
          name="from_date"
          onChange={handleDateChange}
          defaultValue={fromDateDefaultValue}
          className="border py-1 px-2 rounded-md"
          type="date"
        />
        <input
          name="to_date"
          onChange={handleDateChange}
          defaultValue={toDateDefaultValue}
          className="border p-1 rounded-md"
          type="date"
        />
        <button
          onClick={handleSearch}
          className="border border-blue-600 w-[112px] h-[42px] text-blue-600 bg-white py-1 px-2 rounded-lg flex items-center space-x-2"
        >
          <span>
            <Search />
          </span>
          <span>{t("header.search")}</span>
        </button>
      </div>
      <div />
      <div className="flex flex-col md:flex-row gap-2"></div>
    </header>
  );
}
