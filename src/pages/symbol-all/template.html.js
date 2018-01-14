-progress - bar * ngIf;
"isLoading";
mode = "indeterminate" > /mat-progress-bar>
    < mat - toolbar >
    Listing < /h3>
    < /mat-toolbar>
    < div * ngIf;
"!isLoading && listing.length==0" > Configure;
broker;
connections in your;
settings;
to;
show;
broker;
trade;
data. < /div>
    < button(click);
"setGraphView()" > Graph;
view < /button>
    < mat - tab - group(selectedTabChange);
"tabChanged($event)" >
    -tab * ngFor;
"let sup of supports;let index=index";
label = "{{sup}}" >
    -container * ngIf;
"tabIndex==index" > {};
{
    index;
}
-list >
    -container * ngIf;
"showGraphs" >
    (function () {
        function class_1() {
        }
        return class_1;
    }());
"chart-grid" >
    -container * ngFor;
"let s of listing" >
    -container * ngIf;
"s.infra==sup" >
    (function () {
        function class_2() {
        }
        return class_2;
    }());
"chart-grid-item" > -live - price[showTitle];
'true'[pair] = "s.symbol"[period] = "'15m'" > /app-live-price>
    < /div>
    < /ng-container>
    < /ng-container>
    < /div>
    < /ng-container>
    < ng - container * ngIf;
"!showGraphs" >
    -container * ngFor;
"let s of listing" >
    -container * ngIf;
"s.infra==sup" >
    -list - item;
link;
routerLink = "/pair/{{s.symbol}}";
matLine;
mat - list - item;
var default_1 = (function () {
    function default_1() {
    }
    return default_1;
}());
"listing" >
    (function () {
        function class_3() {
        }
        return class_3;
    }());
"marker-in-ptf {{tradingService?.isInPortfolio(s.supra)?'':'marker-hidden'}}" >
    -icon > lens < /mat-icon>
    < /div>
    < div;
var default_2 = (function () {
    function default_2() {
    }
    return default_2;
}());
"listing-row" >
    {};
{
    s.supra;
}
/ {{s.infra}}</div >
    {};
{
    s.price;
}
/div>
    < /div>
    < /mat-list-item>
    < /ng-container>
    < /ng-container>
    < /ng-container>
    < /mat-list>
    < /ng-container>
    < /mat-tab>
    < /mat-tab-group>;
