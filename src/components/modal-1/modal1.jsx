"use client";

import { useState, useRef, useEffect } from "react";
import Button from "../button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import RadioButton from "../radioButton";
import { useGlobalContext } from "@/context/GlobalContext";
import RadioButtonCurrency from "../radioButtonCurrency";
import Alert from "../alert";

export default function Modal1({ data, theme, globalVariables, languages, settingButton, currencies }) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [wifiCopied, setWifiCopied] = useState(false);
  const [modalType, setModalType] = useState(0)
  const menuRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString());
  const { language, setLanguage, currencyType, setCurrencyType } = useGlobalContext();

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
    if (!wifiCopied) {
      Alert({ message: language === 'tr' ? 'Şifre kopyalandı' : 'Password copied', title: '', type: 'success', time: 1000 })
    }
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


  const handleClickMenuItem = ({ url, copyText }) => {
    if (url) {
      router.push(`${url}?${currentParams.toString()}`);
    } else {
      handleCopy(copyText);
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

  const Circle2 = ({ color }) => {
    return (
      <>
        <div
          className={`w-6 h-6 rounded-full p-[1px] flex items-center justify-center relative bottom-[1.5px]`}
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


  const Prop = ({ name, svg, color, isLastItem = false, url = null, copyText = null }) => {
    return (
      <div className="flex items-center gap-3">
        <Circle color={color} />
        <div
          onClick={() => handleClickMenuItem({ url: url, copyText: copyText })}
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
      <Button settingButton={settingButton} buttonText={globalVariables?.data?.homePageBottomButtonText} setModalType={setModalType} theme={theme} setIsMenuActive={setIsMenuActive} />
      {isMenuActive && (
        <div className="w-full h-full absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 z-10"></div>
      )}
      <div
        ref={menuRef}
        className={`w-full rounded-t-[40px] bg-white flex flex-col py-10 gap-[18px] px-12 absolute z-20 duration-500 ${!isMenuActive ? "bottom-[-110%]" : "bottom-0"
          }`}
      >
        {
          modalType === 0 ?
            data?.filter((el) => el?.active)?.map((item, i) => {
              if (item?.active) {
                return (
                  <Prop
                    key={i}
                    color={item?.color}
                    url={item?.url}
                    name={item?.name}
                    isLastItem={data?.filter((el) => el?.active)?.length === i + 1}
                    copyText={item?.copyText}
                    svg={
                      <div dangerouslySetInnerHTML={{ __html: item?.svg }} />
                    }
                  />
                )
              }
            }) :
            <div>
              <div className="flex items-center">
                <div
                  className="flex items-center gap-3 flex-1 pb-[26px] cursor-pointer border-opacity-30 border-black"
                  style={{ borderBottomWidth: 1 }}
                >
                  {
                    languages?.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-3 flex-[0.25] cursor-pointer border-opacity-30 border-black"
                        >
                          <RadioButton isChecked={language === item ? true : false} color={"black"} name={item} setLanguage={setLanguage} />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className="flex items-center mt-[26px]">
                <div
                  className="flex items-center gap-3 flex-1 pb-[26px] cursor-pointer"
                >
                  <div
                    className="flex items-center gap-3 flex-[0.25] cursor-pointer border-opacity-30 border-black"
                  >
                    <RadioButtonCurrency isChecked={currencyType === 'tl' ? true : false} color={"black"} name={"tl"} setCurrencyType={setCurrencyType} />
                  </div>
                  {
                    currencies?.map((itm, i) => {
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-3 flex-[0.25] cursor-pointer border-opacity-30 border-black"
                        >
                          <RadioButtonCurrency isChecked={currencyType === itm?.currency ? true : false} color={"black"} name={itm?.currency} setCurrencyType={setCurrencyType} />
                        </div>
                      )
                    })
                  }
                  {/* <div
                    className="flex items-center gap-3 flex-[0.25] cursor-pointer border-opacity-30 border-black"
                  >
                    <RadioButtonCurrency isChecked={currencyType === 'tl' ? true : false} color={"black"} name={"tl"} setCurrencyType={setCurrencyType} />
                  </div>
                  <div
                    className="flex items-center gap-3 flex-[0.25] cursor-pointer border-opacity-30 border-black"
                  >
                    <RadioButtonCurrency isChecked={currencyType === 'usd' ? true : false} color={"black"} name={"usd"} setCurrencyType={setCurrencyType} />
                  </div>
                  <div
                    className="flex items-center gap-3 flex-[0.25] cursor-pointer border-opacity-30 border-black"
                  >
                    <RadioButtonCurrency isChecked={currencyType === 'gbp' ? true : false} color={"black"} name={"gbp"} setCurrencyType={setCurrencyType} />
                  </div>
                  <div
                    className="flex items-center gap-3 flex-[0.25] cursor-pointer border-opacity-30 border-black"
                  >
                    <RadioButtonCurrency isChecked={currencyType === 'eur' ? true : false} color={"black"} name={"eur"} setCurrencyType={setCurrencyType} />
                  </div> */}
                </div>
              </div>
            </div>
        }
        <div
          onClick={() => setIsMenuActive(false)}
          style={{ backgroundColor: `#${theme.primaryColor}`, color: `#${theme.secondaryColor}` }}
          className={`rounded-[30px] duration-500 cursor-pointer h-[70px] justify-center items-center flex font-Poppins font-bold text-[20px]`}
        >
          {globalVariables?.data?.backButtonText}
        </div>
      </div>
    </div >
  );
}
