//import { getConfig } from '../config';
export function format(v:number):number {
  //  let precision:number = getConfig('precision');
    let precision=10
    if(precision) {
        return parseFloat(v.toPrecision(precision));
    }
    return v;
}