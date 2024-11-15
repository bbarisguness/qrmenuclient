import { getCategories } from "@/services/categoryService";
import { getCompany } from "@/services/companyService";
import Link from "next/link";

export const metadata = { title: "Durmuş Cafe" };

export default async function Page() {

  const company = getCompany()

  return (
    <>
      {/* <h1>Hoşgeldiniz: {company.name}</h1>
       */}
      <div className="max-w-[600px] flex flex-col w-full relative bg-gradient-blue m-auto h-screen bg-no-repeat">
        <div className="w-full h-[30%] relative flex items-center justify-center ">
          <h1 className="font-AlfaSlabOne z-50 font-normal text-[65px] text-white leading-[59.8px] text-center relative">
            JDA <br /> COFFE
          </h1>

        </div>
        <div className="w-full h-[70%] relative">
          <div className="flex absolute w-full h-full">
            <div className="w-[50%]">
              <img className="h-full" src="jdabanne.png" alt="" />
            </div>
            <div className="w-[50%] relative">
              <div className="absolute bottom-12 right-0 w-full">
                <img className="object-contain w-full h-full" src="bardak.png" alt="" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 w-full">
            <div className="rounded-[30px] bg-white h-[70px] mr-[50px] ml-[50px] justify-center items-center flex font-Poppins font-bold text-[#1E5CCE] text-[20px]">
              Menu'yu gor
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
