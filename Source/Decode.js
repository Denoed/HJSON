
import Tokenizer from './Tokenizer.js'
import normalize from './Normalize.js'


const { log } = console;


export default function decode(string){
    
    const tokens = normalize(new Tokenizer(string).iterator());
    
    log([ ... tokens ]);
    
    return {};
}