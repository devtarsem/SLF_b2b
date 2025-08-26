import './../styles/dashboard.css'
import './../styles/loader.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState, useEffect } from 'react';

function Loader(props){
    return(
        <div className='flex flex-dir flex-2 gap16'>
            <div className='loader'></div>
            <p className='LoaderMsg'>{props.msg}</p>
        </div>
    )
}

export default Loader