import './../styles/dashboard.css'
import './../styles/po_so.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState,useEffect } from 'react';
import poStore from '../store/po/postore';

function Po(){

    const {Vendors,addingPoItems,generatePODB, poItems,Products, bill,fetchVendors, fetchingProducts} = poStore()

    useEffect(el=>{
        fetchVendors()
        fetchingProducts()
    }, [])

    const [selectedItem, setSelectedItem] = useState({})
    const [units, setUnits] = useState(0)
    const [vendor, setVendor] = useState('')

    const [cp, setCp] = useState(0)

    function unitsFun(el){
        setUnits(units=> el.target.value)
    }
    function vendorFun(el){
        console.log(el.target.value)
        setVendor(vendor=> el.target.value)
    }

    function cpFun(el){
        setCp(cp=> el.target.value)
    }

    function selectItemFun(el){
        setSelectedItem(selectedItem=> el.target.value)
    }

    function adddItem(){
        addingPoItems(selectedItem, cp, units)
    }

    function generatePO(el){
        el.preventDefault()
        generatePODB(vendor, poItems, bill, 18)
        
    }

    return(
        <div className='po flex flex-dir gap16'>
            <h2 className='resHead'>Add purchase order</h2>
            <form className="grid grid-2-col gap16">
                {/* Vendor Dropdown */}
                <div className="flex flex-dir gap8">
                    <label className="label" htmlFor="vendor">Vendor</label>
                    <select onChange={vendorFun} className="inp" id="vendor" name="vendor">
                        <option className='opt' value='choose vendor'>Choose vendor</option>
                        {Vendors?.map(el=>
                            <option className='opt' value={el._id}>{el.name}</option>
                        )}
                    </select>
                </div>

                

                {/* Add Item Fields */}
                <div className="flex flex-dir gap8" style={{ gridColumn: '1 / -1' }}>
                    <label className="label">Add Item</label>
                    <div className="grid grid-3-col gap16">
                        <select onChange={selectItemFun} className='inp chooseSKUPO'>
                            <option className='opt' value='choose SKU'>Choose SKU</option>
                            {Products?.map(el=>
                                <option className='opt' value={JSON.stringify(el)}>
                                    <div className='skudet'>
                                        <p>{el.name} &mdash; &mdash;</p>
                                        <p>{el.sku} &mdash; &mdash;</p>
                                        <p>{el.brand}</p>

                                    </div>
                                </option>
                                
                            )}
                        </select>
                        <input onChange={unitsFun} className="inp" type="number" placeholder="Units" />
                        <input onChange={cpFun} className="inp" type="number" placeholder="Cost price" />
                        <input value='18' className="inp" type="number" placeholder="Tax %" />
                        <button type="button" onClick={adddItem} className="standardBtn">Add</button>
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
                            <th>Units</th>

                            <th>Sizes</th>
                            <th>Colors</th>
                            <th>Tags</th>
                            <th>Others</th>
                        </tr>
                    </thead>
                    <tbody className='bodyoftable' >
                        {poItems?.map((el,index)=>

                        <tr>
                            <td>{index+1}</td>
                            <td><input type="checkbox" /></td>
                            <td>{el.sku}</td>
                            <td>{el.name}</td>
                            <td>{el.cp}</td>
                            <td>{el.units}</td>

                            <td>{el.sizes.join(", ")}</td>
                            <td>{el.colors.join(", ")}</td>
                            <td className='tags'>{el.tags.join(", ")}</td>
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

                {/* Total Bill */}
                <div className="flex flex-dir gap8">
                    <div className='flex flex-3 gap4'>
                        <label className="label" htmlFor="totalBill">Total Bill </label>
                        <p className='poBill'>&mdash; {bill}/-</p>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-dir gap8">
                        <div className="flex gap8">
                            <button onClick={generatePO} type="submit" className="standardBtn">Generate PO</button>
                            <button type="button" className="standardBtn">Download Invoice</button>
                        </div>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default Po