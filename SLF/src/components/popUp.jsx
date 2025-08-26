import './../styles/pop.css'
import './../utils/util.css'
import { Link } from 'react-router';
import { useState , createRef} from 'react';
import addProductStore from '../store/inventory/addProduct.store';


function PopUp(props){
    return(
        <div className='popup flex flex-2'>
            <div className='flex flex-dir gap16 flex-2'>
                <div className="loader"></div> 
                <p className='msg__pop'>{props.msg}</p>
            </div>
        </div>
    )
}

export default PopUp;