import { Http, Headers } from '@angular/http';
import { ConsoleService } from './console.service';
import { MessageService } from './message.service';
export declare class RequestService {
    private http;
    private consoleService;
    private messageService;
    constructor(http: Http, consoleService: ConsoleService, messageService: MessageService);
    error(f: any, err: any, desc?: string): void;
    success(f: any, data: any): void;
    getWithHeaders(url: string, headers: Headers, f: Function): void;
    get(url: string, f: Function, context: any): void;
}
