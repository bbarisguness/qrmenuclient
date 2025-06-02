import { getCompanyHome } from "@/services/companyService";
import Modal1 from "@/components/modal-1/modal1";
import { notFound } from "next/navigation";
import { getGlobalVariables } from "@/services/globalVariablesService";
import { getCategoriesByCompanySlug } from "@/services/categoryService";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaComment } from "react-icons/fa";
import WifiButton from "@/components/wifibutton";
import LangMenu from "@/components/langMenu";
import CurrencyMenu from "@/components/currencyMenu";

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


  if (companyDetail?.data?.[0]?.themeVersion === "theme1") {
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
          <div style={{ backgroundImage: companyDetail?.data[0]?.showBanner ? `url(${companyDetail?.data[0]?.banner?.url})` : 'none', backgroundColor: companyDetail?.data[0]?.showBanner ? '' : `${companyDetail?.data[0]?.bannerBackgroundColor}`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', zIndex: -1 }} className="relative top-0 left-0 w-full h-full">
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
  } else if (companyDetail?.data?.[0]?.themeVersion === "theme2") {
    const data = await getCategoriesByCompanySlug({ slug: company, lang: lang || 'tr' })
    return (
      <>
        <div className="bg-[#f4f4f4] w-full min-h-[calc(100vh-56px)] transition-all duration-300 absolute top-[56px] right-0">
          <nav style={{ backgroundColor: companyDetail?.data[0]?.theme?.primaryColor ? `#${companyDetail?.data[0]?.theme?.primaryColor}` : "#0f263a" }} className='h-[56px] w-full fixed top-0 left-0 z-[10] flex items-center py-[.5rem] px-[1rem]'>
            {
              companyDetail?.data?.[0]?.currencies?.length > 0 &&
              <CurrencyMenu modal color={companyDetail?.data[0]?.theme?.secondaryColor || 'ffffff'} data={companyDetail?.data?.[0]?.currencies} />
            }
            <div className='flex items-center justify-between w-full px-[15px] mx-auto'>
              <div style={{ color: companyDetail?.data[0]?.theme?.secondaryColor ? `#${companyDetail?.data[0]?.theme?.secondaryColor}` : "#ffffff" }} className='h-[30px] my-[5px] mx-0 text-[20px] font-extrabold w-full text-center max-[412px]:text-[16px]'>{companyDetail?.data[0]?.name}</div>
            </div>
            {
              companyDetail?.data?.[0]?.localizations?.length > 0 &&
              <LangMenu modal color={companyDetail?.data[0]?.theme?.secondaryColor || 'ffffff'} data={companyDetail?.data?.[0]?.localizations} locale={companyDetail?.data?.[0]?.locale} />
            }
          </nav>
          <div className="max-w-full my-0 mx-auto min-h-[calc(100vh-156px)] bg-[#ffffff] overflow-hidden">
            <div className="mb-[-15px] overflow-hidden relative block box-border select-none">
              <div className="relative block overflow-hidden m-0 p-0 select-none">
                <div className="">
                  <img className="w-full max-h-[1000px]" src={`${companyDetail?.data?.[0]?.banner?.url}`} />
                </div>
              </div>
              <ul className="bottom-[20px] absolute block w-full p-0 m-0 list-none text-center">
                <li className="relative inline-block w-[20px] p-0 cursor-pointer m-0 h-[15px]">
                  <button className="bg-[#ffffff] w-[15px] h-[5px] p-0 rounded-[90px]"></button>
                </li>
              </ul>
            </div>
            <div className="relative overflow-hidden bg-[#ffffff] w-[95%] mt-0 mb-[15px] mx-auto rounded-[10px] py-[20px] px-[15px] shadow-[0px_1px_9px_0px_rgba(50,50,50,0.13)]">
              <div className="relative mb-[25px] mt-0">
                <div className="w-full leading-1 text-center text-[#212529] text-[18px] mb-[5px] font-semibold">{globalVariables?.data?.homePageBottomButtonText}</div>
                <div className="clear-both"></div>
              </div>
              <div className="ml-[-5px] mr-[-5px] mt-[-5px] text-[#212529]">
                {
                  data?.data?.map((itm, i) => {
                    return (
                      <div key={i} className="relative w-[50%] h-[85px] overflow-hidden float-left border-[5px] border-solid border-[#ffffff] rounded-[10px]">
                        <Link className="text-[#212529] no-underline " href={`/${company}/kategori/${itm?.slug}?lang=${lang || 'tr'}`}>
                          <div className="table relative w-full h-full z-[2] text-center">
                            <div className="break-normal text-center table-cell align-middle text-[#fff] text-[18px] font-semibold px-[20px] leading-[1]">{itm.name}</div>
                          </div>
                          <div className="absolute top-0 left-0 w-full h-full bg-[#000000]">
                            {
                              itm?.image?.url &&
                              <img className="opacity-70 max-h-[100%] max-w-[100%] w-full h-full ml-0" src={`${itm?.image?.url}`} />
                            }
                          </div>
                        </Link>
                      </div>
                    )
                  })
                }

              </div>
            </div>
          </div>
          <div style={{ backgroundColor: companyDetail?.data[0]?.theme?.primaryColor ? `#${companyDetail?.data[0]?.theme?.primaryColor}` : "#0f263a" }} className='py-[20px] px-[35px] h-[100px] text-center text-[#ffffff]'>
            {
              companyDetail?.data[0]?.buttons?.find((itm) => itm?.type === "wifi") &&
              <WifiButton color={companyDetail?.data[0]?.theme?.secondaryColor || 'ffffff'} data={companyDetail?.data[0]?.buttons?.find((itm) => itm?.type === "wifi")} />
            }
            <div className='text-center gap-1 flex flex-wrap justify-center items-center w-full text-[#ffffff]'>
              {
                companyDetail?.data[0]?.buttons?.map((itm, i) => {
                  if (itm?.type === "instagram") {
                    return (
                      <Link key={i} href={itm?.url} rel="nofollow" target="_blank" className='rounded-full flex items-center justify-center bg-[#ffffff] w-[30px] h-[30px]'>
                        <FaInstagram color='#0f263a' />
                      </Link>
                    )
                  } else if (itm?.type === "facebook") {
                    return (
                      <Link key={i} href={itm?.url} rel="nofollow" target="_blank" className='rounded-full flex items-center justify-center bg-[#ffffff] w-[30px] h-[30px]'>
                        <FaFacebookF color='#0f263a' />
                      </Link>
                    )
                  } else if (itm?.type === "comments") {
                    return (
                      <Link key={i} href={itm?.url} rel="nofollow" target="_blank" className='rounded-full flex items-center justify-center bg-[#ffffff] w-[30px] h-[30px]'>
                        <FaComment color='#0f263a' />
                      </Link>
                    )
                  }
                })
              }


              {/* <Link href={'/'} className='rounded-full flex items-center justify-center bg-[#ffffff] w-[30px] h-[30px]'>
              <FaTwitter color='#0f263a' />
            </Link>
            <Link href={'/'} className='rounded-full flex items-center justify-center bg-[#ffffff] w-[30px] h-[30px]'>
              <FaYoutube color='#0f263a' />
            </Link> */}
            </div>
          </div>
        </div>
      </>
    );
  } else if (companyDetail?.data?.[0]?.themeVersion === "theme3") {
    return (
      <>
        <div className="min-h-[100dvh] h-full m-auto w-full">
          <div>
            <div className="w-full min-h-[calc(100dvh)] relative">
              <div style={{
                background: 'rgba(0, 0, 0, 0.6)',
              }} className="w-full h-full min-h-[calc(100dvh)] absolute">
              </div>
              <div style={{ backgroundImage: 'url(/mobile-patternt.jpg)', backgroundSize: 'cover', backgroundPosition: 'center center' }} className="w-full min-h-[calc(100dvh)] p-[12px] flex flex-col">
                <div className="flex">
                  {
                    companyDetail?.data?.[0]?.currencies?.length > 0 &&
                    <div className="w-full flex justify-start z-[1000]">
                      <CurrencyMenu color={companyDetail?.data[0]?.theme?.secondaryColor || 'ffffff'} data={companyDetail?.data?.[0]?.currencies} />
                    </div>
                  }
                  {
                    companyDetail?.data?.[0]?.localizations?.length > 0 &&
                    <div className="w-full flex justify-end z-[1000]">
                      <LangMenu color={companyDetail?.data[0]?.theme?.secondaryColor || 'ffffff'} data={companyDetail?.data?.[0]?.localizations} locale={companyDetail?.data?.[0]?.locale} />
                    </div>
                  }
                </div>

                <div className="w-full grow flex z-10  justify-center flex-col">
                  <div style={{ marginTop: 'auto' }} className="w-full flex flex-col items-center gap-[40px]">
                    {
                      companyDetail?.data?.[0]?.logo?.url &&
                      <div>
                        <img width={155} height={155} src={`${companyDetail?.data?.[0]?.logo?.url}`} alt="" />
                      </div>
                    }
                    <div className="w-full">
                      <span className="text-[32px] block text-white text-center m-auto break-words w-[80%]">
                        <b>{companyDetail?.data?.[0]?.name}</b>
                      </span>
                      <span className="block text-center break-words text-white"> {lang === 'tr' ? "Hoş Geldiniz" : "Welcome"} </span>
                    </div>
                    <div className="w-full text-center">
                      <div>
                        <Link style={{ backgroundColor: `#${companyDetail?.data?.[0]?.theme?.primaryColor}`, color: 'rgb(255, 255, 255)' }} href={`${companyDetail?.data?.[0]?.slug}/kategori?lang=${lang || 'tr'}`} className="inline-flex items-center justify-center active:duration-200 duration-200 active:opacity-60 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-[50%] min-w-[215px] text-black !m-auto p-[10px] rounded-[20px] h-[2.75rem]">
                          {companyDetail?.data?.[0]?.buttons?.find((itm) => itm.type === 'menu')?.name}
                        </Link>
                      </div>
                      {
                        companyDetail?.data?.[0]?.buttons?.find((itm) => itm.type === 'wifi') &&
                        <div className="mt-[12px]">
                          <WifiButton variant={2} color={"FFF"} bgColor={`#${companyDetail?.data?.[0]?.theme?.primaryColor}`} data={companyDetail?.data?.[0]?.buttons?.find((itm) => itm.type === 'wifi')} />
                        </div>
                      }
                    </div>
                  </div>
                  <div style={{ marginTop: 'auto' }} className="flex flex-col items-center gap-[48px]">
                    <div className="flex gap-5 mb-[10px]">
                      {
                        companyDetail?.data?.[0]?.buttons?.map((itm, i) => {
                          if (itm?.type === "instagram") {
                            return (
                              <Link target="_blank" key={i} href={itm?.url}>
                                <FaInstagram color="#FFF" size={26} />
                              </Link>
                            )
                          } else if (itm?.type === "facebook") {
                            return (
                              <Link target="_blank" key={i} href={itm?.url}>
                                <FaFacebookF color="#FFF" size={26} />
                              </Link>
                            )
                          } else if (itm?.type === "comments") {
                            return (
                              <Link target="_blank" key={i} href={itm?.url}>
                                <FaComment color="#FFF" size={26} />
                              </Link>
                            )
                          }
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
