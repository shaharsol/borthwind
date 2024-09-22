import Auth from '../../auth/auth/Auth';
import Home from '../../home/home/Home';
import AddProduct from '../../products/add/AddProduct';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Menu from '../menu/Menu';
import Routing from '../routing/Routing';
import './Layout.css'

function Layout(): JSX.Element {
    
    return (
        <div className='Layout'>
            <header>
                <Header />
            </header>

            <nav>
                <Auth />
                <Menu />
            </nav>

            <main>
                <div>
                    <Routing />
                </div>
                <div>
                    <AddProduct />
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
            
        </div>
    )
}

export default Layout;