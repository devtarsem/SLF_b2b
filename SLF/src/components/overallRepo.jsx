import './../styles/home.css'
import './../styles/overall.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState , useEffect, createRef} from 'react';
import Auth from './auth';
import authStore from '../store/auth/auth.store';
import expStore from '../store/analytics/expenses.store';
import reportStore from '../store/analytics/reports.store';
import DropDown from './standard_dropDwon';
import sweetalertPop from '../class/sweetalert';
import PopUp from './popUp';

function Overall(){

    const {OverAllOrderList, overAllOrders, isLoading,export_As_Excel_overall_report,financials, generateOverallReportPDF} = reportStore()
    const from = createRef()
    const to = createRef()
    const Pop = new sweetalertPop()
    const [overallRepoMenuOp, setOverallRepoMenu] = useState(false)


    function fetchList(){
        if(from.current.value.trim()==''){
            Pop.handleError("Order starting date is invalid", "Please provide a valid Order starting date ")
            return;
        }
        if(to.current.value.trim()==''){
            Pop.handleError("Order ending date is invalid", "Please provide a valid Order ending date ")
            return;
        }
        overAllOrders(from.current.value, to.current.value)
        setOverallRepoMenu(overallRepoMenuOp=>false)

    }

    function DownLoadRepo(){
        if(OverAllOrderList.length==0){
            Pop.handleError("Please the orders first", "fetch the orders first by selecting from and to date")
            return;
        }
        generateOverallReportPDF(OverAllOrderList, financials, from.current.value, to.current.value)
    }

    function OverAllRepoAsExcel(){
        if(OverAllOrderList.length==0){
            Pop.handleError("Please the orders first", "fetch the orders first by selecting from and to date")
            return;
        }
        export_As_Excel_overall_report(OverAllOrderList, from.current.value, to.current.value, financials)
    }


    function  overallRepoFetcher(){
        setOverallRepoMenu(overallRepoMenuOp=> !overallRepoMenuOp)
    }

    // const {AuthNeeded, checkAuth} = authStore()
    // useEffect(el=>{
    //     checkAuth()
    // }, [])

    return(
        <div className='overall flex flex-dir gap16'>
            {isLoading &&
                <PopUp  msg="Please wait, we are fetching your report." />
            }
            {/* {AuthNeeded &&
                <Auth/>
            } */}
            {overallRepoMenuOp &&
                <div className='minimenuItemsOverallRepo'>
                    <div className='flex flex-dir gap16 pad16'>
                        <div className='flex flex-dir gap16'>
                            <div className='flex flex-dir gap8'>
                                <label className='label'>From</label>
                                <input ref={from}  className='inp' type='date'/>
                            </div>
                            <div className='flex flex-dir gap8'>
                                <label className='label'>To</label>
                                <input ref={to} className='inp' type='date'/>
                            </div>
                            <div className='flex flex-dir gap8'>
                                <label className='label hiddenLabel'>btn</label>
                                <button onClick={fetchList} className='fetchRepo standardBtn'>Fetch Report</button>
                            </div>
                        </div>
                        <DropDown title="Download overall report" pdf={DownLoadRepo} excel={OverAllRepoAsExcel} pdfTitle="As PDF" excelTitle="As Excel" />
                        <button onClick={overallRepoFetcher} className='standardBtn borderbtn'>close</button>
                    </div>
                </div>
            }

            <div className='flex flex-1'>
                <h2 className='resHead'>Overall report</h2>
                <button onClick={overallRepoFetcher} className='standardBtn miniOverallReportMenyBtn'>Menu</button>
            </div>
            <div className='flex miniAnalytucsOverallRepoOff flex-1'>
                <div className='flex flex-3 gap16'>
                    <div className='flex flex-dir gap8'>
                        <label className='label'>From</label>
                        <input ref={from}  className='inp' type='date'/>
                    </div>
                    <div className='flex flex-dir gap8'>
                        <label className='label'>To</label>
                        <input ref={to} className='inp' type='date'/>
                    </div>
                    <div className='flex flex-dir gap8'>
                        <label className='label hiddenLabel'>btn</label>
                        <button onClick={fetchList} className='fetchRepo standardBtn'>Fetch Report</button>
                    </div>
                </div>
                <DropDown title="Download overall report" pdf={DownLoadRepo} excel={OverAllRepoAsExcel} pdfTitle="As PDF" excelTitle="As Excel" />

            </div>
            <div className='numbers grid grid-5-col gap16'>
                {["Sales", "Gross_Margins", "COGS", "Labour", "Printing", "Miscellaneous", "Profits"].map(el=>
                    <div className='pad16 numberDiv flex flex-dir gap16 flex-2'>
                        <p className='headOfval'>{el}</p>
                        <p className='headOfval__'>₹{financials[el]}/-</p>
                    </div>
                )}
            </div>
            <hr/>
            <div className='orderExecuted flex flex-dir gap16'>
                <div className='flex flex-1'>
                    <h3 className='orderhead'>Orders executed</h3>
                    <p className='totalItem'>Number of items &mdash; {OverAllOrderList?.length}</p>
                </div>
                <div className='flex flex-dir gap16'>
                    <table className='ordersEce'>
                        <thead>
                            <tr>
                                <th>Sno.</th>
                                <th>Date</th>

                                <th>Name</th>
                                <th>color</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Order value</th>
                                <th>Return</th>
                            </tr>
                        </thead>
                        <tbody>
                            {OverAllOrderList?.map((el, index)=>
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{el.date.split(",")[0]}</td>

                                    <td>{el.inner.name}</td>
                                    <td> {el.inner.color}</td>
                                    <td>{el.inner.size}</td>
                                    <td>{el.inner.count}</td>
                                    <td>{el.inner.price}</td>
                                    <td>{el.inner.price*el.inner.count}</td>
                                    <td className={el.inner.return ? "red" : "green"} >{el.inner.return ? "Returned" : "Accepted"}</td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Overall