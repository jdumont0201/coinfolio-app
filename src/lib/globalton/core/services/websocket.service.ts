import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';

import {QueueingSubject} from 'queueing-subject'
import websocketConnect from 'rxjs-websockets'
import {ConsoleService} from "./console.service";
import {EventService} from "../../../localton/services/event.service";

export class Socket {
    subscription;
    connectionSubscription;
    messages;
    connectionStatus;
    active: boolean
status:string;
lastMessage;
    constructor(public url: string, public id: string, public  f: Function) {
        const {messages, connectionStatus} = websocketConnect(url, new QueueingSubject<string>(),"echo-protocol")
        this.messages = messages;
        this.connectionStatus = connectionStatus;
        this.status="defined"
    }

    listen() {
        this.connectionSubscription = this.connectionStatus.subscribe(numberConnected => {
            console.log('number of connected websockets:', numberConnected)
        })
        this.enable()
        this.subscription = this.messages.subscribe((message: string) => {
            //console.log(this.id, this.active, "new mes")
            this.lastMessage=new Date().getTime()
            if (this.active) {
              //  console.log(this.id, this.active, "new mes passed")
                console.log("message",message)

                const m = JSON.parse(message)
                this.f(m)
            }else{
                this.status="disabled but running"
                this.close()
            }

        })
    }
    enable(){
        this.active = true;
        this.status="activated"
    }
    disable(){
        this.active = false;
        this.status="disabled"
    }
    close() {
        this.disable()
        console.log("webS ",this.id,"closing")
        if (this.subscription) {
            this.subscription.unsubscribe()
        } else {
            console.log("webS no need to close sub")
        }

        if (this.connectionSubscription) {
            this.connectionSubscription.unsubscribe()
        } else {
            console.log("webS no need to close connsub")
        }

    }
}

@Injectable()
export class WebsocketService {
    isRunning=true;
    private sockets: { [id: string]: Socket } = {}

    constructor(public consoleService: ConsoleService,public eventService:EventService) {

    }
    getSockets(){
        return this.sockets
    }
    getSocket(id){
        return this.sockets[id]
    }
    create(id, url, f) {
        if(!(id in this.sockets)){

            this.eventService.defineNewSocket(id)
            this.consoleService.websocket("create", id, url)
            this.sockets            [id] = new Socket(url, id, f)
            this.sockets            [id].listen()
        }else{
            if(this.sockets[id].active){
                this.consoleService.websocket("create",id,"but already active")
            }else{
                this.sockets[id].close()
                this.consoleService.websocket("create",id,"but already existing")
                this.sockets[id].listen()
            }

        }

    }

    close(id) {
        this.consoleService.websocket("close", id)
        if (id in this.sockets)
            this.sockets[id].close();
        else
            this.consoleService.websocket("close but not found", id)

    }

}