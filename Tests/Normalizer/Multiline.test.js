
import { assertSameTokens , test } from 'NormalizerTest';


const hjson = 
`{
    multi :
    
        '''
        
         this is 
        
    a 
        
        multiline string
        '''
}`;


const tokens = [{
    type : 'ObjectStart'
},{
    type : 'Word' ,
    value : 'multi'
},{
    type : 'Colon'
},{
    type : 'Multiline' ,
    value : '\n this is \n\na \n\nmultiline string'
},{
    type : 'Newline'
},{
    type : 'ObjectEnd'
}];


test('Simple member',() => {
    
    assertSameTokens(hjson,tokens);

})