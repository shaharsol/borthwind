import { useForm } from 'react-hook-form'
import './AddProduct.css'
import NewProduct from '../../../models/NewProduct'
import productsService from '../../../services/products'
import { useNavigate } from 'react-router-dom'

function AddProduct(): JSX.Element {

    const { register, handleSubmit } = useForm<NewProduct>()

    const navigate = useNavigate()

    async function submit(newProduct: NewProduct) {
        const product = await productsService.add(newProduct)
        alert(`added product with id ${product.id}`)
        navigate('/products')
    }

    return (
        <div className='AddProduct'>
            <form onSubmit={handleSubmit(submit)}>
                <label>name</label>
                <input type="text" {...register('name')}/>
                <br/>
                <label>price</label>
                <input type="number" {...register('price')}/>
                <br/>
                <label>stock</label>
                <input type="number" {...register('stock')}/>
                <br/>
                <button>submit</button>
            </form>
        </div>
    )
}

export default AddProduct