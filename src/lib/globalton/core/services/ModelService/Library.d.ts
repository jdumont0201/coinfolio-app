import {Model} from "../../models/Model";
import { ModelService } from "../../services/model.service";
import { MessageService } from "../../services/message.service";
import { ConsoleService } from "../../services/console.service";
import { ModelType, ObjectId, RawHash, RawGetAllHash, Raw } from "../../interfaces/interfaces";
export declare class Library {
    private modelService;
    private consoleService;
    private messageService;
    private isLoaded;
    private library;
    private me;
    private queue;
    constructor(modelService: ModelService, consoleService: ConsoleService, messageService: MessageService);
    isPreloaded(): boolean;
    setPreloaded(): void;
    processQueue(): void;
    getLibrary(): any;
    addRaw(raw: Raw, modelType: ModelType): void;
    updateField(id: ObjectId, fieldname: string, val: any): void;
    completeUpdate(raw: Raw, modelType: ModelType, options?: any): void;
    partialUpdateAll(raws: Raw[], modelType: ModelType, options?: any): void;
    partialUpdateAllWithTimestamp(raws: RawGetAllHash, modelType: ModelType, options?: any): void;
    partialUpdateWithTimestamp(raw: Raw, modelType: ModelType, options?: any): void;
    partialUpdate(raw: Raw, modelType: ModelType, options?: any): void;
    readAssets(A: {
        me: RawHash;
        companies: RawHash;
        positions: RawHash;
        contacts: RawHash;
        publishers: RawHash;
    }): void;
    addToQueue(m: Model, options: any): void;
    isCached(id: ObjectId): boolean;
    loadOneRaw<T extends Model>(id: ObjectId, options?: any): Raw;
    loadAllRaw<T extends Model>(modelType?: ModelType, options?: any): T[];
    getContent(): any;
}
