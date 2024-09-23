import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import useTitle from '../../../util/useTitle'
import './Search.css'
import productsService from '../../../services/products'
import Product from '../../../models/Product'
import ProductCard from '../card/ProductCard'
import Spinner from '../../common/spinner/Spinner'
import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { init, remove } from '../../../redux/productsSlice'


function Search(): JSX.Element {

    useTitle('Search')

    // const [ products, setProducts ] = useState<Product[]>([])
    const [ filteredProducts, setFilteredProducts ] = useState<Product[]>([])
    // const products = useAppSelector((state) => state.products.products)
    // const dispatch = useAppDispatch()

    const products = useRef<Product[]>([])

    useEffect(() => {
        // how to overcome the fact that we can't use async functions inside useEffect
        // 1st solution, use an IIFE (immediately invoked function expression)
        (async () => {
            try {
                const productsFromServer = await productsService.getAll()
                products.current = productsFromServer
                // setProducts(productsFromServer)
                // dispatch(init(productsFromServer))
            } catch (e) {
                console.error(e)
            }
        })()

        // 2nd solution, use thenification
        // productsService.getAll()
        //     .then((products) => {console.log(products)})
        //     .catch()

    }, [])

    // const products = useMemo(async () => {
    //     try {
    //         const productsFromServer = await productsService.getAll()
    //         // dispatch(init(productsFromServer))
    //         return productsFromServer
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }, [])

    async function deleteProduct(id: number) {
        // try {
        //     await productsService.delete(id)
        //     const index = products.findIndex(p => p.id === id)
        //     products.splice(index, 1)
        //     setProducts([...products])
        //     // dispatch(remove({id}))


        // } catch (e) {
        //     alert(e)
        // }
    }

    function filter(event: FormEvent<HTMLInputElement>) {
        console.log(event.currentTarget.value)
        const filtered = products.current.filter(p => p.name.toLowerCase().includes(event.currentTarget.value));
        console.log(filtered)
        setFilteredProducts(filtered)
    }

    return (
        <div className='Search'>
            <h2>Northwind Products Search</h2>
            <input type="text" onChange={filter}/>
            
            {products.current.length}
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} deleteMe={deleteProduct}/>)}
        </div>
    )
}

export default Search