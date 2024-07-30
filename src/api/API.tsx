

export default class API {
    host: string;
    port: string;

    constructor(host: string = 'http://localhost', port: string = '3000') {
        this.host = host;
        this.port = port;
    }

    public async validateUser() {
        const response = await fetch(this.host + ':' + this.port + '/verifyUser', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("gamehubtoken")
            }
        });
        const responseJSON = await response.json();
        return responseJSON;
    }

    public async loginUser({ email, password }) {
        const response = await fetch(this.host + ':' + this.port + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        let responseJSON = await response.json();
        return responseJSON;
    }

    public async registerUser({ email, password }) {
        const response = await fetch(this.host + ':' + this.port + '/registrate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        let responseJSON = await response.json();
        return responseJSON;
    }
}