"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "development": {
        "login": [
            { "id": "login", "host": "127.0.0.1", "port": 5102, "HttpPort": 8080, "isNeedDownLoad": true }
        ],
        "center": [
            { "id": "con-0", "host": "127.0.0.1", "port": 5110, "frontend": true, "clientHost": "127.0.0.1", "clientPort": 5120 },
            { "id": "con-1", "host": "127.0.0.1", "port": 5111, "frontend": true, "clientHost": "127.0.0.1", "clientPort": 5121 },
        ],
        "info": [
            { "id": "info-0", "host": "127.0.0.1", "port": 5130 },
            { "id": "info-1", "host": "127.0.0.1", "port": 5131 },
        ],
        "match": [
            { "id": "match-0", "host": "127.0.0.1", "port": 5140 },
        ],
        "game": [
            { "id": "game-0", "host": "127.0.0.1", "port": 5150 },
            { "id": "game-1", "host": "127.0.0.1", "port": 5151 },
        ],
    },
    "production": {}
};
