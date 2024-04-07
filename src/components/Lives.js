import {useContext} from "react"
import { GameContext } from "../App";
const Lives=()=>{
    const {lives}=useContext(GameContext);
    let _lives=[];
    for(let i=0;i<5;i++){
        if(i<lives)
            _lives.push(<div className="heart" key={'heart'+i}></div>);
        else
            _lives.push(<div className="heart off"></div>);
    }

    return(
        <div className="Lives">{_lives}</div>
    );
}

export default Lives;