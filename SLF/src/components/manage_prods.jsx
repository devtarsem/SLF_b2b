import './../styles/dashboard.css'
import './../styles/manage_prods.css'
import './../styles/media.css'
import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState , useEffect} from 'react';
import productStore from './../store/inventory/manageProducts.store.js'
import notFound from '/nofound.svg'
import UpdateProds from './update_product.jsx';
import PopUp from './popUp.jsx';
import UpdateStock from './updateStock.jsx';
import DropDown from './standard_dropDwon.jsx';
import sweetalertPop from '../class/sweetalert.js';
import authStore from '../store/auth/auth.store.js';
import Auth from './auth.jsx';

function ManageProds(){

    const {fetchingProducts,stockUpdationPanel,downloadInventory_as_excel, DownLoadProductList,setStockUpdatePanelOpen, setStockUpdatePanelFalse,isLoadingManageProduct,DeleteProductsFromDB, particular_ID,particular_product, openUpdatePanel, closingUpdatePanel,openingUpdatePanel,products,particular_productFetch, start, SizeFIlterproducts, end, searchproducts, sortProductList} = productStore()
    const Pop = new sweetalertPop()
    useEffect(el=>{
        fetchingProducts(start,end)
    }, [])

    function NextProductsList(){
        fetchingProducts(start+20, end+20)
    }

    function PrevProductsList(){
        fetchingProducts(start-20, end-20)
    }

    function searchproductsFun(el){
        searchproducts(start,end,el.target.value)
    }

    function sortProductListFun(el){
        sortProductList(el.target.value)
    }

    function filterBySize(el){
        SizeFIlterproducts(start, end, el.target.value)
    }

    const [selectProducts, SetselectProducts] = useState([])

    function UpdatePanel(event, id){
        openingUpdatePanel()
        particular_productFetch(id)
        
    }

    function selectingProducts(event,el){
        if(event.target.checked){
            SetselectProducts(selectProducts=> [...selectProducts, el])
        }else{
            let list = selectProducts;
            list = list.filter(item=>{
                if(item != el){
                    return item
                }
            })
            SetselectProducts(selectProducts=> [...list])
        }

    }

    function DeleteProducts(){
        if(selectProducts.length==0){
            Pop.handleError("Please select the products first", "Click on checkbox to select a product")
            return;
        }
        DeleteProductsFromDB(selectProducts)
        setMiniMenu(miniMenu=> false)
    }

    function closeUpdatesPanelFun(){
        closingUpdatePanel()
    }
    const [stocks, setStocks] = useState({})
    const [skuId, setskuId] = useState('')

    function OpenStockUpdate(event, stock, sku_Id){
        setStockUpdatePanelOpen()
        setStocks(stocks=> stock)
        setskuId(skuId=> sku_Id)
    }

    function DownLoadInventroyRepo(){
        DownLoadProductList()
    }

    function DownloadInvAs_excel(){
        downloadInventory_as_excel()
    }

    const [miniMenu, setMiniMenu] = useState(false)

    function openMiniMenu (){
        setMiniMenu(miniMenu=> !miniMenu)
    }

    const {AuthNeeded, checkAuth} = authStore()
    useEffect(el=>{
        checkAuth()
    }, [])

    return(
        <div className='manage flex flex-dir gap16'>

            {AuthNeeded &&
                <Auth/>
            }

            {miniMenu &&
                <div className='menuItemsSmallMobINV  pad16 gap16'>
                    <div className='grid grid-1-col gap16'>
                        <Link to='/dashboard/add-products' className='link fillnow standardBtn'>Add Products +</Link>
                        <button onClick={DeleteProducts} className='link  standardBtn'>
                            Delete products
                        </button>
                        <div className='coverMinMenu '>
                            <DropDown className='' title="Download Inventory report" pdf={DownLoadInventroyRepo} excel={DownloadInvAs_excel} pdfTitle="As PDF" excelTitle="As Excel" />
                        </div>
                        <button onClick={openMiniMenu} className='standardBtn'>Close</button>
                    </div>

                </div>
            }

            {isLoadingManageProduct &&
                <PopUp msg="Please wait..." />
            }

            {openUpdatePanel &&
                <UpdateProds/>
            }

            {stockUpdationPanel &&
                <UpdateStock stock={stocks} skuId={skuId} />
            }

            <h2 className='resHead'>manage products</h2>
            <div className='features feaINVManage flex flex-1'>
                <div className='invFeagrid flex flex-3 gap16'>
                    <input onChange={searchproductsFun} className='search INVSearchMini inp' placeholder='Search' type='text'/>
                    <select onChange={filterBySize} className='inp search'>
                        {["Sizes", "XL", "XXL", "L", "M", "L", "XS", "S", "XXXL"].map(el=>
                            <option className='opt' value={el}>{el}</option>
                        )}
                    </select>
                    <select onChange={sortProductListFun} className='inp search'>
                        {["Sort by", "Price", "Discount", "Stock"].map(el=>
                            <option className='opt' value={el}>{el}</option>
                        )}
                    </select>
                    
                    
                </div>

                <div className='smallMobMenu'>
                    <button onClick={openMiniMenu} className='standardBtn'>Menu</button>
                    
                </div>

                <div className='addmore invLarge flex flex-1 gap16'>
                    <Link to='/dashboard/add-products' className='link standardBtn fillnow'>Add Products +</Link>
                    <button onClick={DeleteProducts} className='link standardBtn'>
                        Delete products
                    </button>
                    <DropDown title="Download Inventory report" pdf={DownLoadInventroyRepo} excel={DownloadInvAs_excel} pdfTitle="As PDF" excelTitle="As Excel" />
                    
                </div>
            </div>
            <div className='productsList'>
                
                {products?.length == 0 &&
                    <div className='noProduct flex flex-dir gap16 flex-2'>
                        <img src={notFound} className='notFound' alt='not found image'/>
                        <p className='msg'>No product found or product limit exceeds</p>
                    </div>
                }
                <table className='inventoryListTable' >
                    <thead>
                        <tr>
                        <th>S. No</th>
                        <th>Select</th>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Revenue (1W)</th>
                        <th>Sizes</th>
                        <th>Colors</th>
                        <th>Discount</th>
                        <th  >Tags</th>
                        <th>Others</th>
                        </tr>
                    </thead>
                    <tbody className='bodyoftable' >
                        
                        {products?.map((el,index)=>
                            <tr>
                            <td>{start+index+1}</td>
                            <td><input onChange={(event) => selectingProducts(event, el._id)} type="checkbox" /></td>
                            <td>{el.sku}</td>
                            <td>{el.name}</td>
                            <td>
                                M &mdash; {el.stock.M} <br/>
                                S &mdash; {el.stock.S} <br/>
                                L &mdash; {el.stock.L} <br/>
                                XL &mdash; {el.stock.XL} <br/>
                                XXL &mdash; {el.stock.XXL} <br/>
                                <button onClick={(event)=>OpenStockUpdate(event, el.stock, el._id)} className='updateStock'>Update stock</button>
                            </td>
                            <td>₹{el.price}</td>
                            <td>₹12,000</td>
                            <td className='grid grid-4-col'>
                                {el.sizes.map(size=>
                                    <p>{size},</p>
                                )}
                            </td>
                            <td className=''>
                                {el.colors.map(color=>
                                    <p>{color},</p>
                                )}
                            </td>
                            <td>{el.discount}%</td>
                            <td className='tags'>
                                {el.tags.map(tag=>
                                    <p>{tag},</p>
                                )}
                            </td>
                            <td>
                                {particular_ID == el._id ?
                                <button className='blankBtn' onClick={closeUpdatesPanelFun} >
                                    <svg className='smallsvg' xmlns="http://www.w3.org/2000/svg" fill="#0066cb" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g></svg>
                                </button>
                                :
                                <button onClick={(event)=> UpdatePanel(event, el._id)} className='otherBtn'>
                                    update
                                </button>
                                }
                            </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
            <div className='pagination flex flex-3 gap16'>
                <p className='prodno'>Products from {start+1} &mdash; {end}</p>
                <button onClick={PrevProductsList} className='moveBbn standardBtn'>Prev</button>
                <button onClick={NextProductsList} className='moveBbn standardBtn'>Next</button>

            </div>
        </div>
    )
}

export default ManageProds