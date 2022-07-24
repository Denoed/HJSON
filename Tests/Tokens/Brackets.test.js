
import { assertSameTokens , test } from 'TokenTest';


const hjson = '{}';


const tokens = [];


test('Optional outer brackets',() => {
    
    
    assertSameTokens(hjson,tokens);

})
