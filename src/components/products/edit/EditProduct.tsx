import { useForm } from 'react-hook-form'
import './EditProduct.css'
import NewProduct from '../../../models/NewProduct'
import productsService from '../../../services/products'
import { useNavigate, useParams } from 'react-router-dom'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

function EditProduct(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<NewProduct>()

    const navigate = useNavigate()

    const { id } = useParams<'id'>()

    async function submit(newProduct: NewProduct) {
        if (id) {
            newProduct.image = (newProduct.image as unknown as FileList)[0]
            const product = await productsService.update(+id, newProduct)
            alert(`added product with id ${product.id}`)
            navigate('/products')
        }
    }

    const [imageSource, setImageSource] = useState<string>('')
    useEffect(() => {
        (async () => {
            if (id) {
                const product = await productsService.getById(+id)
                setValue('name', product.name)
                setValue('price', product.price)
                setValue('stock', product.stock)
                setImageSource(product.imageUrl)
            }
        })()
    }, [])

    function previewImage(event: FormEvent<HTMLInputElement>) {
        const file = event.currentTarget.files && event.currentTarget.files[0]
        if (file) {
            setImageSource(URL.createObjectURL(file))
        }
    }

    return (
        <div className='EditProduct'>
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
                <img src={imageSource} />
                <input type="file" {...register('image')} onChange={previewImage}/>
                <br/>
                <button>submit</button>
            </form>
        </div>
    )
}

export default EditProduct