import { Route, Switch } from 'react-router-dom'
import './index.css'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { PageContent } from './layout/PageContent'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <div className='max-w-full m-0'>
      <Header />
      <PageContent>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </PageContent>
      <Footer />
    </div>
  )
}

export default App
