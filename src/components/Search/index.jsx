import React, { useContext } from 'react';
import styles from './Search.module.scss'
import { SearchContext } from '../../App';
import { useRef } from 'react';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import { useState } from 'react';


const Search = () => {
  const {  setSearch } = useContext(SearchContext)
  const [value, setValue] = useState('')
  const inputRef = useRef()
  const updateSearchValue = useCallback(
     debounce((str)=>{
    setSearch(str)
    },950),[]
    )

const onChangeInput =(event)=>{
setValue(event.target.value)
updateSearchValue(event.target.value)

}
  const onClickClear = () => {
    setSearch('')
    setValue('')
    inputRef.current.focus()
  }

  


  return (<div className={styles.root}>
    <input
      ref={inputRef}
      className={styles.input} placeholder='поиск пиццы' type="text"
       value={value} onChange={onChangeInput} />

    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg"
      enablebackground-="new 0 0 24 24" id="Layer_1"
      version="1.0" viewBox="0 0 24 24" ><g><g><path d="M9,4c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5S6.2,4,9,4 M9,2C5.1,2,2,5.1,2,9c0,3.9,3.1,7,7,7s7-3.1,7-7C16,5.1,12.9,2,9,2    L9,2z" /></g></g><g><polygon points="22,20.3 20.3,22 14,15.7 14,14 15.7,14  " /><rect height="3.6"
        transform="matrix(0.7071 -0.7071 0.7071 0.7071 -5.9741 14.4227)" width="1.2" x="13.8" y="12.6" /></g></svg>
    {value && (<svg onClick={onClickClear} className={styles.clearicon} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" ><g id="info" /><g id="icons"><path d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0  
     c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6
           C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z" id="exit" /></g></svg>)}
  </div>
  );
}

export default Search;