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
import { useParams } from 'react-router';
import mock from '/mockup.jpg'
import SKUOpens from './skuOpens';
import sweetalertPop from '../class/sweetalert';
import authStore from '../store/auth/auth.store';
import Auth from './auth';

function Order_details(){
    const Pop = new sweetalertPop()

    const parmas = useParams()
    const {detail_order, openSKUPanel, InvoiceGeneration,isLoadingOrders,sku_open, fetchingParticular_order, changing_order_status} = ongoingStore()
    useEffect(el=>{
        fetchingParticular_order(parmas.id)
    }, [])

    const [status , setStatus] = useState('')

    function statusUpdate(el){
        
        setStatus(status=> el.target.value)
    }

    function status_change(){
        // console.log(status)
        // if(status.trim()=='Transit Status' || status.trim()=='Delivery Status' || status.trim()=='Cancel Status' || status.trim()=='Vendor Status' || status.trim()=='Return Status' || status.trim()=='Refund Status' || status.trim()=='Payment Status'  ){
        //     Pop.handleError("Order updating status is invalid", "Please provide a valid order updating status")
        //     return;
        // }
        changing_order_status(status, parmas.id)
        
    }

    function openSKU(){
        openSKUPanel()
    }

    function billgeneration(event, items, grossBill, tax, totalBill, customerName, customerPhone, customerAddress){
        InvoiceGeneration(items, grossBill, tax, totalBill, customerName, customerPhone, customerAddress)
    }

    const {AuthNeeded, checkAuth} = authStore()
    useEffect(el=>{
        checkAuth()
    }, [])

    return(
        <div className='detals flex flex-dir gap16'>

            {AuthNeeded &&
                <Auth/>
            }

            {isLoadingOrders &&
                <PopUp msg="Please wait..."/>
            }
            {sku_open &&
                <SKUOpens/>
            }
            <h2 className='resHead'>Order details</h2>
            <div className='orderbox grid grid-2-col'>
                <div className='orderDetails pad16 flex flex-dir gap16'>
                    <h2 className='resHead'>Details</h2>
                    <div className='grid grid-1-col gap16'>
                        <p className='idDet'>Customer ID : {detail_order?._id}</p>
                        <p className='idDet'>No of items : {detail_order?.order_items?.length}</p>
                        <p className='idDet'>Gross bill : ₹{detail_order?.gross_bill}/-</p>
                        <p className='idDet'>Tax : ₹{detail_order?.tax}/-</p>
                        <p className='idDet'>Total bill : ₹{detail_order?.total_bill}/-</p>
                        <p className='idDet'>Coupon used : {detail_order?.coupon_used}</p>
                        <div className='detailstatusOrderMini grid grid-2-col gap16'>
                            <p className={detail_order?.payment_status=='pending' ? 'activered idDet  idDetCenter' : 'activegreen idDet idDetCenter'}>Payment status : <span>{detail_order?.payment_status}</span></p>
                            <p className={detail_order?.transit_status=='Not dispatched' ? 'activered idDet idDetCenter' : 'activegreen idDet idDetCenter'}>Transit status : <span>{detail_order?.transit_status}</span></p>
                            <p className={detail_order?.delivery_status=='Not delivered' ? 'activered idDet idDetCenter' : 'activegreen idDet idDetCenter'}>Delivery status : <span>{detail_order?.delivery_status}</span></p>
                            <p className={detail_order?.cancel_status=='cancelled' ? 'activered idDet idDetCenter' : 'activegreen idDet idDetCenter'}>Cancel status : <span>{detail_order?.cancel_status}</span></p>
                            <p className={detail_order?.return_status=='return' ? 'activered idDet idDetCenter' : 'activegreen idDet idDetCenter'}>Return status : <span>{detail_order?.return_status}</span></p>
                            <p className={detail_order?.refund_status=='refund' ? 'activered idDet idDetCenter' : 'activegreen idDet idDetCenter'}>Refund status : <span>{detail_order?.refund_status}</span></p>
                            <p className={detail_order?.send_to_vendor=='not send' ? 'activered idDet idDetCenter' : 'activegreen idDet idDetCenter'}>Vendor status : <span>{detail_order?.send_to_vendor}</span></p>

                        </div>
                    </div>
                    <div className='changeStatusDets flex flex-dir gap16 pad16'>
                        <div className='flex flex-1 gap16'>
                            <select  onChange={statusUpdate} className='inp'>
                                {["Payment Status", "success", "pending"].map(el=>
                                    <option className='opt' value={el}>{el}</option>
                                )}
                            </select>
                            <button onClick={status_change} className='changeBtn'>Change</button>
                        </div>
                        <div className='flex flex-1 gap16'>
                            <select  onChange={statusUpdate} className='inp'>
                                {["Transit Status", "Not dispatched", "Dispatched"].map(el=>
                                    <option className='opt' value={el}>{el}</option>
                                )}
                            </select>
                            <button  onClick={status_change} className='changeBtn'>Change</button>
                        </div>
                        <div className='flex flex-1 gap16'>
                            <select onChange={statusUpdate}  className='inp'>
                                {["Delivery Status", "Not delivered", "Delivered"].map(el=>
                                    <option className='opt' value={el}>{el}</option>
                                )}
                            </select>
                            <button onClick={status_change}  className='changeBtn'>Change</button>
                        </div>
                        <div className='flex flex-1 gap16'>
                            <select onChange={statusUpdate}  className='inp'>
                                {["Cancel status" ,"persist", "cancelled"].map(el=>
                                    <option className='opt' value={el}>{el}</option>
                                )}
                            </select>
                            <button onClick={status_change}  className='changeBtn'>Change</button>
                        </div>
                        <div className='flex flex-1 gap16'>
                            <select onChange={statusUpdate}  className='inp'>
                                {["Vendor status" ,"sended", "not send"].map(el=>
                                    <option className='opt' value={el}>{el}</option>
                                )}
                            </select>
                            <button onClick={status_change}  className='changeBtn'>Change</button>
                        </div>
                        <div className='flex flex-1 gap16'>
                            <select onChange={statusUpdate}  className='inp'>
                                {["Return status" ,"no return", "return"].map(el=>
                                    <option className='opt' value={el}>{el}</option>
                                )}
                            </select>
                            <button onClick={status_change}  className='changeBtn'>Change</button>
                        </div>
                        <div className='flex flex-1 gap16'>
                            <select onChange={statusUpdate}  className='inp'>
                                {["Refund status" ,"accepted", "refund"].map(el=>
                                    <option className='opt' value={el}>{el}</option>
                                )}
                            </select>
                            <button onClick={status_change}  className='changeBtn'>Change</button>
                        </div>
                    </div>
                </div>
                <div className='ordeItems flex flex-dir gap16 pad16'>
                    <div className='flex flex-1'>
                        <h2 className='resHead'>Order Items</h2>
                        <button onClick={(event)=> billgeneration(event, detail_order?.order_items, detail_order?.gross_bill, detail_order?.tax, detail_order?.total_bill, detail_order?.user_id?.name, detail_order?.user_id?.phone, detail_order?.user_id?.address)} className='billbtn'>Generate Invoice</button>
                    </div>
                    <div className='flex flex-dir gap16'>
                        {detail_order?.order_items?.map(el=>
                            <div className='gpartiorder grid grid-1-col gap16 pad16'>
                                
                                <p className='idOrder'>SKU Id - <span>{el.id}</span></p>
                                <p className='idOrder'>Name - <span>{el.name}</span></p>
                                <p className='idOrder'>Price - <span>₹{el.price}/-</span></p>

                                <div className='skuminiDetails flex flex-1'>
                                    <p className='idOrder'>Units - <span>{el.count}</span></p>
                                    <p className='idOrder'>Size - <span>{el.size}</span></p>
                                    <p className='idOrder'>Color - <span>{el.color}</span></p>
                                </div>
                                <p className='idOrder'>SKU order value - <span>₹{el.price * el.count}/-</span></p>
                                <img src={mock} className='mockOdImg' alt='mock iamge'/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order_details