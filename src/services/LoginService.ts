import { ILogin } from '../interfaces/ILogin';
import { Logger } from '../loaders/logger';
import { ILoginService } from './interfaces/ILoginService';
import { LoginDao } from '../dao/LoginDao';

export class LoginService implements ILoginService {
    private logger = Logger.getInstance();
    public static instance: LoginService = null;
    private loginDao = LoginDao.getInstance();

    public static getInstance(): LoginService {
        if (this.instance === null) {
            this.instance = new LoginService();
        }

        return this.instance;
    }

    public async createLogin(newLogin: ILogin): Promise<ILogin> {
        this.logger.info('LoginService - createLogin()');

        return await this.loginDao.save(newLogin)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async getLogin(email: String) {
        this.logger.info('LoginService - getLogin()');

        return await this.loginDao.getByEmail(email)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async updateLogin(email: String, newLogin: ILogin) {
        this.logger.info('LoginService - updateLogin()');
        
        return await this.loginDao.update(email, newLogin)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async deleteLogin(email: String) {
        this.logger.info('LoginService - deleteLogin()');

        return await this.loginDao.delete(email)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }
}
