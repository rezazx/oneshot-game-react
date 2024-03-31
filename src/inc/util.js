
export function convertRadiansToDegrees(r){
    return r * (180/Math.PI);
}

export function calculateLineLength(x0,x1,y0,y1){
    return Math.sqrt(Math.pow(x1-x0,2)+Math.pow(y1-y0,2));    
}

export function between(x,min,max){
    return x>=min && x<=max;
}

export function randInt(n){
    return Math.floor(Math.random()*n);
}