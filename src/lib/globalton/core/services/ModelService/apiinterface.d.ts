import { ConfigService } from '../config.service';
import { RequestQueryOptions, ModelType, ObjectId } from "../../interfaces/interfaces";
export declare class ApiInterface {
    private configService;
    baseurl: string;
    urlprefix: string;
    modelType: ModelType;
    constructor(modelType: ModelType, configService: ConfigService);
    getUrl(id?: string): string;
    buildUrlSuffix(id: ObjectId, options: RequestQueryOptions): string;
}
