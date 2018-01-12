
import {Injectable, Component, Host, Input, Inject} from '@angular/core';

import {AuthService} from "./auth.service"
declare const FB:any;


export class FacebookService{

    constructor(@Inject(AuthService) public authService:AuthService){
        console.log("+ FacebookService");

    }
    init(){
        FB.init({
            appId      : '1546195959023538',
            xfbml      : true,
            version    : 'v2.6'
        });
    }

    token: any;
    logged: boolean = false;
    user = {  };
    userId:string;
    statusChangeCallback(response: any) {
        if (response.status === 'connected') {
            console.log('connected',response);
        } else {
            this.login();
        }
    }

    login() {
        FB.login((result) =>{
            console.log("login connected",result);
            this.logged = true;

            this.userId=result.authResponse.userID;
            this.token=result.authResponse.accessToken;
            /*this.authService.loginFB(this.userId,this.token,(response)=>{
                if(response.error){

                }else{
                    if(response.success){

                    }else{

                    }
                }
            });ù*/
        }, { scope: 'user_friends' });
    }

    logout() {
        FB.logout((result) =>{

        });
    }

    me() {
        FB.api('/me?fields=id,key,first_name,gender,picture.width(150).height(150),age_range,friends',
            (result)=> {
                if (result && !result.error) {
                    this.user = result;
                    console.log(this.user);
                } else {
                    console.log(result.error);
                }
            });
    }



}
