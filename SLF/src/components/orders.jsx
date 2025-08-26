import './../styles/dashboard.css'
import './../styles/orders.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState , useEffect} from 'react';
import authStore from '../store/auth/auth.store';
import Auth from './auth';

function Orders(){

    const {AuthNeeded, checkAuth} = authStore()
    useEffect(el=>{
        checkAuth()
    }, [])
    return(
        <div className='inventory flex flex-dir gap16'>
            {AuthNeeded &&
                <Auth/>
            }
            <h2 className='resHead'>Inventory</h2>
            <div className='ordersMini flex flex-3 gap16'>
                <Link to='/dashboard/ongoing-orders' className='LinkInc link flex flex-dir gap8 flex-2'>
                    <svg className='bigSVG' fill="#ffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8zM7 9a2 2 0 1 1 .001-4.001A2 2 0 0 1 7 9z"></path></g></svg>
                    Ongoing orders 
                </Link>
                {/* <Link to='/dashboard/manage-products' className='LinkInc link flex flex-dir gap8 flex-2'>
                    <svg className='bigSVG' fill="#ffff" viewBox="0 0 48 48" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" stroke="#ffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M40,47H8a2,2,0,0,1-2-2V3A2,2,0,0,1,8,1H40a2,2,0,0,1,2,2V45A2,2,0,0,1,40,47ZM10,43H38V5H10Z"></path><path d="M15,19a2,2,0,0,1-1.41-3.41l4-4a2,2,0,0,1,2.31-.37l2.83,1.42,5-4.16A2,2,0,0,1,30.2,8.4l4,3a2,2,0,1,1-2.4,3.2l-2.73-2.05-4.79,4a2,2,0,0,1-2.17.25L19.4,15.43l-3,3A2,2,0,0,1,15,19Z"></path><circle cx="15" cy="24" r="2"></circle><circle cx="15" cy="31" r="2"></circle><circle cx="15" cy="38" r="2"></circle><path d="M33,26H22a2,2,0,0,1,0-4H33a2,2,0,0,1,0,4Z"></path><path d="M33,33H22a2,2,0,0,1,0-4H33a2,2,0,0,1,0,4Z"></path><path d="M33,40H22a2,2,0,0,1,0-4H33a2,2,0,0,1,0,4Z"></path></g></svg>
                    Returns / refunds
                </Link> */}
            </div>
        </div>
    )
}

export default Orders