
import { assertSameTokens , test } from 'TokenTest';


const hjson = 
`{
    multiline-value : 
        
        '''
        Tes\nting
        
        this
        '''
}`;


const tokens = [{
    type : 'Member' ,
    value : 'multiline-value'
},{
    type : 'Space' ,
    value : ' '
},{
    type : 'Colon'
},{
    type : 'Space' ,
    value : ' '
},{
    type : 'Newline'
},{
    type : 'Space' ,
    value : '        '
},{
    type : 'Newline'
},{
    type : 'MultiString' ,
    value : `        '''\n        Tes\nting\n        \n        this\n        '''`
}];


test('Multiline Member',() => {
    
    assertSameTokens(hjson,tokens);

})