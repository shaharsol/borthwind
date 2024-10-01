import AuthService from "./AuthService";
import CategoryModel from '../../models/Category'
import config from "../../util/config";

export default class Category extends AuthService{
    public async getAll(): Promise<CategoryModel[]> {

        const response = await this.axiosInstance<CategoryModel[]>(`${process.env.REACT_APP_REST_SERVER}/${config.categoriesPath}`);
        const categories = response.data
        return categories

    }

}

