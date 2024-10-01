import { NavLink } from 'react-router-dom'
import Product from '../../../models/Product'
import './ProductCardSlow.css'

interface ProductCardSlowProps {
    product: Product,
    deleteMe: Function,
    query: string
}

function ProductCardSlow(props: ProductCardSlowProps): JSX.Element {
// function ProductCardSlow({product, deleteMe, query}:{product: Product, deleteMe: Function, query: string}): JSX.Element {

    function deleteMyself() {
        props.deleteMe(+props.product.id)
    }

    let startTime = performance.now();
    // console.log('start wait')
    while (performance.now() - startTime < 10) {
        // Do nothing for 1 ms per item to emulate extremely slow code
    }
    // console.log('stop wait')

    return (
        <div className='ProductCardSlow'>
            <div>
                {props.product.name}
                <br/>
                price: ${props.product.price}
                <br/>
                stock: {props.product.stock}
                <br/>
                <button onClick={deleteMyself}>delete</button>
                <p>{props.query}</p>
            </div>
            <div>
                <NavLink to={`/products/${props.product.id}`}>
                    <img src={props.product.imageUrl} alt={props.product.name}/>
                </NavLink>
            </div>
        </div>
    )
}

export default ProductCardSlow