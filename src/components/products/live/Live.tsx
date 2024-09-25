import { useContext, useEffect, useMemo, useState } from 'react'
import useTitle from '../../../util/useTitle'
import './Live.css'
import productsService from '../../../services/products'
import Product from '../../../models/Product'
import ProductCard from '../card/ProductCard'
import Spinner from '../../common/spinner/Spinner'
import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { init, remove, add } from '../../../redux/productsSlice'
import { AuthContext } from '../../auth/auth/Auth'
import jwtUsername from '../../../util/jwtUsername'
import { io } from 'socket.io-client'

function Live(): JSX.Element {

    useTitle('Live')

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

    async function deleteProduct(id: number) {
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


    useEffect(() => {
        const socket = io('http://localhost:3033');

        socket.on('new product', (product) => {
            console.log(`received new product from io server ${product}`)
            dispatch(add(product))
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <div className='Live'>
            <h2>Northwind Products</h2>
            <h4>your username is {username}</h4>
            <p><NavLink to="/products/add">add product</NavLink></p>
            {products.length === 0 && <Spinner />}

            {products.length > 0 && products.map(p => <ProductCard key={p.id} product={p} deleteMe={deleteProduct}/>)}
        </div>
    )
}

export default Live