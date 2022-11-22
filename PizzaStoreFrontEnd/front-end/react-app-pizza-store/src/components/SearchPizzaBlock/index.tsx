import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchValueSelector } from '../../redux/slices/search/selector';
import { setSearchValue } from '../../redux/slices/search/slice';


import styles from './SearchPizzaBlock.module.scss'

const  SearchPizzaBlock:React.FC = () => {

  const searchValue = useSelector(searchValueSelector);
  const dispatch = useDispatch();

  const inputRef = React.useRef<HTMLInputElement>(null);

  function onClearClick() {
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  }

  function onInputChangeHandler(event:React.ChangeEvent<HTMLInputElement>){
    dispatch(setSearchValue(event.target.value));
  }

  return (
    <div className={styles.root}>
      <div className={styles.inputContainer}>

        <input
        autoComplete='off'
          ref={inputRef}
          id="myInput"
          value={searchValue}
          className={styles.input}
          type="text"
          placeholder='Search...'
          onChange={onInputChangeHandler}
        />
        {searchValue &&
          <svg onClick={() => { onClearClick() }} className={styles.closeIcon} xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" /></svg>
        }
      </div>
    </div>
  )
}



export default SearchPizzaBlock;