import {ISite} from "../../interfaces/ISite";

export interface ISiteService{
    createSite(request:ISite):Promise<ISite>;
    getAllSite():Promise<ISite[]>;
    getSiteById(id:String):Promise<ISite | Object>;
    updateSite(id:String,product:ISite):Promise<ISite | Object>;
    deleteSite(id:String):Promise<ISite | Object>;
}
