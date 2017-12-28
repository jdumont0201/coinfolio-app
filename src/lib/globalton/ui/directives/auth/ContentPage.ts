
import {Component, Injectable, Injector} from '@angular/core';

import {ProtectedPage} from "./ProtectedPage";

@Injectable()
export abstract class ContentPage extends ProtectedPage {
    protected:boolean=false;

}
