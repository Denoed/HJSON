
import { assertSameTokens , test } from 'NormalizerTest';


const hjson = '{}';


const tokens = [{
    type : 'ObjectEnd'
}];


test('Optional outer brackets',() => {
    
    assertSameTokens(hjson,tokens);

})
