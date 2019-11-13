import React from 'react';
import './Header.css'

const Header = (props) => {
  let x = ''
  if (props.type === 'B') {
    x = '사장님 안녕하세요'
  }
  else x = '고객님 안녕하세요 '
  return (
    <div id='header'>
      <div>
        접속중인 계정 : {props.username}
      </div>
      {x}
      <div className='Nav'>  
        <button onClick={() => props.display_form('home')}>홈</button>
        <button onClick={() => props.display_form('profile')}>프로필</button>
        <button onClick={() => props.display_form('logout')}>로그아웃</button>
      </div>
    </div>
  );
};

export default Header;