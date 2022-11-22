import { Link } from 'react-router-dom';

function PizzaBlock({ id, title, price, imageUrl, description, category }) {

    return (

        <div className='pizza-block-wrapper'>
            <div className="pizza-block">

            <Link to={`/updatePizza/${id}`}>

                <img
                    className="pizza-block__image"
                    src={"http://localhost:13063/content/" + imageUrl}
                    alt="Pizza"
                />
                </Link>
                <h4 className="pizza-block__title">{title}</h4>
                <div className='pizza-block__additional-info'>
                    <h6>Category:{category}</h6>
                    <h6>Price: {price}$</h6>
                </div>
                <h6 className="pizza-block__description">{description}</h6>



                <div className="pizza-block__bottom">


                    <Link to={`/updatePizza/${id}`}>
                        <button className="button button--outline button--add">
                            <span>Update ☰</span>
                        </button>
                    </Link>

                    <Link to={`/deletePizza/${id}`}>

                        <button className="button button--outline button--add">
                            <span>Delete ✖</span>
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default PizzaBlock