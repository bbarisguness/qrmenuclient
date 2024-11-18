"use client";
import { useGlobalContext } from "@/context/GlobalContext";

import Image from "next/image";
import { useEffect } from "react";
export const SideMenu = () => {
  const { activeMenuId, isMenuOpen, toggleActiveMenu, toggleMenu } =
    useGlobalContext();
  const sideMenuData = [
    {
      id: 1,
      name: "Kahvaltılar",
      url: "https://yakaetlokantasi.com/storage/images/feCbzP0BLrDXXbiT.jpg",
    },
    {
      id: 2,
      name: "Tatlılar",
      url: "https://e7.pngegg.com/pngimages/823/453/png-clipart-chocolate-chip-cookie-dessert-desktop-tart-cheesecake-cake-food-recipe.png",
    },
  ];

  const handleClickMenuItem = (id) => {
    toggleActiveMenu(id);
    toggleMenu();
  };

  return (
    <div
      className={`w-[80%] max-w-[600px] bg-[#1E5CCE] h-[100dvh] absolute duration-500 ${
        isMenuOpen ? "left-0" : "left-[-100%]"
      } top-0 z-20 flex flex-col`}
    >
      <div className="flex flex-[0.1] items-center gap-4 ml-8 mt-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.580496 0.0834961C0.306011 0.0834961 0.0834961 0.306011 0.0834961 0.580496V7.51983C0.0834961 7.79431 0.306011 8.01683 0.580496 8.01683H7.51983C7.79431 8.01683 8.01683 7.79431 8.01683 7.51983V0.580496C8.01683 0.306011 7.79431 0.0834961 7.51983 0.0834961H0.580496ZM0.580496 11.9835C0.306011 11.9835 0.0834961 12.206 0.0834961 12.4805V19.4198C0.0834961 19.6943 0.306011 19.9168 0.580496 19.9168H7.51983C7.79431 19.9168 8.01683 19.6943 8.01683 19.4198V12.4805C8.01683 12.206 7.79431 11.9835 7.51983 11.9835H0.580496ZM11.9835 0.580496C11.9835 0.306011 12.206 0.0834961 12.4805 0.0834961H19.4198C19.6943 0.0834961 19.9168 0.306011 19.9168 0.580496V7.51983C19.9168 7.79431 19.6943 8.01683 19.4198 8.01683H12.4805C12.206 8.01683 11.9835 7.79431 11.9835 7.51983V0.580496ZM12.4805 11.9835C12.206 11.9835 11.9835 12.206 11.9835 12.4805V19.4198C11.9835 19.6943 12.206 19.9168 12.4805 19.9168H19.4198C19.6943 19.9168 19.9168 19.6943 19.9168 19.4198V12.4805C19.9168 12.206 19.6943 11.9835 19.4198 11.9835H12.4805Z"
            fill="white"
          />
        </svg>
        <span className="font-Poppins font-bold text-white text-[24px]">
          Kategori Sec
        </span>
      </div>
      <div className="w-full flex flex-col flex-[0.9] py-6 gap-4">
        {sideMenuData.map((item) => (
          <div
            onClick={() => handleClickMenuItem(item.id)}
            key={item.id}
            className="h-[70px] w-full bg-[#1E5CCE] pl-4 flex flex-row items-center relative"
          >
            <div
              className={`w-[64px] h-[64px] rounded-full z-[1] bg-center bg-contain`}
              style={{ backgroundImage: `url(${item.url})` }}
            ></div>
            <div className="absolute left-0 top-0 bottom-0 right-0 py-2 pl-14">
              <div
                className={`w-full h-full ${
                  item.id == activeMenuId ? "bg-[#009dff5e]" : "bg-[#1E5CCE]"
                } flex items-center pl-9`}
              >
                <span className="font-Poppins font-normal text-white text-[20px]">
                  {item.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
