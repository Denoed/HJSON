

export default function * normalize(tokens){
    yield * reduce(unwrap(trim(forwardCombine(multilineJoiner(multiline(tokens))))));
}


function * unwrap(tokens){
    
    let a = false
    
    for(const token of tokens)
        if(a)
            yield token;
        else
        if(![ 'Newline' , 'Space' , 'ObjectStart' ].includes(token.type)){
            yield token;
            a = true;
        }
}

function * multilineJoiner(tokens){
    
    for(const token of tokens)
        yield (token.type === 'Multiline')
            ? combineMultiline(token)
            : token ;
}

function combineMultiline(multiline){
    
    const unindent = (match) => 
        match.substring(multiline.indent);
    
    const value = multiline.value
        .map(({ value }) => value)
        .join('')
        .replace(/^[^\S\n]*\n/,'')
        .replace(/\n[^\S\n]*$/,'')
        .replace(/^[^\S\n]+/gm,unindent);
    
    return { type : 'Multiline' , value };
}

function * multiline(tokens){
    
    let before = tokens.next();
    
    if(before.done)
        return;
    
    before = before.value;
    
    let open = false;
    let parts = [];
    let indent = 0;
    
    for(let { type , value } of tokens){
        if(open){
            if(type === 'Multiline'){
                open = false
                yield { type : 'Multiline' , value : parts , indent };
                
                before = null;
                continue;
            } else {
                
                
                parts.push({
                    type , value 
                });
                
                continue;
            }
        } else {
            if(type === 'Multiline'){
                open = true;
                parts = [];
                
                indent = 0;
                
                if(before?.type === 'Space')
                    indent = before.value.length;
                    
                continue;
            } 
        }
        
        if(before)
            yield before;
        
        before = { type , value };
    }
    
    if(before)
        yield before;
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
        case 'Comma' :
        
            if(
                nowType === 'Newline' ||
                nowType === 'Space'
            ) continue;
            
            break;
                
        case 'Newline' :
            
            if(
                nowType === 'Newline' ||
                nowType === 'Space'
            ) continue;
            
            if(
                nowType === 'Comma'
            ){
                before = { type : 'Comma' }
                continue;
            }
            
            break;
        case 'Space' :
        
            if(
                nowType === 'Comma'
            ){
                before = { type : 'Comma' }
                continue;
            }
        }
        
        yield before.value;
        before = now;
    }
    
    if(!before.done)
        yield before.value;
}


const complex = [ 'Word' , 'Space' , 'Multiline' ];

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