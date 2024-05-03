import React, { useEffect } from "react";
import SidePanel from "./SidePanel";
import { useGetAllProducts } from "../hooks/UseGetAllProducts";
import ProductTable from "./ProductTable";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

const AdminProductPage = () => {

  const { loading, error, products, getAllProducts } = useGetAllProducts()

  useEffect(() => {
    async function fetchData(){
      getAllProducts()
    }
    fetchData()
  }, [])

  const { deleteProduct } = useDeleteProduct()

  return (
    <section>
      <SidePanel />
      <div className="w-full min-h-screen pt-24 mb-24 bg-slate-100 flex items-center">
        <div className="w-full min-h-screen rounded-l-md">

            {loading ? <p className="text-center text-xl font-bold">Loading</p> : ""}
            {error ? <p className="text-center text-xl font-bold">{error}</p> : ""}

            <ProductTable products={products} onDelete={deleteProduct} />

        </div>
      </div>
    </section>
  );
};

export default AdminProductPage;
