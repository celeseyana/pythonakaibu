import './Map1.css';
import 'beercss';
import Board from './Board';  
import Gamebg from './GameBG';
import GameUI from './GameUI';

export default function Map1() {
    return (
        <>
            <div>
                <GameUI />
            </div>

            <div>
                <Gamebg />
            </div>
            
            <div className="board-container">
                <Board />
            </div>
            
        </>
    );
}


