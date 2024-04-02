import {useContext} from "react"
import { GameContext } from "../App";
const Lives=()=>{
    const {lives}=useContext(GameContext);
    let _lives=[];
    for(let i=0;i<5;i++){
        if(i<lives)
            _lives.push(<div class="heart"></div>);
        else
            _lives.push(<div class="heart off"></div>);
    }

    return(
        <div className="Lives">{_lives}</div>
    );
}

export default Lives;