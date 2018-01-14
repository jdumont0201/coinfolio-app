 * ngIf;
"authService?.isAuthenticated()" >
    -toolbar >
    Settings < /h3>
    < /mat-toolbar>
    < mat - tab - group(selectedTabChange);
"tabChanged($event)" >
    -tab;
label = "Profile" >
    E - mail;
{
    {
        user ? .email : ;
    }
}
userId;
{
    {
        user ? .id : ;
    }
}
mat - button(click);
"logout()" > Sign;
off < /button>
    < /mat-tab>
    < mat - tab;
label = "Subscription" > Premium;
expires;
on;
{
    {
        user ? .currentPaymentExpiration | date : "medium";
    }
}
/mat-tab>
    < mat - tab;
label = "Interface" > Language;
en_US < /mat-tab>
    < mat - tab;
label = "Favorites" > Favorite;
cryptos
    < /mat-tab>
    < mat - tab;
label = "Broker connections" >
    (function () {
        function class_1() {
        }
        return class_1;
    }());
"padded" * ngIf;
"tabIndex==4" >
    -broker - connections > /app-broker-connections>
    < /div>
    < /mat-tab>
    < mat - tab;
label = "Latest imports" >
    Date < /td>
    < td > Import;
type < /td>
    < td > Lines < /td>
    < /thead>
    < tbody >
     * ngFor;
"let i of imports";
var default_1 = (function () {
    function default_1() {
    }
    return default_1;
}());
"import-line" >
    {};
{
    i.ts * 1000 | date;
    "medium";
}
/td>
    < td > {};
{
    i.code;
}
/td>
    < td > {};
{
    i.nlines;
}
/td>
    < /tr>
    < /tbody>
    < /table>
    < /mat-tab>
    < /mat-tab-group>
    < /div>
    < div * ngIf;
"!authService?.isAuthenticated()";
var default_2 = (function () {
    function default_2() {
    }
    return default_2;
}());
"padded" >
    -login[popup];
"false" > /app-login>
    < /div>;
