import React, { Component } from 'react'
import './Signup.css'

class Signup extends Component {
  state = {
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <div>
        <div className='Signup'>
          <h1>회원가입</h1>
          <form onSubmit={(e) => { this.props.handle_signup(e, this.state) }}>
            <span>사장님으로 회원가입하기</span>
            <input type='checkbox' onChange={this.handle_change} value={true} name='type' />
            <br />
            <label>Name:</label>
            <input type="text" name='id' value={this.state.id} onChange={this.handle_change} />
            <br />
            <label>Email:</label>
            <input type="email" name='email' value={this.state.email} onChange={this.handle_change} />
            <br />
            <label>PassWord:</label>
            <input type="password" name='password' value={this.state.password} onChange={this.handle_change} />
            <br />
            <label>PassWord Again:</label>
            <input type="password" name='password_check' value={this.state.password_check} onChange={this.handle_change} />
            <br />
            <br />
            <button type="submit"> 등록 </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;