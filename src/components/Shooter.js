import React, { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../App";
import { BulletStatus, GameStatus } from "../inc/types";
import { calculateLineLength, convertRadiansToDegrees } from "../inc/util";
import shotmp3 from "../assets/shot2.mp3"
import audioEffect from "../inc/audioEffect";

const Shooter=()=>{
    const {game,setGame,gameStatus,setGameStatus}=useContext(GameContext);
    let mousePosition={x:0,y:0};
    const shooter=useRef(null);
    let center={x:0,y:0};
    const [radian,setRadian]=useState(0);
    // const [playSound]=useSound('shot.mp3');
    
    const getMouseRadian=(e)=>{
        mousePosition.x=e.clientX;
        mousePosition.y=e.clientY;
        return Math.atan2(mousePosition.y-center.y,mousePosition.x-center.x);
    }

    const mouseHandler = (e) => {
        setRadian(getMouseRadian(e));
    }

    const resizeHandler=()=>{
        if(!shooter)
            return;
        center.x=shooter.current?.getBoundingClientRect().left+shooter.current?.getBoundingClientRect().width/2;
        center.y=shooter.current?.getBoundingClientRect().top+shooter.current?.getBoundingClientRect().height/2;
    }

    const fireHandler=(e)=>{
        if(gameStatus!==GameStatus.play)
            return;
        e.preventDefault();
        audioEffect(shotmp3);
        const tmp=game.bullets;
        tmp.push({radian:getMouseRadian(e),speed:10,key:game.bullets.length+10000,status:BulletStatus.live});
        setGame({...game,bullets:tmp});
        
    }
    
    // useEffect(() => {
    //     if(gameStatus===GameStatus.play){
    //         center.x=shooter.current?.getBoundingClientRect().left+shooter.current?.getBoundingClientRect().width/2;
    //         center.y=shooter.current?.getBoundingClientRect().top+shooter.current?.getBoundingClientRect().height/2;
    //         document.addEventListener("mousemove", mouseHandler);
    //         window.addEventListener("resize", resizeHandler);
    //         document.addEventListener("click",fireHandler);
    //     }
    //     return () => {
    //         document.removeEventListener("mousemove", mouseHandler);
    //         window.removeEventListener("resize", resizeHandler);
    //         document.removeEventListener("click",fireHandler);
    //     };
    //   }, []);

    useEffect(()=>{
        if(gameStatus===GameStatus.play){
            setTimeout(()=>{
                center.x=shooter.current?.getBoundingClientRect().left+shooter.current?.getBoundingClientRect().width/2;
                center.y=shooter.current?.getBoundingClientRect().top+shooter.current?.getBoundingClientRect().height/2;
                document.addEventListener("mousemove", mouseHandler);
                window.addEventListener("resize", resizeHandler);
                document.addEventListener("click",fireHandler);
            },500);

        }

        if(gameStatus!==GameStatus.play){
            document.removeEventListener("mousemove", mouseHandler);
            window.removeEventListener("resize", resizeHandler);
            document.removeEventListener("click",fireHandler);
        }
        return () => {
            document.removeEventListener("mousemove", mouseHandler);
            window.removeEventListener("resize", resizeHandler);
            document.removeEventListener("click",fireHandler);
        };
    },[gameStatus]);
    
    const gunDeg=convertRadiansToDegrees(radian);
    return (<div className="Shooter" ref={shooter} id="Shooter">
        <span className="Gun" style={{rotate:gunDeg+"deg"}}></span>
    </div>);
}

export default Shooter;