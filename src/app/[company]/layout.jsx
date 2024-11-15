import { getCategories } from "@/services/categoryService";
import { getCompany } from "@/services/companyService";
import Link from "next/link";

export const metadata = { title: "Durmuş Cafe" };

export default async function CompanyLayout({ children }) {

    const company = getCompany()
    const categories = getCategories()
    return (
        <div>
            <main>{children}</main>
        </div>
    );
}
