import { getCategories } from "@/services/categoryService";
import { getCompany } from "@/services/companyService";
import Link from "next/link";

export const metadata = { title: "Grande Cafe", };


export default async function Page() {
    
    const company = getCompany()
    const categories = getCategories()
    
    return (
        <>
            <h1>Kategori Liste Sayfası</h1>
            <ul>
                {categories.map((category) => {
                    return (
                        <li>
                            <Link key={category.id} href={`/${company.slug}/kategori/${category.id}`}>{category.name}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}
