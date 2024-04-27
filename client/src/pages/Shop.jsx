import React, { useEffect } from 'react'
import { useGetAllProducts } from '../hooks/UseGetAllProducts';

const Shop = () => {

  const { loading, error, getAllProducts, products } = useGetAllProducts();

  useEffect(() => {
    async function fetchData() {
      await getAllProducts();
    }
    fetchData();
  }, []);

  return (
    <div>Shop</div>
  )
}

export default Shop