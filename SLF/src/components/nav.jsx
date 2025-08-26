import { Link } from 'react-router';
import './../styles/marketing.css'
import './../utils/util.css'


function Nav(){
    return(
        <div className='Nav flex flex-1 pad16'>
            <div className='naming'>
                <h1 className='head1Home'>Skylite Managements</h1>
            </div>
            <div className='links flex flex-1 gap48'>
                <Link className='link' to='/' >Home</Link>
                <Link className='link' to='/' >Features</Link>
                <Link className='link' to='/' >Testimonies</Link>
                <Link className='link' to='/' >About</Link>
                <Link className='link' to='/' >Pricing</Link>
            </div>
            <div className='cta'>
                <Link to='/dashboard' className='special_link link'>Login to dashboard</Link>
            </div>
        </div>
    )
}

export default Nav;