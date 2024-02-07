"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "development": {
        "login": [
            { "id": "login", "host": "127.0.0.1", "port": 5000, "HttpPort": 8080, "isNeedDownLoad": true }
        ],
        "center": [
            { "id": "con-0", "host": "127.0.0.1", "port": 6000, "frontend": true, "clientHost": "127.0.0.1", "clientPort": 6010 },
            { "id": "con-1", "host": "127.0.0.1", "port": 6100, "frontend": true, "clientHost": "127.0.0.1", "clientPort": 6110 },
        ],
        "info": [
            { "id": "info-0", "host": "127.0.0.1", "port": 7000 },
            { "id": "info-1", "host": "127.0.0.1", "port": 7100 },
        ],
        "match": [
            { "id": "match-0", "host": "127.0.0.1", "port": 8000 },
        ],
        "game": [
            { "id": "game-0", "host": "127.0.0.1", "port": 9000, "frontend": true, "clientHost": "127.0.0.1", "clientPort": 9010 },
            { "id": "game-1", "host": "127.0.0.1", "port": 9100, "frontend": true, "clientHost": "127.0.0.1", "clientPort": 9110 },
        ],
    },
    "production": {}
};
