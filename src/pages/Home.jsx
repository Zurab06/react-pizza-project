import React, { useEffect, useState } from "react";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "по популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setLoading(true);

        const sortBy = sortType.sortProperty.replace('-','') 
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
        const category =  categoryId > 0 ? `category=${categoryId}` : ""

      
    fetch(
      `https://6375f41b7e93bcb006be573c.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  console.log(sortType, categoryId);
  return (
    <div className="container">
      <div>
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickCategory={(i) => setCategoryId(i)}
          />
          <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {loading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : pizzas.map((item) => <Pizza key={item.id} {...item} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
