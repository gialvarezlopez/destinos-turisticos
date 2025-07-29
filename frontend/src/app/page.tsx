import React from "react";
import { Card } from "./(page)/home/Card";
import Hero from "./(page)/home/Hero";
import Header from "@/components/commons/header";
import { Footer } from "@/components/commons/footer";

const Home = () => {
  return (
    <div>
      <Header isMainPage={true} />
      <div className="mb-4 h-[800px]">
        <Hero />
        <div className="block">
          <Footer />
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 py-12 mt-[100px]">
        <Card />
      </div>
    </div>
  );
};

export default Home;
