
import decode from './Decode.js'


export function parse ( text : string ) : object {
    return decode(text);
}

export default { parse }