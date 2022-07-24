
import { assertSameTokens , test } from 'NormalizerTest';


const hjson = 
`{
    member : 'String Value'
}`;


const tokens = [{
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
    type : 'ObjectEnd'
}];


test('Simple member',() => {
    
    assertSameTokens(hjson,tokens);

})