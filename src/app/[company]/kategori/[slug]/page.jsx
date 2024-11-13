import { getCompany } from "@/services/companyService";
import { getProducts } from "@/services/productService";
import Link from "next/link";

export const metadata = {
    title: "Grande Cafe",
    description: "Grande Cafe Qr Menü",
};

export default async function Page({ params }) {

    const { slug } = await params
    const company = getCompany();
    const products = getProducts(slug)
    return (
        <>
            <h1>Kategori Detay Sayfası</h1>
            <ul>
                {products.map((product) => {
                    return (<li key={product.id}><Link href={`/${company.slug}/${product.id}`}>{product.name}</Link></li>)
                })}

            </ul>
        </>
    );
}
