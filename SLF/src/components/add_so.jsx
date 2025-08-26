import './../styles/dashboard.css'
import './../styles/po_so.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState } from 'react';

function So(){
    return(
        <div className='so flex flex-dir gap16'>
            <h2 className='resHead'>sales order</h2>
            <form className="grid grid-2-col gap16">
                {/* User ID */}
                <div className="flex flex-dir gap8">
                    <label className="label" htmlFor="userId">User ID</label>
                    <input
                    className="inp"
                    type="text"
                    id="userId"
                    name="userId"
                    placeholder="Enter user ID"
                    />
                </div>

                {/* Order Items */}
                <div className="flex flex-dir gap8" style={{ gridColumn: '1 / -1' }}>
                    <label className="label">Order Items</label>
                    <div className="grid grid-2-col gap16">
                    <input className="inp" type="text" placeholder="Product name" />
                    <input className="inp" type="number" placeholder="Units" />
                    <input className="inp" type="number" placeholder="Sales price" />
                    <input className="inp" type="number" placeholder="Tax %" />
                    <button type="button" className="standardBtn">Add</button>
                    </div>
                </div>

                <div className='dropDownDisplay'>
                    <table>
                    <thead>
                        <tr>
                            <th>S. No</th>
                            <th>Select</th>
                            <th>SKU</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Sizes</th>
                            <th>Colors</th>
                            <th>Tags</th>
                            <th>Others</th>
                        </tr>
                    </thead>
                    <tbody className='bodyoftable' >
                        {[1,2,3,4,5,6,78,9,4,85,85,854,85,585,8,54,85].map(el=>

                        <tr>
                            <td>1</td>
                            <td><input type="checkbox" /></td>
                            <td>SKU12345</td>
                            <td>Sample Product</td>
                            <td>120</td>
                            <td>M, L, XL</td>
                            <td>Red, Black</td>
                            <td className='tags'>#summer, #sale</td>
                            <td>
                                <button className='otherBtn'>
                                    update
                                </button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                </div>

                {/* Delivery Status */}
                <div className="flex flex-dir gap8">
                    <label className="label" htmlFor="deliveryStatus">Delivery Status</label>
                    <select className="inp" id="deliveryStatus" name="deliveryStatus">
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Transit Status */}
                <div className="flex flex-dir gap8">
                    <label className="label" htmlFor="transitStatus">Transit Status</label>
                    <select className="inp" id="transitStatus" name="transitStatus">
                    <option value="">Select transit</option>
                    <option value="in_transit">In Transit</option>
                    <option value="reached_hub">Reached Hub</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    </select>
                </div>

                {/* Payment Status */}
                <div className="flex flex-dir gap8">
                    <label className="label" htmlFor="paymentStatus">Payment Status</label>
                    <select className="inp" id="paymentStatus" name="paymentStatus">
                    <option value="">Select payment status</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                    </select>
                </div>

                {/* Submit */}
                <div className="flex flex-dir gap8">
                    <label className="label" style={{ visibility: 'hidden' }}>&nbsp;</label>
                    <button type="submit" className="standardBtn">Submit</button>
                </div>
                </form>

        </div>
    )
}

export default So