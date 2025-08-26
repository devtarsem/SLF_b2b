import './../styles/home.css'
import './../styles/media.css'
import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import Auth from './auth';
import authStore from '../store/auth/auth.store';
import homeStore from '../store/home/home.store';
import PopUp from './popUp';

function Home(){

    const {AuthNeeded, checkAuth} = authStore()

    const {isLoading, credentails, fetchingCredentials} = homeStore()

    useEffect(el=>{
        fetchingCredentials()
    }, [])
    useEffect(()=>{
        checkAuth()
    }, [])
    return(
        <div className='home flex flex-dir gap16'>

            {AuthNeeded &&
                <Auth/>
            }

            {isLoading &&
                <PopUp  msg="Loading highlights..." />
            }

            <h2 className='resHead'>Highlights</h2>
            <div className='flex flex-dir gap16'>
                <div className='highlightgrid grid grid-5-col gap16'>
                    <div className='itemHighlish gp1 flex flex-dir flex-2 gap16 pad16'>
                        <p className='count'>{credentails?.product}+</p>
                        <p className='itemName'>Products</p>
                    </div>
                    <div className='itemHighlish gp2 flex flex-dir flex-2 gap16 pad16'>
                        <p className='count'>{credentails?.order}+</p>
                        <p className='itemName'>Order delivered</p>
                    </div>
                    <div className='itemHighlish gp3 flex flex-dir flex-2 gap16 pad16'>
                        <p className='count'>{credentails?.vendor}+</p>
                        <p className='itemName'>Vendors</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export  default Home