import { useContext, useEffect, useMemo, useState, memo, useCallback } from 'react'
import useTitle from '../../../util/useTitle'
import './ProductsListUseCallback.css'
import productsService from '../../../services/products'
import Product from '../../../models/Product'
import ProductCard from '../card-slow/ProductCardSlow'
import Spinner from '../../common/spinner/Spinner'
import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { init, remove } from '../../../redux/productsSlice'
import { AuthContext } from '../../auth/auth/Auth'
import jwtUsername from '../../../util/jwtUsername'

const ProductCardMemo = memo(ProductCard)

function ProductsListUseCallback(): JSX.Element {

    useTitle('Products')

    // const [ products, setProducts ] = useState<Product[]>([])
    const products = useAppSelector((state) => state.products.products)
    const dispatch = useAppDispatch()

    const { jwt } = useContext(AuthContext)

    const username: string = useMemo(() => {
        return jwtUsername(jwt)
    }, [jwt])

    useEffect(() => {
        // how to overcome the fact that we can't use async functions inside useEffect
        // 1st solution, use an IIFE (immediately invoked function expression)
        (async () => {
            try {
                const productsFromServer = await productsService.getAll()
                // setProducts(productsFromServer)
                dispatch(init(productsFromServer))
            } catch (e) {
                console.error(e)
            }
        })()

        // 2nd solution, use thenification
        // productsService.getAll()
        //     .then((products) => {console.log(products)})
        //     .catch()

    }, [])

    // async function deleteProduct(id: number) {
    //     try {
    //         await productsService.delete(id)
    //         // const index = products.findIndex(p => p.id === id)
    //         // products.splice(index, 1)
    //         // setProducts([...products])
    //         dispatch(remove({id}))


    //     } catch (e) {
    //         alert(e)
    //     }
    // }

    async function deleteProductImpl(id: number) {
        try {
            await productsService.delete(id)
            // const index = products.findIndex(p => p.id === id)
            // products.splice(index, 1)
            // setProducts([...products])
            dispatch(remove({id}))


        } catch (e) {
            alert(e)
        }
    }

    const deleteProduct = useCallback(deleteProductImpl, [])

    return (
        <div className='ProductsListUseCallback'>
            <h2>Northwind Products</h2>
            <h4>your username is {username}</h4>
            <p><NavLink to="/products/add">add product</NavLink></p>
            <button onClick={()=>{dispatch(init([...products]))}}>rerender</button>
            <br/>
            {products.length === 0 && <Spinner />}

            {products.length > 0 && products.map(p => <ProductCardMemo key={p.id} product={p} deleteMe={deleteProduct} query={'1'}/>)}
        </div>
    )
}

export default ProductsListUseCallback