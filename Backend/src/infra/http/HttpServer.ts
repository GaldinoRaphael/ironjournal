import express, {Express, Request, Response} from "express";
import cors from "cors";

export default interface HttpServer{
    route(method: 'post' | 'get' | 'put' | 'delete', url: string, callback: Function): void;
    listen(port: number): void;
}

export class ExpressHttpServer implements HttpServer{
    app: Express;

    constructor(){
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors())
    }

    route(method: 'post' | 'get' | 'put' | 'delete', url: string, callback: Function): void{
        this.app[method](url, async (req: Request, res: Response) => {
            try {
                const output = await callback(req.params, req.body);
                res.json(output);
            } catch (e: any) {
                console.log(e);
                res.status(422).json({
                    error: e.message
                })
            }
        })
    }

    listen(port: number){
        this.app.listen(port);
    }
}