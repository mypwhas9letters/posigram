import React from 'react'
import Photo from './Photo.js'

const PhotoList = (props) => {
  return (
    <div className="ui container">
      <div className="ui cards">
      {props.photos.map((photo, index) => <Photo key={index} photo={photo} comments={props.comments} onClick={props.onClick} onUpload={props.onUpload} thumbsdown={props.thumbsdown}/>)}
      </div>
    </div>
  )
}

export default PhotoList
