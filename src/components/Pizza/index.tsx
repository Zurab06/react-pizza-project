import React from "react";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, CartItem } from "../../redux/slices/cartSlice";

type PizzaProps = {
  id: string,
  title:string,
  price: number,
  imageUrl: string,
  sizes:number[],
  types:number[],
  rating: number,
  count: number

}

const Pizza:React.FC<PizzaProps> = ({id,title,price,imageUrl,sizes,types,count}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector((state:any)=>state.cart.items.find((obj:any)=>obj.id===id))

  const typeNames = ["тонкое", "традиционное"];
  const [choose, setChoose] = useState(0);
  const [size, setSize] = useState(0);
  const addedCount = cartItem ? cartItem.count : 0


  const onAddClick =()=>{
    const item:CartItem = {
      count: 0,
    id,title,price,imageUrl,
    type: typeNames[choose],
    asize: sizes[size]
    }
    dispatch(addItem(item))
    console.log(item);
  }
 
  return (
    <div>
      <div className="pizza-block">
        <Link key={id} to={`/pizzas/${id}`}><img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4></Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((index) => (
              <li key={index}
                onClick={() => setChoose(index)}
                className={choose === index ? "active" : ""}
              >
                {typeNames[index]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((item, index) => (
              <li key={index}
                onClick={() => setSize(index)}
                className={index === size ? "active" : ""}
              >
                {" "}
                {item}cm
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div  className="pizza-block__price">{price}</div>
          <div onClick={onAddClick} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <button>Добавить</button>
          {addedCount > 0 && <i>{addedCount}</i>}

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
