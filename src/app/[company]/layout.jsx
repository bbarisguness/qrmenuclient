import { getCategories } from "@/services/categoryService";
import { getCompany } from "@/services/companyService";
import Link from "next/link";

export const metadata = { title: "Durmuş Cafe" };

export default async function CompanyLayout({ children }) {

    const company = getCompany()
    const categories = getCategories()
    return (
        <div>
            <div className="menu">
            <Link href={`/${company.slug}/kategori`}>Kategoriler</Link>
                {categories.map((category)=> {
                    return (
                        <Link key={category.id} href={`/${company.slug}/kategori/${category.id}`}>{category.name}</Link>
                    )
                } )}
            </div>
            <hr />
            <main>{children}</main>
        </div>
    );
}
