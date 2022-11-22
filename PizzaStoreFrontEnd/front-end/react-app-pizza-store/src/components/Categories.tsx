import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialCategoires = [{ id: 0, name: "All" }];

interface ICategoriesProps {
  value: number,
  onClickCategory: (id:number)=>void
}

const Categories: React.FC<ICategoriesProps> = ({ value, onClickCategory }) => {
  
  const [myCategories, setMyCategories] = useState([]);
  async function loadCategories() {
    let response = await axios.get("http://localhost:13063/api/Category")
    setMyCategories(response.data)
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const categories = initialCategoires.concat(myCategories);


  return (
    <div className="categories">
      <ul>
        {
          categories.map((obj) => (
            <li
              key={obj.id}
              onClick={() => { onClickCategory(obj.id) }}
              className={value === obj.id ? "active" : ''}>
              {obj.name}
            </li>
          ))
        }
      </ul>
    </div>
  )
}


export default Categories


