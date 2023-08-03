import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom'
import Loading from 'components/Loading/Loading'
import Product from 'components/Product/Product'
import {api} from 'helpers/axios'
import {Product as ProductType} from 'redux/slices/productSlice'

const ProductPage:React.FC = () => {
    const {id} = useParams()
    const [product, setProduct] = useState<ProductType>();
    useEffect(() => {
      api.get(`/products/${id}`).then(({data}) => {
        setProduct(data)
      })
    }, [id])

  return (
    <section className='mt-4' data-testid="product-detail">
        <div className='container'>
            <Product title={product?.title} brand={product?.brand} price={product?.price} rating={product?.rating} thumbnail={product?.thumbnail} description={product?.description}/>
        </div>
    </section>
  )
}

export default ProductPage