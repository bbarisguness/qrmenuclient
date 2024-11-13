import { getCategories } from "@/services/categoryService";
import { getCompany } from "@/services/companyService";
import Link from "next/link";

export const metadata = { title: "Durmuş Cafe" };

export default async function Page() {

  const company = getCompany()

  return (
    <>
      <h1>Hoşgeldiniz: {company.name}</h1>
      
    </>
  );
}
