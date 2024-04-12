// import SnakeAssembler from "../assemblers/SnakeAssembler";
// const {ccclass, executeInEditMode, property} = cc._decorator;
// export class BodyStruct{
//     x:number = 0;
//     y:number = 0;
//     z:number = 0;
//     angle:number = 0

// }
// @ccclass
// @executeInEditMode
// export default class SnakeSprite extends cc.Sprite {

//     @property(cc.Float)
//     _bodyWidth: number = 20;
//     @property(cc.Float)
//     public get bodyWidth() {
//         return this._bodyWidth;
//     }
//     public set bodyWidth(_bodyWidth: number) {
//         if (this._bodyWidth !== _bodyWidth) {
//             this._bodyWidth = _bodyWidth;
//             this._resetAssembler();
//         }
//     }
//     @property(BodyStruct)
//     _bodys: BodyStruct[] = [];
//     @property(BodyStruct)
//     public get bodys() {
//         return this._bodys;
//     }
//     public set bodys(points: BodyStruct[]) {
//         if (this._bodys !== points) {
//             this._bodys = points;
//             this._resetAssembler();
//         }
//     }
//     public _resetAssembler() {
//         let assembler = new SnakeAssembler();
//         assembler.init(this);
//         this._updateColor();
//         this.setVertsDirty();
//     }
// }