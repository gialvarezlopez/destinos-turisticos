import Image from "next/image";
import React from "react";
import { logoTop } from "@/assets/images";
import Link from "next/link";
type Props = {
  isMainPage?: boolean;
};
const Header = ({ isMainPage }: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-5 px-4 gap-4 md:gap-0">
      <div className="w-full md:max-w-[250px] lg:max-w-[602px]">
        <Link href="/">
          <Image src={logoTop} alt="El salvador" className="w-full h-auto" />
        </Link>
      </div>

      <div className="w-full md:max-w-[250px] md:ml-auto">
        {isMainPage ? (
          <Link
            href="/destino/nuevo"
            className="btnRed w-full block text-center"
          >
            Agregar destino
          </Link>
        ) : (
          <Link href="/" className="btnRed w-full block text-center">
            Listado de destinos
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
