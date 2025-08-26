import './../styles/home.css'
import './../styles/exp.css'
import './../styles/media.css'
import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState , useEffect} from 'react';
import Auth from './auth';

function DropDown(props){
    return(
        <div className='dropDownCp'>
            <span>{props.title}</span>
            <div className='dropdonmenu'>
                <button onClick={props.pdf} className='standardBtn standardBtn_white'>{props.pdfTitle}</button>
                <button onClick={props.excel} className='standardBtn standardBtn_white'>{props.excelTitle}</button>
            </div>
        </div>
    )
}

export default DropDown;