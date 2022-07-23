
const { iterator } = Symbol


const tokens = prepare({
    '\'\'\'' : 'Multiline' ,
    '[^\\s,:\\[\\]\\{\\}]+' : 'Word' ,
    '[^\\S\\n]+' : 'Space' ,
    '(\\r)?\\n' : 'Newline' ,
    '\\{' : 'ObjectStart' ,
    '\\}' : 'ObjectEnd' ,
    '\\[' : 'ArrayStart' ,
    '\\]' : 'ArrayEnd' ,
    ',' : 'Comma' ,
    ':' : 'Colon'
})


function prepare(tokens){
    return Object
        .entries(tokens)
        .map(toToken);
}

function toToken([ pattern , token ]){
    return [ toRegex(pattern) , token ];
}

function toRegex(pattern){
    return new RegExp(`^(${ pattern })`,'u');
}


export default class Tokenizer {

    #position;
    #string;
    
    constructor(string){
        this.#position = 0;
        this.#string = string;
    }
    
    
    * [iterator](){
        
        while(this.#hasContent())
            yield this.#token();
    }
    
    * iterator(){
        yield * this;
    }
    
    
    #hasContent(){
        return this.#string.length > 0;
    }
    
    #token(){
        
        const string = this.#string
        
        for(const [ regex , type ] of tokens)
            if(regex.test(string)){
                
                const match = string.match(regex);
                
                this.#string = string.substring(match[0].length);
                
                const [ _ , value ] = match;
                
                return { type , value }
            }
                
        throw `No Token Found for '${ string }'`;
    }
}