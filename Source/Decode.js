
import Tokenizer from './Tokenizer.js'
import normalize from './Normalize.js'


const { log } = console;


export default function decode(string){
    
    log([ ... normalize(new Tokenizer(string).iterator()) ]);
    
    const tokens = normalize(new Tokenizer(string).iterator());
    
    // log([ ... tokens ]);
    
    const state = {
        tokens : tokens ,
        object : {}
    }
    
    object(state);
    
    return state.object;
}


function object(state){
    
    log('\nObject\n')
    
    const { object , tokens } = state;
            
    
    while(true){
        
        const token = tokens.next();
        
        if(token.done)
            return;
            
        switch(token.value.type){
        case 'ObjectEnd' :
            return;
        case 'Word' :
            member({
                parent : object ,
                tokens : tokens ,
                key : token.value.value
            });
            break;
        default:
            throw `Invalid Object Token ${ token.value.type }`;
        }
    }
}

function member(state){
    
    log('\nMember\n')
    
    const { tokens , parent , key } = state;
    
    while(true){
        
        const token = tokens.next();
        
        if(token.done)
            throw 'Missing Member Colon';
        
        const { type } = token.value;
        
        if(type === 'Colon')
            break;
            
        switch(type){
        default:
            throw `Invalid Member Seperator Token ${ token.value.type }`;
        }
    }
    
    while(true){
        
        const token = tokens.next();
        
        if(token.done)
            throw 'Missing Member Value';
        
        const { type } = token.value;
        
        if([ 'Multiline' , 'Word' ].includes(type)){
            
            const { value } = token.value;
            
            parent[key] = value;
            
            break;
        }
        
        if(type === 'ObjectStart'){
            
            const s = {
                tokens : tokens ,
                object : {}
            }
            
            object(s);
            
            const { value } = token.value;
            
            parent[key] = s.object;
            
            break;
        }
        
        if(type === 'ArrayStart'){
            
            const s = {
                tokens : tokens ,
                array : []
            }
            
            array(s);
            
            const { value } = token.value;
            
            parent[key] = s.array;
            
            break;
        }
        
        switch(type){
        default:
            throw `Invalid Member Value Token ${ token.value.type }`;
        }
    }
    
    while(true){
        
        const token = tokens.next();
        
        if(token.done)
            throw 'Missing Member End';
        
        const { type } = token.value;
        
        switch(type){
        case 'Comma' :
        case 'Newline' :
            return;
        default:
            throw `Invalid Member End Token ${ token.value.type }`;
        }
    }
}


function array(state){
    
    log('\nArray\n')

    const { array , tokens } = state;
            

    let was

    while(true){
        
        while(true){
            
            const token = tokens.next();
            
            if(token.done)
                return;
                
            const { type } = token.value;
        
            if(type === 'Word'){
                array.push(token.value.value);
                break;
            }
            
            if(type === 'ObjectStart'){
                
                const s = {
                    tokens : tokens ,
                    object : {}
                }
                
                object(s);
                
                const { value } = token.value;
                
                array.push(s.object);
                
                break;
            }
            
            if(type === 'ArrayStart'){
                
                const s = {
                    tokens : tokens ,
                    array : []
                }
                
                array(s);
                
                const { value } = token.value;
                
                array.push(s.array);
                
                break;
            }
        
            switch(type){
            case 'ArrayEnd' :
                return;
            case 'Newline' :
                break;
            default:
                throw `Invalid Array Value Token ${ token.value.type }`;
            }
        }
        
        while(true){
            
            const token = tokens.next();
            
            if(token.done)
                return;
                
            const { type  } = token.value;
        
            if(type === 'Comma')
                break;
        
            switch(type){
            case 'ArrayEnd' :
                return;
            case 'Newline' :
                break;
            default:
                throw `Invalid Array Seperator Token ${ token.value.type }`;
            }
        }
    }
}