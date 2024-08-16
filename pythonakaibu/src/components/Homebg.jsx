import homebackground from '../assets/homebackground.mp4';
import './Homebg.css';
import 'beercss';

const Homebg = () => {
    return (
        <>   
            <div className='homebg-overlay absolute'></div>
            <div className='homebg'>
                <video src={homebackground} autoPlay loop muted />
            </div>
        </>
    )
}

export default Homebg