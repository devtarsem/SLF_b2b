import './../styles/refunds.css'
import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import mock from '/mockup.jpg'

import { Link, Outlet } from 'react-router';
import { useState, useEffect } from 'react';
import ongoingStore from '../store/orders/ongoing.store';
import returnStore from '../store/returns/returns.store';
import notFound from '/nofound.svg'
import DropDown from './standard_dropDwon';
import PopUp from './popUp';
import authStore from '../store/auth/auth.store';
import Auth from './auth';

function Return_orders(){

    const {orders} = ongoingStore()
    const {return_orders, startDate, export_retun_as_excel, isLoading, DownloadReturnList,InitiateRefund,cachingReturns, endDate,fetchReturns, settingStartDate, settingEndDate} = returnStore()
    const [minireturnpanel, setMinireturnPanel] = useState(false)

    function startDateSet(el){
        settingStartDate(el.target.value)
        console.log(el.target.value)
    }
    function endDateSet(el){
        settingEndDate(el.target.value)
    }

    function fetchOrdersReturns(){
        fetchReturns(startDate, endDate)
        setMinireturnPanel(minireturnpanel=> false)
    }

    useEffect(el=>{
        cachingReturns()
    },[])

    function InitiateRefundFun(event,paymentID, amount, order_id, sku_id){
        InitiateRefund(paymentID, amount, order_id,sku_id)
    }

    function ReturnListDownlaod(){
        DownloadReturnList()
    }

    function exportReturnToExcel(){
        export_retun_as_excel()
    }


    function MiniReturnFetcher(){
        setMinireturnPanel(minireturnpanel=> !minireturnpanel)
    }
    const {AuthNeeded, checkAuth} = authStore()
    useEffect(el=>{
        checkAuth()
    }, [])

    return(
        <div className='returnOrders flex flex-dir gap16'>
            {AuthNeeded &&
                <Auth/>
            }
            {isLoading &&
                <PopUp  msg="Please wait, we are fetching your returns." />
            }
            {minireturnpanel &&
                <div className='minimenuItemsReturnOrders flex flex-dir gap16'>
                    <div className='flex flex-dir gap16 pad16'>
                        <button onClick={fetchOrdersReturns} className='standardBtn'>Fetch orders</button>
                            {/* <button className='standardBtn' onClick={ReturnListDownlaod}>Download Returns report</button> */}
                        <DropDown title="Download returns list" pdf={ReturnListDownlaod} excel={exportReturnToExcel} pdfTitle="As PDF" excelTitle="As Excel" />
                        <button onClick={MiniReturnFetcher} className='standardBtn borderbtn'>close</button>
                    </div>
                        
                </div>
            }

            <div className='flex flex-1'>
                <h2 className='resHead'>Return orders</h2>
                <button onClick={MiniReturnFetcher} className='standardBtn returnOrderMiniMenuBtn'>Menu</button>
            </div>

                <div className='features flex flex-1'>
                <div className='flex flex-3 gap16'>
                    <input className='search inp' placeholder='Search' type='text'/>
                    <select className='inp search'>
                        {["Sort by", "Items", "payment"].map(el=>
                            <option className='opt' value={el}>{el}</option>
                        )}
                    </select>
                    
                </div>
                <div className='addmore returnDetailsMiniBtnsoff flex flex-1 gap16'>
                    {/* <div className=' flex flex-3 gap16'>
                        <div className='flex flex-3 gap16'>
                            <label className='label'>From</label>
                            <input onChange={startDateSet} className='inp' placeholder='date' type='date'/>
                        </div>
                        <div className='flex flex-3 gap16'>
                            <label className='label'>To</label>
                            <input onChange={endDateSet} className='inp' placeholder='date' type='date'/>
                        </div>
                    </div>                     */}
                    <button onClick={fetchOrdersReturns} className='standardBtn'>Fetch orders</button>
                    {/* <button className='standardBtn' onClick={ReturnListDownlaod}>Download Returns report</button> */}
                    <DropDown title="Download returns list" pdf={ReturnListDownlaod} excel={exportReturnToExcel} pdfTitle="As PDF" excelTitle="As Excel" />
                    
                </div>
            </div>

                <div className='productsList'>
                {return_orders?.length==0 &&
                    <div className='noProduct flex flex-dir gap16 flex-2'>
                        <img src={notFound} className='notFound' alt='not found image'/>
                        <p className='msg'>No order found or order limit exceeds</p>
                    </div>
                }
                <table>
                    <thead>
                        <tr>
                        <th>S. No</th>
                        <th>SKU</th>
                        {/* <th>brand</th> */}
                        <th>price</th>
                        <th>color</th>
                        <th>Quantity</th>
                        <th>size</th>
                        <th>Razorpay_id</th>
                        <th>Amount refundable</th>
                        <th>Returns</th>
                        <th>Refunds</th>
                        <th>View</th>
                        <th>Initial <br/> refund</th>
                        
                        </tr>
                    </thead>
                    <tbody className='bodyoftable' >
                        {return_orders?.map((el,index)=>

                        <tr>
                            <td>{index+1}</td>
                            <td>{el.item.name?.slice(0,15)}...</td>
                            {/* <td>{el.item.brand}</td> */}
                            <td>₹{el.item.price}/-</td>
                            <td>{el.item.color}</td>
                            <td>{el.item.count}</td>
                            <td>{el.item.size}</td>
                            <td>{el.razorpay_payment_id}</td>
                            <td>₹{(el.item.count*el.item.price + (el.item.count*el.item.price)*0.18).toFixed(2)}/-</td>

                            <td className={el.item.refund  ? 'activered' : 'activegreen'}>{el.item.return ? 'Pending' : 'Refunded'}</td>
                            <td className={el.item.refund=='Pending' ? 'activered' : 'activegreen'} >{el.item.refund}</td>
                            {/* <td>
                                <Link to={`/dashboard/returns-details/${el.item._id}`} className='viewProd standardBtn'>View</Link>
                            </td> */}
                            <td>
                                <img src={mock} className='mockofReturn' alt='mock'/>
                            </td>
                            <td>
                                {el.item.refund == 'Pending' ?
                                    <button onClick={(event)=> InitiateRefundFun(event, el.razorpay_payment_id, (el.item.count*el.item.price + (el.item.count*el.item.price)*0.18).toFixed(2), el.order_id, el.item._id )} className='initiateBtn'>Initiate</button>
                                    :
                                    <button className='initiateBtn greenInited'>Refunded</button>
                                }
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Return_orders