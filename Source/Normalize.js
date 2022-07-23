

export default function * normalize(tokens){
    yield * reduce(trim(forwardCombine(tokens)));
}


function * trim(tokens){
    
    for(let { type , value } of tokens){
        
        if(type === 'Word')
            value = value.trim();
        
        yield { type , value }
    }
}


function * forwardCombine(tokens){
    
    let before = tokens.next();
    
    while (!before.done) {
        
        const now = tokens.next();
        
        if(now.done)
            break;
        
        const
            nowType = now.value.type ,
            beforeType = before.value.type ;
        
        switch(beforeType){
        case 'Colon' :
        
            if(
                nowType === 'Space' ||
                nowType === 'Newline'
            ) continue;
            
            break;
        case 'Word' :
        
            if(
                nowType === 'Space' ||
                nowType === 'Word'
            ){
                before.value.value += now.value.value;
                continue;
            }
            
            break;
        case 'ObjectStart' :
        
            if(
                nowType === 'Space' ||
                nowType === 'Newline'
            ) continue;
        
            break;
        case 'Newline' :
            
            if(
                nowType === 'Newline' ||
                nowType === 'Space'
            ) continue;
            
            break;
        }
        
        yield before.value;
        before = now;
    }
    
    if(!before.done)
        yield before.value;
}


const complex = [ 'Word' , 'Space' ];

const isSimple = ({ type }) =>
    ! complex.includes(type);

function * reduce(tokens){
    for(const token of tokens)
        yield removeRedundantValues(token);
}

function removeRedundantValues(token){
    
    if(isSimple(token))
        delete token.value;
    
    return token;
}