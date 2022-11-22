

import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { cartItemSelector } from '../redux/slices/cart/selector';
import { addItem } from '../redux/slices/cart/slice';

interface IPizzaBlockProps{
    id:number, 
    title:string, 
    price:number, 
    imageUrl:string,
    description:string,
    category:string
}

const PizzaBlock:React.FC<IPizzaBlockProps> =({ id, title, price, imageUrl,description, category })=> {



    const cartItem = useSelector(cartItemSelector(id));
    const addedCount = cartItem ? cartItem.count : 0;

    const dispatch = useDispatch();

    function AddItem() {
        const item = {
            id,
            title,
            price,
            imageUrl,
        };
        dispatch(addItem(item));
    }



    return (

        <div className='pizza-block-wrapper'>
            <div className="pizza-block">
                <Link to={`/pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={"http://localhost:13063/content/" + imageUrl}
                        alt="Pizza"
                    />
                </Link>
                <h4 className="pizza-block__title">{title}</h4>
                <h6 className="pizza-block__description">{description}</h6>
                <h6 style={{marginTop:'20px'}} className="pizza-block__price">Category: {category}</h6>


                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">Price: {price}$</div>
                    <button onClick={AddItem} className="button button--outline button--add">


                        <span>Add this</span>
                        <i>{addedCount}</i>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default PizzaBlock