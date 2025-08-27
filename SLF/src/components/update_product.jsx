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

function UpdateProds(){

    const {particular_product, updateProduct, closingUpdatePanel} = productStore()

    const [prod, setProd] = useState({})
    const Pop = new sweetalertPop()
    

    useEffect(el=>{
        setProd(prod=> particular_product)
        console.log(particular_product)
    }, [])

    function updateNameFun(el){
        setProd(prod => ({
            ...prod,
            name: el.target.value  
        }));
    }

    function updateDesFun(el){
        setProd(prod => ({
            ...prod,
            description: el.target.value  
        }));
    }

    function updatePriceFun(el){
        setProd(prod => ({
            ...prod,
            price: el.target.value  
        }));
    }

    function updateDiscountFun(el){
        setProd(prod => ({
            ...prod,
            discount: el.target.value  
        }));
    }

    function updateBrandFun(el){
        setProd(prod => ({
            ...prod,
            brand: el.target.value  
        }));
    }

    function updateStockFun(el){
        setProd(prod => ({
            ...prod,
            stock: el.target.value  
        }));
    }

    function updateTagsFun(el){
        setProd(prod => ({
            ...prod,
            tags: el.target.value.split(",")
        }));
    }

    function updateSKUFun(el){
        setProd(prod => ({
            ...prod,
            sku: el.target.value
        }));
    }

    function updateCreatedAtFun(el){
        setProd(prod => ({
            ...prod,
            created_at: el.target.value
        }));
    }
    function updateUpdatedAtFun(el){
        setProd(prod => ({
            ...prod,
            updated_at: el.target.value
        }));
    }

    function Update(){
        if(prod.name.trim()==''){
            Pop.handleError("Product name is empty", "Please provide a valid product name")
            return;
        }
        if(prod.description.trim()==''){
            Pop.handleError("Product description is empty", "Please provide a valid product description")
            return;
        }
        if( prod.price <= 0){
            Pop.handleError("Product price is invalid", "Please provide a valid product price")
            return;
        }
        if(prod.brand.trim()==''){
            Pop.handleError("Product brand is empty", "Please provide a valid product brand")
            return;
        }
        
        if(prod.tags[0]==''){
            Pop.handleError("Product tags is invalid", "Please provide a valid product tags")
            return;
        }
        if(prod.sku.trim()=='' ){
            Pop.handleError("Product sku code is empty", "Please provide a valid product sku code")
            return;
        }
        
        
        updateProduct(prod)
    }

    function closeUpdates(){
        closingUpdatePanel()
    }

    
    function deleteImgFromProd(cdn){
        
    }


    return(
        <div className='updatePnael pad16 flex flex-dir gap16'>
            <div className='flex flex-1'>
                <h2 className='resHead'>Edit products</h2>
                <button className='blankBtn' onClick={closeUpdates} >
                    <svg className='smallsvg' xmlns="http://www.w3.org/2000/svg" fill="#0066cb" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g></svg>
                </button>
            </div>
            <div className='updates flex flex-dir gap16'>
                <div className='flex flex-dir gap8'>
                    <label className='oldname label'>Name </label>
                    <input onChange={updateNameFun} value={prod.name} className='inp inp__special' placeholder='New product name'  type='text'/>
                </div>
                <div className='flex flex-dir gap8'>
                    <label className='oldname label'>New description</label>
                    <textarea onChange={updateDesFun} value={prod.description} className='inp inp__special' placeholder='New product Description'  type='text'/>
                </div>
                <div className='grid grid-3-col gap8'>
                    <div className='flex flex-dir gap8'>
                        <label className='oldname label'>Price</label>
                        <input onChange={updatePriceFun} value={prod.price} className='inp inp__special' placeholder='Price'  type='text'/>
                    </div>
                    <div className='flex flex-dir gap8'>
                        <label className='oldname label'>Discount</label>
                        <input onChange={updateDiscountFun} value={prod.discount} className='inp inp__special' placeholder='Discount'  type='text'/>
                    </div> 
                    <div className='flex flex-dir gap8'>
                        <label className='oldname label'>Brand</label>
                        <input onChange={updateBrandFun} value={prod.brand} className='inp inp__special' placeholder='Brand'  type='text'/>
                    </div>
                    {/* <div className='flex flex-dir gap8'>
                        <label className='oldname label'>Stock</label>
                        <input onChange={updateStockFun} value={prod.stock} className='inp inp__special' placeholder='Stock'  type='text'/>
                    </div> */}
                    <div className='updatetags flex flex-dir gap8'>
                        <label className='oldname label'>Tags</label>
                        <input onChange={updateTagsFun} value={prod.tags} className='inp inp__special' placeholder='Stock'  type='text'/>
                    </div>
                    <div className='flex flex-dir gap8'>
                        <label className='oldname label'>SKU</label>
                        <input onChange={updateSKUFun} value={prod.sku} className='inp inp__special' placeholder='SKU'  type='text'/>
                    </div>
                    <div className='datecol flex flex-dir gap8'>
                        <label className='oldname label'>Created At</label>
                        <input onChange={updateCreatedAtFun} value={prod.created_at} className='inp inp__special' placeholder='Stock'  type='date'/>
                    </div>
                    <div className='datecol flex flex-dir gap8'>
                        <label className='oldname label'>Updated At</label>
                        <input onChange={updateUpdatedAtFun} className='inp inp__special' placeholder='Stock'  type='date'/>
                    </div>
                </div>
                <div className='datecol flex flex-dir gap8'>
                    <label className='oldname label'>Images</label>
                    <div className='imagesdiv grid grid-5-col gap16'>
                        {particular_product?.Images?.map(el=>
                            <div className='imgcoverimg'>
                                <img src={el} alt='product images' className='prodImgUpdate'/>
                                <button  className='deleteImage'>
                                    <svg className='smallsvg' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-570.000000, -1089.000000)" fill="#000000"> <path d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z" id="cross-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                                </button>
                            </div>
                        )}
                     </div>
                </div>
                <button onClick={Update} className='updateBtn standardBtn'>Update</button>
            </div>
        </div>
    )
}


export default UpdateProds