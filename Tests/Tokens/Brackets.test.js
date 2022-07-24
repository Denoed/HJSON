
import { assertSameTokens , test } from 'TokenTest';


const hjson = '{}';


const tokens = [{
    type : 'ObjectStart'
},{
    type : 'ObjectEnd'
}];


test('Optional outer brackets',() => {
    
    
    assertSameTokens(hjson,tokens);

})
