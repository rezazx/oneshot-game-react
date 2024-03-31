
export const GameStatus={
    stop:0,
    play:10,
    win:20,
    loos:30
}

export const getGameStatusName=(n)=>{
    for(let i in GameStatus)
        if(n===GameStatus[i])
            return i;
    return null;
}

export const EnemyStatus={
    live:10,
    die:30,
    hit:50,
    explode:70
}

export const BulletStatus={
    live:10,
    die:30,
    hit:50,
    explode:70

}