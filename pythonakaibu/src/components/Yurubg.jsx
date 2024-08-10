import yurubackground from '../assets/yurubackground.mp4';
import './Yurubg.css';
import 'beercss';

const Yurubg = () => {
    return (
        <>   
            <div className='yuru-overlay absolute'></div>
            <div className='yurubg'>
                <video src={yurubackground} autoPlay loop muted />
            </div>
        </>
    )
}

export default Yurubg