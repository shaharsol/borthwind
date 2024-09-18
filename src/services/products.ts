import axios from "axios";
import Product from "../models/Product";
import config from "../util/config";
import NewProduct from "../models/NewProduct";

class Products {
    

    public async getAll(): Promise<Product[]> {

        // REACT_APP_REST_SERVER = http://localhost:3030
        // REACT_APP_REST_SERVER = https://myserver:80
        const response = await axios<Product[]>(`${process.env.REACT_APP_REST_SERVER}/${config.productsPath}`);
        const products = response.data
        return products

    }

    public async getById(id: number): Promise<Product> {

        const response = await axios<Product>(`${process.env.REACT_APP_REST_SERVER}/${config.productsPath}/${id}`);
        const product = response.data
        return product

    }

    public async delete(id: number): Promise<boolean> {

        const response = await axios.delete(`${process.env.REACT_APP_REST_SERVER}/${config.productsPath}/${id}`);
        const product = response.data
        return product

    }

    public async add(newProduct: NewProduct): Promise<Product> {
        const axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const response = await axios.post<Product>(`${process.env.REACT_APP_REST_SERVER}/${config.productsPath}`, newProduct, axiosConfig);
        const product = response.data
        return product

    }

    public async update(id: number, newProduct: NewProduct): Promise<Product> {
        const axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }        
        const response = await axios.put<Product>(`${process.env.REACT_APP_REST_SERVER}/${config.productsPath}/${id}`, newProduct, axiosConfig);
        const product = response.data
        return product

    }

}

const products = new Products();
export default products






