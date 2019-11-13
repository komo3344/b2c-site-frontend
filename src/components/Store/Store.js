import React from 'react'
import './Store.css'
// import { Link } from 'react-router-dom'

const Store = (props) => {
  const storeList = props.data
  const list = storeList.map((store) =>
    <div key={store.id} id='store'>
      
      <li onClick={() => props.display_form('store',store.id)}>{store.store_name}</li>
      <li>{store.title}</li>
      <li>{store.content}</li>
      <p>__________________</p>
      
    </div>
  );
  return (
    <div>
      {list}
    </div>
  );
}

export default Store;