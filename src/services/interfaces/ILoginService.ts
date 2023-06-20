import { ILogin } from '../../interfaces/ILogin';

export interface ILoginService {
    createLogin(newLogin: ILogin): Promise<ILogin>;
    getLogin(email: String): Promise<ILogin | Object>;
    updateLogin(email: String, newLogin: ILogin): Promise<ILogin | Object>;
    deleteLogin(id: String): Promise<ILogin | Object>;
}
