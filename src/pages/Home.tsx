import React, { useEffect } from "react";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import Categories from "../components/Categories";
import Sort, { listItems } from "../components/Sort";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setPageCount, setFilters, Filters } from "../redux/slices/filterSlices";
import qs from 'qs'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import { fetchPizzas } from "../redux/slices/PizzaSlice";
import { useAppDispatch } from "../redux/store";


const Home:React.FC= () => {
  const categoryId = useSelector((state:any) => state.filter.categoryId)
  const sortProperty = useSelector((state:any) => state.filter.sort.sortProperty)
  const pageCount = useSelector((state:any) => state.filter.pageCount)
  const searchValue = useSelector((state:any)=>state.filter.searchValue)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const { status, pizzas } = useSelector((state:any)=>state.pizza)
  
  
  const onChangeCategory = (id:number) => {
    dispatch(setCategoryId(id))
  }
  
  const onChangePage = (number:number) => {
    dispatch(setPageCount(number))
  }
  
  const getPizzas = async () => {
    const sortBy = sortProperty.replace('-', '')
    const order = sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ""
    const search = searchValue ? `&search=${searchValue}` : ''
    
    console.log(search);

  dispatch(
    fetchPizzas({
    sortBy,
    order,
    category,
    search,
    pageCount
  }),) 
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
      const params = qs.parse(window.location.search.substring(1)) as unknown as Partial<Record<Exclude<keyof Filters, 'sort'> | 'sortProperty', string>>
      const sort = listItems.find(obj => obj.sortProperty === params.sortProperty)
      const categoryId = params.categoryId ? Number.isNaN(parseInt(params.categoryId)) ? undefined : parseInt(params.categoryId) : undefined
      const pageCount = params.pageCount ? Number.isNaN(parseInt(params.pageCount)) ? undefined : parseInt(params.pageCount) : undefined
      dispatch(setFilters({
        sort,
        categoryId,
        searchValue: params.searchValue,
        pageCount
      }))
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    console.log('test')
    const queryString = qs.stringify({
      categoryId, pageCount, searchValue, sortProperty
    })

    navigate(`?${queryString}`)
  }, [categoryId, pageCount, searchValue, sortProperty])

  const items = pizzas.map((item:any) =><Pizza key={item.id} {...item} /> )
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
