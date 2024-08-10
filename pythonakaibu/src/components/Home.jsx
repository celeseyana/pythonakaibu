import './Home.css';
import Yurubg from './Yurubg';


export default function Home() {
    return (
        <>
            <div>
                <Yurubg />
            </div>
            
            <div className="login-container absolute">
                <div className='login-logo-welcome indigo3'>
                    <img src='./src/assets/earthbg.png'></img>
                </div>
                <div className='login-fields indigo2'>
                    test 2
                </div>
            </div>
        </>
    )
}