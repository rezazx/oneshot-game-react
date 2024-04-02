import { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import createBullet from './components/createBullet';
import createEnemy from './components/createEnemy';
import Shooter from './components/Shooter';
import { calcObjectDegree } from './inc/animation';
import audioEffect from './inc/audioEffect';
import { BulletStatus, EnemyStatus, GameStatus, getGameStatusName } from './inc/types';
import { between, randInt } from './inc/util';
import bgmusic from "./assets/music-game.mp3";
import Menu from "./components/Menu";
import createBarrier from './components/createBarrier';
import ShooterExploded from './components/ShooterExploded';
import Lives from './components/Lives';

export const GameContext=createContext(null);

function App() {
    const [game,setGameWorld]=useState({
        status:GameStatus.play,
        score:0,
        enemies:[],
        bullets:[],
        barriers:[],
    });
    const [score,setScore]=useState(0);
    const [gameStatus,setGameStatus]=useState(GameStatus.stop);
    const [level,setLevel]=useState(1);
    const [lives,setLives]=useState(5);
    const appRef=useRef();
    const enemyInrval=useRef();

    const getRect=()=>{
        return appRef.current?.getBoundingClientRect();
    }
    //create and push enemies
    useEffect(()=>{
        if(gameStatus!==GameStatus.play)
        {
            clearInterval(enemyInrval.current);
            return;
        }
        enemyInrval.current=setInterval(()=>{

            if( randInt(100)<100-level-2)
                return;

            const centerX=window.innerWidth/2;
            const centerY=window.innerHeight/2;
            const enemies=game.enemies;
            for(let i=0;i<4;i++){
                const x=randInt(appRef.current?.getBoundingClientRect().width-20)+appRef.current?.getBoundingClientRect().left;
                const y=randInt(appRef.current?.getBoundingClientRect().height-20)+appRef.current?.getBoundingClientRect().top;

                if(between(x,centerX-100,centerX+100) && between(y,centerY-100,centerY+100))
                    return;
                const speed=randInt(9)+1;
                let value=5;
                if(speed>7)
                    value=10;
                if(speed===7)
                    value=20;
                
                enemies.push({
                    speed:speed===7?15:speed,
                    startPosition:{x:x,y:y},
                    key:enemies.length,
                    currentPosition:{x:x,y:y},
                    status:EnemyStatus.live,
                    degree:calcObjectDegree(x,y,centerX,centerY),
                    value:value
            });
            }

            setGame({...game,enemies:enemies});
            setLevel(parseInt(game.enemies.length/10)+1);
        },100);

        return () => {
            clearInterval(enemyInrval.current);
        };
    },[game.enemies,gameStatus]);

    //create barriers
    useEffect(()=>{
        const centerX=window.innerWidth/2;
        const centerY=window.innerHeight/2;
        const _N=parseInt(Math.log2(level))+1;
        const barriers=game.barriers;
        for(let i=0;i<_N;i++){
            const x=randInt(getRect()?.width-90)+getRect().left+40;
            const y=randInt(getRect()?.height-90)+getRect().top+40;
            if(between(x,centerX-70,centerX+70) && between(y,centerY-70,centerY+70))
            {
                i--;
                continue;
            }
            barriers.push({
                pos:{x:x,y:y},
                degree:randInt(360),
                hardness:randInt(3)+1,
                width:randInt(40)+10,
                height:randInt(40)+10,
                key:barriers.length+100000
            });
        }
        setGame({...game,barriers:barriers});
    },[level]);
    //setup background music
    useEffect(()=>{
        const playMusic=()=>{
            audioEffect(bgmusic,true);
            document.removeEventListener("click",playMusic);

        }
        document.addEventListener("click",playMusic);

        return()=>document.removeEventListener("click",playMusic);
    },[])

    //game values...
    const setGame=(game)=>{
        //TODO:Before applying changes, perform certain conditions and filters.
        setGameWorld(game);
    }

    return (
        <GameContext.Provider value={{game,setGame,score,setScore,gameStatus,setGameStatus,lives,setLives}}>
            <h2 className="Info">
                <div>Score:<b>{score}</b></div>
                <Lives></Lives>
                <div>Level:<b>{level}</b></div> </h2>
            <div className="App" id="App" ref={appRef}>            
                {game.enemies.map(e=>{
                    if(e.status===EnemyStatus.live || e.status===EnemyStatus.explode)
                        return createEnemy(e);
                    return null;})}

                {game.barriers.map(e=>{
                    if(e.hardness>0)
                        return createBarrier(e);
                    return null;})}
    
                {game.bullets.map(e=>{
                    if(e.status===BulletStatus.live)
                        return createBullet(e);
                    return null;})}

                {gameStatus===GameStatus.play?<Shooter></Shooter>:''}
                {gameStatus!==GameStatus.play?<Menu></Menu>:''}
                {gameStatus===GameStatus.loos?<ShooterExploded></ShooterExploded>:''}
            </div>
        </GameContext.Provider>
    );
}

export default App;
