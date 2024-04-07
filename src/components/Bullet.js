import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../App";
import { BulletStatus, EnemyStatus, GameStatus } from "../inc/types";
import { between } from "../inc/util";
import explodemp3 from "../assets/explode.mp3";
import audioEffect from "../inc/audioEffect";

const Bullet=({radian,speed,id})=>{
    const [pos,setPos]=useState({x:window.innerWidth/2,y:window.innerHeight/2});
    const {game,setGame,score,setScore}=useContext(GameContext);

    const interval=useRef();
    // speed=200/speed;

    const isOutOfWorld=()=>{
        const centerX=window.innerWidth/2;
        const centerY=window.innerHeight/2;

        if(pos.x<centerX-300 || pos.x>centerX+300 || pos.y<centerY-300 || pos.y>centerY+300)
            return true;
        return false;
    }

    const checkHitToEnemy=()=>{
        const enemies=game.enemies;
        for(let i in enemies)
        {
            // if(typeof(enemies[i].currentPosition)==="undefined")
            //     return;
            if(enemies[i].status!==EnemyStatus.live)
                continue;
            const eX=enemies[i].currentPosition.x;
            const eY=enemies[i].currentPosition.y;
            if(between(pos.x,eX-5,eX+15) && between(pos.y,eY-5,eY+15))
            {
                audioEffect(explodemp3);
                enemies[i].status=EnemyStatus.explode;
                setScore(score+enemies[i].value);
                setGame({...game,enemies:enemies});
                changeBulletStatus(BulletStatus.hit);
                break;
            }
        }
    }

    const checkHitToBarrier=()=>{
        const barriers=game.barriers;
        for(let i in barriers)
        {
            if(barriers[i].hardness<=0)
                continue;
            const eX=barriers[i].pos.x;
            const eY=barriers[i].pos.y;
            const w=barriers[i].width;
            const h=barriers[i].height;
            if(between(pos.x,eX-w,eX+w) && between(pos.y,eY-h,eY+h))
            {
                audioEffect(explodemp3);
                barriers[i].hardness -=1;
                setGame({...game,barriers:barriers});
                changeBulletStatus(BulletStatus.hit);
                break;
            }
        }
    }

    const changeBulletStatus=(status)=>{
        const bullets=game.bullets;
        for(let i in bullets)
            if(bullets[i].key===id)
            {
                bullets[i].status=status;
                break;
            }
        
        setGame({...game,bullets:bullets});
    }

    useEffect(() => {
        const move=()=>{
            const dX=4 * Math.cos(radian);
            const dY=4 * Math.sin(radian);

            setPos({x:pos.x+dX,y:pos.y+dY});
            checkHitToBarrier();
            checkHitToEnemy();
            if(isOutOfWorld())
            {
                setScore(score-10);
                changeBulletStatus(BulletStatus.die);
            }
          }
        interval.current=setInterval(move,speed);
        
        return () => {
            clearInterval(interval.current);
        };
    }, [pos]);

    const onGetPos=()=>{
        return pos;
    }
    
    return(
    <div className="Bullet" style={{left:pos.x,top:pos.y}} >

    </div>);
}

export default Bullet;
