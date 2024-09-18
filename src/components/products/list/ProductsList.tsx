import { useEffect, useState } from 'react'
import useTitle from '../../../util/useTitle'
import './ProductsList.css'
import productsService from '../../../services/products'
import Product from '../../../models/Product'
import ProductCard from '../card/ProductCard'
import Spinner from '../../common/spinner/Spinner'
import { NavLink } from 'react-router-dom'

function ProductsList(): JSX.Element {

    useTitle('Products')

    const [ products, setProducts ] = useState<Product[]>([])

    useEffect(() => {
        // how to overcome the fact that we can't use async functions inside useEffect
        // 1st solution, use an IIFE (immediately invoked function expression)
        (async () => {
            try {
                const productsFromServer = await productsService.getAll()
                setProducts(productsFromServer)
            } catch (e) {
                console.error(e)
            }
        })()

        // 2nd solution, use thenification
        // productsService.getAll()
        //     .then((products) => {console.log(products)})
        //     .catch()

    }, [])

    async function deleteProduct(id: number) {
        try {
            await productsService.delete(id)
            const index = products.findIndex(p => p.id === id)
            products.splice(index, 1)
            setProducts([...products])

        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='ProductsList'>
            <h2>Northwind Products</h2>
            <p><NavLink to="/products/add">add product</NavLink></p>
            {/* <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                        <th>stock</th>
                        <th>imageUrl</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td><img src={product.imageUrl}/></td>
                    </tr>)}
                </tbody>
            </table> */}
            {products.length === 0 && <Spinner />}

            {products.length > 0 && products.map(p => <ProductCard key={p.id} product={p} deleteMe={deleteProduct}/>)}
        </div>
    )
}

export default ProductsList