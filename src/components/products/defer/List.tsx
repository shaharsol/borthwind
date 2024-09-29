import { memo, useCallback } from "react"
import { useAppSelector } from "../../../redux/hooks"
import ProductCard from '../card-slow/ProductCardSlow'
// const MemoProductCard = memo(ProductCard)

interface ListProps {
    query: string
}
function List(props: ListProps): JSX.Element {

    console.log(`list got: ${props.query}`)
    const products = useAppSelector((state) => state.products.products)
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(props.query.toLowerCase()))
    
    // async function deleteProduct(id: number) {
    // }
    const deleteProduct = useCallback((id: number) => {}, [props.query])
    
    return (
        <div>
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} deleteMe={deleteProduct} query={props.query}/>)}
        </div>
    )
}

export default memo(List)
// export default List