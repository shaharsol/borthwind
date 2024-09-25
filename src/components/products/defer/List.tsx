import { memo } from "react"
import { useAppSelector } from "../../../redux/hooks"
import ProductCard from '../card-slow/ProductCardSlow'

interface ListProps {
    query: string
}
function List(props: ListProps): JSX.Element {

    console.log(`list got: ${props.query}`)
    const products = useAppSelector((state) => state.products.products)
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(props.query.toLowerCase()))
    
    async function deleteProduct(id: number) {
    }
    
    return (
        <div>
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} deleteMe={deleteProduct} query={props.query}/>)}

        </div>
    )
}

export default memo(List)
// export default List