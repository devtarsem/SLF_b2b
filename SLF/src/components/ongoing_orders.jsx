import './../styles/dashboard.css'
import './../styles/orders.css'
import './../styles/manage_prods.css'


import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState,useEffect } from 'react';
import ongoingStore from '../store/orders/ongoing.store';
import PopUp from './popUp'
import notFound from '/nofound.svg'
import sweetalertPop from '../class/sweetalert';
import authStore from '../store/auth/auth.store';
import Auth from './auth';

function Onging_orders(){

    const {fetchOrders, searchOrder, nextOnPagination, prevOnpagination,sortOrderList,startPage, endPage,changing_order_status,isLoadingOrders, cacheOrders, orders, start_date, end_date} = ongoingStore()
    const [minifetchOrder, setMiniFetchOrder] = useState(false)

    useEffect(el=>{
        cacheOrders()
    }, [])

    const [start, setStart] = useState('')
    const [end, setend] = useState('')

    function startSetting(el){
        setStart(start=> el.target.value)
    }

    function endSetting(el){
        setend(end=> el.target.value)
    }

    const Pop = new sweetalertPop()

    function FetchOrdersFun(){
        if(start.trim()==''){
            Pop.handleError("Order starting date is Invalid", "Please provide a valid order starting date")
            return;
        }
        if(end.trim()==''){
            Pop.handleError("Order ending date is Invalid", "Please provide a valid order ending date")
            return;
        }
        fetchOrders(start, end)
        setMiniFetchOrder(minifetchOrder=> false)

    }

    function searchOrdersFun(el){
        console.log(el)
        searchOrder(startPage, endPage, el.target.value)
    }

    function sortOrderFun(el){
        sortOrderList(el.target.value)
    }

    function Next(){
        nextOnPagination()
    }

    function Prev(){
        prevOnpagination()
    }


    function miniFetcher(){
        setMiniFetchOrder(minifetchOrder=> !minifetchOrder)
    }

    const {AuthNeeded, checkAuth} = authStore()
    useEffect(el=>{
        checkAuth()
    }, [])

    return(
        <div className='ongoing OngingOrderMini flex flex-dir gap16'>

            {AuthNeeded &&
                <Auth/>
            }

            {minifetchOrder &&
                <div className='fetchdata_ongoingOrder flex flex-dir gap16 flex-3 pad16'>
                    <div className='innerfetch flex flex-dir gap16 pad16'>
                        <div className='flex flex-3 gap16'>
                            <label className='label'>From</label>
                            <input onChange={startSetting} className='inp' placeholder='date' type='date'/>
                        </div>
                        <div className='flex flex-3 gap16'>
                            <label className='label'>To</label>
                            <input onChange={endSetting} className='inp' placeholder='date' type='date'/>
                        </div>
                        <div className='minifetcorder flex flex-1 gap16'>
                            <button onClick={FetchOrdersFun} className='standardBtn widthfull'>Fetch orders</button>
                            <button onClick={miniFetcher} className='standardBtn widthfull borderbtn'>close</button>

                        </div>
                    </div>                    
                </div>
            }

            {isLoadingOrders &&
                <PopUp msg="Please wait..."/>
            }
            <div className='flex flex-1'>
                <h2 className='resHead'>Ongoing orders</h2>
                <button onClick={miniFetcher} className='standardBtn OngoingMiniMenuBtn'>Menu</button>
            </div>
            <div className='features ongoingMINI flex flex-1'>
                <div className='flex flex-3 gap16'>
                    <input onChange={searchOrdersFun} className='search inp' placeholder='Search' type='text'/>
                    <select onChange={sortOrderFun} className='inp search'>
                        {["Sort by", "Items", "payment"].map(el=>
                            <option className='opt' value={el}>{el}</option>
                        )}
                    </select>
                    
                </div>
                <div className='addmore FetchOrdersM flex flex-1 gap16'>
                    <div className=' flex flex-3 gap16'>
                        <div className='flex flex-3 gap16'>
                            <label className='label'>From</label>
                            <input onChange={startSetting} className='inp' placeholder='date' type='date'/>
                        </div>
                        <div className='flex flex-3 gap16'>
                            <label className='label'>To</label>
                            <input onChange={endSetting} className='inp' placeholder='date' type='date'/>
                        </div>
                    </div>                    
                    <button onClick={FetchOrdersFun} className='standardBtn'>Fetch orders</button>

                </div>
            </div>
            <div className='productsList'>
                {orders?.length==0 &&
                <div className='noProduct flex flex-dir gap16 flex-2'>
                    <img src={notFound} className='notFound' alt='not found image'/>
                    <p className='msg'>No order found or order limit exceeds</p>
                </div>
                }
                <table>
                    <thead>
                        <tr>
                        <th>S. No</th>
                        <th>Customer</th>
                        <th>No of items</th>
                        <th>Payment</th>
                        <th>Payment Status</th>
                        <th>Transit</th>
                        <th>Delivery</th>
                        <th>Cancellation</th>
                        <th>Returns</th>
                        <th>Refunds</th>

                        <th>Send to vendor</th>
                        <th>View</th>
                        
                        </tr>
                    </thead>
                    <tbody className='bodyoftable' >
                        {orders?.map((el,index)=>

                        <tr>
                            <td>{index+1+startPage}</td>
                            <td>{el.user_id._id.slice(0,8)}...</td>
                            <td>{el.order_items.length}</td>
                            <td>₹{el.total_bill}/-</td>
                            <td className={el.payment_status=='pending' ? 'activered' : 'activegreen'}  >{el.payment_status}</td>
                            <td className={el.transit_status=='Not dispatched' ? 'activered' : 'activegreen'} >{el.transit_status}</td>
                            <td className={el.delivery_status=='Not delivered' ? 'activered' : 'activegreen'} >{el.delivery_status}</td>
                            <td className={el.cancel_status=='cancelled' ? 'activered' : 'activegreen'}>{el.cancel_status}</td>
                            <td className={el.return_status=='return' ? 'activered' : 'activegreen'}>{el.return_status}</td>
                            <td className={el.refund_status=='refund' ? 'activered' : 'activegreen'}>{el.refund_status}</td>
                            <td className={el.send_to_vendor=='not send' ? 'activered' : 'activegreen'} >{el.send_to_vendor}</td>
                            <td>
                                <Link to={`/dashboard/orders-detail/${el._id}`} className='viewProd standardBtn'>View</Link>
                            </td>
                        
                        </tr>
                        )}
                    </tbody>
                </table>

            </div>
            <div className='pagination miniOngoingPagiMini flex flex-3 gap16'>
                <div className='flex flex-1 gap16'>
                    <p className='prodno orderpagiMini'>Orders from {start_date} (YYYY-MM-DD) &mdash; {end_date} | </p>

                </div>
                <div className='pagiBtnAlignMini flex flex-1 gap16'>
                    <p className='prodno orderpagiMini'>Orders from {startPage} &mdash; {endPage}</p>
                    <button onClick={Prev} className='moveBbn standardBtn'>Prev</button>
                    <button onClick={Next} className='moveBbn standardBtn'>Next</button>
                </div>
            </div>
        </div>
    )
}

export default Onging_orders