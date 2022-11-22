import React, { useEffect, useRef, useState } from 'react'

interface ISortObj{
  name:string,
  sortProperty:string
}

interface ISortProps{
  sortObj:ISortObj,
  onSortClick:(obj:ISortObj) => void;
}

const sortList:ISortObj[] = [
  { name: 'price ▾', sortProperty: 'price' },
  { name: 'price ▴', sortProperty: '-price' },

  { name: 'title ▾', sortProperty: '-title' },
  { name: 'title ▴', sortProperty: 'title' }
];


const Sort:React.FC<ISortProps> = ({ sortObj, onSortClick }) => {
  
  const [open, setOpen] = useState(false);
  
  const sortRef = useRef<HTMLDivElement>(null);
  
  function handleClickOutSide(event:any) {
    if (!event.composedPath().includes(sortRef.current)) {
      setOpen(false);
 
    }
  }
  
  useEffect(() => {
    document.body.addEventListener('click', handleClickOutSide);

    //Unmounting
    return () => {
      document.body.removeEventListener('click', handleClickOutSide);
    }

  }, []);


  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b onClick={() => { setOpen(!open) }}>Sort By:</b>
        <span onClick={() => { setOpen(!open) }}>{sortObj.name}</span>
      </div>
      {
        open && (
          <div className="sort__popup">
            <ul>
              {
                sortList.map((obj, index) => (
                  <li
                    onClick={() => onSortClick(obj)}
                    key={index}
                    className={sortObj.sortProperty === obj.sortProperty ? 'active' : ''}
                  >
                    {obj.name}
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }

    </div>

  )
}

export default Sort