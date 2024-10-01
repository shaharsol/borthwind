import { useEffect } from "react"
import useService from "../../../hooks/useService"
import Category from "../../../services/auth/Category";

export default function CategoriesList(): JSX.Element {
    const categoriesService = useService(Category);

    useEffect(() => {
        (async () => {
            try {
                console.log(categoriesService.axiosInstance)
                const categories = await categoriesService.getAll()
                console.log(categories)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [])


    return (
        <div className="List">
            hello cats
        </div>
    )
}