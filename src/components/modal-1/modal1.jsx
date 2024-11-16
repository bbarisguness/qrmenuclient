"use client";

import { useState, useRef, useEffect } from "react";
import Button from "../button/Button";
import { useRouter } from "next/navigation";

export default function Modal1() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [wifiCopied, setWifiCopied] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuActive(false); // Dışarı tıklandığında menüyü kapat
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCopy = async (textToCopy) => {
    setWifiCopied(true);
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed"; // Görünmez yapmak için.
        textArea.style.top = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setTimeout(() => {
        setWifiCopied(false);
      }, 1000);
    } catch (err) {
      console.error("Kopyalama işlemi başarısız!", err);
    }
  };


  const handleClickMenuItem = (url) => {
    if (url) {
      router.push(url);
    } else {
      handleCopy("Alemdagli");
    }
  };

  const Circle = ({ color }) => {
    return (
      <>
        <div
          className={`w-6 h-6 rounded-full p-[1px] flex items-center justify-center relative bottom-[10px]`}
          style={{ backgroundColor: color }}
        >
          <div className="w-[100%] h-[100%] bg-[white] rounded-full p-[5px]">
            <div
              className={`w-[100%] h-[100%] rounded-full`}
              style={{ backgroundColor: color }}
            ></div>
          </div>
        </div>
      </>
    );
  };

  const Prop = ({ name, svg, color, isLastItem = false, url = null }) => {
    return (
      <div className="flex items-center gap-3">
        <Circle color={color} />
        <div
          onClick={() => handleClickMenuItem(url)}
          className="flex items-center gap-3 flex-1 pb-[18px] cursor-pointer border-opacity-30 border-black"
          style={{ borderBottomWidth: isLastItem ? 0 : 1 }}
        >
          <div
            className="w-[50px] h-[50px] rounded-[10px] flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            {svg}
          </div>
          <span>{name}</span>
          {!url && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              className={`duration ${wifiCopied ? "opacity-100" : "opacity-0"}`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.973 10.774L0.499998 7.30002C0.178243 6.97854 -0.00254059 6.54236 -0.00254059 6.08752C-0.00254059 5.63269 0.178243 5.1965 0.499998 4.87502C1.16993 4.20607 2.25506 4.20607 2.925 4.87502L5.1 7.04802C5.19127 7.13879 5.33872 7.13879 5.43 7.04802L11.07 1.40802C11.7399 0.739074 12.8251 0.739074 13.495 1.40802C13.8168 1.7295 13.9975 2.16569 13.9975 2.62052C13.9975 3.07536 13.8168 3.51154 13.495 3.83302L6.555 10.774C5.84194 11.4869 4.68605 11.4869 3.973 10.774Z"
                fill="#42526E"
              />
            </svg>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="z-10 w-full h-full absolute overflow-hidden ">
      <Button setIsMenuActive={setIsMenuActive} />
      {isMenuActive && (
        <div className="w-full h-full absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 z-10"></div>
      )}
      <div
        ref={menuRef}
        className={`w-full rounded-t-[40px] bg-white flex flex-col py-10 gap-[18px] px-12 absolute z-20 duration-500 ${!isMenuActive ? "bottom-[-110%]" : "bottom-0"
          }`}
      >
        <Prop
          color={"#0af460"}
          url={"/jda/kategori"}
          name={"Menu'yü gör"}
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="21"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.99 0.769989H1.01C0.457185 0.772652 0.00816337 1.21723 0 1.76999V2.17999C0.00110198 2.73718 0.452811 3.18844 1.01 3.18899H12.99C13.5472 3.18844 13.9989 2.73718 14 2.17999V1.77199C13.9929 1.21845 13.5436 0.772671 12.99 0.769989ZM12.99 5.69999H1.01C0.457185 5.70265 0.00816337 6.14723 0 6.69999V7.10699C0.00055124 7.66457 0.452421 8.11644 1.01 8.11699H12.99C13.5452 8.11645 13.9962 7.66822 14 7.11299V6.70499C13.9951 6.15005 13.545 5.70216 12.99 5.69999ZM1.01 10.637H12.987C13.542 10.6375 13.9934 11.0841 14 11.639V12.046C13.9978 12.6036 13.5446 13.0541 12.987 13.053H1.01C0.452421 13.0524 0.00055124 12.6006 0 12.043V11.637C0.00816337 11.0842 0.457185 10.6397 1.01 10.637Z"
                fill="white"
              />
            </svg>
          }
        />
        <Prop
          color={"#F47B0A"}
          name={"Wifi Şifresi Kopyala"}
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="29"
              height="21"
              viewBox="0 0 29 21"
              fill="none"
            >
              <path
                d="M14.5759 4.56659C18.5922 4.56676 22.455 6.1087 25.3658 8.87371C25.585 9.08718 25.9353 9.08449 26.1512 8.86768L28.2465 6.75486C28.3558 6.64489 28.4167 6.49594 28.4158 6.34095C28.4149 6.18597 28.3522 6.03773 28.2416 5.92905C20.6017 -1.38651 8.54881 -1.38651 0.908871 5.92905C0.798201 6.03765 0.735408 6.18584 0.734388 6.34083C0.733367 6.49581 0.794203 6.64481 0.903433 6.75486L2.99931 8.86768C3.21505 9.08482 3.56567 9.08751 3.78473 8.87371C6.69591 6.10852 10.5591 4.56658 14.5759 4.56659ZM14.5759 11.4405C16.7826 11.4403 18.9106 12.2599 20.5463 13.7398C20.7676 13.9498 21.1161 13.9453 21.3318 13.7295L23.4246 11.6167C23.5348 11.5059 23.596 11.3556 23.5944 11.1993C23.5928 11.0431 23.5286 10.8941 23.4162 10.7855C18.435 6.15592 10.721 6.15592 5.73987 10.7855C5.62736 10.894 5.56316 11.0432 5.56169 11.1995C5.56021 11.3557 5.62157 11.5061 5.73202 11.6167L7.82427 13.7295C8.03994 13.9453 8.38845 13.9498 8.6097 13.7398C10.2444 12.2608 12.3706 11.4414 14.5759 11.4405ZM18.7692 16.0654C18.7724 16.2221 18.7108 16.3731 18.5988 16.4829L14.9786 20.1332C14.8725 20.2405 14.7278 20.3009 14.5768 20.3009C14.4259 20.3009 14.2812 20.2405 14.1751 20.1332L10.5543 16.4829C10.4424 16.373 10.3809 16.222 10.3842 16.0653C10.3875 15.9086 10.4554 15.7603 10.5718 15.6553C12.8838 13.7014 16.2699 13.7014 18.5819 15.6553C18.6982 15.7604 18.766 15.9088 18.7692 16.0654Z"
                fill="white"
              />
            </svg>
          }
        />
        <Prop
          color={"#EB4796"}
          name={"Instagram"}
          url={"/instagram"}
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="27"
              viewBox="0 0 28 27"
              fill="none"
            >
              <g clipPath="url(#clip0_1581_2340)">
                <path
                  d="M14.1769 2.46413C17.7142 2.46413 18.1331 2.47964 19.5242 2.5417C20.8171 2.59858 21.5153 2.81579 21.9807 2.99679C22.5961 3.23467 23.0408 3.52428 23.5011 3.98454C23.9665 4.44997 24.251 4.88954 24.4889 5.50495C24.6699 5.97038 24.8871 6.6737 24.9439 7.9614C25.006 9.35769 25.0215 9.77658 25.0215 13.3087C25.0215 16.846 25.006 17.2649 24.9439 18.656C24.8871 19.9489 24.6699 20.647 24.4889 21.1124C24.251 21.7278 23.9614 22.1726 23.5011 22.6329C23.0357 23.0983 22.5961 23.3827 21.9807 23.6206C21.5153 23.8016 20.8119 24.0188 19.5242 24.0757C18.128 24.1378 17.7091 24.1533 14.1769 24.1533C10.6397 24.1533 10.2208 24.1378 8.82965 24.0757C7.53678 24.0188 6.83863 23.8016 6.3732 23.6206C5.7578 23.3827 5.31305 23.0931 4.85279 22.6329C4.38736 22.1674 4.10293 21.7278 3.86504 21.1124C3.68404 20.647 3.46684 19.9437 3.40995 18.656C3.34789 17.2597 3.33238 16.8408 3.33238 13.3087C3.33238 9.77141 3.34789 9.35252 3.40995 7.9614C3.46684 6.66853 3.68404 5.97038 3.86504 5.50495C4.10293 4.88954 4.39253 4.4448 4.85279 3.98454C5.31822 3.5191 5.7578 3.23467 6.3732 2.99679C6.83863 2.81579 7.54195 2.59858 8.82965 2.5417C10.2208 2.47964 10.6397 2.46413 14.1769 2.46413ZM14.1769 0.0800781C10.5828 0.0800781 10.1329 0.0955925 8.72105 0.15765C7.31441 0.219708 6.34734 0.447252 5.50957 0.773055C4.63559 1.11437 3.89607 1.56429 3.16172 2.30381C2.4222 3.03816 1.97228 3.77768 1.63097 4.64649C1.30516 5.48943 1.07762 6.45133 1.01556 7.85797C0.953503 9.27495 0.937988 9.72487 0.937988 13.319C0.937988 16.9132 0.953503 17.3631 1.01556 18.7749C1.07762 20.1816 1.30516 21.1486 1.63097 21.9864C1.97228 22.8604 2.4222 23.5999 3.16172 24.3343C3.89607 25.0686 4.63559 25.5237 5.5044 25.8598C6.34735 26.1857 7.30924 26.4132 8.71588 26.4753C10.1277 26.5373 10.5776 26.5528 14.1718 26.5528C17.7659 26.5528 18.2159 26.5373 19.6277 26.4753C21.0343 26.4132 22.0014 26.1857 22.8392 25.8598C23.708 25.5237 24.4475 25.0686 25.1818 24.3343C25.9162 23.5999 26.3713 22.8604 26.7074 21.9916C27.0332 21.1486 27.2608 20.1868 27.3228 18.7801C27.3849 17.3683 27.4004 16.9184 27.4004 13.3242C27.4004 9.73004 27.3849 9.28012 27.3228 7.86831C27.2608 6.46167 27.0332 5.49461 26.7074 4.65683C26.3816 3.77768 25.9317 3.03816 25.1922 2.30381C24.4578 1.56946 23.7183 1.11437 22.8495 0.778226C22.0066 0.452424 21.0447 0.224879 19.638 0.162822C18.221 0.0955925 17.7711 0.0800781 14.1769 0.0800781Z"
                  fill="white"
                />
                <path
                  d="M14.1769 6.51855C10.4225 6.51855 7.37646 9.56455 7.37646 13.319C7.37646 17.0735 10.4225 20.1195 14.1769 20.1195C17.9314 20.1195 20.9774 17.0735 20.9774 13.319C20.9774 9.56455 17.9314 6.51855 14.1769 6.51855ZM14.1769 17.7303C11.7412 17.7303 9.76568 15.7548 9.76568 13.319C9.76568 10.8833 11.7412 8.90777 14.1769 8.90777C16.6127 8.90777 18.5882 10.8833 18.5882 13.319C18.5882 15.7548 16.6127 17.7303 14.1769 17.7303Z"
                  fill="white"
                />
                <path
                  d="M22.834 6.24975C22.834 7.1289 22.1203 7.8374 21.2463 7.8374C20.3672 7.8374 19.6587 7.12373 19.6587 6.24975C19.6587 5.3706 20.3724 4.66211 21.2463 4.66211C22.1203 4.66211 22.834 5.37577 22.834 6.24975Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1581_2340">
                  <rect
                    width="26.4779"
                    height="26.4779"
                    fill="white"
                    transform="translate(0.937988 0.0800781)"
                  />
                </clipPath>
              </defs>
            </svg>
          }
        />
        <Prop
          color={"#0038FF"}
          name={"Facebook"}
          url={"/facebook"}
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M24.2115 12.6109C24.2115 5.93954 18.8231 0.53125 12.1763 0.53125C5.5295 0.53125 0.141113 5.93954 0.141113 12.6109C0.141113 18.2757 4.02703 23.0293 9.26907 24.3349V16.3024H6.78742V12.6109H9.26907V11.0202C9.26907 6.90881 11.123 5.00313 15.1446 5.00313C15.9072 5.00313 17.2229 5.1534 17.7611 5.30319V8.64924C17.4771 8.61929 16.9836 8.60431 16.3708 8.60431C14.3975 8.60431 13.635 9.35469 13.635 11.3053V12.6109H17.5661L16.8907 16.3024H13.635V24.6021C19.5943 23.8797 24.212 18.787 24.212 12.6109H24.2115Z"
                fill="white"
              />
            </svg>
          }
        />
        <Prop
          color={"#6C3AE1"}
          name={"Yorumlar"}
          url={"/yorumlar"}
          isLastItem={true}
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="24"
              viewBox="0 0 17 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0006 20.7957C14.6035 22.6109 13.0733 23.8833 11.3282 23.8496L5.44069 23.5786C1.2675 22.951 0.566406 18.8864 0.566406 15.4759V11.1563C0.566573 10.265 0.88197 9.40669 1.44945 8.75317L6.30871 2.091C7.02983 1.25489 7.9279 0.153148 9.04465 1.95195C9.49027 2.52299 9.76376 3.22461 9.82921 3.96468C9.82931 4.40743 9.73211 4.84403 9.54543 5.23935L7.61408 9.19351H14.196C14.534 9.18735 14.8661 9.28781 15.1509 9.48231C15.9699 10.018 16.3739 11.055 16.1524 12.0531L15.0006 20.7957Z"
                fill="white"
              />
            </svg>
          }
        />
        <div
          onClick={() => setIsMenuActive(false)}
          className="rounded-[30px] bg-[#1E5CCE] hover:bg-[#1e5cceb4] duration-500 cursor-pointer  h-[70px] justify-center items-center flex font-Poppins font-bold text-white text-[20px] "
        >
          Geri dön
        </div>
      </div>
    </div>
  );
}
