import React, { Component } from 'react';
import { StoreList, ProfileImage, ProfileIntroduce } from '../../components';
import './ProfileContainer.css'
import axios from "axios";
import URL from '../../URL/URL'

class ProfileContainer extends Component {
  state = {
    profile_edit: false,
    is_first: true,
    introduce: '',
    store: [ //사장님만 가지고 있는 가게 list를 불러와야함 //고객님은 즐겨찾는 가게 list를 불러와야함
             //const mystore =   'http://127.0.0.1:8000/mystore/';, 즐겨찾기는 아직
      
    ]
  }
  componentDidMount() {
    axios.get(URL.mystore,{
      headers:{
        Authorization : `jwt ${localStorage.getItem('token')}`
      }
    })
    .then(res =>{
      this.setState({
        store : res.data
      })
    }).catch(e => console.log(e))
  }

  Profile_edit = () => {
    this.setState({
      profile_edit: !this.state.profile_edit
    })
  }

  _is_not_first = () => {
    this.setState({
      is_first: !this.state.is_first,
      profile_edit: !this.state.profile_edit
    })
  }

  Handle_change_introduce = (event) => {
    console.log(this.state)
    this.setState({
      introduce: event.target.value
    })
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    this.setState({ c: !this.state.c });
    console.log(this.state)
  }

  render() {
    if (this.state.profile_edit) {
      return (
        <div>
          프로필 수정 창
          <form onSubmit={this.handleSubmit} >
            <label>
              프로팔사진 :
            <input type="file" multiple />
            </label>
            <br />
            <label>
              자기 소개 :
            <textarea rows="5" cols="40" name='storeIntroduce' onChange={this.Handle_change_introduce} value={this.state.introduce}/>
            </label>
            <br />
            <input type='submit' value='수정하기' onClick={this._is_not_first} />
            {/* {this.state.is_first ? (
              <input type='submit' value='등록하기' onClick={this._is_not_first} />
            ) : (
                <input type='submit' value='수정하기' onClick={this.profile_edit} />
              )} */}
          </form>
        </div>
      );
    }
    else {
      return (
        <div>
          프로필 게시판 입니다
          <div className='profilecard'>
            프로필카드(이미지 + 소개글 + 여러 정보)
            <button onClick={this.Profile_edit}>프로필 수정하기</button>
            <ProfileImage />
            <ProfileIntroduce introduce={this.state.introduce} />
            <br />
          </div>
          <div className='storelist'>
            즐겨 찾는 가게 목록
            <StoreList data={this.state.store} display_form={this.props.display_form} />
          </div>
        </div>
      );
    }
  }
};

export default ProfileContainer;