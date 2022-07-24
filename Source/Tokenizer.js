
const { iterator } = Symbol


const tokens = [
    
    [ 'ObjectStart'  , /^\{/ ] ,
    [ 'ObjectEnd'    , /^\}/ ] ,
    
    [ 'ArrayStart'   , /^\[/ ] ,
    [ 'ArrayEnd'     , /^\]/ ] ,
    
    [ 'Comma'        , /^,/ ] ,
    [ 'Colon'        , /^:/ ] ,
    
    [ 'Newline'      , /^\r?\n/ ] ,
    [ 'Space'        , /^[\s]+/ , 0 ] ,
        
    [ 'MultiString'  , /^'''([\s\S]*?)'''/u , 1 ] ,
    [ 'MultiComment' , /^\/\*([\s\S]*?)\*\//u ] ,
    [ 'SingleString' , /^'(([^\\]|(\\["'\\/bfnrt])|(\\u\d{4}))*?)'/ , 1 ] ,
    [ 'DoubleString' , /^"(([^\\]|(\\["'\\/bfnrt])|(\\u\d{4}))*?)"/ , 1 ] ,
    [ 'Comment'      , /^(#)|(\/\/)([^\n]*)/u ] ,
    [ 'Member'       , /^[^\s,:\[\]\{\}][^\s]*/ , 0 ] ,
    [ 'Quoteless'    , /^[^\s,:\[\]\{\}][^\n]*/ , 0 ]
]


export default class Tokenizer {

    #position = 0;
    #string;
    
    constructor(string){
        this.#string = string
            .trim();
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
        
        for(const [ type , regex , match ] of tokens)
            if(regex.test(string)){
                
                const found = string.match(regex);
                
                console.log(type,found);
                
                this.#string = string.substring(found[0].length);
                
                const token = { type };
                
                if(match != null)
                    token.value = found[match];
                
                return token;
            }
                
        throw `No Token Found for '${ string }'`;
    }
}