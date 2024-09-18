import { useForm } from 'react-hook-form'
import './AddProduct.css'
import NewProduct from '../../../models/NewProduct'
import productsService from '../../../services/products'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { add } from '../../../redux/productsSlice'

function AddProduct(): JSX.Element {

    const { register, handleSubmit } = useForm<NewProduct>()

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    async function submit(newProduct: NewProduct) {
        newProduct.image = (newProduct.image as unknown as FileList)[0]
        console.log(newProduct)
        const product = await productsService.add(newProduct)
        dispatch(add(product))
        alert(`added product with id ${product.id}`)
        // navigate('/products')
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
                <label>image</label>
                <input type="file" {...register('image')}/>
                <br/>
                <button>submit</button>
            </form>
        </div>
    )
}

export default AddProduct