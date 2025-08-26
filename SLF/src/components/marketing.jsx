import './../styles/marketing.css'
import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';


function Marketing(){
    return(
        <main className='marketing'>
            <Nav/>
            <header className='header grid grid-2-col'>
                <div className='content flex flex-dir gap16 flex-4 pad96'>
                    <h2 className='head2Home'>We bring <span>solutions</span> to make life easier for our customers.</h2>
                    <p className='des'>With skylite management you can manage well, scale well and understand well.</p>
                    <div className=''>
                        <Link to='/dashboard' className='ctaCall link' >Login to dashboard</Link>
                    </div>
                </div>
                <div className='imaginary'>
                    
                </div>
            </header>
        </main>
    )
}

export default Marketing;