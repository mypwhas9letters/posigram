import React from 'react'
import PhotoList from './PhotoList.js'

const PhotoContainer = (props) => {
  return (
    <div>
      <PhotoList photos={props.photos} comments={props.comments} onClick={props.onClick} onUpload={props.onUpload} thumbsdown={props.thumbsdown}/>
    </div>
  )
}

export default PhotoContainer
