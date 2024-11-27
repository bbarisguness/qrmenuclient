"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export const SideMenu = ({ categories, categoryTitle }) => {
  const router = useRouter()
  const menuRef = useRef(null);
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString());
  const param = currentParams.size !== 0 ? currentParams.toString() : 'lang=tr'

  const { activeMenuId, isMenuOpen, toggleActiveMenu, toggleMenu } =
    useGlobalContext();

  const handleClickMenuItem = (item) => {
    toggleActiveMenu(item?.id);
    toggleMenu();
    router.push(`/${item?.company?.slug}/kategori/${item?.slug}?${param}`)
  };

  return (
    <>
      {isMenuOpen && (
        <div onClick={() => toggleMenu()} className="w-full h-full absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 z-10"></div>
      )}
      <div
        ref={menuRef}
        style={{ backgroundColor: `#${categories?.data[0]?.company?.theme?.primaryColor}` }}
        className={`w-[80%] max-w-[600px] h-[100dvh] absolute duration-500 ${isMenuOpen ? "left-0" : "left-[-100%]"
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
            {categoryTitle}
          </span>
        </div>
        <div className="w-full overflow-auto flex flex-col flex-[0.9] py-6 gap-4">
          {categories?.data?.map((item) => (
            <div
              onClick={() => handleClickMenuItem(item)}
              key={item.id}
              className="h-[70px] cursor-pointer w-full bg-[#1E5CCE] pl-4 flex flex-row items-center relative"
            >
              <div
                className={`w-[64px] h-[64px] rounded-full z-[1] bg-center bg-contain`}
                style={{ backgroundImage: item?.image?.url ? `url(${process.env.NEXT_PUBLIC_BACKEND_URL}${item?.image?.url})` : '' }}
              ></div>
              <div className="absolute left-0 top-0 bottom-0 right-0 py-2 pl-14">
                <div
                  className={`w-full h-full ${item.id == activeMenuId ? "bg-[#009dff5e]" : "bg-[#1E5CCE]"
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
    </>
  );
};
