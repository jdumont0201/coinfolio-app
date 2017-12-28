import {Injectable, Provider} from '@angular/core'
//import {window} from '@angular/platform-browser/src/facade/browser';
//import {unimplemented} from '@angular/core/src/facade/exceptions';

function _window(): Window {
  return window
}

export abstract class WINDOW {
  get nativeWindow(): Window {
      return null;//unimplemented();
  }
}

export class WindowService extends WINDOW {
    constructor() {
        super();
    }
    get nativeWindow(): Window {
        return _window();
    }
    scrollToTop():void{
        console.log("scroll");
        this.nativeWindow.scrollTo(0,0);
    }
}

