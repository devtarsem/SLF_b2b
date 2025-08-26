import './../styles/dashboard.css'
import './../styles/vendors.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import manageVendorStore from '../store/vendor/manage_vendor_store';
import noVendor from '/noVendor.svg'
import UpdateVendors from './update_vendor';
import PopUp from './../components/popUp';
import DropDown from './standard_dropDwon';
import sweetalertPop from '../class/sweetalert';
import authStore from '../store/auth/auth.store';
import Auth from './auth';

function Manage_vendors(){

    const {Vendors, selectedVendors,export_vendors_to_excel ,DownLoadVendorList, closeUpdatePanelVendo,deletevendors,selectVendors,nextPaginationVendors,updatingVendor, particularvendor, particular_update_vendorID,isLoadingvendor, updatePanelStatus, openUpdatePanelVendo,prevPaginationVendors,fetchVendors, start, end, searchVendors} = manageVendorStore();
    const Pop = new sweetalertPop()
    const [miniMenuManageVendor, setMiniMenuManageVendor] = useState(false)

    useEffect(el=>{
        fetchVendors()
    }, [])

    function SearchVendorsFun(el){
        searchVendors(start, end, el.target.value);
    }

    function NextPagination (){
        nextPaginationVendors()
    }

    function PrevPagination(){
        prevPaginationVendors()
    }

    function OpenUpdatePanel(event, obj){
        openUpdatePanelVendo()
        updatingVendor(obj)
    }

    function closeUpdatePanel(){
        closeUpdatePanelVendo()
    }

    function selectVendor(event, id){
        if(event.target.checked){
            selectVendors(id)
        }
    }

    function DeleteVendorsfun(){
        if(selectedVendors.length==0){
            Pop.handleError("Please select the vendors first", "Click on checkbox to select a vendor")
            return;
        }
        deletevendors(selectedVendors)
        setMiniMenuManageVendor(miniMenuManageVendor=> false)

    }

    function DownLoadVendorListFun(){
        
        DownLoadVendorList()
    }

    function exportvendorExcel(){
        export_vendors_to_excel()
    }


    function miniMenuFetcher(){
        setMiniMenuManageVendor(miniMenuManageVendor=> !miniMenuManageVendor)
    }

    const {AuthNeeded, checkAuth} = authStore()
    useEffect(el=>{
        checkAuth()
    }, [])

    return(
        <div className='manageVendors flex flex-dir gap16'>

            {AuthNeeded &&
                <Auth/>
            }

            {miniMenuManageVendor &&
                <div className='miniManagemenuOpts  gap16'>
                    <div className='grid grid-1-col gap16 pad16'>
                        <Link to='/dashboard/add-vendors' className='link fillnow standardBtn'>Add Vendors +</Link>
                        <button onClick={DeleteVendorsfun} className='link standardBtn'>
                            Delete vendors
                        </button>
                        {/* <button className='standardBtn' onClick={DownLoadVendorListFun}>
                            Downlaod Vendor list
                            </button> */}
                        <DropDown title="Download vendors list" pdf={DownLoadVendorListFun} excel={exportvendorExcel} pdfTitle="As PDF" excelTitle="As Excel" />
                        <button onClick={miniMenuFetcher} className='standardBtn borderbtn'>close</button>
                    </div>
                </div>
            }

            {isLoadingvendor &&
                <PopUp msg="pleasse wait..."/>
            }
            {updatePanelStatus &&
                <UpdateVendors/>
            }
            <div className='flex flex-1'>
                <h2 className='resHead'>Manage vendors</h2>
                <button onClick={miniMenuFetcher} className='standardBtn managevendorMenuBtnMini'>Menu</button>
            </div>
            <div className='features flex flex-1'>
                <div className='flex flex-3 gap16'>
                    <input onChange={SearchVendorsFun} className='search inp' placeholder='Search' type='text'/>
                    <select className='inp search'>
                        {["Sort by", "Receiables", "Payables"].map(el=>
                            <option className='opt' value={el}>{el}</option>
                        )}
                    </select>
                    
                </div>
                <div className='addmore manageVendorMinimen flex flex-1 gap16'>
                    <Link to='/dashboard/add-vendors' className='link standardBtn'>Add Vendors +</Link>
                    <button onClick={DeleteVendorsfun} className='link standardBtn'>
                        Delete vendors
                    </button>
                    {/* <button className='standardBtn' onClick={DownLoadVendorListFun}>
                        Downlaod Vendor list
                    </button> */}
                    <DropDown title="Download vendors list" pdf={DownLoadVendorListFun} excel={exportvendorExcel} pdfTitle="As PDF" excelTitle="As Excel" />
                    
                </div>
            </div>
            <div className='productsList'>
                {Vendors.length == 0 &&
                    <div className='novebndors flex flex-2 flex-dir gap16'>
                        <img src={noVendor} className='noVendor' alt='no vendor'/>
                        <p className='novendorDes'>No vendors found</p>
                    </div>
                }
                <table>
                    <thead>
                        <tr>
                        <th>S. No</th>
                        <th>Select</th>
                        <th>Vendor name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Catagory</th>
                        <th>Receiable</th>
                        <th>Payable</th>
                        <th>Update</th>
                        
                        </tr>
                    </thead>
                    <tbody className='bodyoftable' >
                        {Vendors?.map((el,index)=>
                        <tr>
                        <td>{index+start+1}</td>
                        <td><input onChange={(event)=>selectVendor(event, el._id)} type="checkbox" /></td>
                        <td>{el.name}</td>
                        <td>{el.address}</td>
                        <td>{el.phone}</td>
                        <td>{el.catagory}</td>
                        <td className={el.receiable > 0 ? "higlightGreen" : "nill"} >{el.receiable}</td>
                        <td className={el.receiable > 0 ? "nill" : " higlightGreen"} >{el.payable}</td>
                        <td>
                            {particular_update_vendorID == el._id 
                            
                            ?
                                <button onClick={closeUpdatePanel} className='blankBtn'>
                                    <svg className='smallsvg' xmlns="http://www.w3.org/2000/svg" fill="#0066cb" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g></svg>
                                </button>
                            :
                                <button onClick={(event)=>OpenUpdatePanel(event, el)} className='otherBtn'>
                                    Update
                                </button>
                            }
                        </td>

                     
                        
                        </tr>
                        )}
                    </tbody>
                </table>

            </div>
            <div className='pagination flex flex-3 gap16'>
                <p className='prodno'>Products from {start} &mdash; {end}</p>
                <button onClick={PrevPagination} className='moveBbn standardBtn'>Prev</button>
                <button onClick={NextPagination} className='moveBbn standardBtn'>Next</button>

            </div>
        </div>
    )
}

export default Manage_vendors