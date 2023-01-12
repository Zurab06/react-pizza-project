import React, { useEffect, useState } from "react";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Categories from "../components/Categories";
import Sort, { listItems } from "../components/Sort";
import Pagination from "../components/Pagination";
import { useContext } from "react";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setPageCount, setFilters } from "../redux/slices/filterSlices";
import qs from 'qs'
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { fetchPizzas } from "../redux/slices/PizzaSlice";



const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId)
  const sortProperty = useSelector((state) => state.filter.sort.sortProperty)
  const pageCount = useSelector((state) => state.filter.pageCount)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const { searchValue } = useContext(SearchContext)
  const { status, pizzas } = useSelector((state)=>state.pizza)
  

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = number => {
    dispatch(setPageCount(number))
  }

  const getPizzas = async () => {
    const sortBy = sortProperty.replace('-', '')
    const order = sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `&search=${searchValue}` : ''
    

  dispatch(fetchPizzas({
    sortBy,
    order,
    category,
    search,
    pageCount
  })) 
  }

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
     }
    isSearch.current = false

    window.scrollTo(0, 0);
  }, [categoryId, sortProperty, searchValue, pageCount]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = listItems.find(obj => obj.sortProperty === params.sortProperty)
      dispatch(setFilters({
        ...params,
        sort
      }))
      isSearch.current = true
    }
  }, [dispatch])

  useEffect(() => {
    if(isMounted.current){
      const queryString = qs.stringify({
        categoryId, sortProperty, pageCount
      })

      navigate(`?${queryString}`)
    }
    isMounted.current =true
  }, [categoryId, sortProperty, pageCount])

  const items = pizzas.map((item) => <Pizza key={item.id} {...item} />)
  const sceletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  return (
    <div className="container">
      <div>
        <div className="content__top">
          <Categories
            value={categoryId}
            onChangeCategory={onChangeCategory}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
{
        status==='error' ? (
<div>cart is empty</div>
  ) : (
        <div className="content__items">
          {status=== 'loading'
            ? sceletons
            : items}
        </div>

  )

          }


      </div>
      <Pagination currentPage={pageCount} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
