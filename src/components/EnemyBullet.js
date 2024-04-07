import { GameContext } from "App";
import audioEffect from "inc/audioEffect";
import { BulletStatus } from "inc/types";
import { between } from "inc/util";
import { useContext, useEffect, useRef, useState } from "react";
import explodemp3 from "../assets/explode.mp3";

const EnemyBullet=({radian,speed,id,status,initPos})=>{

    const [pos,setPos]=useState(initPos);
    const {game,setGame,lives,setLives}=useContext(GameContext);

    const changeBulletStatus=(status)=>{
        const bullets=game.enemyBullets;
        for(let i in bullets)
            if(bullets[i].key===id)
            {
                bullets[i].status=status;
                break;
            }
        
        setGame({...game,enemyBullets:bullets});
    }

    const checkHitToShooter=()=>{
        const centerX=window.innerWidth/2;
        const centerY=window.innerHeight/2;
        if(between(pos.x,centerX-35,centerX+20) && between(pos.y,centerY-35,centerY+20)){
            setLives(lives-1);
            const ebullets=game.enemyBullets;
            audioEffect(explodemp3);
            changeBulletStatus(BulletStatus.explode);
        }
    }
    const isOutOfWorld=()=>{
        const centerX=window.innerWidth/2;
        const centerY=window.innerHeight/2;

        if(pos.x<centerX-300 || pos.x>centerX+300 || pos.y<centerY-300 || pos.y>centerY+300)
            return true;
        return false;
    }
    const interval=useRef();
    useEffect(() => {
        const move=()=>{
            const dX=4 * Math.cos(radian);
            const dY=4 * Math.sin(radian);

            setPos({x:pos.x+dX,y:pos.y+dY});

            // checkHitToBarrier();
            checkHitToShooter();

            if(isOutOfWorld())
            {
                changeBulletStatus(BulletStatus.die);
            }
          }
        interval.current=setInterval(move,speed);
        
        return () => {
            clearInterval(interval.current);
        };
    }, [pos]);

    useEffect(()=>{

        let _timer=null;
        if(status===BulletStatus.explode)
        {
            clearInterval(interval.current);       
            _timer=setTimeout(()=>{
                changeBulletStatus(BulletStatus.die);
                clearTimeout(_timer);
            },3000);
        }

    },[status]);
    let cl="EnemyBullet";
    if(status===BulletStatus.explode)
        cl="EnemyBullet explode";
    return(
        <div className={cl} style={{left:pos.x,top:pos.y}} >
    
        </div>);
}

export default EnemyBullet;