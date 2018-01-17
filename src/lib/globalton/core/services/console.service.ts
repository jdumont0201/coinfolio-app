import {Injectable} from "@angular/core";

import {ConfigService,ENVIRONMENTS} from "./config.service"

@Injectable()
export class ConsoleService {
    showConsole:boolean=true;
    constructor(
    //    private configService:ConfigService
    ) {
        this.serv("+ ConsoleService");
      /*  if(this.configService.env===ENVIRONMENTS.Prod)
            this.showConsole=false;
        else
            this.showConsole=true;
   */   let u = location.host;
//        if (u.indexOf("app.") > -1 )
  //          this.showConsole=false;

    }
    eventReceived(...arg:any[]) {
        if(this.showConsole){
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c-->", 'padding:2px 5px;border-radius:3px;background: #fff000; color: #0000aa;display:block'    );
            preservedConsoleLog.apply(console, args);
        }
    }
    refresh(...arg:any[]) {
        if(this.showConsole){
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c [REFRESH]", 'padding:2px 5px;border-radius:3px;background: #00ff00; color: #0000aa;display:block'    );
            preservedConsoleLog.apply(console, args);
        }
    }
    eventSent(...arg:any[]) {
        if(this.showConsole){
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c<--", 'padding:2px 5px;border-radius:3px;background: #fff000; color: #0000aa;display:block'    );
            preservedConsoleLog.apply(console, args);
        }
    }
    log(...arg:any[]) {
        if(this.showConsole){
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[LOG]", 'padding:2px 5px;border-radius:3px;background: #fff000; color: #000;display:block'    );
            preservedConsoleLog.apply(console, args);
        }
    }
    constr(s:string) {
        if(this.showConsole) {
            console.log("%c[CONSTR] " + s, 'padding:2px 5px;border-radius:3px;background: #ff0000; color: #000;display:block;');
        }
    }
    //auth(s:string) {
//        console.log("%c[AUTH] "+s, 'padding:2px 5px;border-radius:3px;background: #FF69A9; color: #000;display:block;'    );
    //  }
  cart(s:string) {
    if(this.showConsole) {
      console.log("%c[CART] " + s, 'padding:2px 5px;border-radius:3px;background: #3369A9; color: #000;display:block;');
    }
  }

    auth(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[AUTH]", 'padding:2px 5px;border-radius:3px;background: #FFFFFF; color: #00ffff;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    request(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[REQUEST]", 'padding:2px 5px;border-radius:3px;background: #999999; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    subs(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[SUBS]", 'padding:2px 5px;border-radius:3px;background: #999999; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    config(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[CONFIG]", 'padding:2px 5px;border-radius:3px;background: #999999; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    trade(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[TRADE]", 'padding:2px 5px;border-radius:3px;background: #4444FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    event(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[EVENT]", 'padding:2px 5px;border-radius:3px;background: #cccccc; color: #ff0000;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    serv(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[SERVI]", 'padding:2px 5px;border-radius:3px;background: #69D0FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    translate(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[TRANSLATE]", 'padding:2px 5px;border-radius:3px;background: #444; color: #fff;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    library(...arg:any[]) {
        if(this.showConsole){
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[LIBRARY]", 'padding:2px 5px;border-radius:3px;background: #FFAA00; color: #000;display:block;'    );
            preservedConsoleLog.apply(console, args);
        }

    }
    load(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[LOAD]", 'padding:2px 5px;border-radius:3px;background: #FFF000; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    curr(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[CURRENCY]", 'padding:2px 5px;border-radius:3px;background: #FF00FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    canvas(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[CANVAS]", 'padding:2px 5px;border-radius:3px;background: #666666; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    ws(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[WS]", 'padding:2px 5px;border-radius:3px;background: #dddddd; color: #ffff00;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }websocket(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[WebS]", 'padding:2px 5px;border-radius:3px;background: #dddddd; color: #ffff00;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    post(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[POST]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    }
    patch(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[PATCH]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    }
    api(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[API]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }

    } delete(...arg:any[]) {
    if(this.showConsole) {
        var preservedConsoleLog = console.log;
        var args = Array.prototype.slice.call(arguments);
        args.unshift("%c[DELETE]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
        preservedConsoleLog.apply(console, args);
    }

} put(...arg:any[]) {
    if(this.showConsole) {
        var preservedConsoleLog = console.log;
        var args = Array.prototype.slice.call(arguments);
        args.unshift("%c[PUT]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
        preservedConsoleLog.apply(console, args);
    }
}
  get(...arg:any[]) {
    if(this.showConsole) {
      var preservedConsoleLog = console.log;
      var args = Array.prototype.slice.call(arguments);
      args.unshift("%c[GET]", 'padding:2px 5px;border-radius:3px;background: #CF69FF; color: #000;display:block;');
      preservedConsoleLog.apply(console, args);
    }
  }
  ui(...arg:any[]) {
    if(this.showConsole) {
      var preservedConsoleLog = console.log;
      var args = Array.prototype.slice.call(arguments);
      args.unshift("%c[UI]", 'padding:2px 5px;border-radius:3px;background: #EEBBFF; color: #000;display:block;');
      preservedConsoleLog.apply(console, args);
    }
  }
  emit(...arg:any[]) {
        if(this.showConsole) {
            var preservedConsoleLog = console.log;
            var args = Array.prototype.slice.call(arguments);
            args.unshift("%c[EMIT]", 'padding:2px 5px;border-radius:3px;background: darkgreen; color: #000;display:block;');
            preservedConsoleLog.apply(console, args);
        }
    }

}
