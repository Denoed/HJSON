
import { assertSameTokens , test } from 'NormalizerTest';


const hjson = 
`{
    member : 'String Value'
    
    
    other : 333.3
}`;


const tokens = [{
    type : 'ObjectStart'
},{
    type : 'Word' ,
    value : 'member'
},{
    type : 'Colon'
},{
    type : 'Word' ,
    value : '\'String Value\''
},{
    type : 'Newline'
},{
    type : 'Word' ,
    value : 'other'
},{
    type : 'Colon'
},{
    type : 'Word' ,
    value : '333.3'
},{
    type : 'Newline'
},{
    type : 'ObjectEnd'
}];


test('2 members',() => {
    
    assertSameTokens(hjson,tokens);

})