
const { log } = console;


export default function * normalize(tokens){

    yield * 
        forwardCombine(
        prepareQuotedString(
        prepareMultiLines(
        prepareMultiStrings(
        dropComments(
            tokens
        )))));
}


function * dropComments(tokens){
    for(const token of tokens)
        if(![ 'MultiComment' , 'Comment' ].includes(token.type))
            yield token;
}


function * select(tokens,tokenType,callback){
    for(const token of tokens)
        yield (token.type === tokenType)
            ? callback(token.value)
            : token ;
}

function * prepareMultiLines(tokens){
    yield * select(tokens,'MultiLine',(value) => {
        
        const indent = value
            .match(/^[\s]*/)[0]
            .length;
            
        value = value
            .trim()
            .slice(3,-3)
            
        return {
            type : 'String' ,
            value
        }
    })
}

function * prepareMultiStrings(tokens){
    yield * select(tokens,'MultiString',(value) => {
        
        const indent = value
            .match(/^[\s]*/)[0]
            .length;
            
        const detent = new RegExp(`^\\s{1,${ indent }}`,'gm');
            
        value = value
            .trim()
            .slice(3,-3)
            .replace(/^[^\S\n]*\n/,'')
            .replace(/\n[^\S\n]*$/,'')
            .replace(detent,'')
            
        return {
            type : 'String' ,
            value
        }
    })
}

function * prepareQuotedString(tokens){
    for(const token of tokens)
        yield ([ 'SingleString' , 'DoubleString' ].includes(token.type))
            ? { type : 'String' , value : token.value.slice(1,-1) }
            : (token.type === 'Quoteless')
            ? { type : 'String' , value : token.value.trim() }
            : token ;
}


function * forwardCombine(tokens){
    
    let before = tokens.next();
    
    while (!before.done) {
        
        let now = tokens.next();
        
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
            
            if(
                nowType === 'Member'
            ){
                now = { value : { type : 'String' , value : now.value.value } }
            }
            
            break;

        case 'ObjectStart' :
        case 'ArrayStart' :
        
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
                before = { value : { type : 'Comma' } }
                continue;
            }
            
            break;
        case 'Space' :
        
            if(
                nowType === 'Space'
            ) continue;
            
            if(
                nowType === 'Newline'
            ){
                before = { value : { type : 'Newline' } }
                continue;
            }
            
            if(
                nowType === 'Colon'
            ){
                before = { value : { type : 'Colon' } }
                continue;
            }
            
            break;
        case 'String':
        
            if(
                nowType === 'Colon'
            ){
                before = { value : { type : 'Member' , value : before.value.value } }
            }
        
            break;
        case 'Member':
            
            if(
                nowType === 'Space'
            ) continue;
        
            if(
                nowType !== 'Colon'
            ){
                before = { value : { type : 'String' , value : before.value.value } }
            }
        }
        
        yield before.value;
        before = now;
    }
    
    if(!before.done)
        yield before.value;
}
