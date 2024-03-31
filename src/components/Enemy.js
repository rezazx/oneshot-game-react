import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../App";
import audioEffect from "../inc/audioEffect";
import { EnemyStatus, GameStatus } from "../inc/types";
import { between, randInt } from "../inc/util";
import explodemp3 from "../assets/explode.mp3";

const Enemy=({startPosition,speed,id,degree,status})=>{
    const [pos,setPos]=useState(startPosition);
    const {game,setGame,gameStatus,setGameStatus}=useContext(GameContext);

    const interval=useRef();
    const _T=800/speed;

    const isHitShooter=()=>{
        const centerX=window.innerWidth/2;
        const centerY=window.innerHeight/2;
        if(between(pos.x,centerX-30,centerX+30) && between(pos.y,centerY-30,centerY+30))
            return true;
        return false;
    }

    const setCurrentPositionInGameContext=(pos)=>{
        const enemies=game.enemies;
        for(let i in enemies)
            if(enemies[i].key===id){
                enemies[i].currentPosition=pos;
                break;
            }
        setGame({...game,enemies:enemies});
    }

    const changeEnemyStatus=(status)=>{
        const enemies=game.enemies;
        for(let i in enemies)
            if(enemies[i].key===id)
            {
                enemies[i].status=status;
                break;
            }
        
        setGame({...game,enemies:enemies});
    }

    useEffect(() => {
        if(gameStatus!==GameStatus.play)
            return ;
        const centerX=window.innerWidth/2;
        const centerY=window.innerHeight/2;
        const move=()=>{
            if(gameStatus!==GameStatus.play)
                {
                    clearInterval(interval.current);
                    return;
                }
            let tmpX=pos.x;
            let tmpY=pos.y;
            if(pos.x < centerX)
                tmpX +=randInt(3)+1;
            if(pos.x > centerX)
                tmpX -=randInt(3)+1;
            if(pos.y < centerY)
                tmpY +=randInt(3)+1;
            if(pos.y > centerY)
                tmpY -=randInt(3)+1;
            setCurrentPositionInGameContext({x:tmpX,y:tmpY});
            setPos({x:tmpX,y:tmpY});

            if(isHitShooter())
            {
                audioEffect(explodemp3);
                audioEffect(explodemp3);
                setGameStatus(GameStatus.loos);
                changeEnemyStatus(EnemyStatus.explode);
            }
        }
        
        interval.current=setInterval(move,_T);
        
        return () => {
            clearInterval(interval.current);
        };
    }, [pos]);

    useEffect(()=>{

        let _timer=null;
        if(status!==EnemyStatus.live)
        {
            clearInterval(interval.current);       
            _timer=setTimeout(()=>{
                changeEnemyStatus(EnemyStatus.die);
                clearTimeout(_timer);
            },3000);
        }

    },[status]);
    let cl=`Enemy`;
    if(speed>7)
        cl ='Enemy e2';
    if(speed>12)
        cl='Enemy e3';
    if(status===EnemyStatus.explode)
        cl ='Enemy explode';
    return(
    <div className={cl} style={{left:pos.x,top:pos.y,rotate:degree+"deg"}}>
    </div>);
}

export default Enemy;
