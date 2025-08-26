
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './styles/media.css'
import Marketing from './components/marketing'
import Dashboard from './components/dashboard'
import Inventory from './components/inventory'
import AddProducts from './components/add_products'
import ManageProds from './components/manage_prods'
import Orders from './components/orders'
import Onging_orders from './components/ongoing_orders'
import Vendors from './components/vendors'
import Add_vendors from './components/add_vendors'
import Manage_vendors from './components/manage_vendors'
import Po_So from './components/po_so'
import Po from './components/add_po'
import So from './components/add_so'
import PoSo_history from './components/Po_so_history'
import Home from './components/home'
import Order_details from './components/order_detail'
import Refunds from './components/refunds'
import Return_orders from './components/return_orders'
import Return_details from './components/return_details'
import Analytics from './components/analytics'
import Expenses from './components/expenses'
import Overall from './components/overallRepo'

const router = createBrowserRouter([
    {
      path : '/',
      element : <Marketing/>
    }
    ,
    {
      path : '/dashboard',
      element : <Dashboard/>, 
      children : [
        {
          path : "home",
          element : <Home/>
        }
        ,
        {
          path : "inventory",
          element : <Inventory/>
        }
        ,
        {
          path : "add-products",
          element : <AddProducts/>
        }
        ,
        {
          path : "manage-products",
          element : <ManageProds/>
        }
        ,
        {
          path : "orders",
          element : <Orders/>
        }
        ,
        {
          path : "ongoing-orders",
          element : <Onging_orders/>
        }
        ,
        {
          path : "orders-detail/:id",
          element : <Order_details/>
        }
        ,
        {
          path : "vendors",
          element : <Vendors/>
        }
        ,
        {
          path : "add-vendors",
          element : <Add_vendors/>
        }
        ,
        {
          path : "manage-vendors",
          element : <Manage_vendors/>
        }
        ,
        {
          path : "po-so",
          element : <Po_So/>
        }
        ,
        {
          path : "Po",
          element : <Po/>
        }
        ,
        {
          path : "So",
          element : <So/>
        }
        ,
        {
          path : "PoSo-history",
          element : <PoSo_history/>
        }
        ,
        {
          path : "refunds",
          element : <Refunds/>
        }
        ,
        {
          path : "returns",
          element : <Return_orders/>
        }
        ,
        {
          path : "returns-details/:id",
          element : <Return_details/>
        }
        ,
        {
          path : "analytics",
          element : <Analytics/>
        }
        ,
        {
          path : "expenses",
          element : <Expenses/>
        }
        ,
        {
          path : "overall",
          element : <Overall/>
        }
      ]
    }
    
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
