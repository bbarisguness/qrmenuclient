import { getCompanyHome } from "@/services/companyService";
import Modal1 from "@/components/modal-1/modal1";
import { notFound } from "next/navigation";
import { getGlobalVariables } from "@/services/globalVariablesService";

export async function generateMetadata({ params }) {
  const { company } = await params
  const companyDetail = await getCompanyHome({ slug: company });

  return {
    title: companyDetail?.data[0]?.name
  }
}

export default async function Page({ params, searchParams }) {
  const { company } = await params
  const { lang } = await searchParams
  const companyDetail = await getCompanyHome({ slug: company, lang: lang });
  const globalVariables = await getGlobalVariables({ lang: lang })

  if (companyDetail?.data.length === 0 || companyDetail?.data?.[0]?.isActive === false) {
    notFound()
  }
  const languages = [companyDetail.data[0].locale, ...companyDetail.data[0].localizations.map((itm) => itm?.locale)]


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
      {/* <div className="max-w-[600px] flex flex-col w-full relative bg-gradient-blue m-auto h-[100dvh] bg-no-repeat">
        <Modal1 globalVariables={globalVariables} theme={companyDetail?.data[0]?.theme} data={companyDetail?.data[0]?.buttons} />
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
      </div> */}

      {/* <div style={{ backgroundImage: "url(jdaarkaplan.svg)", backgroundSize: 'cover',bacp }} className="max-w-[600px] flex flex-col w-full relative m-auto h-[100dvh] bg-no-repeat">
        <Modal1 globalVariables={globalVariables} theme={companyDetail?.data[0]?.theme} data={companyDetail?.data[0]?.buttons} />
        <div className="w-full h-[30%] relative flex items-center justify-center ">
          <h1 className="font-AlfaSlabOne font-normal text-[65px] text-white leading-[59.8px] text-center relative">
            <div dangerouslySetInnerHTML={{ __html: convertCompanyName() }} />
          </h1>
        </div>
      </div> */}
      <div className="max-w-[600px] flex flex-col w-full relative m-auto h-[100dvh] bg-no-repeat">
        <Modal1 currencies={companyDetail?.data?.[0]?.currencies} settingButton={companyDetail?.data[0]?.settingButton} languages={languages} globalVariables={globalVariables} theme={companyDetail?.data[0]?.theme} data={companyDetail?.data[0]?.buttons} />
        <div style={{ backgroundImage: companyDetail?.data[0]?.showBanner ? `url(${process.env.NEXT_PUBLIC_BACKEND_URL}${companyDetail?.data[0]?.banner?.url})` : 'none', backgroundColor: companyDetail?.data[0]?.showBanner ? '' : `${companyDetail?.data[0]?.bannerBackgroundColor}`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', zIndex: -1 }} className="relative top-0 left-0 w-full h-full">
          {
            companyDetail?.data[0]?.showBanner !== true &&
            <h1 className="font-AlfaSlabOne font-normal text-[65px] text-white leading-[59.8px] text-center relative mt-[30px]">
              <div dangerouslySetInnerHTML={{ __html: convertCompanyName() }} />
            </h1>
          }
        </div>
      </div>
    </>
  );
}
