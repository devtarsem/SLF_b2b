import './../styles/refunds.css'
import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link, Outlet } from 'react-router';
import { useState, useEffect } from 'react';
import ongoingStore from '../store/orders/ongoing.store';
import returnStore from '../store/returns/returns.store';
import notFound from '/nofound.svg'
import { useParams } from 'react-router';
import authStore from '../store/auth/auth.store';
import Auth from './auth';

function Return_details(){

    const params = useParams();
    const {AuthNeeded, checkAuth} = authStore()
    useEffect(el=>{
        checkAuth()
    }, [])

    return(
        <div className='dets flex flex-dir gap16'>

            {AuthNeeded &&
                <Auth/>
            }

            <h2 className='resHead'>Return order id : {params.id}</h2>
            <div className='returndets grid grid-2-col gap16'>
                <div className='skuDetails pad16 flex flex-dir gap16'>
                    <h2 className='headofRetuns'>SKU details</h2>
                    <div className='flex flex-dir gap16'>
                        <div className='details_returns grid grid-2-col gap16 pad16'>
                            <p className='skuReturn'>SKU id : <span>+987947649786f5dfdfd4f</span></p>
                            <p className='skuReturn'>Color ordered : <span>pink</span></p>
                            <p className='skuReturn'>Size ordered : <span>XXL</span></p>
                            <p className='skuReturn'>Quantity ordered : <span>5</span></p>
                            <button className='fetchSkuDetsbtn'>Fetch SKU details</button>
                        </div>
                    </div>
                </div>
                <div className='refundControls'>

                </div>
            </div>
        </div>
    )
}

export default Return_details