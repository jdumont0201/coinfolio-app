import { EventEmitter } from "@angular/core";
export declare class OptionsBarItem {
    text: string;
    icon: string;
    link: any[];
    popup: number;
    constructor(text: string, icon: string, link: any[], popup?: number);
}
export declare class OptionsBarConfig {
    options: OptionsBarItem[];
    constructor(options: OptionsBarItem[]);
}
export declare class OptionsBarService {
    optionsChanged: EventEmitter<any>;
    options: OptionsBarConfig;
    constructor();
    setByPagename(pagename: string): void;
    setOptions(o: OptionsBarConfig): void;
    ngOnDestroy(): void;
}
