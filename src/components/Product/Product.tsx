import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Product.scss'

interface Props {
  title?: string
  brand?: string
  price?: number
  rating?: number
  thumbnail?: string
  description?: string
}

const Product: React.FC<Props> = ({
  title,
  brand,
  price,
  rating,
  thumbnail,
  description
}) => {
  return (
    <div className='product'>
      <div className='row'>
        <div className='col-12 col-xl-4'>
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={brand + ' ' + title}
              className='img-fluid d-block w-100'
            />
          ) : (
            <Skeleton
              height={300}
              containerTestId='thumbnail'
            />
          )}
        </div>
        <div className='col-12 col-xl-8'>
          <h1>{title || <Skeleton />}</h1>
          <h5>{brand ? `Brand: ${brand}` : <Skeleton />}</h5>
          <h5>{price ? `Price: ${price}` : <Skeleton />}</h5>
          <h5>{rating ? `Rating: ${rating}` : <Skeleton />}</h5>
          <p>{description || <Skeleton />}</p>
        </div>
      </div>
    </div>
  )
}

export default Product
