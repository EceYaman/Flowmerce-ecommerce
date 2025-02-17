import { Route, Switch } from 'react-router-dom'
import './index.css'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { PageContent } from './layout/PageContent'
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { ProductDetailPage } from './pages/ProductDetailPage'

function App() {
  return (
    <div className='max-w-full m-0'>
      <Header />
      <PageContent>
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/product/:id" component={ProductDetailPage} /> 
        </Switch>
      </PageContent>
      <Footer />
    </div>
  )
}

export default App
