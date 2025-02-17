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

function App() {
  return (
    <div className='max-w-full m-0'>
      <Header />
      <PageContent>
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/product/:id" component={ProductDetailPage} /> 
        <Route path="/about" component={AboutUsPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/shoppingcart" component={ShoppingCartPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        </Switch>
      </PageContent>
      <Footer />
    </div>
  )
}

export default App
