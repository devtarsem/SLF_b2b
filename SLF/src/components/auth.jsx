import './../styles/auth.css'
import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import mock from '/mockup.jpg'
import './../styles/media.css'

import { Link, Outlet } from 'react-router';
import { useState, useEffect, createRef } from 'react';
import ongoingStore from '../store/orders/ongoing.store';
import returnStore from '../store/returns/returns.store';
import notFound from '/nofound.svg'
import authStore from '../store/auth/auth.store';
import { useNavigate } from 'react-router-dom';
import PopUp from './popUp';

function Auth(){

    const navigate = useNavigate()

    const {AuthNeeded, checkAuth, openAccount, LoginAccount, isLaoding} = authStore()

    const [signUpSwitch, setSignUPSwitch] = useState(true)

    function SwitchToSignUp(){
        setSignUPSwitch(signUpSwitch=> true)
    }

    function SwitchToLogin(){
        setSignUPSwitch(signUpSwitch=> false)
    }

    useEffect(()=>{
        checkAuth()
    }, [])

    const phoneUp = createRef()
    const passwordUp = createRef()
    const confirmPassUp = createRef()
    const roleUp = createRef()

    const phoneLo = createRef()
    const passwordLo = createRef()

    function openAcc(){
        openAccount(phoneUp.current.value, roleUp.current.value, passwordUp.current.value)
    }

    function Login(){
        LoginAccount(phoneLo.current.value, passwordLo.current.value)
    }



    return(
        <div className='auth pad16 flex flex-2'>
            {isLaoding &&
                <PopUp msg="Please wait..." />
            }
            <div className='formAuth pad16 flex flex-dir gap16 pad16'>
                <div className='btns authBtnsMini flex flex-2 gap32'>
                    <button onClick={SwitchToSignUp} className={signUpSwitch ? 'avv' : 'avv avvOff'}>Sign Up</button>
                    <button onClick={SwitchToLogin} className={!signUpSwitch ? 'avv' : 'avv avvOff'}>Login Up</button>
                </div>

                {signUpSwitch &&
                    <div className='flex flex-dir gap16'>
                        <div className='flex flex-dir gap8'>
                            <label className='label'>Phone</label>
                            <input ref={phoneUp} className='inp' placeholder='94781....' type='number'/>
                        </div>
                        <div className='flex flex-dir gap8'>
                            <label className='label'>Role</label>
                            <select ref={roleUp} className='inp'>
                                {["Admin", "staff-1", "staff-2", "staff-3"].map(el=>
                                    <option className='opt' value={el} >{el}</option>
                                )}
                            </select>
                        </div>
                        <div className='flex flex-dir gap8'>
                            <label className='label'>Password</label>
                            <input ref={passwordUp} className='inp' placeholder='****' type='password'/>
                        </div>
                        <div className='flex flex-dir gap8'>
                            <label className='label'>Confirm password</label>
                            <input ref={confirmPassUp} className='inp' placeholder='****' type='password'/>
                        </div>
                        <button onClick={openAcc} className='authbtn'>Open Account</button>
                    </div>
                }

                {!signUpSwitch &&
                    <div className='Login flex flex-dir gap16'>
                        <div className='flex flex-dir gap8'>
                            <label className='label'>Phone</label>
                            <input ref={phoneLo} className='inp' placeholder='94781....' type='number'/>
                        </div>
                        <div className='flex flex-dir gap8'>
                            <label className='label'>Password</label>
                            <input ref={passwordLo} className='inp' placeholder='****' type='password'/>
                        </div>
                        <button onClick={Login} className='authbtn'>Login</button>

                    </div>
                }
            </div>
            
        </div>  
    )
}

export default Auth