import ProductListing from "../ProductListing";
import { getAllProducts } from "@/app/actions/productActions";

interface Section {
  id: string;
  category: "modern" | "classic" | "shirt";
  title: string;
  description: string;
  details?: string[];
  care?: string[];
}

interface ProductListingServerProps {
  sections: Section[];
  pageTitle?: string;
  subTitle?: string;
}

export default async function ProductListingServer({ 
  sections, 
  pageTitle, 
  subTitle 
}: ProductListingServerProps) {
  const products = await getAllProducts();

  // Pass the sections and page info to the client component
  // The client component will filter the products based on the sections
  return (
    <ProductListing 
      sections={sections} 
      pageTitle={pageTitle} 
      subTitle={subTitle}
    />
  );
}