import React, { Component } from "react";

class AddStore extends Component {
  state = {
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

  test = (e) => {
    e.preventDefault()
    var ifiles = document.getElementById('image_first_input').files
    this.props.handle_addstore(e, this.state, ifiles)
  }


  render() {
    return (
      <div>
        가게 추가
        <form encType="multipart/form-data" onSubmit={
          (e) => {
            this.test(e)
          }} >
          <label>
            게시물 제목 :
          <input type="text" value={this.state.title} onChange={this.handle_change} name='title' />
          </label>
          <label>
            가게 이름 :
          <input type="text" value={this.state.storeName} onChange={this.handle_change} name='storeName' />
          </label>
          <br />
          <label>
            사업자 등록 번호 :
          <input type="number" value={this.state.businessNumber} onChange={this.handle_change} name='businessNumber' />
          </label>
          <br />
          <label>
            가게 소개 :
            <textarea rows="5" cols="40" value={this.state.storeIntroduce} onChange={this.handle_change} name='storeIntroduce' />
          </label>
          <br />

          <label>
            가게 이미지 :
            <input
              ref="file"
              id="image_first_input"
              accept="image/*"
              type="file"
              name="image_first_input"
              multiple
            />
          </label>
          <br />
          <button type='submit'>등록하기</button>
        </form>
      </div>
    )
  }
};

export default AddStore;