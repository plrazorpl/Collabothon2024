"use client";

import Image from "next/image";
import logo from "./logo.svg";

export const Logo = () => {
  return <Image className={"max-w-56 "} src={logo} alt="Commerzbank Logo" />;
};
