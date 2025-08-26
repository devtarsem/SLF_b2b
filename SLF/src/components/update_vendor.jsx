import './../styles/dashboard.css'
import './../styles/vendors.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import manageVendorStore from '../store/vendor/manage_vendor_store';
import sweetalertPop from '../class/sweetalert';


function UpdateVendors(){

    const {closeUpdatePanelVendo, particularvendor, FinalUpdateToDB} = manageVendorStore()

    const [vendor, setvendor] = useState({});
    const Pop = new sweetalertPop()

    useEffect(el=>{
        setvendor(vendor=> particularvendor)
    }, [])

    function closePanel(){
        closeUpdatePanelVendo()
    }

    function nameChange(el){
        setvendor(vendor => ({
            ...vendor,
            name: el.target.value
        }));
    }

    function phoneChange(el){
        setvendor(vendor => ({
            ...vendor,
            phone: el.target.value
        }));
    }

    function catagoryChange(el){
        setvendor(vendor => ({
            ...vendor,
            catagory: el.target.value
        }));
    }

    function payableChange(el){
        setvendor(vendor => ({
            ...vendor,
            payable: el.target.value
        }));
    }

    function receiableChange(el){
        setvendor(vendor => ({
            ...vendor,
            receiable: el.target.value
        }));
    }

    function addressChange(el){
        setvendor(vendor => ({
            ...vendor,
            address: el.target.value
        }));
    }

    function FinalUpdate(el){
        el.preventDefault()
        if(vendor.name.trim()==''){
            Pop.handleError("vendor name is empty", "Please provide a valid vendor name")
            return;
        }
        if(vendor.phone.trim()==''){
            Pop.handleError("vendor phone is empty", "Please provide a valid vendor phone")
            return;
        }
        if(vendor.catagory.trim()==''){
            Pop.handleError("vendor catagory is invalid", "Please provide a valid vendor catagory")
            return;
        }
        if(vendor.payable < 0){
            Pop.handleError("vendor payable is invalid", "Please provide a valid vendor payable")
            return;
        }
        if(vendor.receiable < 0){
            Pop.handleError("vendor receiable is invalid", "Please provide a valid vendor receiable")
            return;
        }
        if(vendor.address.trim()==''){
            Pop.handleError("vendor address is invalid", "Please provide a valid vendor address")
            return;
        }
        FinalUpdateToDB(vendor)
    }


    return(
        <div className='UpdateVendors pad16 flex flex-dir gap16'>
            <div className='flex flex-1'>
                <h2 className='updateHead'>Update vendor</h2>
                <button onClick={closePanel} className='blankBtn' >
                    <svg className='smallsvg' xmlns="http://www.w3.org/2000/svg" fill="#0066cb" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g></svg>
                </button>
            </div>
            <form>
                <div className=" updatevendorInnerMini flex flex-dir gap16">
                    <div className="flex flex-dir gap8">
                        <label htmlFor="vendorName" className="label">Vendor Name</label>
                        <input
                            type="text"
                            id="vendorName"
                            name="vendorName"
                            placeholder="Enter vendor name"
                            className="inp"
                            value={vendor.name}
                            onChange={nameChange}
                        />
                    </div>

                    <div className="flex flex-dir gap8">
                        <label htmlFor="vendorPhone" className="label">Vendor Phone</label>
                        <input
                            type="tel"
                            id="vendorPhone"
                            name="vendorPhone"
                            placeholder="Enter phone number"
                            className="inp"
                            value={vendor.phone}
                            onChange={phoneChange}

                        />
                    </div>

                    <div className="flex flex-dir gap8">
                        <label htmlFor="vendorCategory" className="label">Vendor Category</label>
                        <select
                            id="vendorCategory"
                            name="vendorCategory"
                            className="inp"
                            value={vendor.catagory}
                            onChange={catagoryChange}

                        >
                            <option value="">Select category</option>
                            <option value="raw-material">Raw Material</option>
                            <option value="services">Services</option>
                            <option value="equipment">Equipment</option>
                        </select>
                    </div>

                    <div className="flex flex-dir gap8">
                        <label htmlFor="vendorPayable" className="label">Vendor Payable</label>
                        <input
                            type="number"
                            id="vendorPayable"
                            name="vendorPayable"
                            placeholder="Enter payable amount"
                            className="inp"
                            value={vendor.payable}
                            onChange={payableChange}


                        />
                    </div>

                    <div className="flex flex-dir gap8">
                        <label htmlFor="vendorReceivable" className="label">Vendor Receivable</label>
                        <input
                            type="number"
                            id="vendorReceivable"
                            name="vendorReceivable"
                            placeholder="Enter receivable amount"
                            className="inp"
                            value={vendor.receiable}
                            onChange={receiableChange}


                        />
                    
                    </div>

                    <div className="flex flex-dir gap8">
                        <label htmlFor="vendorAddress" className="label">Vendor Address</label>
                        <input
                            type="text"
                            id="vendorAddress"
                            name="vendorAddress"
                            placeholder="Enter address"
                            className="inp"
                            value={vendor.address}
                            onChange={addressChange}

                        />
                    </div>

                    <button onClick={FinalUpdate} className='standardBtn' type="submit">Update</button>

                </div>
            </form>
        </div>
    )
}

export default UpdateVendors