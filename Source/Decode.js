
import Tokenizer from './Tokenizer.js'


const { log } = console;


export default function decode(string){
    
    const tokens = new Tokenizer(string).iterator();
    
    
    let process = entry;
    
    let keptToken;
    
    let data = {};
    
    let stack = [{
        method : entry ,
        data : data
    }];
    
    
    
    while(true){
        
        const token = nextToken();
        
        if(token){
            
            log('>',token)
            
            process(token);        
            
            continue;
        }
        
        break;
    }


    function nextToken(){
        
        const token = keptToken 
            ?? tokens.next().value;
            
        keptToken &&= null;
        
        
        return token;
    }

    function entry(token){
                
        switch(token.type){
        case 'ObjectStart' :
        case 'Newline' :
        case 'Space' :
            return;
        default:
        
            stack.push({
                method : object ,
                data : data
            });
            
            process = object;
            
            keptToken = token;
        }
    }
    
    function object(token){
        
        log('Starting Object');
        
        switch(token.type){
        case 'ObjectEnd':
            stack.pop();
            process = stack[stack.length - 1].method;
            return;
        }
    }

    log('Done',data);
    
    return data;
}