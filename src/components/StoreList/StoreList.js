import React from 'react'
import './StoreList.css'
import Store from '../Store/Store'

const StoreList = (props) => {
  const data = props.data
  return (
    <div>
      <Store type={props.type} data={data} display_form={props.display_form}/>
    </div>
  );
}

export default StoreList;