import React from 'react'
import { addDislike } from '../services/photo.js'


class Photo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: "",
    }
  }

  thumbsUp = (event) => {
    const pictureWithDislikesParams = {id: this.props.photo.id, url: this.props.photo.url, user_id: this.props.photo.user_id, dislikes: (this.props.photo.dislikes + 1)}
    this.props.thumbsdown(pictureWithDislikesParams)
  }

  findCommentsAndUsers = () => {

    let listOfComments = []
    if (this.props.comments) {
    for (let i = 0; i < this.props.comments.length; i++) {
    if (this.props.photo.id === this.props.comments[i].photo_id)
    listOfComments.push(`${this.props.comments[i].user.username}: ${this.props.comments[i].content}`)}
  }
    // if (this.props.photo.comments) {
    // for (let i = 0; i < this.props.photo.comments.length; i++) {
    //   listOfComments.push(`${this.props.photo.users[i].username}:  ${this.props.photo.comments[i].content}`)
    // }
    // }
    return listOfComments
  }

  handleChange = (event) => {
      this.setState({value: event.target.value});
    }

  addComment = (event) => {
    event.preventDefault()
    if (!this.state.value) {alert("You can't post a blank comment")} else {
    var sentiment = require('sentiment')
    if (sentiment(this.state.value).score > 0) {
    if (this.state.value.length) {
    const commentParams = { content: this.state.value, photo_id: this.props.photo.id, user_id: localStorage.getItem('user_id')}
    this.props.onUpload(commentParams)
    this.setState({value: ""})}
  } else {alert('This comment is too negative! Be Nicer!')
    this.setState({value: ""})}}
}

  render() {
    let comments = this.findCommentsAndUsers()
    if (this.props.photo.user) {
    return (
      <div className="card">
        <div className="content">
          <h2>{this.props.photo.user.username}</h2>
        </div>
        <a className="image">
          <img onClick={this.props.onClick} src={this.props.photo.url} alt=""/>
        </a>
        <div className="extra content ">
          <span className="right floated">
            <i onClick={this.thumbsUp} className="thumbs up outline like icon"></i>
            {this.props.photo.dislikes}
          </span>
          <i className="comment icon"></i>
            {comments.length} comments
        </div>
        <div className="content">
          {comments.map((comment, index) =>
            <div key={index} onClick={this.props.onClick} className="description">{comment}</div>
          )}
        </div>
        <div className="extra content">
        <form onSubmit={this.addComment}>
          <div className="ui large transparent left icon input">
            <i className="comment outline up icon"></i>
            <input type="text" placeholder="Add Comment..." value={this.state.value} onChange={this.handleChange}/>
            <button type="submit" className="ui icon negative button"><i className="thumbs outline up icon"></i></button>
          </div>
        </form>

        </div>
      </div>
   )} else {return <div></div>}
  }
}

export default Photo
