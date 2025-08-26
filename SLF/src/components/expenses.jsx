import './../styles/home.css'
import './../styles/exp.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';
import { useState , useEffect} from 'react';
import Auth from './auth';
import authStore from '../store/auth/auth.store';
import expStore from '../store/analytics/expenses.store';
import DropDown from './standard_dropDwon';
import sweetalertPop from '../class/sweetalert';

function Expenses(){

    const {settingExpensesToLocal, DownloadExpenseList, export_expenses_to_excel,cachedPrevExpenses, cachedExp, SavingExpenses} = expStore()
    const Pop = new sweetalertPop()

    useEffect(el=>{
        settingExpensesToLocal()
    }, [])

    const [ExpensesState, setExpensesState] = useState([])
    useEffect(el=>{
        cachedPrevExpenses()
        setExpensesState(ExpensesState=> cachedExp)
    }, [])

    function inputsSettingOfvals(event,size, property){
        if(event.target.value < 0){
            Pop.handleError(`Expenses ${property} for size ${size} is invalid`, "Please provide a valid Expenses")
            return;
        }
        let arr = ExpensesState;
        console.log(arr)
        for(let item of arr){
            if(item.size == size){
                item[property] = Number(event.target.value)
                item.total = item.COGS + item.Labour + item.Printing + item.Tax + item.Miscellaneous
                break;
            }
        }
        console.log(arr)
       setExpensesState(ExpensesState=> arr);
    }

    function Save(){
        SavingExpenses(ExpensesState)
    }

    function DownloadList(){
        DownloadExpenseList()
    }

    function ExcelExportExp(){
        export_expenses_to_excel()
    }

    const [miniExpMenuFetcher, setMiniExpfetcher] = useState(false)

    function expFetcher(){
        setMiniExpfetcher(miniExpMenuFetcher=> !miniExpMenuFetcher)
    }

    const {AuthNeeded, checkAuth} = authStore()
    useEffect(el=>{
        checkAuth()
    }, [])

    return(
        <div className='expenses flex flex-dir gap16'>
            {miniExpMenuFetcher &&
                <div className='miniExpMenuOpts'>
                    <div className='pad16 flex flex-dir gap16'>
                        <DropDown className="" title="Download expense list" pdf={DownloadList} excel={ExcelExportExp} pdfTitle="As PDF" excelTitle="As Excel" />
                        <button onClick={expFetcher} className='standardBtn borderbtn'>close</button>
                    </div>
                </div>
            }

            {AuthNeeded &&
                <Auth/>
            }
            
            <div className='flex flex-1 '>
                <h2 className='resHead'>Expenses</h2>
                <div className='ExpDropOff'>
                    <DropDown className="" title="Download expense list" pdf={DownloadList} excel={ExcelExportExp} pdfTitle="As PDF" excelTitle="As Excel" />
                </div>
                <button onClick={expFetcher} className='miniExpMenuBtn standardBtn'>Menu</button>
            </div>
            <div className='miniExpDiv '>

            <table className='tableExpenses'>
                <thead>
                    <tr>
                        <th>Prop/size</th>
                        <th>COGS</th>
                        <th>Labour</th>
                        <th>Prnting</th>
                        <th>Tax</th>
                        <th>Miscellaneous</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cachedExp.map(el=>
                        <tr>
                            <td>{el.size}</td>
                            <td>
                                <input onChange={(event)=> inputsSettingOfvals(event, el.size, 'COGS')} defaultValue={el.COGS} className='inp' placeholder='50/-' type='number'/>
                            </td>
                            <td>
                                <input onChange={(event)=> inputsSettingOfvals(event, el.size, 'Labour')} defaultValue={el.Labour} className='inp' placeholder='50/-' type='number'/>
                            </td>
                            <td>
                                <input onChange={(event)=> inputsSettingOfvals(event, el.size, 'Printing')} defaultValue={el.Printing} className='inp' placeholder='50/-' type='number'/>
                            </td>
                            <td>
                                <input onChange={(event)=> inputsSettingOfvals(event, el.size, 'Tax')} defaultValue={el.Tax} className='inp' placeholder='50/-' type='number'/>
                            </td>
                            <td>
                                <input onChange={(event)=> inputsSettingOfvals(event, el.size, 'Miscellaneous')} defaultValue={el.Miss} className='inp' placeholder='50/-' type='number'/>
                            </td>
                             <td>
                                <p className='total'>
                                    ₹{el.total}/-
                                </p>
                            </td>
                        </tr>
                    )}
                        
                </tbody>
            </table>
            </div>
            <button onClick={Save} className='saveExp'>Save expenses</button>
        </div>
    )
}

export default Expenses;