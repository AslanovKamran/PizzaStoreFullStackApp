import React from 'react';
import { Link } from 'react-router-dom';


function CategoryBlock({ id, name }) {
  return (
    <>
      <div className='categories_block'>

        <h4>Id: {id} | Name: {name} </h4>
        <div className='categories_block__buttons'>

          <Link to={`/deleteCategory/${id}`}>
            <button className="button button--outline button--add">
              <span>Delete ✖</span>
            </button>
          </Link>
          <Link to={`/updateCategory/${id}`}>

            <button className="button button--outline button--add">
              <span>Update ☰</span>
            </button>
          </Link>
        </div>
      </div>
      <hr />
    </>
  )
}

export default CategoryBlock