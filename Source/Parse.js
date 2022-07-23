


export default function parse(object){
    
    for(const key in object){
        
        const
            value = object[key] ,
            type = typeof value ;
        
        switch(type){
        case 'string' :
            object[key] = string(value);
            continue;
        case 'array' :
            array(value);
            continue;
        case 'object' :
            parse(value);
            continue;
        default:
            throw `Unparsable Value : ${ type }`;
        }
    }

    return object;
}


const
    is_number = /^-?(([1-9]+[0-9]*)|0)(\.[0-9]+)?(E(-|\+)[0-9]+)?$/i ,
    is_bool = /^(true|false)$/ ;

function string(value){
    
    switch(true){
    case is_bool.test(value):
        return Boolean(value);
    case is_number.test(value):
        return parseFloat(value);
    default:
        if(
            value.startsWith('"') && value.endsWith('"') ||
            value.startsWith("'") && value.endsWith("'")
        ) return value.slice(1,-1);
        
        return value;        
    }
}

function array(value){
    
    
}