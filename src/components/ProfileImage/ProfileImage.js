import React from 'react'
import logo from '../../image/default.jpg'

import './ProfileImage.css'

const ProfileImage = () => {
  return (
    <div className='ProfileImage'>
      <img width='300px' height='300px' src={logo} alt='프로필사진못찾으면 뜨는 글'/>
    </div>
  );
}

export default ProfileImage;