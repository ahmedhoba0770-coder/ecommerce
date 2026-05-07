import * as React from "react"
import HeroSection from "./_Components/HomeSections/HeroSection";
import CategoriesSection from "./_Components/HomeSections/CategoriesSection";
import OffersSection from "./_Components/HomeSections/OffersSection";
import FeaturedProductsSec from "./_Components/HomeSections/FeaturedProductsSec";
import AppSection from "./_Components/HomeSections/AppSection";


export default function Home() {
  return (
    <div>
      <HeroSection/>
      <CategoriesSection/>
      <OffersSection/>
      <FeaturedProductsSec/>
      <AppSection/>
    </div>
  );
}