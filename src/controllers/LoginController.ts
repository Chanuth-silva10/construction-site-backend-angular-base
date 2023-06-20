import config from '../config/config';
import { Logger } from '../loaders/logger';
import { ILoginService } from '../services/interfaces/ILoginService';
import { LoginService } from '../services/LoginService';
import * as autoBind from 'auto-bind';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default class LoginController {
    private logger: Logger;
    private loginService: ILoginService;

    constructor() {
        this.logger = Logger.getInstance();
        this.loginService = LoginService.getInstance();
        autoBind(this);
    }

    public async authenticate(req: any, res:any) {
        this.logger.info('LoginController - authenticate()');

    }

    private sendResponse(res: any, status: Number, token: any, msg: String) {
        res.status(status).send({
            token: token,
            msg: msg
        });
    }
}
