import Navbar from './Navbar';
import Homebg from './Homebg';
import 'beercss';
import './Home.css'

export default function Home() {
    return (
        <>
            <div>
                <Navbar />
            </div>

            <div>
                <Homebg />
            </div>

            <div className='home-content absolute center middle'>
                test
            </div>
        </>
    )
}

