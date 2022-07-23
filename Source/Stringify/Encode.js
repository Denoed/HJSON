

export default function stringify(object,options = {}){
    
    options.style ??= 'modern';
    
    if(options.style !== 'modern')
        throw 'Unsupported style';
        
    const base = modern(object);
    
    const pretty = base
        .replace(/\[\s+\{/g,'[{')
        .replace(/\}\s+\]/g,'}]')
        .replace(/\}\s*,\s*\{/g,'},{');
        // .replace(//g,`\n$1:\n\n'''`);
        // .replace(/\[\{\s*/g,'[{\n\n');
        
    return [... indent(pretty) ].join('\n');
}

function * indent(pretty){
    
    const lines = pretty.split('\n');
    
    let level = 0;
    let padding = '    ';
    let open = false;
    
    
    for(const line of lines){
        
        const padded = () =>
            padding.repeat(Math.max(level,0)) + line;
            
        const trimmed = line.trim();
        
        if(trimmed.length < 1){
            yield padded();
            continue;
        }
        
        if(trimmed.startsWith(`'''`)){
            
            if(!open)
                level++
            
            yield padded();
            
            if(open)
                level--;
            
            open = !open;
            continue;
        }
            
        if(
            trimmed.startsWith('{') || 
            trimmed.endsWith('{') ||
            trimmed.endsWith('[')
        ){
            yield padded();
            level++;
            continue;
        }
        
        if(
            trimmed.startsWith('}') ||
            trimmed.endsWith('}') ||
            trimmed.endsWith(']')
        ){
            level--;
            yield padded();
            continue;
        }
        
        yield padded();
    }
}


function modern(object){
    
    let lines = toObject(object);
    
    return lines.join('\n');
}

function toItem(item){
    
    switch(typeof item){
    case 'number' :
        return [ `${ item }` ];
    case 'boolean' :
        return [ (item) ? 'true' : 'false' ];
    case 'string' :
        
        if(item.includes('\n'))
            return [ `'''` , item , `'''` ];
            
        if(
            item.startsWith('#') ||
            /[,:\[\]\{\}]/g.test(item)
        ) return [ `'${ item }'`];
        
        return [ `${ item }` ];
    case 'array' :
        return toArray(item);
    case 'object':
        return toObject(item);
    }
}
// 
// function indent(string){
//     return '    ' + string;
// }

function toArray(array){
    
    const lines = [ '[' ];
    
    for(const item of array)
        lines.push(...toItem(item));//.map(indent)
    
    lines.push(']');
    
    return (lines.length === 2)
        ? [ '[]' ]
        : lines ;
}

function toObject(object){
    
    const longestFirst = ([ a ],[ b ]) => b.length - a.length;
    
    const
        entries = Object.entries(object) ,
        simple = entries
            .filter(([ _ , value ]) => [ 'string' , 'number' , 'boolean' ].includes(typeof value))
            .sort(longestFirst)
            .map(formString)
            .flat();
            // .map((string) => '    ' + string);
            
    const complex = entries
        .filter(([ _ , value ]) => [ 'object' , 'array' ].includes(typeof value))
        .sort(longestFirst)
        .map(toComplex)
        .flat();
        // .map((string) => '    ' + string);
        
    complex.shift();
            
    const lines = [ '{' ];
    
    if(simple.length && complex.length)
        lines.push('');
    
    if(simple.length)
        lines.push(...simple);
    
    if(simple.length && complex.length)
        lines.push('');
    
    if(complex.length)
        lines.push(...complex);
    
    lines.push('}');
    
    return (lines.length === 2)
        ? [ '{}' ]
        : lines ;
}

function toComplex([ key , value ]){
    
    if(Array.isArray(value)){
    
        const [ first , ...rest ] = toArray(value);
        
        return [
            '' ,
            `${ toString(key) } : ${ first }`,
            ...rest
        ];
    } else {
        const [ first , ...rest ] = toObject(value);
        
        return [
            '' ,
            `${ toString(key) } : ${ first }`,
            ...rest
        ];
    }
}


function formString([ key , value ]){
    switch(typeof value){
    case 'number' :
        return [ `${ toString(key) } : ${ value }` ];
    case 'boolean' :
        return [ `${ toString(key) } : ${ (value)
            ? ['true']
            : ['false'] }` ]
    case 'string' :
        
        if(value.includes('\n'))
            return [ '' , `${ toString(key) }:` , '' , `'''` , value , `'''` ];
            
        if(
            value.startsWith('#') ||
            /[,:\[\]\{\}]/g.test(value)
        ) return [ `${ toString(key) } : '${ value }'`];
        
        return [ `${ toString(key) } : ${ value }` ];
    }
}

function toString(value){
        
    if(
        value.startsWith('#') ||
        /[,:\[\]\{\}]/g.test(value)
    ) return `'${ value }'`;
    
    return value;
}