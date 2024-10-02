import ingameBG from '../assets/ingameBG.mp4';
import './GameBG.css';
import 'beercss';

const Gamebg = () => {
    return (
        <>   
            <div className='gamebg-overlay absolute'></div>
            <div className='gamebg'>
                <video src={ingameBG} autoPlay loop muted />
            </div>
        </>
    )
}

export default Gamebg