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

function SKUOpens(){

    const {closeSKUPanel} = ongoingStore()

    function closeSKU(){
        closeSKUPanel()
    }

    return(
        <div className='skuOpens pad16 flex flex-dir gap16'>
            <div className='flex flex-1 '>
                <h2 className='resHead'>Ordered SKU's</h2>
                <button onClick={closeSKU} className='blankBtn' >
                    <svg className='smallsvg' xmlns="http://www.w3.org/2000/svg" fill="#0066cb" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g></svg>
                </button>
            </div>
            <div className='grid grid-4-col gap16'>
                {[1,2,3].map(el=>
                    <div className='odbox flex flex-dir gap16'>
                        <div className='imges'>
                            <img src={mock} className='mockup' alt='mock up'/>
                        </div>
                        <div className='details flex flex-dir gap8 pad16'>
                            <p className='name_order'>Tshirt-4 pickup round</p>
                            <p className='name_order'>SKU &mdash; SKU478147844</p>
                            <div className='grid grid-2-col gap8'>
                                <p className='name_order'>Stock &mdash; 566</p>
                                <p className='name_order'>Color &mdash; Black</p>
                                <p className='name_order'>Units &mdash; 5</p>
                                <p className='name_order'>Size &mdash; XXL</p>
                            </div>

                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default SKUOpens;