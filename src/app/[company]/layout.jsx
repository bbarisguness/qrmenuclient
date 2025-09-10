import { GlobalProvider } from "@/context/GlobalContext";
import { getCompany } from "@/services/companyService";

export default async function CompanyLayout({ children, params }) {
    const { company } = await params
    const companyDetail = await getCompany({ slug: company })
    return (
        <div>
            <GlobalProvider defaultLang={companyDetail?.data?.[0]?.defaultLang}>
                {children}
            </GlobalProvider>
        </div>
    );
}
