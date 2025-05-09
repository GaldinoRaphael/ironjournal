import Login from "../../Login";
import Register from "../../Register";
import HttpServer from "../http/HttpServer";

export default class AuthController {

    static config(httpServer: HttpServer, register: Register, login: Login){
        httpServer.route('post', '/register', async (params: any, body: any) => {
            const input = body;
            const output = await register.execute(input);
            return output;
        })
        
        httpServer.route('post', '/login', async (params: any, body: any) => {
            const input = body;
            const output = await login.execute(input);
            return output;
        })
    }
}