import { getProduct } from "@/services/productService";

export const metadata = {
    title: "Grande Cafe",
    description: "Grande Cafe Qr Menü",
};

export default async function Page({ params }) {

    const { productSlug } = await params
    const product = getProduct(productSlug)

    return (
        <>
            <h1>Ürün Detay Sayfası</h1>
            <h2>Ürün Adı : {product.name}</h2>
        </>
    );
}
