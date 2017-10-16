import React, { Component } from 'react';
import Login from './components/Login.js'
import Navbar from './components/Navbar.js'
import Signup from './components/Signup.js'
import PhotoContainer from './components/PhotoContainer.js'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from'./components/Footer.js'
import UserContainer from './components/UserContainer.js'
import Welcome from './components/Welcome.js'
import { loginUser, logoutUser, signUpUser } from './services/user.js'
import { Redirect } from 'react-router-dom'
import { uploadPhoto, addNewComment, addDislike } from './services/photo.js'



class App extends Component {

  state = {
    users:[],
    photos: [],
    comments: [],
    isLoggedIn: false,
    currentUser: {}
  }

  uploadPho = (pictureParams) => {
    uploadPhoto(pictureParams)
    .then(() => this.fetchPhotos())
  }

  addThumbs = (pictureWithDislikesParams) => {
    addDislike(pictureWithDislikesParams)
    .then(() => this.fetchPhotos())
  }

  uploadComment = (commentParams) => {
    addNewComment(commentParams)
    .then(() => this.fetchComments())
  }

  login = (loginParams) => {
    loginUser(loginParams)
      .then((user) => {
        if (user.message !== "Invalid User") {
        localStorage.setItem("jwtToken", user.jwt)
        localStorage.setItem("user_id", user.user.id)
        this.setState({
          currentUser: user,
          isLoggedIn: true
        })
      }})
  }

    signup = (signUpParams) => {
    signUpUser(signUpParams)
    .then((data)=> loginUser(data))
      .then((user) => {
        if (user.message !== "Invalid User") {
        localStorage.setItem("jwtToken", user.jwt)
        localStorage.setItem("user_id", user.user.id)
        this.setState({
          users: [...this.state.users, user],
          currentUser: user,
          isLoggedIn: true
        })
      }})
  }

    logout = () => {

    logoutUser()
    this.setState({
      currentUser: null,
      isLoggedIn: false
    })
  }


  componentDidMount(){
    this.fetchUsers()
    this.fetchPhotos()
    this.fetchComments()
  }

  fetchUsers = () => {
    fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(users => this.setState({users}))
  }

  fetchPhotos = () => {
    fetch("http://localhost:3000/photos")
    .then(res => res.json())
    .then(photos => this.setState({photos}))
  }

  fetchComments = () => {
    fetch("http://localhost:3000/comments")
    .then(res => res.json())
    .then(comments => this.setState({comments}))
  }

  handleClick = (event) => {

  }



  render() {
    if (localStorage.getItem('jwtToken')) {
   return (
        <div>
          <Route path='/' render={(props) => <Navbar onClick={this.logout}/> } />
          <Route exact path='/' component={Welcome} />
          <Route exact path = '/home' render={()=> { return <PhotoContainer thumbsdown={this.addThumbs} onUpload={this.uploadComment} photos={this.state.photos} comments={this.state.comments} onClick={this.handleClick} />}}/>
          <Route exact path='/login' render={() => <Redirect to='/home'/>} />
          <Route exact path='/signup' render={() => <Redirect to='/home'/>} />
          <Route path="/users/:id" render={(routeProps) => {
                   const id = routeProps.match.params.id
                   if (this.state.users.length) {
                     return <UserContainer onUploadPhoto={this.uploadPho} thumbsdown={this.addThumbs}  onUploadComment={this.uploadComment} user={this.state.users[id - 1]} comments={this.state.comments} photos={this.state.photos} onClick={this.handleClick} />
                   } else {
                     return null
                   }
                 }} />
          <Footer />
        </div>
    ) } else {
    return (<div>
    <Route path='/' render={(props) => <Navbar onClick={this.logout}/> } />
    <Route exact path='/login' render={(props)=> <Login onLogin={this.login} {...props} />} />
    <Route exact path = '/home' render={() =><Redirect to='/login'/>}/>
    <Route exact path = '/profile' render={() =><Redirect to='/login'/>}/>
    <Route exact path='/' component={Welcome} />
    <Route exact path='/signup' render={(props) => {return <Signup onSignUp={this.signup} {...props}/>}} />
    </div>
    )
   }
  }
}

export default App;
