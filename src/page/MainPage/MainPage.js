import React, { Component } from 'react';
import { Header } from '../../components'
import { Redirect } from 'react-router-dom'
import './MainPage.css'
import { BodyContainer, BodyContainer2 } from '../../containers';
import axios from 'axios';
import URL from '../../URL/URL'

class MainPage extends Component {
  state = {
    type: '로그인중', // type 은 AuthPage에서 저장
    displayed_form: 'home',
    username: '',
  }

  display_form = (form, id) => { //화면 출력 폼 변경 함수
    this.setState({
      displayed_form: form,
      store_id: id
    });
  };

  componentDidMount() {
    axios.post(URL.token_refresh, {
      token: localStorage.getItem('token')
    }).then(res => {
      localStorage.setItem('token', res.data.token)
      axios.get(URL.currentuser, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }).then(
        res => { // 해당 토큰의 유저 정보를 불러와서 state에 정보 저장
          if (res.data[0].role_profile === 1) {
            this.setState({
              type: 'B'
            })
          } else if (res.data[0].role_profile === 2) {
            this.setState({
              type: 'C'
            })
          }
          else {
            this.setState({
              type: 'A'
            })
          }
          this.setState({
            username: res.data[0].username
          })
          localStorage.setItem('user_id', res.data[0].id)
        }
      ).catch(e => console.log(e))
    }
    ).catch(e => console.log(e))
  }

  render() {
    if (this.state.type === 'B') {
      return (
        <div className='frame'>
          <div className='header'>
            <Header username={this.state.username} type={this.state.type} display_form={this.display_form} />
          </div>
          <div className='container'>
            <BodyContainer type={this.state.type} store_id={this.state.store_id} displayed_form={this.state.displayed_form} display_form={this.display_form} />
          </div>
        </div>
      )
    }
    else if (this.state.type === 'C') {
      return (
        <div className='frame'>
          <div className='header'>
            <Header username={this.state.username} type={this.state.type} display_form={this.display_form} />
          </div>
          <div className='container'>
            <BodyContainer2 type={this.state.type} store_id={this.state.store_id} displayed_form={this.state.displayed_form} display_form={this.display_form} />
          </div>
        </div>
      )
    }
    else if (this.state.type === '로그인중') {
      return (
        <div>
          <h1>로그인 중입니다</h1>
        </div>
      )
    }
    else {
      return (
        <Redirect to='/' />
      )
    }
  }
};

export default MainPage;