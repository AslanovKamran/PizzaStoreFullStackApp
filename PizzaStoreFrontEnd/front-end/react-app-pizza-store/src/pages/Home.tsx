import React from 'react'

import ServerError from "../components/ServerErrorBlock";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Loader from '../components/Loader';
import SearchPizzaBlock from '../components/SearchPizzaBlock'
import Pagination from '../components/Pagination';

import { useSelector } from 'react-redux';




import MenuIcon2 from "../assets/img/MenuIcon2.svg";

import { searchValueSelector } from '../redux/slices/search/selector';
import { useAppDispatch } from '../redux/store';
import { filterSelector } from '../redux/slices/filter/selector';
import { setCategoryId, setCurrentPage, setSort } from '../redux/slices/filter/slice';
import { pizzaSelector } from '../redux/slices/pizza/selector';
import { fetchPizzas, StatusList } from '../redux/slices/pizza/slice';


interface ISortObj{
    name:string,
    sortProperty:string
}


interface IPizzaBlock{
    id:number, 
    title:string, 
    price:number, 
    imageUrl:string, 
    description:string,
    category:string
}



const Home:React.FC =() => {

    const searchValue = useSelector(searchValueSelector);
    
    const dispatch = useAppDispatch();
    
    const filter = useSelector(filterSelector);
    const categoryId = filter.categoryId;
    const sortType = filter.sort;
    const currentPage = filter.currentPage;
    
    const {items, status, pageInfo} = useSelector(pizzaSelector);
    



    const pizzas = items.filter((obj:IPizzaBlock) => { if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) return true; else return false }).map((obj:IPizzaBlock) => (<PizzaBlock key={obj.id} {...obj} />))

    function onClickCategory(id:number) {
        dispatch(setCategoryId(id));
        dispatch(setCurrentPage(1));
    }

    function onSortClick(obj:ISortObj) {
        dispatch(setSort(obj));
        dispatch(setCurrentPage(1));
    }

    function onPageChange(number:number) {
        dispatch(setCurrentPage(number));
    }

    async function loadPizzas() {
      
        var order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        let sortBy = sortType.sortProperty.replace('-', '');
        let category = categoryId > 0 ? `category=${categoryId}` : '';
        
        dispatch(
        fetchPizzas({order, sortBy, category, currentPage})
        );
    }


    React.useEffect(() => {
        loadPizzas();
    }, [categoryId, sortType, currentPage]);




    if (status === StatusList.PENDING ) return <Loader />
    else if (status === StatusList.FAIL) return <ServerError />
    else if(status ===StatusList.SUCCESS) 
    return (

        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id:number) => onClickCategory(id)} />
                <Sort sortObj={sortType} onSortClick={onSortClick} />
            </div>


            <h2 className="content__title">
              
                <img className='menuIcon' alt='MenuIcons' src={MenuIcon2}/>
            </h2>
            
            <SearchPizzaBlock />

            <div className="content__items">
                {
                    pizzas
                }
            </div>

            {

                <Pagination onPageChange={onPageChange} currentPage={currentPage} pageCount={Math.ceil(pageInfo.totalPages)} itemsPerPage={Math.ceil(pageInfo.itemsPerPage)} />
            }
        </div>
    )
    else return (<></>);
}

export default Home