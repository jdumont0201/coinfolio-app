import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';

import {QueueingSubject} from 'queueing-subject'
import websocketConnect from 'rxjs-websockets'
import {ConsoleService} from "./console.service";
import {EventService} from "../../../localton/services/event.service";
import * as socketio from "socket.io-client"

export class Socket {
    subscription;
    connectionSubscription;
    messages;
    connectionStatus;
    active: boolean
    status: string;
    lastMessage;

    socketiosocket
    simpleWS;

    constructor(public url: string, public id: string, public  f: Function, public method: string,public consoleService:ConsoleService) {
        if (method == "socketio") {

        } else if (method == "simple") {

        } else {
            const {messages, connectionStatus} = websocketConnect(url, new QueueingSubject<string>(), "echo-protocol")
            this.messages = messages;
            this.connectionStatus = connectionStatus;
        }
        this.status = "defined"
    }

    listen() {
        this.consoleService.websocket("LISTEN");
        if (this.method == "socketio") {
            this.socketiosocket = socketio(this.url);
            this.socketiosocket.on("m", (m) => {
                this.onMessage(m, false)
            })
        } else if (this.method == "simple") {
            this.simpleWS = new WebSocket(this.url);
            this.simpleWS.onopen = function (evt) {
                console.log("open", evt);
                return false;
            };
            this.simpleWS.onclose = function (evt) {
                console.log("close", evt);
            };
            this.simpleWS.onmessage = (evt) => {
                this.onMessage(evt.data, true);
                return false;
            };
            this.simpleWS.onerror = function (evt) {
                console.log("err", evt);
            };
        } else {
            this.connectionSubscription = this.connectionStatus.subscribe(numberConnected => {
                console.log('number of connected websockets:', numberConnected)
            })
            this.subscription = this.messages.subscribe((message: string) => {
                this.onMessage(message, true)
            })
        }

        this.enable()

    }

    onMessage(message: string, parse: boolean) {
        //console.log("mmmsg",message);
        if (!message) return;
        this.lastMessage = new Date().getTime()
        if (this.active) {
            let m
            if (parse)
                m = JSON.parse(message)
            else
                m = message
            if("wsConnected" in m) return;
            this.f(m)
        } else {
            this.status = "disabled but running"
            this.close()
        }
    }

    enable() {
        this.active = true;
        this.status = "activated"
    }

    disable() {
        this.active = false;
        this.status = "disabled"
    }

    close() {
        this.disable()
        this.consoleService.websocket(this.id, "closing");
        if (this.method == "simple") {
            this.simpleWS.onclose = function () {
            }; // disable onclose handler first
            this.simpleWS.close()
        } else {


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
}

@Injectable()
export class WebsocketService {
    isRunning = true;
    private sockets: { [id: string]: Socket } = {}

    constructor(public consoleService: ConsoleService, public eventService: EventService) {

    }

    getSockets() {
        return this.sockets
    }

    getSocket(id) {
        return this.sockets[id]
    }

    create(id, url, f, method) {
        if (!(id in this.sockets)) {
            this.eventService.defineNewSocket(id)
            this.consoleService.websocket("create", id, url)
            this.sockets            [id] = new Socket(url, id, f, method,this.consoleService)
            this.sockets            [id].listen()
        } else {
            if (this.sockets[id].active) {
                this.consoleService.websocket("create", id, "but already active")
            } else {
                this.sockets[id].close()
                this.consoleService.websocket("create", id, "but already existing")
                this.sockets            [id] = new Socket(url, id, f, method,this.consoleService)

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