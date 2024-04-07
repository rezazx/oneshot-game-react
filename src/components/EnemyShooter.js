import { GameContext } from "App";
import { BulletStatus, EnemyStatus } from "inc/types";
import { randInt } from "inc/util";
import { useRef, useState, useEffect, useContext } from "react";
import Enemy from "./Enemy";
import EnemyBullet from "./EnemyBullet";

const EnemyShooter=({data})=>{
    const interval=useRef();
    const radian=Math.atan2(window.innerHeight/2 - data.startPosition.y,window.innerWidth/2 - data.startPosition.x);
    // const [bullets,setBullets]=useState([]);
    const {game,setGame}=useContext(GameContext);

    let initpos={x:0,y:0}

    useEffect(() => {
        const move=()=>{
            if(data.status!==EnemyStatus.live)
                return;
            const tmp=game.enemyBullets;
            tmp.push({initPos:data.startPosition,status:BulletStatus.live,key:300000+tmp.length,parentKey:data.key});
            setGame({...game,enemyBullets:tmp});
          }
        interval.current=setInterval(move,3000);

        return () => {
            clearInterval(interval.current);
        };
    }, []);

    return (
        <>
            <Enemy  speed={data.speed} startPosition={data.startPosition} key={data.key} id={data.key} degree={data.degree} status={data.status}></Enemy>
            {game.enemyBullets.map(e=>{
                if((e.status===BulletStatus.live || e.status===BulletStatus.explode) && e.parentKey===data.key)
                    return (<EnemyBullet radian={radian} speed={20} initPos={e.initPos} id={e.key} key={e.key} status={e.status}></EnemyBullet>);
                return null;
                })}
        </>
    );
}

export default EnemyShooter;