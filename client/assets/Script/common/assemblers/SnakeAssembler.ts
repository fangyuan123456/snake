// import SnakeSprite, { BodyStruct } from "../components/SnakeSprite";

// class CommonUtils {
//     static getBodyVertList(bodys: BodyStruct[], bodyWidth: number) {
//         let getBodyPosList = (body: BodyStruct) => {
//             let bodyPointList = [];
//             let angle = body.angle
//             let radians = cc.misc.degreesToRadians(angle);
//             let x = Math.cos(radians);
//             let y = Math.sin(radians);
//             let vec1 = new cc.Vec2(y, -x);
//             let vec2 = new cc.Vec2(-y, x);
//             let r = new cc.Vec3(x, y, 0).cross(new cc.Vec3(vec2.x, vec2.y, 0))
//             if (r.z > 0) {
//                 bodyPointList[0] = vec1.mul(bodyWidth / 2).add(new cc.Vec2(body.x, body.y));
//                 bodyPointList[1] = vec2.mul(bodyWidth / 2).add(new cc.Vec2(body.x, body.y))
//             } else {
//                 bodyPointList[0] = vec2.mul(bodyWidth / 2).add(new cc.Vec2(body.x, body.y));
//                 bodyPointList[1] = vec1.mul(bodyWidth / 2).add(new cc.Vec2(body.x, body.y))
//             }
//         }

//         let posList = [];
//         for (let i = 0; i < bodys.length - 1; i++) {
//             let bodyPosList = getBodyPosList(bodys[i])
//             posList.push(bodyPosList[0]);
//             posList.push(bodyPosList[1]);
//         }
//         return posList;
        
//     }
// }


// export default class SnakeAssembler extends cc.Assembler2D {
//     points: cc.Vec3[] = [];
//     verticesCount = 4;
//     indicesCount = 6;

//     floatsPerVert = 5;
//     uvOffset = 2;
//     colorOffset = 4;

//     private _renderData: cc.RenderData = null;
//     public resetData(comp: SnakeSprite) {
//         this.points = CommonUtils.getBodyVertList(comp.bodys, comp.bodyWidth)
//         this.verticesCount = this.points.length;
//         this.indicesCount = this.verticesCount + (this.verticesCount - 3) * 2;
//         this._renderData['clear']();
//         this.initData();
//     }

//     /** 填充顶点的color */
//     public updateColor(comp: SnakeSprite, color: number) {
//         let uintVerts = this._renderData.uintVDatas[0];
//         if (!uintVerts) return;
//         color = color != null ? color : comp.node.color['_val'];
//         let floatsPerVert = this.floatsPerVert;
//         let colorOffset = this.colorOffset;

//         let polygon = comp.bodys;
//         for (let i = 0; i < polygon.length; i++) {
//             uintVerts[colorOffset + i * floatsPerVert] = color;
//         }
//     }
//     /** 更新uv */
//     protected updateUVs(comp: SnakeSprite) {
//         // let uvOffset = this.uvOffset;
//         // let floatsPerVert = this.floatsPerVert;
//         // let verts = this._renderData.vDatas[0];

//         // let uvs = CommonUtils.computeUv(comp.bodys, comp.node.width, comp.node.height)
//         // let bodys = comp.bodys;
//         // for (let i = 0; i < bodys.length; i++) {
//         //     let dstOffset = floatsPerVert * i + uvOffset;
//         //     verts[dstOffset] = uvs[i].x;
//         //     verts[dstOffset + 1] = uvs[i].y;
//         // }
//     }
  
//     /** 更新renderdata */
//     protected updateRenderData(comp: SnakeSprite) {
//         let frame = comp._spriteFrame;
//         this.packToDynamicAtlas(comp, frame);
//         if (comp._vertsDirty) {
//             this.resetData(comp);
//             this.updateUVs(comp);
//             this.updateVerts(comp);
//             this.updateColor(comp, null);
//             comp._vertsDirty = false;
//         }
//     }

//     //每帧都会被调用
//     fillBuffers(comp: SnakeSprite, renderer) {
//         if (renderer.worldMatDirty) {
//             this.updateWorldVerts(comp);
//         }

//         let renderData = this._renderData;

//         // vData里包含 pos， uv， color数据， iData中包含顶点索引
//         let vData = renderData.vDatas[0];
//         let iData = renderData.iDatas[0];

//         let buffer = this.getBuffer();
//         let offsetInfo = buffer.request(this.verticesCount, this.indicesCount);

//         // buffer data may be realloc, need get reference after request.

//         // fill vertices
//         let vertexOffset = offsetInfo.byteOffset >> 2,
//             vbuf = buffer._vData;
//         if (vData.length + vertexOffset > vbuf.length) {
//             vbuf.set(vData.subarray(0, vbuf.length - vertexOffset), vertexOffset);
//         } else {
//             vbuf.set(vData, vertexOffset);
//         }

//         // fill indices
//         let ibuf = buffer._iData,
//             indiceOffset = offsetInfo.indiceOffset,
//             vertexId = offsetInfo.vertexOffset;
//         for (let i = 0, l = iData.length; i < l; i++) {
//             ibuf[indiceOffset++] = vertexId + iData[i];
//         }
//     }
// }