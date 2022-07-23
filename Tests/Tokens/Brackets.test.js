
import { assertSameTokens , test } from 'TokenTest';


const hjson = '{}';


const tokens = [{
    type : 'ObjectStart' ,
    value : '{'
},{
    type : 'ObjectEnd' ,
    value : '}'
}];


test('Optional outer brackets',() => {
    
    
    assertSameTokens(hjson,tokens);

})
