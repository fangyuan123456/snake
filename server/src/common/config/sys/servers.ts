export default {
    "development": {
        "login": [
            { "id": "login", "host": "127.0.0.1", "port": 5102, "HttpPort": 8080 }
        ],
        "center": [
            { "id": "con-0", "host": "127.0.0.1", "port": 5110, "frontend": true, "clientHost": "127.0.0.1", "clientPort": 5120 },
        ],
        "info": [
            { "id": "info-0", "host": "127.0.0.1", "port": 5130 },
        ],
    },
    "production": {

    }
}