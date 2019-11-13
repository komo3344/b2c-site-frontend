import React, { Component } from 'react';
import { Review } from '../../components'
import Axios from 'axios';
import $ from "jquery";
import URL from '../../URL/URL'


class ReviewContainer extends Component {
  state = { // this.props.store_id 를 가지고 해당 게시물의 리뷰 데이터 (Review, Review_file, Review_comment 데이터를 전부 불러옴)
    re: [],
    re_re: [],
  }

  handleImageChange = e => { //이미지 등록시 state에 정보 저장
    this.setState({
      image: e.target.files[0]
    })
  }

  handle_change = e => { // input data 변경시 state 에 정보 저장
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handle_C_review_create = (e, comment, star_score, img) => { //고객 리뷰 작성 핸들러 (이미지 포함)
    var formData = new FormData();
    e.preventDefault()
    Axios.post(URL.review, {
      comment: comment,
      star_score: star_score,
      s_id: this.props.store_id,
      u_id: localStorage.getItem('user_id')
    }, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    }).then(res => {
      if (img) {
        formData.append('r_id', res.data.id)
        formData.append('image', img)
        formData.append('filename', '')
        formData.append('original_name', img.name)
        Axios.post(URL.reviewfile, formData, {
          headers: {
            Authorization: `jwt ${localStorage.getItem('token')}`
          }
        }).then(res => {
          this.get_review()
          $("#commentCreate")[0].reset(); //댓글 작성시 form에 있는 데이터 비우는 제이쿼리
        })
          .catch(e => console.log(e))
      }
      else {
        this.get_review()
        $("#commentCreate")[0].reset(); //댓글 작성시 form에 있는 데이터 비우는 제이쿼리
      }
    }).catch(e => { console.log(e) })
  }

  get_review = () => { // 리뷰 리랜딩을 위한 함수
    var list
    Axios.get(`http://127.0.0.1:8000/review/store/${this.props.store_id}`, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    })
    .then(
      res => {
        this.setState({
          Review: res.data,
          re: res.data
        })
        Axios.get('http://127.0.0.1:8000/review-file/', {
          headers: {
            Authorization: `jwt ${localStorage.getItem('token')}`
          }
        })
          .then(
            res => {
              var re_list = this.state.re
              list = res.data
              for(let i = 0; i < list.length ; i++){
                for(let j = 0 ; j < re_list.length ; j++){
                  if (list[i].r_id === re_list[j].id){
                    re_list[j]['image'] = list[i]
                  }
                }
              }
              this.setState({
                re : re_list
              })
            }
          ).catch(e=>console.log(e))
      }
    )
    Axios.get(`http://127.0.0.1:8000/review-comment`, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    })
      .then(
        res => {
          this.setState({
            re_re: res.data
          })
        }
      )
  }

  componentDidMount() { // 컴포넌트가 랜더될때 필요한 정보 get
    var list
    Axios.get(`http://127.0.0.1:8000/review/store/${this.props.store_id}`, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    })
    .then(
      res => {
        this.setState({
          Review: res.data,
          re: res.data
        })
        Axios.get('http://127.0.0.1:8000/review-file/', {
          headers: {
            Authorization: `jwt ${localStorage.getItem('token')}`
          }
        })
          .then(
            res => {
              var re_list = this.state.re
              list = res.data
              for(let i = 0; i < list.length ; i++){
                for(let j = 0 ; j < re_list.length ; j++){
                  if (list[i].r_id === re_list[j].id){
                    re_list[j]['image'] = list[i]
                  }
                }
              }
              this.setState({
                re : re_list
              })
            }
          ).catch(e=>console.log(e))
      }
    )
    Axios.get(`http://127.0.0.1:8000/review-comment`, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    })
      .then(
        res => {
          this.setState({
            re_re: res.data
          })
        }
      )
  }

  doEdit_C = (id) => { // 고객 댓글 수정시 display 관리
    var C_comment = document.getElementById(`C_comment_${id}`)
    var C_comment_edit = document.getElementById(`C_comment_edit_${id}`)
    var C_comment_buttons = document.getElementById(`C_comment_buttons_${id}`)

    if (C_comment_edit.style.display === 'none') {
      C_comment_edit.style.display = 'block'
    } else {
      C_comment_edit.style.display = 'none'
    }

    if (C_comment.style.display === 'block') {
      C_comment.style.display = 'none'
    } else {
      C_comment.style.display = 'block'
    }

    if (C_comment_buttons.style.display === 'block') {
      C_comment_buttons.style.display = 'none'
    } else {
      C_comment_buttons.style.display = 'block'
    }
  }

  doCreate_B = (id) => { // 사장 댓글 생성시 display 관리
    var B_comment_create = document.getElementById(`B_comment_create_${id}`)
    var B_comment_create_buttons = document.getElementById(`B_comment_create_buttons_${id}`)

    if (B_comment_create.style.display === 'none') {
      B_comment_create.style.display = 'block'
    } else {
      B_comment_create.style.display = 'none'
    }

    if (B_comment_create_buttons.style.display === 'block') {
      B_comment_create_buttons.style.display = 'none'
    } else {
      B_comment_create_buttons.style.display = 'block'
    }
  }

  doEdit_B = (id) => { // 사장 댓글 수정시 display 관리
    var B_comment = document.getElementById(`B_comment_${id}`)
    var B_comment_edit = document.getElementById(`B_comment_edit_${id}`)
    var B_comment_buttons = document.getElementById(`B_comment_buttons_${id}`)

    if (B_comment_edit.style.display === 'none') {
      B_comment_edit.style.display = 'block'
    } else {
      B_comment_edit.style.display = 'none'
    }

    if (B_comment.style.display === 'block') {
      B_comment.style.display = 'none'
    } else {
      B_comment.style.display = 'block'
    }

    if (B_comment_buttons.style.display === 'block') {
      B_comment_buttons.style.display = 'none'
    } else {
      B_comment_buttons.style.display = 'block'
    }
  }

  deleteComment = (e, id) => { // 댓글 삭제 함수
    Axios.delete(`http://127.0.0.1:8000/review/${id}`, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    })
      .catch(e => console.log(e))
      .then(res => {
        this.get_review()
      }
      )
  }

  deleteReComment = (e, id) => { // 대댓글 삭제 함수
    Axios.delete(`http://127.0.0.1:8000/review-comment/${id}`, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    })
      .catch(e => console.log(e))
      .then(
        this.get_review()
      )
  }

  handle_B_comment_create = (e, data, r_id, r_r_id) => { // 사장 댓글 생성 함수
    e.preventDefault()
    Axios.post('http://127.0.0.1:8000/review-comment/', {
      s_id: this.props.store_id,
      r_id: r_id,
      u_id: localStorage.getItem('user_id'),
      comment: data
    }, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    }).then(res => {
      console.log(res)
      this.get_review()
    }
    ).catch(
      e => console.log(e)
    )
  }

  handle_C_comment_edit = (e, id, comment, star_score) => { // 고객 댓글 수정 함수
    e.preventDefault()
    Axios.put(`http://127.0.0.1:8000/review/${id}`, {
      comment: comment,
      star_score: star_score
    }, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    }).then(res => {
      this.get_review()
    })
      .catch(e => console.log(e))
  }

  handle_B_comment_edit = (e, id, comment) => { // 사장 댓글 수정 함수
    e.preventDefault()
    Axios.put(`${URL.re_review}${id}`, {
      comment: comment,
    }, {
      headers: {
        Authorization: `jwt ${localStorage.getItem('token')}`
      }
    }).then(res => {
      this.get_review()
    })
      .catch(e => console.log(e))
  }


  render() {
    return (
      <div>
        <h3>리뷰우</h3>
        {this.props.type === 'C' &&
          <form id='commentCreate' onSubmit={(e) => { 
            this.handle_C_review_create(e, this.state.comment, this.state.star_score, this.state.image) 
            this.setState({ //이전에 들어갔던 image 정보를 제거
              image: ''
            })
            }}>
            <input type='number' onChange={this.handle_change} name='star_score' min="1" max="5" placeholder='별점'></input>
            <textarea rows='8' onChange={this.handle_change} cols='60' placeholder='댓글 내용을 작성해주세요!' name='comment' required></textarea>
            <input
              ref="file"
              id="image"
              accept="image/*"
              type="file"
              name="image"
              onChange={this.handleImageChange}
            />
            <button type='submit'>작성하기</button>
          </form>
        }
        <Review
          type={this.props.type}
          doCreate_B={this.doCreate_B}
          doEdit_C={this.doEdit_C}
          doEdit_B={this.doEdit_B}
          handle_B_comment_create={this.handle_B_comment_create}
          handle_B_comment_edit={this.handle_B_comment_edit}
          handle_C_comment_edit={this.handle_C_comment_edit}
          deleteComment={this.deleteComment}
          deleteReComment={this.deleteReComment}
          re={this.state.re}
          re_re={this.state.re_re}
        />
      </div>
    );
  }
};

export default ReviewContainer;