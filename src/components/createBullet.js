import Bullet from "./Bullet";

const createBullet=(data)=>{
    return(
        <Bullet radian={data.radian} speed={data.speed} key={data.key} id={data.key}></Bullet>
    )
}

export default createBullet;