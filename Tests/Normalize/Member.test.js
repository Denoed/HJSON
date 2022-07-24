
import { assertSameTokens , test } from 'NormalizerTest';


const hjson = 
`{
    member : 'String Value'
}`;


const tokens = [{
    type : 'Member' ,
    value : 'member'
},{
    type : 'Colon'
},{
    type : 'String' ,
    value : 'String Value'
}];


test('Simple member',() => {
    
    assertSameTokens(hjson,tokens);

})