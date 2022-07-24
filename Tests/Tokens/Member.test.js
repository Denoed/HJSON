
import { assertSameTokens , test } from 'TokenTest';


const hjson = 
`{
    member : 'String Value'
}`;


const tokens = [{
    type : 'ObjectStart'
},{
    type : 'Newline'
},{
    type : 'Space' ,
    value : '    '
},{
    type : 'Member' ,
    value : 'member'
},{
    type : 'Space' ,
    value : ' '
},{
    type : 'Colon'
},{
    type : 'Space' ,
    value : ' '
},{
    type : 'SingleString' ,
    value : 'String Value'
},{
    type : 'Newline'
},{
    type : 'ObjectEnd'
}];


test('Simple member',() => {
    
    assertSameTokens(hjson,tokens);

})