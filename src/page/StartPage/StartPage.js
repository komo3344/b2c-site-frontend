import React from "react";
import { Link } from 'react-router-dom'
import './StartPage.css'

const StartPage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('user_id');
  return (
    <div className='start'>Start <br />
    <Link to='/auth' >시작하기</Link>
    </div>
  )
};

export default StartPage;