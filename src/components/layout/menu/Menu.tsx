import { NavLink } from 'react-router-dom';
import './Menu.css'

function Menu(): JSX.Element {
    return (
        <div className='Menu'>
            {/* don't use!!! <a href="/home">home</a> */}
            <NavLink to="/home">home</NavLink>
            <NavLink to="/products">products</NavLink>
            <a href="#">employees</a>
            {/* don't use!!! <a href="/about">about us</a> */}
            <NavLink to="/about">about us</NavLink>
            <NavLink to="/products/search">search</NavLink>
            <NavLink to="/products/defer">defer</NavLink>
            <NavLink to="/products/live">live</NavLink>
        </div>
    )
}

export default Menu;