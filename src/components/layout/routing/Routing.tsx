import { Navigate, Route, Routes } from "react-router-dom"
import Home from "../../home/home/Home"
import About from "../../about/about/About"
import Page404 from "../page404/Page404"
import ProductsList from "../../products/list/ProductsList"
import ProductDetails from "../../products/details/ProductDetails"
import AddProduct from "../../products/add/AddProduct"
import EditProduct from "../../products/edit/EditProduct"
import Login from "../../auth/login/Login"
import Search from "../../products/search/Search"
import Defer from "../../products/defer/Defer"
import Live from "../../products/live/Live"
import ProductsListUseCallback from "../../products/use-callback/ProductsListUseCallback"
import CategoriesList from "../../categories/list/List"

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />}/>
            {/* this is bad for SEO (search engine optimizatin), do not put same component on different routes <Route path="/" element={<Home />}/> */}
            <Route path="/" element={<Navigate to="/home" />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/categories" element={<CategoriesList />}/>
            <Route path="/products" element={<ProductsList />}/>
            <Route path="/products/edit/:id" element={<EditProduct />}/>
            <Route path="/products/search" element={<Search />}/>
            <Route path="/products/defer" element={<Defer />}/>
            <Route path="/products/live" element={<Live />}/>
            <Route path="/products/callback" element={<ProductsListUseCallback />}/>
            <Route path="/products/add" element={<AddProduct />}/>
            <Route path="/products/:id" element={<ProductDetails />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="*" element={<Page404 />}/>
        </Routes>
    )
}

export default Routing