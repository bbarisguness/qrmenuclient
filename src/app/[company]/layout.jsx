import { GlobalProvider } from "@/context/GlobalContext";
import { SideMenu } from "@/components/sideMenu/SideMenu";
import { getCategoriesByCompanySlug } from "@/services/categoryService";

export default async function CompanyLayout({ children, params }) {

    const { company } = await params
    const categories = await getCategoriesByCompanySlug({ slug: company })

    return (
        <div>
            <GlobalProvider>
                <SideMenu categories={categories} />
                {children}
            </GlobalProvider>
        </div>
    );
}
