import { FormEvent, Suspense, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import useTitle from '../../../util/useTitle'
import './Defer.css'
import productsService from '../../../services/products'
import Product from '../../../models/Product'
import ProductCard from '../card/ProductCard'
import Spinner from '../../common/spinner/Spinner'
import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { init, remove } from '../../../redux/productsSlice'
import DeferList from './List'


function Defer(): JSX.Element {

    useTitle('Defer')

    // const [ products, setProducts ] = useState<Product[]>([])
    // const [ filteredProducts, setFilteredProducts ] = useState<Product[]>([])
    const [ query, setQuery ] = useState<string>('')
    const deferred = useDeferredValue(query)
    // const products = useAppSelector((state) => state.products.products)
    // const dispatch = useAppDispatch()


    // const products = useMemo(async () => {
    //     try {
    //         const productsFromServer = await productsService.getAll()
    //         // dispatch(init(productsFromServer))
    //         return productsFromServer
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }, [])

    function filter(event: FormEvent<HTMLInputElement>) {
        console.log(event.currentTarget.value)
        setQuery(event.currentTarget.value)
    }


    return (
        <div className='Defer'>
            <h2>Northwind Products Defer</h2>
            <input type="text" value={query} onChange={filter}/>
            
            <Suspense fallback={<h2>Loading...</h2>}>
                <DeferList query={deferred}/>
            </Suspense>
        </div>
    )
}

export default Defer