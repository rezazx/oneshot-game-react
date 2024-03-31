
const Barrier=({pos,degree,hardness=1,width=40,height=20})=>{

    const cl=`Barrier b${hardness}`;
    return(
        <div className={cl} style={{left:pos.x,top:pos.y,rotate:degree+"deg",width:width,height:height}}>

        </div>
    )
}

export default Barrier;