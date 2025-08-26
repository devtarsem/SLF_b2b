import './../styles/dashboard.css'
import './../styles/manage_prods.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState , useEffect} from 'react';
import productStore from './../store/inventory/manageProducts.store.js'
import notFound from '/nofound.svg'
import ManageProds from './manage_prods.jsx';
import sweetalertPop from '../class/sweetalert';
import PopUp from './popUp.jsx';


function UpdateStock(props){

    const Pop = new sweetalertPop()

    const {setStockUpdatePanelFalse, updateStocks, isLoadingManageProduct} = productStore()
    const [stock, setStock] = useState(props.stock)

    function closePanel(){
        setStockUpdatePanelFalse()
    }

    function sizeChange(event, size){
        if(size=='M'){
            setStock(stock=> ({...stock, M : Number(event.target.value)}))
        }
        else if(size=='S'){
            setStock(stock=> ({...stock, S : Number(event.target.value)}))
        }
        else if(size=='L'){
            setStock(stock=> ({...stock, L : Number(event.target.value)}))
        }
        else if(size=='XL'){
            setStock(stock=> ({...stock, XL : Number(event.target.value)}))
        }
         else if(size=='XXL'){
            setStock(stock=> ({...stock, XXL : Number(event.target.value)}))
        }
    }

    function UpdateSizes(){
        if(stock.M < 0){
            Pop.handleError("Product M size inventory is invalid", "Please provide a valid Product M size inventory")
            return;
        }
        if(stock.S < 0){
            Pop.handleError("Product S size inventory is invalid", "Please provide a valid Product S size inventory")
            return;
        }
        if(stock.L < 0){
            Pop.handleError("Product L size inventory is invalid", "Please provide a valid Product L size inventory")
            return;
        }
        if(stock.XL < 0){
            Pop.handleError("Product XL size inventory is invalid", "Please provide a valid Product XL size inventory")
            return;
        }
        if(stock.XXL < 0){
            Pop.handleError("Product XXL size inventory is invalid", "Please provide a valid Product XXL size inventory")
            return;
        }

        updateStocks(stock, props.skuId)
    }
    
    return(
        <div className='updateStockSep flex flex-2'>
            {isLoadingManageProduct &&
                <PopUp  msg="Inventory update under process." />
            }
            <div className='sizepanel pad16 flex flex-dir gap16'>
                <div className='flex flex-1 stockUpdateMini'>
                    <p className='nameUpdd'>SKU &mdash; <span>tshirt black V-shape cuba17</span></p>
                    <button onClick={closePanel} className='cancelBtn'> close</button>
                </div>
                <p className='nameUpdd'>Size panel</p>
                <div className='flex flex-dir gap16'>
                    <div className='flex flex-1 gap16 sizeColumnMini'>
                        {["M", "S", "L", "XL", "XXL"].map(el=>
                            <div className='flex flex-dir flex-2 gap8'>
                                <label className='label'>{el}</label>
                                <input onChange={(event)=> sizeChange(event, el)} defaultValue={stock[el]} className='inp' placeholder='10' type='number'/>
                            </div>
                        )}
                    </div>
                    <button onClick={UpdateSizes} className='changeSizes'>Update size inventory</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateStock