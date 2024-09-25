import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import useTitle from '../../../util/useTitle'
import './Search.css'
import productsService from '../../../services/products'
import Product from '../../../models/Product'
// import ProductCard from '../card/ProductCard'
import ProductCard from '../card-slow/ProductCardSlow'
import Spinner from '../../common/spinner/Spinner'
import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { init, remove } from '../../../redux/productsSlice'


function Search(): JSX.Element {

    useTitle('Search')

    const [ filteredProducts, setFilteredProducts ] = useState<Product[]>([])

    const products = useRef<Product[]>([])

    useEffect(() => {
        (async () => {
            try {
                const productsFromServer = await productsService.getAll()
                products.current = productsFromServer
            } catch (e) {
                console.error(e)
            }
        })()

    }, [])

    async function deleteProduct(id: number) {
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
            
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} deleteMe={deleteProduct} query={'test'} />)}
        </div>
    )
}

export default Search