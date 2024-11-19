import { getCategories } from "@/services/categoryService";
import { getCompanyHome } from "@/services/companyService";
import Link from "next/link";
import Modal1 from "@/components/modal-1/modal1";
import Button from "@/components/button/Button";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { company } = await params
  const companyDetail = await getCompanyHome({ slug: company });

  return {
    title: companyDetail?.data[0]?.name
  }
}

export default async function Page({ params }) {
  const { company } = await params
  const companyDetail = await getCompanyHome({ slug: company });

  if (companyDetail?.data.length === 0) {
    notFound()
  }


  function convertCompanyName() {
    let string = ''
    const cName = companyDetail?.data[0]?.name.split(' ')
    cName.map((itm, i) => {
      if (cName.length != i + 1) {
        string += itm + "<br/>"
      } else {
        string += itm
      }
    })
    return string
  }


  return (
    <>
      <div className="max-w-[600px] flex flex-col w-full relative bg-gradient-blue m-auto h-[100dvh] bg-no-repeat">
        <Modal1 theme={companyDetail?.data[0]?.theme} data={companyDetail?.data[0]?.buttons} />
        <div className="w-full h-[30%] relative flex items-center justify-center ">
          <h1 className="font-AlfaSlabOne font-normal text-[65px] text-white leading-[59.8px] text-center relative">
            <div dangerouslySetInnerHTML={{ __html: convertCompanyName() }} />
          </h1>
        </div>
        <div className="w-full h-[70%] relative">
          <div className="flex absolute w-full h-full">
            <div className="w-[50%]">
              <img className="h-full" src="jdabanne.png" alt="" />
            </div>
            <div className="w-[50%] relative">
              <div className="absolute bottom-12 right-0 w-full">
                <img
                  className="object-contain w-full h-full"
                  src="bardak.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div style={{ backgroundImage: "url(jdaarkaplan.svg)", backgroundSize: '100% 100%' }} className="max-w-[600px] flex flex-col w-full relative m-auto h-[100dvh] bg-no-repeat">
        <Modal1 theme={companyDetail?.data[0]?.theme} data={companyDetail?.data[0]?.buttons} />
        <div className="w-full h-[30%] relative flex items-center justify-center ">
          <h1 className="font-AlfaSlabOne font-normal text-[65px] text-white leading-[59.8px] text-center relative">
            <div dangerouslySetInnerHTML={{ __html: convertCompanyName() }} />
          </h1>
        </div>
      </div> */}
    </>
  );
}
