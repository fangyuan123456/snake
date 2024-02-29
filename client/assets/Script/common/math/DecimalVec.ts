import { Decimal } from "./Decimal";

export class DecimalVec{
    x:Decimal = new Decimal(0);
    y:Decimal = new Decimal(0);
    z:Decimal = new Decimal(0);
    constructor(x:number|Decimal,y:number|Decimal,z?:number|Decimal){
        if(typeof x == "number"){
            this.x = new Decimal(x);
        }else{
            this.x = x;
        }
        if(typeof y == "number"){
            this.y = new Decimal(y);
        }else{
            this.y = y;
        }
        if(z){
            if(typeof z == "number"){
                this.z = new Decimal(z);
            }else{
                this.z = z;
            }
        }
    }
    add(otherDecimalVec:DecimalVec){
        let x = this.x.add(otherDecimalVec.x);
        let y = this.y.add(otherDecimalVec.y);
        let z = this.z.add(otherDecimalVec.z);
        return new DecimalVec(x,y,z);
    }
    sub(otherDecimalVec:DecimalVec){
        let x = this.x.sub(otherDecimalVec.x);
        let y = this.y.sub(otherDecimalVec.y);
        let z = this.z.sub(otherDecimalVec.z);
        return new DecimalVec(x,y,z);
    }
    mul(otherDecimal:Decimal){
        let x = this.x.mul(otherDecimal);
        let y = this.y.mul(otherDecimal);
        let z = this.z.mul(otherDecimal);
        return new DecimalVec(x,y,z);
    }
    div(otherDecimal:Decimal){
        let x = this.x.div(otherDecimal);
        let y = this.y.div(otherDecimal);
        let z = this.z.div(otherDecimal);
        return new DecimalVec(x,y,z);
    }
    getVec3(){
        return new cc.Vec3(this.x.floor(),this.y.floor(),this.z.floor());
    }
}