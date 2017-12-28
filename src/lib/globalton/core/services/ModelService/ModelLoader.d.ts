import { ModelType, ObjectId, Raw, RawHash, RequestQueryOptions, QueryPopulateOption } from "../../interfaces/interfaces";
import {Model} from "../../models/Model";
import { ModelConfig } from "../../services/ModelService/ModelConfig";
import { ModelService } from "../../services/model.service";
export declare class ModelLoader {
    private modelService;
    MODELS: ModelConfig[];
    constructor(MODELS: any, modelService: ModelService);
    POPULABLE_SINGLE_FIELDS: any;
    POPULABLE_ARRAY_FIELDS: any;
    POPULABLE_INNER_ARRAY_FIELD: any;
    loadOneHash(rawdata: {
        [key: string]: any;
    }, modelType: ModelType, options?: any, id?: ObjectId): Model;
    loadObject<T>(rawdata: Raw, m: T): void;
    getPopulatedSingle(path: string, id: ObjectId, source: RawHash, deeperPopulate: QueryPopulateOption, modelType?: ModelType): Model;
    addPopulateDottedPath(m: Model, path: string, a: ObjectId[]): void;
    getToPopulateListFromField(m: Model, path: string): ObjectId[];
    populateDottedPath(m: Model, pop: QueryPopulateOption, source: RawHash): void;
    setFieldToPopulate(m: Model, path: string, source: RawHash, list: ObjectId[] | ObjectId, deeperPopulate: QueryPopulateOption): void;
    populateSingle(m: Model, pop: QueryPopulateOption, source: RawHash): void;
    populate(m: Model, populate: QueryPopulateOption | QueryPopulateOption[], source: RawHash): void;
    get<T extends Model>(modelType: ModelType, raw: Raw, source: RawHash, options?: RequestQueryOptions): T;
    getAll<T extends Model>(modelType: ModelType, raws: RawHash, source: RawHash, options?: RequestQueryOptions): T[];
}
