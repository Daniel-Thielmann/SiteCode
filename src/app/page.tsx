import HeroSecationI from "@/components/HeroSectionI";
import HomeSectionIII from "@/components/HomeSectionIII";
import HeroSectionII from "@/components/HeroSectionII";
import HeroSectionIV from "@/components/HeroSectionIV";

export default function Home() {
  return (
    <div className="bg-gradiente-home">
      <HeroSecationI />
      <HeroSectionII />
      <HomeSectionIII />
      <HeroSectionIV />
    </div>
  );
}
