import { useEffect, useState } from "react";

const Test=()=>{
    const [t,setT]=useState({x:0,y:0})

    useEffect(()=>{
        const timer=setInterval(()=>{
            setT({x:t.x+10,y:t.y+10});
        },300)

        return ()=>{
            clearInterval(timer);
        }
    },[t]);

    return(
        <h2>{t.x} - {t.y}</h2>
    )
}

export default Test;