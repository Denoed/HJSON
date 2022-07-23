
import encode from './Encode.js'


export default function stringify ( value : object , options : object ) : string {
    return encode(value,options);
}