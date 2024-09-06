import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  return (
    <header className="p-4 flex flex-col gap-2 justify-center items-center w-full">
      <h1 className="text-3xl font-semibold">{t("header.title")}</h1>
      <div />
      <div className="flex flex-col md:flex-row gap-2"></div>
    </header>
  );
}
