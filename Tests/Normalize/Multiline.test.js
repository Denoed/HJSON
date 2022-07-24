
import { assertSameTokens , test } from 'NormalizerTest';


const hjson = 
`{
    multi :
    
        '''
        
         this is \\n
        
    a 
        
        multiline string
        '''
}`;


const tokens = [{
    type : 'Member' ,
    value : 'multi'
},{
    type : 'Colon'
},{
    type : 'String' ,
    value : '\n this is \\n\n\na \n\nmultiline string'
}];


test('Simple member',() => {
    
    assertSameTokens(hjson,tokens);

})