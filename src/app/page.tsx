import { Poppins } from "next/font/google";
import { categories } from "./types";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { getFeaturedProducts } from "@/actions/get-products";
import { getAllProducts } from "@/actions/get-products";
import { toast } from "sonner";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function Home() {

  const featuredProducts = await getFeaturedProducts();
  const allProducts= await getAllProducts([0,-1]);
  if(!allProducts.success){
    console.log(allProducts.message)
  }

  return (
    <div>
      <div className="bg-slate-600 w-full h-32">

      </div>
      <br />
      <Card className="w-full h-12">
        <div className="flex items-center justify-center h-full w-full">
          <div className="flex justify-between w-full px-4">
            {categories.map((category) => (
              <span>{category.name}</span>
            ))}
          </div>
        </div>
      </Card>
      <br />
      <div className="grid grid-cols-4 gap-4">
        {featuredProducts.data.map((product:any) => (
          <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} image={product.image} rating={4.5} />
        ))}
      </div>
      <br />
      <div className="w-full h-16 bg-slate-600"></div>
      <br />
      <div className="grid grid-cols-4 gap-4">

        {
          allProducts && allProducts.data?.map((product:any) => (
            <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} image={product.image} rating={4.5} />
          ))
        }
      </div>
    </div>
  );
}
