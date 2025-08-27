import { Link } from 'react-router';
import './../styles/marketing.css'
import './../utils/util.css'
import { useState } from 'react';

function Nav(){

    const [MiniMenu, setMiniMenu] = useState(false)

    function openMiniMenu(){
        setMiniMenu(MiniMenu=> true)
    }
    function closeMiniMenu(){
        setMiniMenu(MiniMenu=> false)
    }

    return(
        <div className='Nav flex flex-1 pad16'>
            <div className='naming'>
                <h1 className='head1Home'>Skylite Managements</h1>
            </div>
            <div className='links navLinkMini flex flex-1 gap48'>
                <a className='link' href='#home' >Home</a>
                <a className='link' href='#feature' >Features</a>
                <a className='link' href='#app' >App version</a>
                <Link className='link' to='/dashboard/home' >Login to dashboard</Link>
            </div>
            <div className={MiniMenu ? 'miniNavsMenu flex flex-dir gap16 pad16' : 'miniNavsMenu miniNavsHide flex flex-dir gap16 pad16'}>
                <a className='link linkNavTop' href='#home' >Home</a>
                <a className='link linkNavTop' href='#feature' >Features</a>
                <a className='link linkNavTop' href='#app' >App version</a>
                <Link className='link linkNavTop' to='/dashboard/home' >Login to dashboard</Link>
            </div>
            <div className='btnsMarkMenu'>
                {!MiniMenu &&
                    <button onClick={openMiniMenu} className='menuBtn'>
                        <svg className='svgMark' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                }
                {MiniMenu &&
                    <button onClick={closeMiniMenu} className='menuBtn'>
                        <svg className='svgMark' viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 21.32L21 3.32001" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 3.32001L21 21.32" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                }
            </div>
            <div className='cta'>
                <Link to='/dashboard/home' className='special_link link'>Login to dashboard</Link>
            </div>
        </div>
    )
}

export default Nav;