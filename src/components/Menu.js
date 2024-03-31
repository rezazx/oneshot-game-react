import { useContext } from "react";
import { GameContext } from "../App";
import { GameStatus } from "../inc/types";

const Menu=()=>{
    const {gameStatus,setGameStatus}=useContext(GameContext);

    function startGame(){
        setGameStatus(GameStatus.play);
    }
    function restartGame(){
        window.location=true;
    }
    return(
        <ul className="Menu">
            <h2>ONE SHOT</h2>
            {gameStatus===GameStatus.stop?<li className="BTN" onClick={startGame}>Start Game</li>:''}

            {gameStatus===GameStatus.loos?<><h3>GAME OVER</h3><li className="BTN" onClick={restartGame}>Refresh</li></>:''}

            <li>Designed and developed by Reza.Ahmadi</li>
            <li>Reza.zx@live.com</li>
            <li><a href="https://mrzx.ir" target="_blank">MRZX.ir</a></li>
        </ul>
    )
}

export default Menu;