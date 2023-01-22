import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { selectSort, setSort } from "../redux/slices/filterSlices";
export  const listItems = [
   { name: "по популярности", sortProperty: "rating" },
   { name: "по популярности(убыванию)", sortProperty: "-rating" },
   { name: "цене", sortProperty: "-price" },
   { name: "цене(убыванию)", sortProperty: "price" },
   { name: "алфавиту", sortProperty: "title" },
   { name: "алфавиту(убыванию)", sortProperty: "-title" },
   
 ];
const Sort = () => {
  const dispatch = useDispatch()
  const sort = useSelector(selectSort)
  const [openedList, setOpenedist] = useState(false);
  const sortRef = useRef()
  const onSetItem = (obj) => {
 dispatch(setSort(obj))
    setOpenedist(false);
  };

  useEffect(()=>{
    const handleClickOutside =(event)=>{
      if(!event.path.includes(sortRef.current)){
        setOpenedist(false)
      }
  
    }
    document.body.addEventListener('click', handleClickOutside)
    return()=>{
      document.body.removeEventListener('click',handleClickOutside)
    }
  },[])

  return (
    <div>
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <span onClick={() => setOpenedist(!openedList)}>{sort.name}</span>
        </div>
        {openedList && <div className="sort__popup">
          <ul>
            {listItems.map((item, i) => (
                <li
                  onClick={() => onSetItem(item)}
                  key={i}
                  className={
                    sort.sortProperty === item.sortProperty ? "active" : ""
                  }
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>}
      </div>
    </div>
  );
};

export default Sort;
