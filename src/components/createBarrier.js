import Barrier from "./Barrier"

const createBarrier=(data)=>{

    return(
        <Barrier pos={data.pos} degree={data.degree} hardness={data.hardness} width={data.width} height={data.height} key={data.key} id={data.key}></Barrier>
    )
}

export default createBarrier;