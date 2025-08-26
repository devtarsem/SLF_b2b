import './../styles/dashboard.css'
import './../styles/po_so.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState } from 'react';

function PoSo_history(){
    return(
        <div className='history flex flex-dir gap16'>
            <h2 className='resHead'>Purchase order history</h2>
            <div className='features flex flex-1'>
                <div className='flex flex-3 gap16'>
                    <input className='search inp' placeholder='Search' type='text'/>
                    <select className='inp search'>
                        {["Sort by", "Name", "Price", "Discount", "Revenue"].map(el=>
                            <option className='opt' value={el}>{el}</option>
                        )}
                    </select>
                    <button className='filterBtn standardBtn'>
                        Filter
                    </button>
                </div>
                <div className='addmore flex flex-1 gap16'>
                    <Link to='/dashboard/add-products' className='link standardBtn'>Add Purchase order +</Link>
                    <button className='otherBtn otherBtn_extra'>
                        <svg className='svgProd' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12Z" fill="#0066cb"></path> <path d="M8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z" fill="#0066cb"></path> <path d="M10 2C10 0.89543 9.10457 -4.82823e-08 8 0C6.89543 4.82823e-08 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z" fill="#0066cb"></path> </g></svg>
                    </button>
                </div>
            </div>
            <div className='productsList'>
                <table>
                    <thead>
                        <tr>
                        <th>S. No</th>
                        <th>Select</th>
                        <th>Vendor name</th>
                        <th>Created at</th>
                        <th>No of items</th>
                        <th>Total Bill</th>
                        <th>Sizes</th>
                        <th>Colors</th>
                        <th>Discount</th>
                        <th  >Tags</th>
                        <th>Others</th>
                        </tr>
                    </thead>
                    <tbody className='bodyoftable' >
                        {[1,2,3,4,5,6,78,9,4,85,85,854,85,585,8,54,85].map(el=>

                        <tr>
                        <td>1</td>
                        <td><input type="checkbox" /></td>
                        <td>Harnneek</td>
                        <td>12/12/25</td>
                        <td>5</td>
                        <td>425/-</td>
                        <td>XL,XXL</td>
                        <td>pink</td>
                        <td>5%</td>
                        <td className='tags'>#summer, #sale</td>
                        <td>
                            <button className='otherBtn'>
                                View
                            </button>
                        </td>
                        </tr>
                        )}
                    </tbody>
                </table>

            </div>
            <div className='pagination flex flex-3 gap16'>
                <p className='prodno'>Products from 1 &mdash; 20</p>
                <button className='moveBbn standardBtn'>Next</button>
                <button className='moveBbn standardBtn'>Prev</button>

            </div>
        </div>
    )
}


export default PoSo_history