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

    const [ pfs, setPfs] = useState<Product[]>([])
    const [ filteredProducts, setFilteredProducts ] = useState<Product[]>([])
    const [ filteredToNothing, setFilteredTNothing] = useState<boolean>(false)

    const products = useRef<Product[]>([])

    useEffect(() => {
        (async () => {
            try {
                const productsFromServer = await productsService.getAll()
                // products.current = productsFromServer
                setFilteredProducts(productsFromServer)
                setPfs(productsFromServer)
            } catch (e) {
                console.error(e)
            }
        })()

    }, [])

    async function deleteProduct(id: number) {
    }

    function filter(event: FormEvent<HTMLInputElement>) {

        console.log(event.currentTarget.value)
        console.log(pfs.length)
        // const filtered = products.current.filter(p => p.name.toLowerCase().includes(event.currentTarget.value));
        const filtered = pfs.filter(p => p.name.toLowerCase().includes(event.currentTarget.value));
        console.log(filtered)
        setFilteredProducts(filtered)
        if(filtered.length === 0) return setFilteredTNothing(true);
        return setFilteredTNothing(false);
    }

    return (
        <div className='Search'>

            {(filteredProducts.length > 0 || filteredToNothing) && <div>
                <h2>Northwind Products Search</h2>
                <input type="text" onChange={filter}/>
                <br />

                {filteredProducts.map(p => <ProductCard key={p.id} product={p} deleteMe={deleteProduct} query={'test'} />)}
            </div>}

            {filteredProducts.length === 0 && !filteredToNothing && <Spinner />}
        </div>
    )
}

export default Search