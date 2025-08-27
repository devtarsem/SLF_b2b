import './../styles/marketing.css'
import './../styles/markMedia.css'

import './../utils/util.css'
import Nav from './nav';
import home from '/home.png'
import { Link } from 'react-router';


function Marketing(){
    return(
        <main className='marketing'>
            <Nav/>
            <header id="home" className='header grid grid-1-col'>
                <div className='content markeheadcont flex flex-dir flex-2 gap16 flex-4 pad96'>
                    <h2 className='head2Home'>We bring <span></span>solutions to make life easier for our customers.</h2>
                    <p className='des'>With skylite management you can manage well, scale well and understand well.</p>
                    <div className=''>
                        <Link to='/dashboard/home' className='ctaCall link' >Login to dashboard</Link>
                    </div>
                </div>
                
            </header>
            <div id="feature" className="features_ pad96 flex flex-2 flex-dir gap48">
                <div className='feaPro flex flex-dir flex-2 gap16'>
                    <h2 className='feahead'>what we provide</h2>
                    <p className='feades'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis commodi beatae minima porro, iste reprehenderit autem quis itaque magnam, necessitatibus ex, similique ullam! Repellat illo dolorem, cupiditate vitae voluptates qui.</p>
                </div>
                <div className='fearoles grid grid-3-col gap32'>
                    <div className='fead flex flex-2 flex-dir gap16'>
                        <svg className=' svgMark' viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4.6A2.6 2.6 0 0 1 2.6 2h18.8A2.6 2.6 0 0 1 24 4.6v.8A2.6 2.6 0 0 1 21.4 8H21v10.6c0 1.33-1.07 2.4-2.4 2.4H5.4C4.07 21 3 19.93 3 18.6V8h-.4A2.6 2.6 0 0 1 0 5.4v-.8ZM2.6 4a.6.6 0 0 0-.6.6v.8a.6.6 0 0 0 .6.6h18.8a.6.6 0 0 0 .6-.6v-.8a.6.6 0 0 0-.6-.6H2.6ZM8 10a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" fill="##000"></path></g></svg>
                        <h2 className='headfea2'>Easy inventory management</h2>
                        <p className='feaLong'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit alias iste sint vel quis, hic dolorum quos nemo recusandae nostrum necessitatibus laborum omnis voluptas modi deleniti praesentium odit dolorem incidunt.</p>
                    </div>

                    <div className='fead flex flex-2 flex-dir gap16'>
                        <svg  className=' svgMark' fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M78.8,62.1l-3.6-1.7c-0.5-0.3-1.2-0.3-1.7,0L52,70.6c-1.2,0.6-2.7,0.6-3.9,0L26.5,60.4 c-0.5-0.3-1.2-0.3-1.7,0l-3.6,1.7c-1.6,0.8-1.6,2.9,0,3.7L48,78.5c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7C80.4,65,80.4,62.8,78.8,62.1z"></path> </g> <g> <path d="M78.8,48.1l-3.7-1.7c-0.5-0.3-1.2-0.3-1.7,0L52,56.6c-1.2,0.6-2.7,0.6-3.9,0L26.6,46.4 c-0.5-0.3-1.2-0.3-1.7,0l-3.7,1.7c-1.6,0.8-1.6,2.9,0,3.7L48,64.6c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7C80.4,51.1,80.4,48.9,78.8,48.1 z"></path> </g> <g> <path d="M21.2,37.8l26.8,12.7c1.2,0.6,2.7,0.6,3.9,0l26.8-12.7c1.6-0.8,1.6-2.9,0-3.7L51.9,21.4 c-1.2-0.6-2.7-0.6-3.9,0L21.2,34.2C19.6,34.9,19.6,37.1,21.2,37.8z"></path> </g> </g> </g></svg>                        
                        <h2 className='headfea2'>Easy orders management</h2>
                        <p className='feaLong'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit alias iste sint vel quis, hic dolorum quos nemo recusandae nostrum necessitatibus laborum omnis voluptas modi deleniti praesentium odit dolorem incidunt.</p>
                    </div>

                    <div className='fead flex flex-2 flex-dir gap16'>
                        <svg  className=' svgMark' fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>return</title> <path d="M0 21.984q0.032-0.8 0.608-1.376l4-4q0.448-0.48 1.056-0.576t1.12 0.128 0.864 0.736 0.352 1.12v1.984h18.016q0.8 0 1.408-0.576t0.576-1.408v-8q0-0.832-0.576-1.408t-1.408-0.608h-16q-0.736 0-1.248-0.416t-0.64-0.992 0-1.152 0.64-1.024 1.248-0.416h16q2.464 0 4.224 1.76t1.76 4.256v8q0 2.496-1.76 4.224t-4.224 1.76h-18.016v2.016q0 0.64-0.352 1.152t-0.896 0.704-1.12 0.096-1.024-0.544l-4-4q-0.64-0.608-0.608-1.44z"></path> </g></svg>
                        <h2 className='headfea2'>Easy returns management</h2>
                        <p className='feaLong'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit alias iste sint vel quis, hic dolorum quos nemo recusandae nostrum necessitatibus laborum omnis voluptas modi deleniti praesentium odit dolorem incidunt.</p>
                    </div>

                    <div className='fead flex flex-2 flex-dir gap16'>
                        <svg  className=' svgMark' fill="#000000" height="200px" width="200px" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Bratwurstbike</title> <title>Layer 1</title> <g> <path d="M199.5,204.4c-0.1,0-0.1,0-0.2,0h-0.1c-0.9,0-1.8,0.2-2.7,0.6c-2.9,1.1-4.8,4-4.8,7.1c0,4.3,3.5,7.8,7.8,7.8 c4.3,0,7.8-3.5,7.8-7.8S203.8,204.4,199.5,204.4z"></path> <path d="M237.6,122.2H148V54.5c0-0.1,0-0.2,0-0.4l76,0.3l0,0c1.4,0,2.7-1,3-2.3l-1.6-3.5L148,9.5c-0.8-0.4-1.8-0.4-2.7,0L63.1,47.9 c-1.3,0.6-2,2-1.7,3.5s1.5,2.4,3,2.4l77.6,0.3c0,0.1,0,0.2,0,0.4v149.1h-25l10.2-15.6h5.1c1.7,0,3.1-1.4,3.1-3.1 c0-1.6-1.4-3.1-3.1-3.1h-13.8c-1.7,0-3.1,1.4-3.1,3.1c0,1.6,1.4,3.1,3.1,3.1h1.2l-8.3,12.6l-37.6-75.2h8.4c1.7,0,3.1-1.4,3.1-3.1 c0-1.6-1.4-3.1-3.1-3.1H59c-1.7,0-3.1,1.4-3.1,3.1c0,1.6,1.4,3.1,3.1,3.1h8.1l19.7,39.5l-0.2-0.2L75.5,175 c-7.7-6.9-17.8-11.1-28.9-11.1c-23.7,0-43,19.3-43,43s19.2,42.8,42.9,42.8c22.7,0,41.2-17.7,42.9-39.9h16l-10.2,15.6h-5.2 c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1h13.8c1.7,0,3.1-1.4,3.1-3.1c0-1.7-1.4-3.1-3.1-3.1h-1.1l10.2-15.6h47.3 c0,0.4,0,0.8,0,1.2c0,21.6,17.6,39.2,39.2,39.2s39.2-17.6,39.2-39.2c0-1.4-0.1-2.9-0.3-4.3h12.8v-54.1v-30.4h-13.3V122.2z M46.5,243.5c-20.3,0-36.8-16.5-36.8-36.8s16.5-36.8,36.8-36.8c9.3,0,17.9,3.5,24.3,9.2l-25,23.3c-0.3-0.1-0.6-0.1-1-0.1 c-2.4,0-4.5,2-4.5,4.5c0,2.4,2,4.5,4.5,4.5c1.3,0,2.4-0.5,3.3-1.4h35.1C81.6,228.6,65.8,243.5,46.5,243.5z M53.4,203.6L75,183.5 c4.5,5.6,7.5,12.6,8.1,20.1H53.4z M89.3,203.6c-0.6-9.2-4.2-17.6-9.8-24.3l9.8-9.1l16.6,33.4L89.3,203.6L89.3,203.6z M199.3,244 c-18.2,0-33-14.8-33-33c0-0.4,0-0.8,0-1.2c0.1-1.5,0.2-3,0.4-4.4c0.1-0.6,0.2-1.2,0.3-1.7c3.4-14.7,16.5-25.6,32.2-25.6 c16.3,0,30,11.9,32.6,27.6c0.3,1.7,0.4,3.6,0.4,5.4C232.2,229.1,217.4,244,199.3,244z"></path> </g> </g></svg>
                        <h2 className='headfea2'>Easy vendors management</h2>
                        <p className='feaLong'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit alias iste sint vel quis, hic dolorum quos nemo recusandae nostrum necessitatibus laborum omnis voluptas modi deleniti praesentium odit dolorem incidunt.</p>
                    </div>

                    <div className='fead flex flex-2 flex-dir gap16'>
                        <svg  className=' svgMark' fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M746.667 106.667H1173.33V1493.33H746.667V106.667ZM533.333 533.333H106.667V1493.33H533.333V533.333ZM1920 1706.67H0V1824H1920V1706.67ZM1813.33 746.667H1386.67V1493.33H1813.33V746.667Z"></path> </g></svg>
                        <h2 className='headfea2'>Detail analytics report</h2>
                        <p className='feaLong'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit alias iste sint vel quis, hic dolorum quos nemo recusandae nostrum necessitatibus laborum omnis voluptas modi deleniti praesentium odit dolorem incidunt.</p>
                    </div>

                    <div className='fead flex flex-2 flex-dir gap16'>
                        <svg className=' svgMark' viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="" d="M268.383 22.168l-55.918 84.482 29.717 3.733c-9.22 30.13-11.095 50.878-8.885 92.12 14.138-2.23 25.56-3.025 40.586 1.39-9.877-36.84-8.844-49.427-4.88-89.768l32.622 2.277-33.242-94.234zm218.482 2.21l-108.36 30.03 20.915 25.975c-49.512 31.019-80.331 55.548-104.74 123.164 13.201-.152 28.098 2.921 44.174 9.004 5.728-44.666 33.74-76.14 79.302-108.918l19.983 24.816 48.726-104.07zm-463.574 2.31L89.17 129.173l19.084-28.711c35.554 32.44 58.145 76.33 57.308 107.43 18.568-8.696 29.927-9.527 49.735-3.778-8.105-31.203-43.577-108.722-91.639-129.103l16.57-26.037L23.292 26.687zm276.117 214.667c-5.28.12-10.21 2.415-16.937 9.594l-6.565 6.969-6.812-6.72c-7.387-7.28-13.216-9.29-19.125-9.03-5.908.26-12.855 3.367-20.625 9.656l-6.217 5.03-5.906-5.374c-8.9-8.052-16.485-10.439-23.75-10.064-5.288.274-10.775 2.266-16.25 5.75l40.966 73.69c15.454 9.451 47.034 13.006 68.75 2.062l39.594-73.344c-7.51-3.062-14.26-6.202-20.094-7.406-2.112-.437-4.07-.756-5.968-.813-.354-.01-.71-.008-1.06 0zm-89.97 96.188v.002c-18.035 12.742-32.516 34.717-38.125 66.904-5.435 31.196 3.129 52.266 18.283 66.625 15.155 14.36 37.902 21.736 61 21.436 23.1-.3 46.136-8.31 61.625-22.936 15.49-14.627 24.249-35.425 19.281-65.187-5.137-30.757-18.4-52.148-35.19-65.094-28.482 15.056-64.095 11.856-86.875-1.75z"></path></g></svg>
                        <h2 className='headfea2'>Detail expense control</h2>
                        <p className='feaLong'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit alias iste sint vel quis, hic dolorum quos nemo recusandae nostrum necessitatibus laborum omnis voluptas modi deleniti praesentium odit dolorem incidunt.</p>
                    </div>

                </div>
            </div>

            <div id="app" className='Appversion flex flex-dir gap48 flex-2 '>
                <h2 className='feahead'>Multiple device support</h2>
                <div className='appgrid grid grid-2-col '>
                    <div className='contapp flex flex-2 pad96'>
                        <div className=' flex flex-dir flex-2 gap16'>
                            <h2 className='feahead apphead'>Reliable app version</h2>
                            <p className='feades'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis commodi beatae minima porro, iste reprehenderit autem quis itaque magnam, necessitatibus ex, similique ullam! Repellat illo dolorem, cupiditate vitae voluptates qui.</p>
                        </div>
                    </div>
                    <div className='appviewCont flex flex-2'>
                        <img src='/app1.jpg' className='appversion' alt='app intro'/>
                    </div>
                </div>
            </div>

            <footer id="cta" className='footer flex flex-dir gap48 pad96'>
                <h2 className='foothead'>Skylite Managements</h2>
                <div className='LinkstoFoot grid grid-4-col'>
                    <div className='linkset1 flex flex-dir gap16'>
                        <h3 className='linkhead'>Features</h3>
                        <div className='flex flex-dir gap16'>
                            <Link to='/dashboard' className='footlink' >Solution</Link>
                            <Link to='/dashboard' className='footlink' >Features</Link>
                            <Link to='/dashboard' className='footlink' >App version</Link>
                        </div>
                    </div>
                    <div className='linkset1 flex flex-dir gap16'>
                        <h3 className='linkhead'>App</h3>
                        <div className='flex flex-dir gap16'>
                            <Link to='/dashboard' className='footlink' >Downlaod from play store</Link>
                        </div>
                    </div>
                    <div className='linkset1 flex flex-dir gap16'>
                        <h3 className='linkhead'>Dashboard</h3>
                        <div className='flex flex-dir gap16'>
                            <Link to='/dashboard' className='footlink' >Login to dashboard</Link>
                        </div>
                    </div>
                </div>
                <div className='dashLogin flex flex-2 pad16'>
                    <Link to='/dashboard' className='footbot' >Login to dashboard</Link>
                </div>
            </footer>
        </main>
    )
}

export default Marketing;