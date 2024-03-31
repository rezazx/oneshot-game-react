

const audioEffect=(src,loop=false)=>{
    const a=new Audio(src);
    a.loop=loop;
    a.play();
}

export default audioEffect;