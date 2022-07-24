
import { assertSameTokens , test } from 'NormalizerTest';


const hjson = 
`{
    member : 'String Value'
    
    
    other : 333.3
}`;


const tokens = [{
    type : 'Member' ,
    value : 'member'
},{
    type : 'Colon'
},{
    type : 'String' ,
    value : 'String Value'
},{
    type : 'Newline'
},{
    type : 'Member' ,
    value : 'other'
},{
    type : 'Colon'
},{
    type : 'String' ,
    value : '333.3'
}];


test('2 members',() => {
    
    assertSameTokens(hjson,tokens);

})