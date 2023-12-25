export function encodeheartBetReq(message) {
  let bb = popByteBuffer();
  _encodeheartBetReq(message, bb);
  return toUint8Array(bb);
}

function _encodeheartBetReq(message, bb) {
}

export function decodeheartBetReq(binary) {
  return _decodeheartBetReq(wrapByteBuffer(binary));
}

function _decodeheartBetReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeheartBetRes(message) {
  let bb = popByteBuffer();
  _encodeheartBetRes(message, bb);
  return toUint8Array(bb);
}

function _encodeheartBetRes(message, bb) {
}

export function decodeheartBetRes(binary) {
  return _decodeheartBetRes(wrapByteBuffer(binary));
}

function _decodeheartBetRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodegetRoomIdReq(message) {
  let bb = popByteBuffer();
  _encodegetRoomIdReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetRoomIdReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // optional int32 inviteUid = 2;
  let $inviteUid = message.inviteUid;
  if ($inviteUid !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($inviteUid));
  }
}

export function decodegetRoomIdReq(binary) {
  return _decodegetRoomIdReq(wrapByteBuffer(binary));
}

function _decodegetRoomIdReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // optional int32 inviteUid = 2;
      case 2: {
        message.inviteUid = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  return message;
}

export function encodegetRoomIdRes(message) {
  let bb = popByteBuffer();
  _encodegetRoomIdRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetRoomIdRes(message, bb) {
  // required int32 roomId = 1;
  let $roomId = message.roomId;
  if ($roomId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($roomId));
  }

  // required string roomIp = 2;
  let $roomIp = message.roomIp;
  if ($roomIp !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $roomIp);
  }
}

export function decodegetRoomIdRes(binary) {
  return _decodegetRoomIdRes(wrapByteBuffer(binary));
}

function _decodegetRoomIdRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 roomId = 1;
      case 1: {
        message.roomId = readVarint32(bb);
        break;
      }

      // required string roomIp = 2;
      case 2: {
        message.roomIp = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.roomId === undefined)
    throw new Error("Missing required field: roomId");

  if (message.roomIp === undefined)
    throw new Error("Missing required field: roomIp");

  return message;
}

export function encodegetPlayerBaseInfoRes(message) {
  let bb = popByteBuffer();
  _encodegetPlayerBaseInfoRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetPlayerBaseInfoRes(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // optional string nickName = 2;
  let $nickName = message.nickName;
  if ($nickName !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $nickName);
  }

  // optional string avatarUrl = 3;
  let $avatarUrl = message.avatarUrl;
  if ($avatarUrl !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $avatarUrl);
  }
}

export function decodegetPlayerBaseInfoRes(binary) {
  return _decodegetPlayerBaseInfoRes(wrapByteBuffer(binary));
}

function _decodegetPlayerBaseInfoRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // optional string nickName = 2;
      case 2: {
        message.nickName = readString(bb, readVarint32(bb));
        break;
      }

      // optional string avatarUrl = 3;
      case 3: {
        message.avatarUrl = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  return message;
}

export function encodegetPlayerAssetInfoRes(message) {
  let bb = popByteBuffer();
  _encodegetPlayerAssetInfoRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetPlayerAssetInfoRes(message, bb) {
  // optional int32 money = 1;
  let $money = message.money;
  if ($money !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($money));
  }

  // optional int32 diamond = 2;
  let $diamond = message.diamond;
  if ($diamond !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($diamond));
  }

  // optional map<string, quipData> haveQuipId = 3;
  let map$haveQuipId = message.haveQuipId;
  if (map$haveQuipId !== undefined) {
    for (let key in map$haveQuipId) {
      let nested = popByteBuffer();
      let value = map$haveQuipId[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodequipData(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 26);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<string, quipData> nowQuipId = 4;
  let map$nowQuipId = message.nowQuipId;
  if (map$nowQuipId !== undefined) {
    for (let key in map$nowQuipId) {
      let nested = popByteBuffer();
      let value = map$nowQuipId[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodequipData(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 34);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional string lianColor = 5;
  let $lianColor = message.lianColor;
  if ($lianColor !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $lianColor);
  }

  // optional string piFuColor = 6;
  let $piFuColor = message.piFuColor;
  if ($piFuColor !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $piFuColor);
  }

  // optional map<string, BgIndexData> gameBg = 7;
  let map$gameBg = message.gameBg;
  if (map$gameBg !== undefined) {
    for (let key in map$gameBg) {
      let nested = popByteBuffer();
      let value = map$gameBg[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodeBgIndexData(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 58);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional quipData vip = 8;
  let $vip = message.vip;
  if ($vip !== undefined) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodequipData($vip, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // required int32 signIndex = 9;
  let $signIndex = message.signIndex;
  if ($signIndex !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($signIndex));
  }

  // required int32 isSigned = 10;
  let $isSigned = message.isSigned;
  if ($isSigned !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, intToLong($isSigned));
  }

  // required string getInviteReworldIndex = 11;
  let $getInviteReworldIndex = message.getInviteReworldIndex;
  if ($getInviteReworldIndex !== undefined) {
    writeVarint32(bb, 90);
    writeString(bb, $getInviteReworldIndex);
  }

  // required string inviteUidStr = 12;
  let $inviteUidStr = message.inviteUidStr;
  if ($inviteUidStr !== undefined) {
    writeVarint32(bb, 98);
    writeString(bb, $inviteUidStr);
  }
}

export function decodegetPlayerAssetInfoRes(binary) {
  return _decodegetPlayerAssetInfoRes(wrapByteBuffer(binary));
}

function _decodegetPlayerAssetInfoRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 money = 1;
      case 1: {
        message.money = readVarint32(bb);
        break;
      }

      // optional int32 diamond = 2;
      case 2: {
        message.diamond = readVarint32(bb);
        break;
      }

      // optional map<string, quipData> haveQuipId = 3;
      case 3: {
        let values = message.haveQuipId || (message.haveQuipId = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              let valueLimit = pushTemporaryLength(bb);
              value = _decodequipData(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: haveQuipId");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional map<string, quipData> nowQuipId = 4;
      case 4: {
        let values = message.nowQuipId || (message.nowQuipId = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              let valueLimit = pushTemporaryLength(bb);
              value = _decodequipData(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: nowQuipId");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional string lianColor = 5;
      case 5: {
        message.lianColor = readString(bb, readVarint32(bb));
        break;
      }

      // optional string piFuColor = 6;
      case 6: {
        message.piFuColor = readString(bb, readVarint32(bb));
        break;
      }

      // optional map<string, BgIndexData> gameBg = 7;
      case 7: {
        let values = message.gameBg || (message.gameBg = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              let valueLimit = pushTemporaryLength(bb);
              value = _decodeBgIndexData(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: gameBg");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional quipData vip = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.vip = _decodequipData(bb);
        bb.limit = limit;
        break;
      }

      // required int32 signIndex = 9;
      case 9: {
        message.signIndex = readVarint32(bb);
        break;
      }

      // required int32 isSigned = 10;
      case 10: {
        message.isSigned = readVarint32(bb);
        break;
      }

      // required string getInviteReworldIndex = 11;
      case 11: {
        message.getInviteReworldIndex = readString(bb, readVarint32(bb));
        break;
      }

      // required string inviteUidStr = 12;
      case 12: {
        message.inviteUidStr = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.signIndex === undefined)
    throw new Error("Missing required field: signIndex");

  if (message.isSigned === undefined)
    throw new Error("Missing required field: isSigned");

  if (message.getInviteReworldIndex === undefined)
    throw new Error("Missing required field: getInviteReworldIndex");

  if (message.inviteUidStr === undefined)
    throw new Error("Missing required field: inviteUidStr");

  return message;
}

export function encodegetPlayerScoreInfoRes(message) {
  let bb = popByteBuffer();
  _encodegetPlayerScoreInfoRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetPlayerScoreInfoRes(message, bb) {
  // optional int32 score = 1;
  let $score = message.score;
  if ($score !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($score));
  }

  // optional int32 defScore = 2;
  let $defScore = message.defScore;
  if ($defScore !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($defScore));
  }

  // optional int32 rank = 3;
  let $rank = message.rank;
  if ($rank !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($rank));
  }
}

export function decodegetPlayerScoreInfoRes(binary) {
  return _decodegetPlayerScoreInfoRes(wrapByteBuffer(binary));
}

function _decodegetPlayerScoreInfoRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 score = 1;
      case 1: {
        message.score = readVarint32(bb);
        break;
      }

      // optional int32 defScore = 2;
      case 2: {
        message.defScore = readVarint32(bb);
        break;
      }

      // optional int32 rank = 3;
      case 3: {
        message.rank = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodematchPlayerReq(message) {
  let bb = popByteBuffer();
  _encodematchPlayerReq(message, bb);
  return toUint8Array(bb);
}

function _encodematchPlayerReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required bool isMatch = 2;
  let $isMatch = message.isMatch;
  if ($isMatch !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $isMatch ? 1 : 0);
  }
}

export function decodematchPlayerReq(binary) {
  return _decodematchPlayerReq(wrapByteBuffer(binary));
}

function _decodematchPlayerReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required bool isMatch = 2;
      case 2: {
        message.isMatch = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.isMatch === undefined)
    throw new Error("Missing required field: isMatch");

  return message;
}

export function encodematchScuessRes(message) {
  let bb = popByteBuffer();
  _encodematchScuessRes(message, bb);
  return toUint8Array(bb);
}

function _encodematchScuessRes(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // optional string nickName = 2;
  let $nickName = message.nickName;
  if ($nickName !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $nickName);
  }

  // optional string avatarUrl = 3;
  let $avatarUrl = message.avatarUrl;
  if ($avatarUrl !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $avatarUrl);
  }

  // optional bool isWxInvite = 4;
  let $isWxInvite = message.isWxInvite;
  if ($isWxInvite !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $isWxInvite ? 1 : 0);
  }

  // required bool isRobote = 5;
  let $isRobote = message.isRobote;
  if ($isRobote !== undefined) {
    writeVarint32(bb, 40);
    writeByte(bb, $isRobote ? 1 : 0);
  }

  // optional roboteDataStruct roboteBaseData = 6;
  let $roboteBaseData = message.roboteBaseData;
  if ($roboteBaseData !== undefined) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encoderoboteDataStruct($roboteBaseData, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodematchScuessRes(binary) {
  return _decodematchScuessRes(wrapByteBuffer(binary));
}

function _decodematchScuessRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // optional string nickName = 2;
      case 2: {
        message.nickName = readString(bb, readVarint32(bb));
        break;
      }

      // optional string avatarUrl = 3;
      case 3: {
        message.avatarUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool isWxInvite = 4;
      case 4: {
        message.isWxInvite = !!readByte(bb);
        break;
      }

      // required bool isRobote = 5;
      case 5: {
        message.isRobote = !!readByte(bb);
        break;
      }

      // optional roboteDataStruct roboteBaseData = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.roboteBaseData = _decoderoboteDataStruct(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.isRobote === undefined)
    throw new Error("Missing required field: isRobote");

  return message;
}

export function encodemathReadyReq(message) {
  let bb = popByteBuffer();
  _encodemathReadyReq(message, bb);
  return toUint8Array(bb);
}

function _encodemathReadyReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required bool isReady = 2;
  let $isReady = message.isReady;
  if ($isReady !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $isReady ? 1 : 0);
  }
}

export function decodemathReadyReq(binary) {
  return _decodemathReadyReq(wrapByteBuffer(binary));
}

function _decodemathReadyReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required bool isReady = 2;
      case 2: {
        message.isReady = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.isReady === undefined)
    throw new Error("Missing required field: isReady");

  return message;
}

export function encodemathReadyRes(message) {
  let bb = popByteBuffer();
  _encodemathReadyRes(message, bb);
  return toUint8Array(bb);
}

function _encodemathReadyRes(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required bool isReady = 2;
  let $isReady = message.isReady;
  if ($isReady !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $isReady ? 1 : 0);
  }
}

export function decodemathReadyRes(binary) {
  return _decodemathReadyRes(wrapByteBuffer(binary));
}

function _decodemathReadyRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required bool isReady = 2;
      case 2: {
        message.isReady = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.isReady === undefined)
    throw new Error("Missing required field: isReady");

  return message;
}

export function encodeinviteRePlayReq(message) {
  let bb = popByteBuffer();
  _encodeinviteRePlayReq(message, bb);
  return toUint8Array(bb);
}

function _encodeinviteRePlayReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required string inviteKey = 2;
  let $inviteKey = message.inviteKey;
  if ($inviteKey !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $inviteKey);
  }

  // required bool invite = 3;
  let $invite = message.invite;
  if ($invite !== undefined) {
    writeVarint32(bb, 24);
    writeByte(bb, $invite ? 1 : 0);
  }
}

export function decodeinviteRePlayReq(binary) {
  return _decodeinviteRePlayReq(wrapByteBuffer(binary));
}

function _decodeinviteRePlayReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required string inviteKey = 2;
      case 2: {
        message.inviteKey = readString(bb, readVarint32(bb));
        break;
      }

      // required bool invite = 3;
      case 3: {
        message.invite = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.inviteKey === undefined)
    throw new Error("Missing required field: inviteKey");

  if (message.invite === undefined)
    throw new Error("Missing required field: invite");

  return message;
}

export function encodeinviteRePlayRes(message) {
  let bb = popByteBuffer();
  _encodeinviteRePlayRes(message, bb);
  return toUint8Array(bb);
}

function _encodeinviteRePlayRes(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required bool invite = 2;
  let $invite = message.invite;
  if ($invite !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $invite ? 1 : 0);
  }
}

export function decodeinviteRePlayRes(binary) {
  return _decodeinviteRePlayRes(wrapByteBuffer(binary));
}

function _decodeinviteRePlayRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required bool invite = 2;
      case 2: {
        message.invite = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.invite === undefined)
    throw new Error("Missing required field: invite");

  return message;
}

export function encodeinviteFriendReq(message) {
  let bb = popByteBuffer();
  _encodeinviteFriendReq(message, bb);
  return toUint8Array(bb);
}

function _encodeinviteFriendReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // optional string inviteKey = 2;
  let $inviteKey = message.inviteKey;
  if ($inviteKey !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $inviteKey);
  }
}

export function decodeinviteFriendReq(binary) {
  return _decodeinviteFriendReq(wrapByteBuffer(binary));
}

function _decodeinviteFriendReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // optional string inviteKey = 2;
      case 2: {
        message.inviteKey = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  return message;
}

export function encodegetEquipInfoReq(message) {
  let bb = popByteBuffer();
  _encodegetEquipInfoReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetEquipInfoReq(message, bb) {
}

export function decodegetEquipInfoReq(binary) {
  return _decodegetEquipInfoReq(wrapByteBuffer(binary));
}

function _decodegetEquipInfoReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodegetEquipInfoRes(message) {
  let bb = popByteBuffer();
  _encodegetEquipInfoRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetEquipInfoRes(message, bb) {
  // optional map<string, quipConfig> EqiupInfo = 1;
  let map$EqiupInfo = message.EqiupInfo;
  if (map$EqiupInfo !== undefined) {
    for (let key in map$EqiupInfo) {
      let nested = popByteBuffer();
      let value = map$EqiupInfo[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodequipConfig(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 10);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodegetEquipInfoRes(binary) {
  return _decodegetEquipInfoRes(wrapByteBuffer(binary));
}

function _decodegetEquipInfoRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional map<string, quipConfig> EqiupInfo = 1;
      case 1: {
        let values = message.EqiupInfo || (message.EqiupInfo = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              let valueLimit = pushTemporaryLength(bb);
              value = _decodequipConfig(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: EqiupInfo");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodegetSignConfigReq(message) {
  let bb = popByteBuffer();
  _encodegetSignConfigReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetSignConfigReq(message, bb) {
}

export function decodegetSignConfigReq(binary) {
  return _decodegetSignConfigReq(wrapByteBuffer(binary));
}

function _decodegetSignConfigReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodegetSignConfigRes(message) {
  let bb = popByteBuffer();
  _encodegetSignConfigRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetSignConfigRes(message, bb) {
  // repeated signData signConfig = 1;
  let array$signConfig = message.signConfig;
  if (array$signConfig !== undefined) {
    for (let value of array$signConfig) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodesignData(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodegetSignConfigRes(binary) {
  return _decodegetSignConfigRes(wrapByteBuffer(binary));
}

function _decodegetSignConfigRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated signData signConfig = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.signConfig || (message.signConfig = []);
        values.push(_decodesignData(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodesignReq(message) {
  let bb = popByteBuffer();
  _encodesignReq(message, bb);
  return toUint8Array(bb);
}

function _encodesignReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // optional bool isDoubleSign = 2;
  let $isDoubleSign = message.isDoubleSign;
  if ($isDoubleSign !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $isDoubleSign ? 1 : 0);
  }
}

export function decodesignReq(binary) {
  return _decodesignReq(wrapByteBuffer(binary));
}

function _decodesignReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // optional bool isDoubleSign = 2;
      case 2: {
        message.isDoubleSign = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  return message;
}

export function encodegetInviteReworldConfigReq(message) {
  let bb = popByteBuffer();
  _encodegetInviteReworldConfigReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetInviteReworldConfigReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }
}

export function decodegetInviteReworldConfigReq(binary) {
  return _decodegetInviteReworldConfigReq(wrapByteBuffer(binary));
}

function _decodegetInviteReworldConfigReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  return message;
}

export function encodegetInviteReworldConfigRes(message) {
  let bb = popByteBuffer();
  _encodegetInviteReworldConfigRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetInviteReworldConfigRes(message, bb) {
  // repeated InviteReworldData InviteReworldConfig = 1;
  let array$InviteReworldConfig = message.InviteReworldConfig;
  if (array$InviteReworldConfig !== undefined) {
    for (let value of array$InviteReworldConfig) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeInviteReworldData(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated playerData player = 2;
  let array$player = message.player;
  if (array$player !== undefined) {
    for (let value of array$player) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeplayerData(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodegetInviteReworldConfigRes(binary) {
  return _decodegetInviteReworldConfigRes(wrapByteBuffer(binary));
}

function _decodegetInviteReworldConfigRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated InviteReworldData InviteReworldConfig = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.InviteReworldConfig || (message.InviteReworldConfig = []);
        values.push(_decodeInviteReworldData(bb));
        bb.limit = limit;
        break;
      }

      // repeated playerData player = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.player || (message.player = []);
        values.push(_decodeplayerData(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeInviteReworldReq(message) {
  let bb = popByteBuffer();
  _encodeInviteReworldReq(message, bb);
  return toUint8Array(bb);
}

function _encodeInviteReworldReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required int32 getRewarldIndex = 2;
  let $getRewarldIndex = message.getRewarldIndex;
  if ($getRewarldIndex !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($getRewarldIndex));
  }
}

export function decodeInviteReworldReq(binary) {
  return _decodeInviteReworldReq(wrapByteBuffer(binary));
}

function _decodeInviteReworldReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required int32 getRewarldIndex = 2;
      case 2: {
        message.getRewarldIndex = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.getRewarldIndex === undefined)
    throw new Error("Missing required field: getRewarldIndex");

  return message;
}

export function encodegetTryPiFuConfigReq(message) {
  let bb = popByteBuffer();
  _encodegetTryPiFuConfigReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetTryPiFuConfigReq(message, bb) {
}

export function decodegetTryPiFuConfigReq(binary) {
  return _decodegetTryPiFuConfigReq(wrapByteBuffer(binary));
}

function _decodegetTryPiFuConfigReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodegetTryPiFuConfigRes(message) {
  let bb = popByteBuffer();
  _encodegetTryPiFuConfigRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetTryPiFuConfigRes(message, bb) {
  // repeated pifuConfigData pifuConfig = 1;
  let array$pifuConfig = message.pifuConfig;
  if (array$pifuConfig !== undefined) {
    for (let value of array$pifuConfig) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodepifuConfigData(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodegetTryPiFuConfigRes(binary) {
  return _decodegetTryPiFuConfigRes(wrapByteBuffer(binary));
}

function _decodegetTryPiFuConfigRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated pifuConfigData pifuConfig = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.pifuConfig || (message.pifuConfig = []);
        values.push(_decodepifuConfigData(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodetryPiFuReq(message) {
  let bb = popByteBuffer();
  _encodetryPiFuReq(message, bb);
  return toUint8Array(bb);
}

function _encodetryPiFuReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required int32 tryIndex = 2;
  let $tryIndex = message.tryIndex;
  if ($tryIndex !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($tryIndex));
  }
}

export function decodetryPiFuReq(binary) {
  return _decodetryPiFuReq(wrapByteBuffer(binary));
}

function _decodetryPiFuReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required int32 tryIndex = 2;
      case 2: {
        message.tryIndex = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.tryIndex === undefined)
    throw new Error("Missing required field: tryIndex");

  return message;
}

export function encodebuyQuipReq(message) {
  let bb = popByteBuffer();
  _encodebuyQuipReq(message, bb);
  return toUint8Array(bb);
}

function _encodebuyQuipReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // optional int32 quipId = 2;
  let $quipId = message.quipId;
  if ($quipId !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($quipId));
  }

  // required int32 type = 3;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($type));
  }

  // optional string lianColor = 4;
  let $lianColor = message.lianColor;
  if ($lianColor !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $lianColor);
  }

  // optional string piFuColor = 5;
  let $piFuColor = message.piFuColor;
  if ($piFuColor !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $piFuColor);
  }
}

export function decodebuyQuipReq(binary) {
  return _decodebuyQuipReq(wrapByteBuffer(binary));
}

function _decodebuyQuipReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // optional int32 quipId = 2;
      case 2: {
        message.quipId = readVarint32(bb);
        break;
      }

      // required int32 type = 3;
      case 3: {
        message.type = readVarint32(bb);
        break;
      }

      // optional string lianColor = 4;
      case 4: {
        message.lianColor = readString(bb, readVarint32(bb));
        break;
      }

      // optional string piFuColor = 5;
      case 5: {
        message.piFuColor = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.type === undefined)
    throw new Error("Missing required field: type");

  return message;
}

export function encodegetVipReq(message) {
  let bb = popByteBuffer();
  _encodegetVipReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetVipReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required int32 level = 2;
  let $level = message.level;
  if ($level !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($level));
  }
}

export function decodegetVipReq(binary) {
  return _decodegetVipReq(wrapByteBuffer(binary));
}

function _decodegetVipReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required int32 level = 2;
      case 2: {
        message.level = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.level === undefined)
    throw new Error("Missing required field: level");

  return message;
}

export function encodegetGiftReq(message) {
  let bb = popByteBuffer();
  _encodegetGiftReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetGiftReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required int32 selectIndex = 2;
  let $selectIndex = message.selectIndex;
  if ($selectIndex !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($selectIndex));
  }
}

export function decodegetGiftReq(binary) {
  return _decodegetGiftReq(wrapByteBuffer(binary));
}

function _decodegetGiftReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required int32 selectIndex = 2;
      case 2: {
        message.selectIndex = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.selectIndex === undefined)
    throw new Error("Missing required field: selectIndex");

  return message;
}

export function encodegetGiftRes(message) {
  let bb = popByteBuffer();
  _encodegetGiftRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetGiftRes(message, bb) {
  // required int32 type = 1;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($type));
  }

  // optional int32 quipId = 2;
  let $quipId = message.quipId;
  if ($quipId !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($quipId));
  }

  // optional int32 price = 3;
  let $price = message.price;
  if ($price !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($price));
  }

  // optional int32 payType = 4;
  let $payType = message.payType;
  if ($payType !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($payType));
  }

  // required int32 selectIndex = 5;
  let $selectIndex = message.selectIndex;
  if ($selectIndex !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($selectIndex));
  }
}

export function decodegetGiftRes(binary) {
  return _decodegetGiftRes(wrapByteBuffer(binary));
}

function _decodegetGiftRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 type = 1;
      case 1: {
        message.type = readVarint32(bb);
        break;
      }

      // optional int32 quipId = 2;
      case 2: {
        message.quipId = readVarint32(bb);
        break;
      }

      // optional int32 price = 3;
      case 3: {
        message.price = readVarint32(bb);
        break;
      }

      // optional int32 payType = 4;
      case 4: {
        message.payType = readVarint32(bb);
        break;
      }

      // required int32 selectIndex = 5;
      case 5: {
        message.selectIndex = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.type === undefined)
    throw new Error("Missing required field: type");

  if (message.selectIndex === undefined)
    throw new Error("Missing required field: selectIndex");

  return message;
}

export function encodepushMsg(message) {
  let bb = popByteBuffer();
  _encodepushMsg(message, bb);
  return toUint8Array(bb);
}

function _encodepushMsg(message, bb) {
  // optional string msgText = 1;
  let $msgText = message.msgText;
  if ($msgText !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $msgText);
  }

  // optional int32 msgCode = 2;
  let $msgCode = message.msgCode;
  if ($msgCode !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($msgCode));
  }

  // optional string msgExData = 3;
  let $msgExData = message.msgExData;
  if ($msgExData !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $msgExData);
  }
}

export function decodepushMsg(binary) {
  return _decodepushMsg(wrapByteBuffer(binary));
}

function _decodepushMsg(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string msgText = 1;
      case 1: {
        message.msgText = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 msgCode = 2;
      case 2: {
        message.msgCode = readVarint32(bb);
        break;
      }

      // optional string msgExData = 3;
      case 3: {
        message.msgExData = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodegetGetGoldTimesReq(message) {
  let bb = popByteBuffer();
  _encodegetGetGoldTimesReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetGetGoldTimesReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }
}

export function decodegetGetGoldTimesReq(binary) {
  return _decodegetGetGoldTimesReq(wrapByteBuffer(binary));
}

function _decodegetGetGoldTimesReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  return message;
}

export function encodegetGetGoldTimesRes(message) {
  let bb = popByteBuffer();
  _encodegetGetGoldTimesRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetGetGoldTimesRes(message, bb) {
  // required int32 times1 = 1;
  let $times1 = message.times1;
  if ($times1 !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($times1));
  }

  // required int32 times2 = 2;
  let $times2 = message.times2;
  if ($times2 !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($times2));
  }

  // required int32 times3 = 3;
  let $times3 = message.times3;
  if ($times3 !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($times3));
  }

  // required int32 totalTimes1 = 4;
  let $totalTimes1 = message.totalTimes1;
  if ($totalTimes1 !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($totalTimes1));
  }

  // required int32 totalTimes2 = 5;
  let $totalTimes2 = message.totalTimes2;
  if ($totalTimes2 !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($totalTimes2));
  }

  // required int32 totalTimes3 = 6;
  let $totalTimes3 = message.totalTimes3;
  if ($totalTimes3 !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, intToLong($totalTimes3));
  }

  // optional map<string, goldStruct> goldCfg = 7;
  let map$goldCfg = message.goldCfg;
  if (map$goldCfg !== undefined) {
    for (let key in map$goldCfg) {
      let nested = popByteBuffer();
      let value = map$goldCfg[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodegoldStruct(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 58);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodegetGetGoldTimesRes(binary) {
  return _decodegetGetGoldTimesRes(wrapByteBuffer(binary));
}

function _decodegetGetGoldTimesRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 times1 = 1;
      case 1: {
        message.times1 = readVarint32(bb);
        break;
      }

      // required int32 times2 = 2;
      case 2: {
        message.times2 = readVarint32(bb);
        break;
      }

      // required int32 times3 = 3;
      case 3: {
        message.times3 = readVarint32(bb);
        break;
      }

      // required int32 totalTimes1 = 4;
      case 4: {
        message.totalTimes1 = readVarint32(bb);
        break;
      }

      // required int32 totalTimes2 = 5;
      case 5: {
        message.totalTimes2 = readVarint32(bb);
        break;
      }

      // required int32 totalTimes3 = 6;
      case 6: {
        message.totalTimes3 = readVarint32(bb);
        break;
      }

      // optional map<string, goldStruct> goldCfg = 7;
      case 7: {
        let values = message.goldCfg || (message.goldCfg = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              let valueLimit = pushTemporaryLength(bb);
              value = _decodegoldStruct(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: goldCfg");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.times1 === undefined)
    throw new Error("Missing required field: times1");

  if (message.times2 === undefined)
    throw new Error("Missing required field: times2");

  if (message.times3 === undefined)
    throw new Error("Missing required field: times3");

  if (message.totalTimes1 === undefined)
    throw new Error("Missing required field: totalTimes1");

  if (message.totalTimes2 === undefined)
    throw new Error("Missing required field: totalTimes2");

  if (message.totalTimes3 === undefined)
    throw new Error("Missing required field: totalTimes3");

  return message;
}

export function encodegetGoldReq(message) {
  let bb = popByteBuffer();
  _encodegetGoldReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetGoldReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required int32 type = 2;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($type));
  }
}

export function decodegetGoldReq(binary) {
  return _decodegetGoldReq(wrapByteBuffer(binary));
}

function _decodegetGoldReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required int32 type = 2;
      case 2: {
        message.type = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.type === undefined)
    throw new Error("Missing required field: type");

  return message;
}

export function encodegetShareRecordReq(message) {
  let bb = popByteBuffer();
  _encodegetShareRecordReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetShareRecordReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }
}

export function decodegetShareRecordReq(binary) {
  return _decodegetShareRecordReq(wrapByteBuffer(binary));
}

function _decodegetShareRecordReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  return message;
}

export function encodeguangBoReq(message) {
  let bb = popByteBuffer();
  _encodeguangBoReq(message, bb);
  return toUint8Array(bb);
}

function _encodeguangBoReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required string msg = 2;
  let $msg = message.msg;
  if ($msg !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $msg);
  }
}

export function decodeguangBoReq(binary) {
  return _decodeguangBoReq(wrapByteBuffer(binary));
}

function _decodeguangBoReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required string msg = 2;
      case 2: {
        message.msg = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.msg === undefined)
    throw new Error("Missing required field: msg");

  return message;
}

export function encodeguangBoRes(message) {
  let bb = popByteBuffer();
  _encodeguangBoRes(message, bb);
  return toUint8Array(bb);
}

function _encodeguangBoRes(message, bb) {
  // required string nickName = 1;
  let $nickName = message.nickName;
  if ($nickName !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $nickName);
  }

  // required string msg = 2;
  let $msg = message.msg;
  if ($msg !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $msg);
  }
}

export function decodeguangBoRes(binary) {
  return _decodeguangBoRes(wrapByteBuffer(binary));
}

function _decodeguangBoRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string nickName = 1;
      case 1: {
        message.nickName = readString(bb, readVarint32(bb));
        break;
      }

      // required string msg = 2;
      case 2: {
        message.msg = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.nickName === undefined)
    throw new Error("Missing required field: nickName");

  if (message.msg === undefined)
    throw new Error("Missing required field: msg");

  return message;
}

export function encodegetJiFenRoomPlayerReq(message) {
  let bb = popByteBuffer();
  _encodegetJiFenRoomPlayerReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetJiFenRoomPlayerReq(message, bb) {
  // required int32 score = 1;
  let $score = message.score;
  if ($score !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($score));
  }
}

export function decodegetJiFenRoomPlayerReq(binary) {
  return _decodegetJiFenRoomPlayerReq(wrapByteBuffer(binary));
}

function _decodegetJiFenRoomPlayerReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 score = 1;
      case 1: {
        message.score = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.score === undefined)
    throw new Error("Missing required field: score");

  return message;
}

export function encodegetJiFenRoomPlayerRes(message) {
  let bb = popByteBuffer();
  _encodegetJiFenRoomPlayerRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetJiFenRoomPlayerRes(message, bb) {
  // required string nickName = 1;
  let $nickName = message.nickName;
  if ($nickName !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $nickName);
  }

  // required string avatarUrl = 2;
  let $avatarUrl = message.avatarUrl;
  if ($avatarUrl !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $avatarUrl);
  }

  // required string piFuColor = 3;
  let $piFuColor = message.piFuColor;
  if ($piFuColor !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $piFuColor);
  }

  // required string lianColor = 4;
  let $lianColor = message.lianColor;
  if ($lianColor !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $lianColor);
  }

  // optional map<string, quipData> nowQuipId = 5;
  let map$nowQuipId = message.nowQuipId;
  if (map$nowQuipId !== undefined) {
    for (let key in map$nowQuipId) {
      let nested = popByteBuffer();
      let value = map$nowQuipId[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodequipData(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 42);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<string, quipData> haveQuipId = 6;
  let map$haveQuipId = message.haveQuipId;
  if (map$haveQuipId !== undefined) {
    for (let key in map$haveQuipId) {
      let nested = popByteBuffer();
      let value = map$haveQuipId[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodequipData(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 50);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // required float hitBallRandom = 7;
  let $hitBallRandom = message.hitBallRandom;
  if ($hitBallRandom !== undefined) {
    writeVarint32(bb, 61);
    writeFloat(bb, $hitBallRandom);
  }

  // required float kouqiuRandom = 8;
  let $kouqiuRandom = message.kouqiuRandom;
  if ($kouqiuRandom !== undefined) {
    writeVarint32(bb, 69);
    writeFloat(bb, $kouqiuRandom);
  }

  // required int32 score = 9;
  let $score = message.score;
  if ($score !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($score));
  }

  // optional string sayWrolds = 10;
  let $sayWrolds = message.sayWrolds;
  if ($sayWrolds !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $sayWrolds);
  }
}

export function decodegetJiFenRoomPlayerRes(binary) {
  return _decodegetJiFenRoomPlayerRes(wrapByteBuffer(binary));
}

function _decodegetJiFenRoomPlayerRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string nickName = 1;
      case 1: {
        message.nickName = readString(bb, readVarint32(bb));
        break;
      }

      // required string avatarUrl = 2;
      case 2: {
        message.avatarUrl = readString(bb, readVarint32(bb));
        break;
      }

      // required string piFuColor = 3;
      case 3: {
        message.piFuColor = readString(bb, readVarint32(bb));
        break;
      }

      // required string lianColor = 4;
      case 4: {
        message.lianColor = readString(bb, readVarint32(bb));
        break;
      }

      // optional map<string, quipData> nowQuipId = 5;
      case 5: {
        let values = message.nowQuipId || (message.nowQuipId = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              let valueLimit = pushTemporaryLength(bb);
              value = _decodequipData(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: nowQuipId");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional map<string, quipData> haveQuipId = 6;
      case 6: {
        let values = message.haveQuipId || (message.haveQuipId = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              let valueLimit = pushTemporaryLength(bb);
              value = _decodequipData(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: haveQuipId");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // required float hitBallRandom = 7;
      case 7: {
        message.hitBallRandom = readFloat(bb);
        break;
      }

      // required float kouqiuRandom = 8;
      case 8: {
        message.kouqiuRandom = readFloat(bb);
        break;
      }

      // required int32 score = 9;
      case 9: {
        message.score = readVarint32(bb);
        break;
      }

      // optional string sayWrolds = 10;
      case 10: {
        message.sayWrolds = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.nickName === undefined)
    throw new Error("Missing required field: nickName");

  if (message.avatarUrl === undefined)
    throw new Error("Missing required field: avatarUrl");

  if (message.piFuColor === undefined)
    throw new Error("Missing required field: piFuColor");

  if (message.lianColor === undefined)
    throw new Error("Missing required field: lianColor");

  if (message.hitBallRandom === undefined)
    throw new Error("Missing required field: hitBallRandom");

  if (message.kouqiuRandom === undefined)
    throw new Error("Missing required field: kouqiuRandom");

  if (message.score === undefined)
    throw new Error("Missing required field: score");

  return message;
}

export function encodegetTiaoZhanRoomPlayerReq(message) {
  let bb = popByteBuffer();
  _encodegetTiaoZhanRoomPlayerReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetTiaoZhanRoomPlayerReq(message, bb) {
  // required int32 score = 1;
  let $score = message.score;
  if ($score !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($score));
  }
}

export function decodegetTiaoZhanRoomPlayerReq(binary) {
  return _decodegetTiaoZhanRoomPlayerReq(wrapByteBuffer(binary));
}

function _decodegetTiaoZhanRoomPlayerReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 score = 1;
      case 1: {
        message.score = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.score === undefined)
    throw new Error("Missing required field: score");

  return message;
}

export function encodegetTiaoZhanRoomPlayerRes(message) {
  let bb = popByteBuffer();
  _encodegetTiaoZhanRoomPlayerRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetTiaoZhanRoomPlayerRes(message, bb) {
  // required string nickName = 1;
  let $nickName = message.nickName;
  if ($nickName !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $nickName);
  }

  // required string avatarUrl = 2;
  let $avatarUrl = message.avatarUrl;
  if ($avatarUrl !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $avatarUrl);
  }

  // required string piFuColor = 3;
  let $piFuColor = message.piFuColor;
  if ($piFuColor !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $piFuColor);
  }

  // required string lianColor = 4;
  let $lianColor = message.lianColor;
  if ($lianColor !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $lianColor);
  }

  // optional map<string, quipData> nowQuipId = 5;
  let map$nowQuipId = message.nowQuipId;
  if (map$nowQuipId !== undefined) {
    for (let key in map$nowQuipId) {
      let nested = popByteBuffer();
      let value = map$nowQuipId[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodequipData(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 42);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional map<string, quipData> haveQuipId = 6;
  let map$haveQuipId = message.haveQuipId;
  if (map$haveQuipId !== undefined) {
    for (let key in map$haveQuipId) {
      let nested = popByteBuffer();
      let value = map$haveQuipId[key];
      writeVarint32(nested, 10);
      writeString(nested, key);
      writeVarint32(nested, 18);
      let nestedValue = popByteBuffer();
      _encodequipData(value, nestedValue);
      writeVarint32(nested, nestedValue.limit);
      writeByteBuffer(nested, nestedValue);
      pushByteBuffer(nestedValue);
      writeVarint32(bb, 50);
      writeVarint32(bb, nested.offset);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // required float hitBallRandom = 7;
  let $hitBallRandom = message.hitBallRandom;
  if ($hitBallRandom !== undefined) {
    writeVarint32(bb, 61);
    writeFloat(bb, $hitBallRandom);
  }

  // required float kouqiuRandom = 8;
  let $kouqiuRandom = message.kouqiuRandom;
  if ($kouqiuRandom !== undefined) {
    writeVarint32(bb, 69);
    writeFloat(bb, $kouqiuRandom);
  }

  // required int32 score = 9;
  let $score = message.score;
  if ($score !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($score));
  }

  // optional string sayWrolds = 10;
  let $sayWrolds = message.sayWrolds;
  if ($sayWrolds !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $sayWrolds);
  }
}

export function decodegetTiaoZhanRoomPlayerRes(binary) {
  return _decodegetTiaoZhanRoomPlayerRes(wrapByteBuffer(binary));
}

function _decodegetTiaoZhanRoomPlayerRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string nickName = 1;
      case 1: {
        message.nickName = readString(bb, readVarint32(bb));
        break;
      }

      // required string avatarUrl = 2;
      case 2: {
        message.avatarUrl = readString(bb, readVarint32(bb));
        break;
      }

      // required string piFuColor = 3;
      case 3: {
        message.piFuColor = readString(bb, readVarint32(bb));
        break;
      }

      // required string lianColor = 4;
      case 4: {
        message.lianColor = readString(bb, readVarint32(bb));
        break;
      }

      // optional map<string, quipData> nowQuipId = 5;
      case 5: {
        let values = message.nowQuipId || (message.nowQuipId = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              let valueLimit = pushTemporaryLength(bb);
              value = _decodequipData(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: nowQuipId");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // optional map<string, quipData> haveQuipId = 6;
      case 6: {
        let values = message.haveQuipId || (message.haveQuipId = {});
        let outerLimit = pushTemporaryLength(bb);
        let key;
        let value;
        end_of_entry: while (!isAtEnd(bb)) {
          let tag = readVarint32(bb);
          switch (tag >>> 3) {
            case 0:
              break end_of_entry;
            case 1: {
              key = readString(bb, readVarint32(bb));
              break;
            }
            case 2: {
              let valueLimit = pushTemporaryLength(bb);
              value = _decodequipData(bb);
              bb.limit = valueLimit;
              break;
            }
            default:
              skipUnknownField(bb, tag & 7);
          }
        }
        if (key === undefined || value === undefined)
          throw new Error("Invalid data for map: haveQuipId");
        values[key] = value;
        bb.limit = outerLimit;
        break;
      }

      // required float hitBallRandom = 7;
      case 7: {
        message.hitBallRandom = readFloat(bb);
        break;
      }

      // required float kouqiuRandom = 8;
      case 8: {
        message.kouqiuRandom = readFloat(bb);
        break;
      }

      // required int32 score = 9;
      case 9: {
        message.score = readVarint32(bb);
        break;
      }

      // optional string sayWrolds = 10;
      case 10: {
        message.sayWrolds = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.nickName === undefined)
    throw new Error("Missing required field: nickName");

  if (message.avatarUrl === undefined)
    throw new Error("Missing required field: avatarUrl");

  if (message.piFuColor === undefined)
    throw new Error("Missing required field: piFuColor");

  if (message.lianColor === undefined)
    throw new Error("Missing required field: lianColor");

  if (message.hitBallRandom === undefined)
    throw new Error("Missing required field: hitBallRandom");

  if (message.kouqiuRandom === undefined)
    throw new Error("Missing required field: kouqiuRandom");

  if (message.score === undefined)
    throw new Error("Missing required field: score");

  return message;
}

export function encodegetJiFenRoomEndReq(message) {
  let bb = popByteBuffer();
  _encodegetJiFenRoomEndReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetJiFenRoomEndReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required bool isWin = 2;
  let $isWin = message.isWin;
  if ($isWin !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $isWin ? 1 : 0);
  }
}

export function decodegetJiFenRoomEndReq(binary) {
  return _decodegetJiFenRoomEndReq(wrapByteBuffer(binary));
}

function _decodegetJiFenRoomEndReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required bool isWin = 2;
      case 2: {
        message.isWin = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.isWin === undefined)
    throw new Error("Missing required field: isWin");

  return message;
}

export function encodegetJiFenRoomEndRes(message) {
  let bb = popByteBuffer();
  _encodegetJiFenRoomEndRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetJiFenRoomEndRes(message, bb) {
  // required int32 scoreOffSet = 1;
  let $scoreOffSet = message.scoreOffSet;
  if ($scoreOffSet !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($scoreOffSet));
  }

  // required int32 score = 2;
  let $score = message.score;
  if ($score !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($score));
  }
}

export function decodegetJiFenRoomEndRes(binary) {
  return _decodegetJiFenRoomEndRes(wrapByteBuffer(binary));
}

function _decodegetJiFenRoomEndRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 scoreOffSet = 1;
      case 1: {
        message.scoreOffSet = readVarint32(bb);
        break;
      }

      // required int32 score = 2;
      case 2: {
        message.score = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.scoreOffSet === undefined)
    throw new Error("Missing required field: scoreOffSet");

  if (message.score === undefined)
    throw new Error("Missing required field: score");

  return message;
}

export function encodegetTiaoZhanRoomEndReq(message) {
  let bb = popByteBuffer();
  _encodegetTiaoZhanRoomEndReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetTiaoZhanRoomEndReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required int32 score = 2;
  let $score = message.score;
  if ($score !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($score));
  }
}

export function decodegetTiaoZhanRoomEndReq(binary) {
  return _decodegetTiaoZhanRoomEndReq(wrapByteBuffer(binary));
}

function _decodegetTiaoZhanRoomEndReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required int32 score = 2;
      case 2: {
        message.score = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.score === undefined)
    throw new Error("Missing required field: score");

  return message;
}

export function encodegetTiaoZhanRoomEndRes(message) {
  let bb = popByteBuffer();
  _encodegetTiaoZhanRoomEndRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetTiaoZhanRoomEndRes(message, bb) {
  // required int32 scoreOffSet = 1;
  let $scoreOffSet = message.scoreOffSet;
  if ($scoreOffSet !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($scoreOffSet));
  }

  // required int32 score = 2;
  let $score = message.score;
  if ($score !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($score));
  }
}

export function decodegetTiaoZhanRoomEndRes(binary) {
  return _decodegetTiaoZhanRoomEndRes(wrapByteBuffer(binary));
}

function _decodegetTiaoZhanRoomEndRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 scoreOffSet = 1;
      case 1: {
        message.scoreOffSet = readVarint32(bb);
        break;
      }

      // required int32 score = 2;
      case 2: {
        message.score = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.scoreOffSet === undefined)
    throw new Error("Missing required field: scoreOffSet");

  if (message.score === undefined)
    throw new Error("Missing required field: score");

  return message;
}

export function encoderoboteMatchRoomDismissReq(message) {
  let bb = popByteBuffer();
  _encoderoboteMatchRoomDismissReq(message, bb);
  return toUint8Array(bb);
}

function _encoderoboteMatchRoomDismissReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required int32 rank = 2;
  let $rank = message.rank;
  if ($rank !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($rank));
  }
}

export function decoderoboteMatchRoomDismissReq(binary) {
  return _decoderoboteMatchRoomDismissReq(wrapByteBuffer(binary));
}

function _decoderoboteMatchRoomDismissReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required int32 rank = 2;
      case 2: {
        message.rank = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.rank === undefined)
    throw new Error("Missing required field: rank");

  return message;
}

export function encodegetRankDataReq(message) {
  let bb = popByteBuffer();
  _encodegetRankDataReq(message, bb);
  return toUint8Array(bb);
}

function _encodegetRankDataReq(message, bb) {
  // required string type = 1;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $type);
  }
}

export function decodegetRankDataReq(binary) {
  return _decodegetRankDataReq(wrapByteBuffer(binary));
}

function _decodegetRankDataReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string type = 1;
      case 1: {
        message.type = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.type === undefined)
    throw new Error("Missing required field: type");

  return message;
}

export function encodegetRankDataRes(message) {
  let bb = popByteBuffer();
  _encodegetRankDataRes(message, bb);
  return toUint8Array(bb);
}

function _encodegetRankDataRes(message, bb) {
  // required string type = 1;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $type);
  }

  // repeated playerData data = 2;
  let array$data = message.data;
  if (array$data !== undefined) {
    for (let value of array$data) {
      writeVarint32(bb, 18);
      let nested = popByteBuffer();
      _encodeplayerData(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodegetRankDataRes(binary) {
  return _decodegetRankDataRes(wrapByteBuffer(binary));
}

function _decodegetRankDataRes(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string type = 1;
      case 1: {
        message.type = readString(bb, readVarint32(bb));
        break;
      }

      // repeated playerData data = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        let values = message.data || (message.data = []);
        values.push(_decodeplayerData(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.type === undefined)
    throw new Error("Missing required field: type");

  return message;
}

export function encodeemitPlayerReq(message) {
  let bb = popByteBuffer();
  _encodeemitPlayerReq(message, bb);
  return toUint8Array(bb);
}

function _encodeemitPlayerReq(message, bb) {
  // required int32 uid = 1;
  let $uid = message.uid;
  if ($uid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($uid));
  }

  // required string openId = 2;
  let $openId = message.openId;
  if ($openId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $openId);
  }

  // optional string nickName = 3;
  let $nickName = message.nickName;
  if ($nickName !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $nickName);
  }

  // optional string avatarUrl = 4;
  let $avatarUrl = message.avatarUrl;
  if ($avatarUrl !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $avatarUrl);
  }

  // optional int32 gender = 5;
  let $gender = message.gender;
  if ($gender !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($gender));
  }

  // optional string city = 6;
  let $city = message.city;
  if ($city !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $city);
  }

  // optional string country = 7;
  let $country = message.country;
  if ($country !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $country);
  }

  // optional string province = 8;
  let $province = message.province;
  if ($province !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $province);
  }
}

export function decodeemitPlayerReq(binary) {
  return _decodeemitPlayerReq(wrapByteBuffer(binary));
}

function _decodeemitPlayerReq(bb) {
  let message = {};

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required int32 uid = 1;
      case 1: {
        message.uid = readVarint32(bb);
        break;
      }

      // required string openId = 2;
      case 2: {
        message.openId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string nickName = 3;
      case 3: {
        message.nickName = readString(bb, readVarint32(bb));
        break;
      }

      // optional string avatarUrl = 4;
      case 4: {
        message.avatarUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional int32 gender = 5;
      case 5: {
        message.gender = readVarint32(bb);
        break;
      }

      // optional string city = 6;
      case 6: {
        message.city = readString(bb, readVarint32(bb));
        break;
      }

      // optional string country = 7;
      case 7: {
        message.country = readString(bb, readVarint32(bb));
        break;
      }

      // optional string province = 8;
      case 8: {
        message.province = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.uid === undefined)
    throw new Error("Missing required field: uid");

  if (message.openId === undefined)
    throw new Error("Missing required field: openId");

  return message;
}

function pushTemporaryLength(bb) {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb, type) {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value) {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value) {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value) {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack = [];

function popByteBuffer() {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb) {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes) {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb) {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb, offset) {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb) {
  return bb.offset >= bb.limit;
}

function grow(bb, count) {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb, count) {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb, count) {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb, buffer) {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb, count) {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2, c3, c4, c;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb, text) {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb, buffer) {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb) {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb, value) {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb) {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb, value) {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb, unsigned) {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb, value) {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb) {
  let c = 0;
  let value = 0;
  let b;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb, value) {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb, unsigned) {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb, value) {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb) {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb, value) {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb) {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb, value) {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
