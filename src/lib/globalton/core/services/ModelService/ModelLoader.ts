
import {ModelType, ObjectId, Raw,  RawHash, RequestQueryOptions, QueryPopulateOption} from "../../interfaces/interfaces"
import {Model} from "../../models/Model";
import {ModelService} from "../../services/model.service"
import {Assert} from "../../utils/assert"

export class ModelLoader {

    constructor( private modelService: ModelService) {

    }


    /*
     Loads queried object rawdata into the model instance m
     */
    loadObject<T>(rawdata: Raw, m: T): void {

        for (let key in rawdata) {
            let val = rawdata[key];

            m[key] = val;
        }
    }

    populate(m: Model, populate: QueryPopulateOption | QueryPopulateOption[], source: RawHash): void {

    }

    get<T extends Model>(modelType: ModelType, raw: Raw, source: RawHash, options?: RequestQueryOptions): T {
        Assert.exists(raw, "ModelLoader get has no raw data");
        Assert.exists(modelType, "ModelLoader: get has no modelType");
        let m: T = this.modelService.getInstance<T>(modelType, raw);
        this.modelService.consoleService.load("ModelLoader:get", m);
        return m;
    }
    getAll<T extends Model>(modelType: ModelType, raws: RawHash, source: RawHash, options?: RequestQueryOptions): T[] {
        options = options || {};
        var res: T[] = [];
        for (var i in raws) {
            res.push(this.get<T>(modelType, raws[i], source, options));
        }
        return res;
    }
}