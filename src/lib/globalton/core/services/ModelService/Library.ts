import {Inject, Injectable, EventEmitter, Output} from "@angular/core"
import {Model} from "../../models/Model";
import {ModelService} from "../../services/model.service";
import {MessageService} from "../../services/message.service";
import {ConsoleService} from "../../services/console.service";
import {ModelType, ObjectId,RawHash, RawGetAllHash,Raw} from "../../interfaces/interfaces"
import {clone, cloneRaw} from "../../utils/utils";


@Injectable()
export  class Library {

    private isLoaded: boolean = false;
    private library: any = {};// { [key: string]: {modelType:ModelType,raw:any,model:Model}} = {};
    private me: any;

    private queue: { [key: string]: { model: Model, options: any } } = {};

    constructor( @Inject(ModelService) private modelService: ModelService,
        private consoleService: ConsoleService,
        private messageService: MessageService) {
        this.consoleService.library("CREATE", this.modelService);
    }
    
    isPreloaded(): boolean {
        return this.isLoaded;
    }
    setPreloaded(): void {
        this.consoleService.library("READY", this.library);
        this.isLoaded = true;
        this.processQueue();
        this.messageService.libraryLoaded.emit({ loaded: true });
    }
    processQueue() {
        this.consoleService.library("PROCESS QUEUE", this.queue);
        for (var id in this.queue) {
            let q = this.queue[id];
            //this.update(q.model, q.options);
            delete this.queue[id];
        }
    }
    getLibrary() {
        return this.library;
    }
    addRaw(raw: Raw, modelType: ModelType) {
        let r: Raw = raw;
        r.modelType = modelType;
        this.library[raw._id] = r;
    }
   
    updateField(id: ObjectId, fieldname: string, val: any): void {
        this.library[id][fieldname] = val;
    }
    
    completeUpdate(raw: Raw,modelType:ModelType, options?: any) {
        if (!this.isLoaded) {
            this.addToQueue(raw, options);
        } else {
            let id: ObjectId = raw._id;
            if (this.isCached(id)) {
                this.consoleService.library("completeUPDATE", raw, options);
                this.library[id] = raw;
                this.library[id].modelType=modelType;
            } else {
                console.log("update not cached add ", raw, "in", this.library)
                this.addRaw(raw,modelType);
            }
        }
    }
    partialUpdateAll(raws:Raw[],modelType:ModelType, options?: any) {
        for(var i=0, n=raws.length;i < n ; ++i){
            this.partialUpdate(raws[i],modelType,options);
        }
    }
    partialUpdateAllWithTimestamp(raws:RawGetAllHash,modelType:ModelType, options?: any) {
        for(var i in raws.main){
            this.partialUpdateWithTimestamp(raws.main[i],modelType,options);
        }
        for(var i in raws.populated){
            this.partialUpdateWithTimestamp(raws.populated[i],modelType,options);
        }
    }
    
    partialUpdateWithTimestamp(raw: Raw,modelType:ModelType, options?: any):void {
        if(typeof raw ==="string") return;
        
        if (!this.isLoaded) {
            this.addToQueue(raw, options);
        } else {
            let id = raw._id;
            if (this.isCached(id)) {
                    //this.consoleService.library("partialUpdateWithTimestamp?");
                    console.log("raw",raw);
                    let ts:number=new Date(raw.updated).getTime();
                    let storedts=new Date(this.library[id].updated).getTime();
                    if(ts>storedts){
                      //  this.consoleService.library("partialUpdateWithTimestamp do");
                        for (let key in raw) {
                            this.updateField(id, key, raw[key]);
                        }
                    }
               } else {
                console.log("update not cached add ", raw, "in", this.library)
                this.addRaw(raw,modelType);
            }     
        }
    }
    
    partialUpdate(raw: Raw,modelType:ModelType, options?: any) {
        if(typeof raw ==="string") return;
        if (!this.isLoaded) {
            this.addToQueue(raw, options);
        } else {
            let id: ObjectId = raw._id;
            if (this.isCached(id)) {
                this.consoleService.library("partial update", raw._id, "current=",this.library[id], "with new=", raw, options);

                for (let key in raw) {
                     this.updateField(id, key, raw[key]);
                }
                            
            }else {
                console.log("update not cached add ", raw, "in", this.library)
                this.addRaw(raw,modelType);
            }
        }
    }
       
        

    
    addToQueue(m: Model, options: any) {
        this.consoleService.library("ADD TO QUEUE", m, options);
        this.queue[m._id] = { model: m, options: options };
    }
  

    isCached(id: ObjectId): boolean {
        return id in this.library;
    }
  
    loadOneRaw<T extends Model>(id: ObjectId, options?: any): Raw {
        if (this.isLoaded) {
            this.consoleService.library("LoadOne", id, (options || {}));
            let r;
            if (this.library[id]) {
                return cloneRaw(this.library[id]); //make copy instead
            }
        } else {
            return null;
        }
    }

    loadAllRaw<T extends Model>(modelType?: ModelType, options?: any): T[]{
        if (this.isLoaded) {
            this.consoleService.library("LOAD ALL", modelType, options, this.library);
            let res: T[] = [];
            for (var id in this.library) {
                let e = this.library[id];
                if (modelType && e.modelType === modelType) {
                    res.push(this.loadOneRaw(id, options));
                }
            };
            return res;
        } else {
            return [];
        }

    }
    getContent() {
        return this.library;
    }


}
