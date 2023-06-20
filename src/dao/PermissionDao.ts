import {Logger} from "../loaders/logger";
import {IPermission} from "../interfaces/IPermission";
import Permission from "../models/Permission";
import Order from "../models/Order";

export class PermissionDao{

    private logger = Logger.getInstance();
    public static instance:PermissionDao = null;

    public static getInstance():PermissionDao{
        if(this.instance === null){
            this.instance = new PermissionDao();
        }
        return this.instance;
    }

    public async save(request:IPermission){
        this.logger.info("PermissionDao - save()");
        const permission = new Permission(request);

        // Increment permission ID
        let latestPermission = await Permission.find().sort({ createdAt: -1 }).limit(1);
        if(latestPermission.length > 0){
            permission.permissionId = latestPermission[0].permissionId + 1;
        }else {
            permission.permissionId = 1;
        }
        return await permission.save()
            .then(data=>{
                this.logger.info(`Permission ${data.name} Inserted Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting product" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("PermissionDao - getAll()");
        return await Permission.find({})
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Permission Retrieved Successfully`);
                }else{
                    this.logger.info(`Permission Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving categories" + error.message);
                throw error;
            })
    }

    public async getById(id:String){
        this.logger.info("PermissionDao - getById()");
        return await Permission.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Permission Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Permission ${id} Not Found`)
                    return {msg:"Permission Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving permission ${id} ${error.message}`);
                throw error;
            })
    }

    public async update(id:String,permission:IPermission){
        this.logger.info("PermissionDao - update()");
        return await Permission.findByIdAndUpdate(id,{$set:permission},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Permission Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`Permission ${id} Not Found`);
                    return {msg:"Permission Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating Permission ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id:String){
        this.logger.info("PermissionDao - delete()");
        return await Permission.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Permission Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Permission ${id} Not Found`);
                    return {msg:"Permission Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting Permission ${id} ${error.message}`);
                throw error;
            })
    }
}