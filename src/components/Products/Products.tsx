import React, { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { Product } from 'redux/slices/productSlice'
import Button from '../Button/Button'
import './Products.scss'

interface Props {
  product: Product,
  onDelete: MouseEventHandler<HTMLButtonElement>
}

const Products:React.FC<Props> = ({product, onDelete}) => {
    
  return (
    <div className="prod_item" data-testid="product-item">
      <Link to={`/product/${product.id}`} className="prod_item__link">
        <span className='prod_item_img'>
            <img src={product.thumbnail} alt={`${product.brand} ${product.title}`} className="img-fluid d-block w-100"/>
        </span>
        <h4 className='prod_item_name'>{product.title}</h4>
      </Link>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='prod_item_price'>{`$${product.price}`}</div>
          <div className='prod_item-actions'>
              <Link to={`/edit/product/${product.id}`}>
                  <i className="fa-solid fa-pen" data-testid="edit-icon"></i>
              </Link>
              <Button onClick={onDelete}>
                  <i className="fa-solid fa-trash-can" data-testid="delete-icon"></i>
              </Button>
          </div>
        </div>
      
    </div>
  )
}

export default Products