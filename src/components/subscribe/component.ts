import {
    Component, Input,
    trigger, state, animate, transition, style, OnInit, ElementRef, Injectable, ViewChild
} from '@angular/core';

import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service"
import {FormGroup, FormControl, Validators, FormBuilder, ValidatorFn} from "@angular/forms";
import {Logic} from "../../logic/Logic";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {RequestService} from "../../lib/globalton/core/services/request.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";


import {PasswordValidation} from '../../lib/globalton/core/validators/PasswordValidation';
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {CheckValid} from "../../lib/localton/components/CheckValid/component";

@Component({
    selector: 'app-subscribe',
    templateUrl: 'template.html',

})
@Injectable()
export class AppSubscribeComponent extends CheckValid{
    @Input() popup;
    isPaid: boolean = false;
    bitcoinAddress: string;
    isPlanSelected = false;
    plans: any[];
    hide=true;


    form: FormGroup;
    interval;
    @ViewChild('stepper') stepper;
    planSelected;
    addressExpirationCountdown;
    addressExpirationCountdownSec;
    addressExpirationCountdownMin;

    amount = 0;
    qrcode = "";
    expirationInterval;

    addressExpiration;

    paymentId: string;
    paymentStatus: any;

    retryCheck = 3000;

    constructor(public logic: Logic,public consoleService:ConsoleService, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService) {
        super(consoleService)
        this.logic.getPlans((res) => {
            //if(res.length===0) this.logic.adminInitDB();
            console.log("plans", res);
            this.plans = res;
        })
    }

    close() {
        this.eventService.hideSubscribe()
    }
    startCheckPaymentLoop() {
        console.log("Start loop")
        let isPaymentReceived = false;

        this.interval = window.setInterval(() => {
            if (!this.isPaid)
                this.logic.checkBitcoinPayment(this.paymentId, (res) => {
                    this.paymentStatus = res;
                    this.isPaid = res.payment == "paid";
                    if (this.isPaid) {
                        this.authService.paymentExpiration = res.expiration;
                    }
                    this.stepper.next();
                });
            //setTimeout(()=>{this.retryCheck=2000;setTimeout(()=>{this.retryCheck=1000},1000);setTimeout(()=>{this.retryCheck=0},1000);setTimeout(()=>{this.retryCheck=3000},1000)},1000)
        }, 3000);

    }


    processChoice(p) {
        this.bitcoinAddress = ""
        this.qrcode = ""
        this.amount = 0;
        this.planSelected = p.id;
        this.isPlanSelected = true;
        clearInterval(this.interval);

        this.stepper.next();
        if (this.authService.isAuthenticated())
            this.prePay()

    }

    setCountDown(expiration) {
        this.addressExpiration = expiration;
        clearInterval(this.expirationInterval);
        this.expirationInterval = window.setInterval(() => {
            this.addressExpirationCountdown = -Math.round((new Date().getTime() - this.addressExpiration) / 1000)
            this.addressExpirationCountdownMin = Math.floor(this.addressExpirationCountdown / 60)
            this.addressExpirationCountdownSec = this.addressExpirationCountdown - 60 * this.addressExpirationCountdownMin
        }, 1000);
    }

    loadQRCode() {
        this.qrcode = "bitcoin:" + this.bitcoinAddress + "?amount=" + this.amount;
    }

    returntoplan() {
        console.log("return")
        clearInterval(this.interval);
        this.stepper.previous()
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    ngOnInit() {

        this.form = new FormGroup({
                email: new FormControl('', {
                    validators: [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]
                }),
                password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]}),
                confpassword: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]})
            },PasswordValidation.MatchPassword
        );
    }

    continue() {
        this.eventService.hideSubscribe()
    }

    prePay() {
        this.logic.generateAddress(this.planSelected, (obj) => {
            console.log("generateaddress",obj)
            this.bitcoinAddress = obj.address;
            this.amount = obj.btcamount;
            this.paymentId = obj.paymentId;
            this.setCountDown(obj.expiration);
            this.loadQRCode();
            this.startCheckPaymentLoop();
        })
    }

    /*********************************
     * FORM
     **********************************/
    submit() {
        setTimeout(() => {
            let obj = this.form.value;
            this.logic.registerUser(obj, (res) => {
                if (res.success) {
                    this.stepper.next();
                    this.prePay()
                }
            })
        }, 1000)
    }
}
