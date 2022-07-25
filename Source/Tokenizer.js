
const { iterator } = Symbol


const tokens = [
    
    [ 'ObjectStart'  , /^\{/ ] ,
    [ 'ObjectEnd'    , /^\}/ ] ,
    
    [ 'ArrayStart'   , /^\[/ ] ,
    [ 'ArrayEnd'     , /^\]/ ] ,
    
    [ 'Comma'        , /^,/ ] ,
    [ 'Colon'        , /^:/ ] ,
    
    [ 'Newline'      , /^\r?\n/ ] ,
    
    [ 'String'       , /^-?(([1-9][0-9]*)|0)(.[0-9]+)?(E(\+|-)?[0-9]+)?(?=(\s|,|\]|\}|$))/i , 0 ] ,
    
    [ 'MultiString'  , /^[^\S\n]*'''[\s\S]*?'''/u , 0 ] ,
    [ 'MultiLine'    , /^[^\S\n]*'''[^\n]*?'''/u , 0 ] ,
    [ 'Space'        , /^[^\S\n]+/ , 0 ] ,
        
    [ 'MultiComment' , /^\/\*([\s\S]*?)\*\//u ] ,
    [ 'SingleString' , /^'(([^\\]|(\\["'\\/bfnrt])|(\\u\d{4}))*?)'/ , 0 ] ,
    [ 'DoubleString' , /^"(([^\\]|(\\["'\\/bfnrt])|(\\u\d{4}))*?)"/ , 0 ] ,
    [ 'Comment'      , /^(#)|(\/\/)([^\n]*)/u ] ,
    [ 'Member'       , /^([^\s,:\[\]\{\}]*)[\s]*:/ , 1 ] ,
    [ 'Quoteless'    , /^[^\n,:\[\]\{\}][^\n]*/ , 0 ] ,
]


export default class Tokenizer {

    #position = 0;
    #string;
    
    constructor(string){
        this.#string = string
        .replace(/^[\s]*{?[\s]*/,'')
        .replace(/[\s]*$/,'');
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
                
                this.#string = string.substring(found[match ?? 0].length);
                
                const token = { type };
                
                if(match != null)
                    token.value = found[match];
                
                return token;
            }
                
        throw `No Token Found for '${ string }'`;
    }
}