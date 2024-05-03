import React, { useEffect, useState } from 'react'
import SidePanel from './SidePanel';
import { useGetSpecificProduct } from '../hooks/useGetSpecificProduct';

const ProductEditPage = () => {

  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    const pathParts = path.split("/");
    const id = pathParts[pathParts.length - 1];
    setProductId(id);
  }, []);

  const { getSpecificProduct, product } = useGetSpecificProduct()

  useEffect(() => {
    async function fetchData(){
      getSpecificProduct(productId)
    }
    fetchData()
  }, [productId])
  
  console.log(product);

  return (
    <div className='w-full min-h-screen px-52  bg-slate-100'>
        <SidePanel />
        <div className="w-full min-h-screen pt-24">
        {productId} <br />
        {product.name}
        </div>
    </div>
  )
}

export default ProductEditPage