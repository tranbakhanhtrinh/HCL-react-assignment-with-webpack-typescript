import React from 'react'
import './Loading.scss'

const Loading:React.FC = () => {
  return (
    <div className="lds-heart" data-testid="heart-loading"><div></div></div>
  )
}

export default Loading