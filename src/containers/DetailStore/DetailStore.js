import React, { Component } from 'react';
import ReviewContainer from '../ReviewContainer/ReviewContainer'
import './DetailStore.css'
import axios from 'axios'
import FormData from 'form-data'
import URL from '../../URL/URL'

class DetailStore extends Component {
  state = {
    store: [], //받아온 store_id 로 가게 data 전달받아서 출력 후에 유저 id도 받아서 ReviewContainer로 전달해야함
    imageChange: false,
    storeImg : [],
  }

  componentDidMount() {
    axios.get(`${URL.mystorefile}${this.props.store_id}`, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    }).then(res => {
      this.setState({
        storeImg : res.data
      })
    })
    .catch(e => console.log(e))
    axios.get(`${URL.storelist}${this.props.store_id}`, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        this.setState({
          store: res.data,
        })
      }).catch(e => {
        console.log(e)
      })
  }

  handle_get_store = () => {
    axios.get(`${URL.mystorefile}${this.props.store_id}`, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    }).then(res => {
      this.setState({
        storeImg : res.data
      })
    })
    axios.get(`${URL.storelist}${this.props.store_id}`, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        this.setState({
          store: res.data,
        })
      }).catch(e => {
        console.log(e)
      })
  }

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handleImageChange = e => {
    this.setState({
      image: e.target.files[0]
    })
  }

  storeEdit = () => {
    var store_info = document.getElementById("store_info")
    var edit_store_info = document.getElementById("edit_store_info")
    var edit_store_info_button = document.getElementById("edit_store_info_button")

    if (edit_store_info.style.display === 'none') {
      edit_store_info.style.display = 'block'
    } else {
      edit_store_info.style.display = 'none'
    }

    if (store_info.style.display === 'block') {
      store_info.style.display = 'none'
    } else {
      store_info.style.display = 'block'
    }

    if (edit_store_info_button.style.display === 'block') {
      edit_store_info_button.style.display = 'none'
    } else {
      edit_store_info_button.style.display = 'block'
    }
  }

  handle_info_edit = (e, store_name, business_number, title, content) => {
    e.preventDefault()
    axios.put(`http://127.0.0.1:8000/store/${this.props.store_id}`, {
      store_name: store_name,
      business_number: business_number,
      title: title,
      content: content
    }, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    }).then(res => {
      this.handle_get_store()
    })
      .catch(e => console.log(e))
  }

  handle_change_storeImg = () => {
    this.setState({
      imageChange: !this.state.imageChange
    })
  }

  edit_store_image = (e) => {
    e.preventDefault()
    var pre_img
    axios.get(`${URL.mystorefile}${this.props.store_id}`, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        pre_img = res.data
        for(let i = 0 ; i < pre_img.length ; i++){
          axios.delete(`${URL.mystorefile}${this.props.store_id}/${pre_img[i].id}`, {
            headers: {
              Authorization: `jwt ${localStorage.getItem('token')}`
            }
          })
          .catch(e => {console.log(e)})
        }
      }).catch(e => console.log(e))
    var files = document.getElementById("image_input").files
    var formData = new FormData();
    for(let i = 0 ; i < files.length; i ++){
      formData.append('image', files[i])
    }
    formData.append('s_id',this.props.store_id)
    axios.post(`${URL.storefile}`, formData, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        this.handle_change_storeImg()
        this.handle_get_store()
      })
      .catch(e => console.log(e))
  }

  render() {
    if (this.props.type === 'C') {
      return (
        <div className='DetailStore'>
          가게 번호{this.props.store_id}
          <br />
          <div className='storeImg'>
            {this.state.storeImg &&
              this.state.storeImg.map((simg) =>
                <img style={{ width: 200, height: 200 }} src={simg.image} alt='가게 사진'/>
              )
            }
          </div>
          <p>가게 이름 : {this.state.store.store_name}</p>
          <p>가게 게시물 제목 : {this.state.store.title}</p>
          <p>가게 내용 : {this.state.store.content}</p>
          <p>가게 댓글 수 : {this.state.store.reviews_count}</p>
          <p>가게 평점 : {this.state.store.average_star_score}</p>
          <ReviewContainer Review={this.state.Review} type={this.props.type} store_id={this.props.store_id} /> {/*추후에 user_id 값도 넘긴다*/}
        </div>
      );
    } else if (this.props.type === 'B') {
      return (
        <div className='DetailStore'>
          가게 번호{this.props.store_id}
          <br />
          <div className='storeImg'>
            {this.state.storeImg &&
              this.state.storeImg.map((simg) =>
                <img style={{ width: 200, height: 200 }} src={simg.image} alt='가게 사진'/>
              )
            }
          </div>
          <button onClick={this.handle_change_storeImg}>사진 바꾸기</button>
          {this.state.imageChange &&
            <form onSubmit={e => this.edit_store_image(e)}>
              <input
                ref="file"
                id="image_input"
                accept="image/*"
                type="file"
                name="image"
                multiple
                required
              />
              <button type='submit'>바꾸기</button>
            </form>}
          <div id='store_info'>
            <p>가게 이름 : {this.state.store.store_name}</p>
            <p>사업자 번호 : {this.state.store.business_number}</p>
            <p>가게 게시물 제목 : {this.state.store.title}</p>
            <p>가게 내용 : {this.state.store.content}</p>
            <p>가게 댓글 수 : {this.state.store.reviews_count}</p>
            <p>가게 평점 : {this.state.store.average_star_score}</p>
          </div>
          <div id='edit_store_info'>
            <form onSubmit={(e) => {
              this.handle_info_edit(e, this.state.store_name, this.state.business_number, this.state.title, this.state.content)
              this.storeEdit()
            }}>
              가게 이름 : <input type='text' onChange={this.handle_change} name='store_name' ></input><br />
              사업자 번호 : <input type='number' onChange={this.handle_change} name='business_number' ></input><br />
              가게 게시물 제목 : <input type='text' onChange={this.handle_change} name='title'></input><br />
              가게 내용 : <textarea name='content' onChange={this.handle_change}></textarea><br />
              <button type='submit'>수정하기</button>
            </form>
          </div>
          <div id='edit_store_info_button'>
            <button onClick={this.storeEdit}>가게 정보 수정</button>
            <button onClick={(e) => { this.props.handle_deletestore(e, this.props.store_id) }}>가게 삭제</button>
          </div>
          <ReviewContainer type={this.props.type} store_id={this.props.store_id} /> {/*추후에 user_id 값도 넘긴다*/}
        </div>
      );
    } else {
      return <div>잘못된 유저 TYPE 입니다</div>
    }
  }
};

export default DetailStore;