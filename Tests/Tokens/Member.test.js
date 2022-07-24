
import { assertSameTokens , test } from 'TokenTest';


const hjson = 
`{
    member : 'String Value'
}`;


const tokens = [{
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
    value : '\'String Value\''
}];


test('Simple member',() => {
    
    assertSameTokens(hjson,tokens);

})