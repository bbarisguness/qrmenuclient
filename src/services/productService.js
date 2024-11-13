import { products } from "@/data/productData";

//--------
function getProduct(id) {
  return products.find((item) => item.id == id);
}
function getProducts(categoryId) {
  return products.filter((item) => item.categoryId == categoryId);
}

//--------
export { getProduct, getProducts };
