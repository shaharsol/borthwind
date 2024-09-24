import { useEffect, useRef, useState } from "react"
import Product from "../../../models/Product"
import productsService from '../../../services/products'

interface DeferListProps {
    query: string
}
function DeferList(props: DeferListProps): JSX.Element {

    const products = useRef<Product[]>([])
    const [filteredProducts, setFilteredProducts ] = useState<Product[]>([])
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

    

    const filtered = products.current.filter(p => p.name.toLowerCase().includes(props.query));
    console.log(filtered)
    setFilteredProducts(filtered)

    return (
        <div className="DeferList">
            {filteredProducts.map(p => <div key={p.id}>{p.name}</div>)}
        </div>
    )
}

export default DeferList