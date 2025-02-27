import { Route, Switch } from 'react-router-dom'
import './index.css'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { PageContent } from './layout/PageContent'
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { AboutUsPage } from './pages/AboutUsPage'
import { TeamPage } from './pages/TeamPage'
import { ContactPage } from './pages/ContactPage'
import { ShoppingCartPage } from './pages/ShoppingCart'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCategories, fetchProducts, verifyToken } from './store/thunks'
import { CreateOrderPage } from './pages/CreateOrderPage'
import PrivateRoute from '../PrivateRoute'
import { PreviousOrdersPage } from './pages/PreviousOrdersPage'


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className='max-w-full m-0'>
      <Header />
      <PageContent>
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productName/:productId"
          component={ProductDetailPage}
        />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/shop/:gender" component={ShopPage} />
        <Route exact path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
        <Route path="/about" component={AboutUsPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/shoppingcart" component={ShoppingCartPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <PrivateRoute path="/create-order" component={CreateOrderPage} />
        <PrivateRoute path="/previous-orders" component={PreviousOrdersPage} />
        </Switch>
        <ToastContainer />
      </PageContent>
      <Footer />
    </div>
  )
}

export default App
