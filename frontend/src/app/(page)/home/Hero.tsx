import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div>
      <div className="relative w-full h-[800px]">
        <Image
          src="/images/hero.png"
          alt="Imagen hero"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
