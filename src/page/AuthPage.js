import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Login, Signup } from '../containers'
import axios from "axios";
import URL from '../URL/URL'

class AuthPage extends Component {
  state = {
    login_check: false,
    type: 'B',
    displayed_form: 'login'
  }

  handle_login_check = () => {
    this.setState({
      login_check: true
    })
    localStorage.setItem('type', this.state.type) // MainPage에서 type 이용
  }

  handle_login = (e, data) => {
    if (e){
      e.preventDefault()
    }
    axios.post(URL.token_auth,{
      username: data.id,
      password: data.password
    })
    .then(res => {
      localStorage.setItem('token', res.data.token)
      this.handle_login_check()
    })
    .catch(e => console.log(e))
  }

  handle_signup = (e, data) => {
    if (e){
      e.preventDefault()
    }
    var type
    if(data.type === 'true'){
      type = true
    } else type = false
    axios.post(URL.signup,{
      username: data.id,
      password1: data.password,
      password2: data.password_check,
      email: data.email,
      Business: type,
      user_type: data.user_type
    })
    .then(res => {
      if(data.user_type !== undefined){
        var login_data = {}
        login_data['id'] = data.id
        login_data['password'] = data.password
        this.handle_login(false, login_data)
      }
      this.display_form('login')
    })
    .catch(e => console.log(e))
  }


  display_form = (form) => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <Login display_form={this.display_form} handle_login={this.handle_login} handle_signup={this.handle_signup}/>;
        break;
      case 'signup':
        form = <Signup handle_signup={this.handle_signup} />;
        break;
      default:
        form = '';
    }
    return (
      <div>
        {this.state.login_check ?
          (
            <Redirect to="/main"/>
          ) :
          (
            <div>
              {form}
            </div>
          )
        }
      </div>
    )
  }
};

export default AuthPage;