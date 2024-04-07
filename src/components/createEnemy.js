import Enemy from "./Enemy"
import EnemyShooter from "./EnemyShooter";

const createEnemy=(data)=>{
    
    return(
        <>
            {/* {data.speed ===15 && EnemyShooter(data)} */}
            {data.speed ===0 && <EnemyShooter data={data}/>}

            {data.speed!==0 && <Enemy speed={data.speed} startPosition={data.startPosition} key={data.key} id={data.key} degree={data.degree} status={data.status}></Enemy>}
        </>
    );
}

export default createEnemy;