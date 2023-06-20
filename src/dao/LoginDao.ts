import { Logger } from '../loaders/logger';
import { ILogin } from '../interfaces/ILogin';
import Login from '../models/Login';

export class LoginDao {
    private logger = Logger.getInstance();
    public static instance: LoginDao = null;

    public static getInstance(): LoginDao {
        if (this.instance === null) {
            this.instance = new LoginDao();
        }

        return this.instance;
    }

    public async save(newLogin: ILogin) {
        this.logger.info('LoginDao - save()');
        const login = new Login(newLogin);

        return await login.save()
            .then(data => {
                this.logger.info(`Login for ${data.email} Inserted Successfully`);
                return data;
            })
            .catch(error => {
                this.logger.error('Error in inserting login' + error.message);
                throw error;
            });
    }

    public async getById(id: String) {
        this.logger.info('LoginDao - getById()');
        
        return await Login.findById(id)
            .then(data => {
                if (data) {
                    this.logger.info(`${data.email} Login Retrieved Successfully`);
                    return data;
                } else {
                    this.logger.info(`Login ${id} Not Found`);
                    return { msg: 'Login Not Found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error in retrieving login ${id} ${error.message}`);
                throw error;
            });
    }

    public async getByEmail(email: String) {
        this.logger.info('LoginDao - getByEmail()');

        return await Login.findOne({ email: email })
            .then(data => {
                if (data) {
                    this.logger.info(`${data.email} Login Retrieved Successfully`);
                    return data;
                } else {
                    this.logger.info(`Login ${email} Not Found`);
                    return { msg: 'Login Not Found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error in retrieving login ${email} ${error.message}`);
                throw error;
            });
    }

    public async update(id: String, newLogin: ILogin) {
        this.logger.info('LoginDao - update()');

        return await Login.findByIdAndUpdate(id, { $set: newLogin }, { new: true })
            .then(data => {
                if (data) {
                    this.logger.info(`${data.email} Login Updated Successfully`);
                    return data;
                } else {
                    this.logger.info(`Login ${id} Not Found`);
                }
            })
            .catch(error => {
                this.logger.error(`Error in updating login ${id} ${error.message}`);
                throw error;
            });
    }

    public async delete(id: String) {
        this.logger.info('LoginDao - delete()');

        return await Login.findByIdAndDelete(id)
            .then(data => {
                if (data) {
                    this.logger.info(`${data.email} Login Deleted Successfully`);
                    return data;
                } else {
                    this.logger.info(`Login ${id} Not Found`);
                    return { msg: 'Login Not Found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error in deleting login ${id} ${error.message}`);
                throw error;
            })
    }
}
