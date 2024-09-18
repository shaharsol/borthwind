import { Navigate, useNavigate, useParams } from 'react-router-dom'
import './ProductDetails.css'
import { useEffect, useState } from 'react'
import productsService from '../../../services/products'
import Product from '../../../models/Product'
import Spinner from '../../common/spinner/Spinner'

function ProductDetails(): JSX.Element {

    const { id } = useParams<'id'>()

    const [product, setProduct] = useState<Product>()

    const navigate = useNavigate()
    
    useEffect(() => {
        (async () => {
            if (id) {
                const product = await productsService.getById(+id)
                setProduct(product)
            }
        })()
    }, [])

    async function deleteMe() {
        if (id) {
            try {
                await productsService.delete(+id)
                alert('product deleted')
                navigate('/products')
    
            } catch (e) {
                alert(e)
            }
        }
    }

    return (

        <div className="ProductDetails">
            <h3>{product?.name}</h3>
            <br/>
            <button onClick={deleteMe}>delete</button>
        </div>
    )
}

export default ProductDetails