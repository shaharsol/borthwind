import { FormEvent, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import useTitle from '../../../util/useTitle'
import './Defer.css'
import productsService from '../../../services/products'
import Product from '../../../models/Product'
import ProductCard from '../card-slow/ProductCardSlow'
import Spinner from '../../common/spinner/Spinner'
import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { init, remove } from '../../../redux/productsSlice'
import List from './List'


function Defer(): JSX.Element {

    useTitle('Defer')

    const [ query, setQuery ] = useState<string>('')
    const deferredQuery = useDeferredValue(query)

    function queryChanged(event: FormEvent<HTMLInputElement>){
        setQuery(event.currentTarget.value)
    }

    
    return (
        <div className='Defer'>
            <h2>Northwind Products Defer</h2>
            <input type="text" value={query} onChange={queryChanged}/>
            
            <List query={deferredQuery}/>
        </div>
    )
}

export default Defer