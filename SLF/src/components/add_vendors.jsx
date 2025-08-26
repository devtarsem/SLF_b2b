import './../styles/dashboard.css'
import './../styles/vendors.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState , createRef, useEffect} from 'react';
import PopUp from './popUp';
import addVendorStore from '../store/vendor/addVendor.store';
import sweetalertPop from '../class/sweetalert';
import authStore from '../store/auth/auth.store';
import Auth from './auth';

function Add_vendors(){

    const {isLoadingVendor, addVendorToDB} = addVendorStore()
    const name = createRef()
    const catagory = createRef()
    const address = createRef()
    const phone = createRef()
    const Pop = new sweetalertPop()
    const {AuthNeeded, checkAuth} = authStore()
    useEffect(el=>{
        checkAuth()
    }, [])


    function addvendors(el){
        el.preventDefault()
        if(name.current.value.trim()==''){
            Pop.handleError("vendor name is empty", "Please provide a valid vendor name")
            return;
        }
        if(catagory.current.value.trim()=='catagory'){
            Pop.handleError("vendor catagory is empty", "Please provide a valid vendor catagory")
            return;
        }
        if(address.current.value.trim()==''){
            Pop.handleError("vendor address is invalid", "Please provide a valid vendor address")
            return;
        }
        if(phone.current.value.trim()==''){
            Pop.handleError("vendor phone is empty", "Please provide a valid vendor phone")
            return;
        }
        addVendorToDB({
            name : name.current.value,
            catagory : catagory.current.value,
            address : address.current.value,
            phone : phone.current.value,
        })
        name.current.value = ''
        catagory.current.value = ''
        address.current.value = ''
        phone.current.value = ''
    }

    return(
        <div className='addvendors flex flex-dir gap16'>
            {isLoadingVendor && 
                <PopUp msg="please wait..." />
            }
            {
                AuthNeeded &&
                <Auth/>
            }
            <h2 className='resHead'>Add vendors</h2>
            <form className="advendorFormMini grid grid-2-col gap16">
                <div className="flex flex-dir gap8">
                    <label className="label" htmlFor="vendorName">Vendor Name</label>
                    <input
                    className="inp"
                    type="text"
                    id="vendorName"
                    name="vendorName"
                    ref={name}
                    placeholder="Enter vendor's full name"
                    />
                </div>

                <div className="flex flex-dir gap8">
                    <label className="label" htmlFor="vendorCategory">Vendor Category</label>
                    <select ref={catagory} className='inp'>
                        {["catagory","Clothing", "Specs"].map(el=>
                            <option className='opt' value={el}>{el}</option>
                        )}
                    </select>
                </div>

                <div className="flex flex-dir gap8">
                    <label className="label" htmlFor="address">Address</label>
                    <textarea
                    className="inp"
                    id="address"
                    name="address"
                    ref={address}

                    placeholder="Enter vendor's address"
                    ></textarea>
                </div>

                <div className="flex flex-dir gap8">
                    <label className="label" htmlFor="phone">Phone</label>
                    <input
                    className="inp"
                    type="tel"
                    ref={phone}

                    id="phone"
                    name="phone"
                    placeholder="e.g. +91-9876543210"
                    />
                </div>

                <div className="flex flex-dir gap8">
                    <button onClick={addvendors} className="standardBtn" type="submit">Submit</button>
                </div>
                </form>

        </div>
    )
}

export default Add_vendors