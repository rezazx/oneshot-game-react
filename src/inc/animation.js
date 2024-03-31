
export const calcObjectDegree=(initX,initY,targetX,targetY)=>{
    return Math.atan2(targetY-initY,targetX-initX)*180/Math.PI;
}