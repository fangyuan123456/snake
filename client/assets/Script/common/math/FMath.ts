import { define } from "../configs/CommonCfg";
import { Decimal } from "./Decimal";
import { DecimalVec } from "./DecimalVec";
type intNum = number;
let kScale = new Decimal(1000);

export class FMath {
    private static randomSeed = 5;
    private static randomSeedDecimal = new Decimal(233280);
    static setRandSeed(seed: number) {
        this.randomSeed = seed;
    }

    static getRandomSeed() {
        return this.randomSeed;
    }

    static random() {
        this.randomSeed = (this.randomSeed * 9301 + 49297) % 233280;
        return new Decimal(this.randomSeed).div(this.randomSeedDecimal);
    }

    public static initSinCos() {
        for (let i = 0; i < this.sinArr.length; i++) {
            this.sinArr[i] = new Decimal(this.sinArr[i] as any).div(kScale);
        }
        for (let i = 0; i < this.cosArr.length; i++) {
            this.cosArr[i] = new Decimal(this.cosArr[i] as any).div(kScale);
        }
    }

    private static sinArr: Decimal[] = [0, 17, 35, 52, 70, 87, 105, 122, 139, 156, 174, 191, 208, 225, 242, 259, 276, 292, 309, 326, 342, 358, 375, 391, 407, 423, 438, 454, 469, 485, 500, 515, 530, 545, 559, 574, 588, 602, 616, 629, 643, 656, 669, 682, 695, 707, 719, 731, 743, 755, 766, 777, 788, 799, 809, 819, 829, 839, 848, 857, 866, 875, 883, 891, 899, 906, 914, 921, 927, 934, 940, 946, 951, 956, 961, 966, 970, 974, 978, 982, 985, 988, 990, 993, 995, 996, 998, 999, 999, 1000, 1000, 1000, 999, 999, 998, 996, 995, 993, 990, 988, 985, 982, 978, 974, 970, 966, 961, 956, 951, 946, 940, 934, 927, 921, 914, 906, 899, 891, 883, 875, 866, 857, 848, 839, 829, 819, 809, 799, 788, 777, 766, 755, 743, 731, 719, 707, 695, 682, 669, 656, 643, 629, 616, 602, 588, 574, 559, 545, 530, 515, 500, 485, 469, 454, 438, 423, 407, 391, 375, 358, 342, 326, 309, 292, 276, 259, 242, 225, 208, 191, 174, 156, 139, 122, 105, 87, 70, 52, 35, 17, 0, -17, -35, -52, -70, -87, -105, -122, -139, -156, -174, -191, -208, -225, -242, -259, -276, -292, -309, -326, -342, -358, -375, -391, -407, -423, -438, -454, -469, -485, -500, -515, -530, -545, -559, -574, -588, -602, -616, -629, -643, -656, -669, -682, -695, -707, -719, -731, -743, -755, -766, -777, -788, -799, -809, -819, -829, -839, -848, -857, -866, -875, -883, -891, -899, -906, -914, -921, -927, -934, -940, -946, -951, -956, -961, -966, -970, -974, -978, -982, -985, -988, -990, -993, -995, -996, -998, -999, -999, -1000, -1000, -1000, -999, -999, -998, -996, -995, -993, -990, -988, -985, -982, -978, -974, -970, -966, -961, -956, -951, -946, -940, -934, -927, -921, -914, -906, -899, -891, -883, -875, -866, -857, -848, -839, -829, -819, -809, -799, -788, -777, -766, -755, -743, -731, -719, -707, -695, -682, -669, -656, -643, -629, -616, -602, -588, -574, -559, -545, -530, -515, -500, -485, -469, -454, -438, -423, -407, -391, -375, -358, -342, -326, -309, -292, -276, -259, -242, -225, -208, -191, -174, -156, -139, -122, -105, -87, -70, -52, -35, -17] as any;
    static sin(angleInt: intNum) {
        angleInt = angleInt % 360;
        if (angleInt < 0) {
            angleInt += 360;
        }
        return this.sinArr[angleInt];
    }

    private static cosArr: Decimal[] = [1000, 1000, 999, 999, 998, 996, 995, 993, 990, 988, 985, 982, 978, 974, 970, 966, 961, 956, 951, 946, 940, 934, 927, 921, 914, 906, 899, 891, 883, 875, 866, 857, 848, 839, 829, 819, 809, 799, 788, 777, 766, 755, 743, 731, 719, 707, 695, 682, 669, 656, 643, 629, 616, 602, 588, 574, 559, 545, 530, 515, 500, 485, 469, 454, 438, 423, 407, 391, 375, 358, 342, 326, 309, 292, 276, 259, 242, 225, 208, 191, 174, 156, 139, 122, 105, 87, 70, 52, 35, 17, 0, -17, -35, -52, -70, -87, -105, -122, -139, -156, -174, -191, -208, -225, -242, -259, -276, -292, -309, -326, -342, -358, -375, -391, -407, -423, -438, -454, -469, -485, -500, -515, -530, -545, -559, -574, -588, -602, -616, -629, -643, -656, -669, -682, -695, -707, -719, -731, -743, -755, -766, -777, -788, -799, -809, -819, -829, -839, -848, -857, -866, -875, -883, -891, -899, -906, -914, -921, -927, -934, -940, -946, -951, -956, -961, -966, -970, -974, -978, -982, -985, -988, -990, -993, -995, -996, -998, -999, -999, -1000, -1000, -1000, -999, -999, -998, -996, -995, -993, -990, -988, -985, -982, -978, -974, -970, -966, -961, -956, -951, -946, -940, -934, -927, -921, -914, -906, -899, -891, -883, -875, -866, -857, -848, -839, -829, -819, -809, -799, -788, -777, -766, -755, -743, -731, -719, -707, -695, -682, -669, -656, -643, -629, -616, -602, -588, -574, -559, -545, -530, -515, -500, -485, -469, -454, -438, -423, -407, -391, -375, -358, -342, -326, -309, -292, -276, -259, -242, -225, -208, -191, -174, -156, -139, -122, -105, -87, -70, -52, -35, -17, 0, 17, 35, 52, 70, 87, 105, 122, 139, 156, 174, 191, 208, 225, 242, 259, 276, 292, 309, 326, 342, 358, 375, 391, 407, 423, 438, 454, 469, 485, 500, 515, 530, 545, 559, 574, 588, 602, 616, 629, 643, 656, 669, 682, 695, 707, 719, 731, 743, 755, 766, 777, 788, 799, 809, 819, 829, 839, 848, 857, 866, 875, 883, 891, 899, 906, 914, 921, 927, 934, 940, 946, 951, 956, 961, 966, 970, 974, 978, 982, 985, 988, 990, 993, 995, 996, 998, 999, 999, 1000] as any;
    static cos(angleInt: intNum) {
        angleInt = angleInt % 360;
        if (angleInt < 0) {
            angleInt += 360;
        }
        return this.cosArr[angleInt];
    }

    private static tanArr = [0, 17, 35, 52, 70, 87, 105, 123, 141, 158, 176, 194, 213, 231, 249, 268, 287, 306, 325, 344, 364, 384, 404, 424, 445, 466, 488, 510, 532, 554, 577, 601, 625, 649, 675, 700, 727, 754, 781, 810, 839, 869, 900, 933, 966, 1000, 1036, 1072, 1111, 1150, 1192, 1235, 1280, 1327, 1376, 1428, 1483, 1540, 1600, 1664, 1732, 1804, 1881, 1963, 2050, 2145, 2246, 2356, 2475, 2605, 2747, 2904, 3078, 3271, 3487, 3732, 4011, 4331, 4705, 5145, 5671, 6314, 7115, 8144, 9514, 11430, 14301, 19081, 28636, 57290, Infinity];
    static atan2(y: number, x: number) {
        if (x === 0) {
            if (y > 0) {
                return 90;
            } else {
                return -90;
            }
        }
        let tmp = new Decimal(y).div(new Decimal(x)).mul(kScale).floor();
        if (tmp < 0) {
            tmp = -tmp;
        }
        let angle = 0;
        let tanArr = this.tanArr;
        while (tmp > tanArr[angle]) {
            angle++;
        }
        if (y >= 0) {
            if (x <= 0) {
                angle = 180 - angle;
            }
        } else if (x <= 0) {
            angle += 180;
        } else {
            angle = 360 - angle;
        }
        return angle;
    }

    /**
     * 随机获取数组下标
     * （传入 3，则返回0/1/2）
     */
    static randIntNum(num: intNum) {
        if (num === 0) {
            num = 1;
        }
        let tmp = this.random().mul(new Decimal(num)).floor();
        return tmp;
    }


    /**
     * 随机数组中的一个元素
     */
    static randArrElement<T>(arr: T[]) {
        return arr[this.randIntNum(arr.length)];
    }

    /**
     * 范围随机
     * 传入1和3，则返回 1/2/3
     * @param num1 
     * @param num2 
     */
    static randBetween(num1: intNum, num2: intNum) {
        return num1 + this.randIntNum(num2 - num1 + 1);
    }
    static getVec2ForDir(dir){
        return new DecimalVec(this.cos(dir),this.sin(dir));
    }

    static smoothDampV3(current: cc.Vec3, target: cc.Vec3, currentVelocity: cc.Vec3, smoothTime: number, maxSpeed: number = Infinity, deltaTime: number = define.frameDt) {
        let output_x = 0;
        let output_y = 0;
        let output_z = 0;
    
        // Based on Game Programming Gems 4 Chapter 1.10
        deltaTime = Math.max(0.0001, deltaTime);
        smoothTime = Math.max(0.0001, smoothTime);
        let omega = 2 / smoothTime;
    
        let x = omega * deltaTime;
        let exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
    
        let change_x = current.x - target.x;
        let change_y = current.y - target.y;
        let change_z = current.z - target.z;
        let originalTo: cc.Vec3 = target.clone();
    
        // Clamp maximum speed
        let maxChange = maxSpeed * smoothTime;
    
        let maxChangeSq = maxChange * maxChange;
        let sqrmag = change_x * change_x + change_y * change_y + change_z * change_z;
        if (sqrmag > maxChangeSq) {
            var mag = Math.sqrt(sqrmag);
            change_x = change_x / mag * maxChange;
            change_y = change_y / mag * maxChange;
            change_z = change_z / mag * maxChange;
        }
    
        target.x = current.x - change_x;
        target.y = current.y - change_y;
        target.z = current.z - change_z;
    
        let temp_x = (currentVelocity.x + omega * change_x) * deltaTime;
        let temp_y = (currentVelocity.y + omega * change_y) * deltaTime;
        let temp_z = (currentVelocity.z + omega * change_z) * deltaTime;
    
        currentVelocity.x = (currentVelocity.x - omega * temp_x) * exp;
        currentVelocity.y = (currentVelocity.y - omega * temp_y) * exp;
        currentVelocity.z = (currentVelocity.z - omega * temp_z) * exp;
    
        output_x = target.x + (change_x + temp_x) * exp;
        output_y = target.y + (change_y + temp_y) * exp;
        output_z = target.z + (change_z + temp_z) * exp;
    
        // Prevent overshooting
        let origMinusCurrent_x = originalTo.x - current.x;
        let origMinusCurrent_y = originalTo.y - current.y;
        let origMinusCurrent_z = originalTo.z - current.z;
        let outMinusOrig_x = output_x - originalTo.x;
        let outMinusOrig_y = output_y - originalTo.y;
        let outMinusOrig_z = output_z - originalTo.z;
    
        if (origMinusCurrent_x * outMinusOrig_x + origMinusCurrent_y * outMinusOrig_y + origMinusCurrent_z * outMinusOrig_z > 0) {
            output_x = originalTo.x;
            output_y = originalTo.y;
            output_z = originalTo.z;
    
            currentVelocity.x = (output_x - originalTo.x) / deltaTime;
            currentVelocity.y = (output_y - originalTo.y) / deltaTime;
            currentVelocity.z = (output_z - originalTo.z) / deltaTime;
        }
    
        return new cc.Vec3(output_x, output_y, output_z);
    }
    static  smoothDamp(current: number, target: number, currentVelocity: number[], smoothTime: number, maxSpeed: number = Infinity, deltaTime: number = define.frameDt) {
        deltaTime = Math.max(0.0001, deltaTime);
        // Based on Game Programming Gems 4 Chapter 1.10
        smoothTime = Math.max(0.0001, smoothTime);
        let omega = 2 / smoothTime;
    
        let x = omega * deltaTime;
        let exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
        let change = current - target;
        let originalTo = target;
    
        // Clamp maximum speed
        let maxChange = maxSpeed * smoothTime;
        change = cc.misc.clampf(change, -maxChange, maxChange);
        target = current - change;
    
        let temp = (currentVelocity[0] + omega * change) * deltaTime;
        currentVelocity[0] = (currentVelocity[0] - omega * temp) * exp;
        let result = target + (change + temp) * exp;
    
        // Prevent overshooting
        if (originalTo - current > 0.0 == result > originalTo) {
            result = originalTo;
            currentVelocity[0] = (result - originalTo) / deltaTime;
        }
    
        return result;
    }
    static slerp(current:number,target:number,currentVelocity:number[],dt:number,time:number){
        currentVelocity[0] = currentVelocity[0] || 0;
        currentVelocity[0] += dt;
        let currentTime = currentVelocity[0];
        let percent = currentTime/time;
        return (target - current)*percent + current;
    }
    static slerpV3(current:cc.Vec3,target:cc.Vec3,currentVelocity:number[],dt:number,time:number){
        currentVelocity[0] = currentVelocity[0] || 0;
        currentVelocity[0] += dt;
        let currentTime = currentVelocity[0];
        let percent = currentTime/time;
        let vec = target.sub(current);
        return current.add(new cc.Vec3(vec.x*percent,vec.y*percent,vec.z*percent));
    }
}
FMath.initSinCos();

/**
 * 获取上述
 * @param up 
 * @param down 
 */
export function getShangYu(up: number, down: number): { "shang": number, "yu": number } {
    if (down === 0) {
        throw new Error("getShangYu down is a zero");
    } else if (down < 0) {
        down = -down;
    }
    if (up < 0) {
        up = -up;
    }
    if (up < down) {
        return { "shang": 0, "yu": up }
    }
    if (up === down) {
        return { "shang": 1, "yu": 0 };
    }
    let shang = Math.floor(up / down) - 1;
    up = up - (down * shang);
    while (up >= down) {
        shang += 1;
        up -= down;
    }
    return { "shang": shang, "yu": up };
}

export function removeFromArr<T>(arr: T[], one: T) {
    let index = arr.indexOf(one);
    if (index !== -1) {
        arr.splice(index, 1);
    }
}


export function isAlive(obj: any) {
    return obj && obj.alive;
}