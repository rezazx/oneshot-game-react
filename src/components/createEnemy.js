import Enemy from "./Enemy"

const createEnemy=(data)=>{

    return(
        <Enemy speed={data.speed} startPosition={data.startPosition} key={data.key} id={data.key} degree={data.degree} status={data.status}></Enemy>
    );
}

export default createEnemy;