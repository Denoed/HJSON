
import decode from './Decode.js'

export function parse ( text : string ) : object {
    return decode(text);
}


import encode from './Stringify/mod.ts'

export function stringify ( value : object , options : object ) : string {
    return encode(value,options);
}


export default { parse , stringify }