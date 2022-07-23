
import { assertSameTokens , test } from 'TokenTest';


const hjson = 
`{
    member : 'String Value'
}`;


const tokens = [{
    type : 'ObjectStart' ,
    value : '{'
},{
    type : 'Newline' ,
    value : '\n'
},{
    type : 'Space' ,
    value : '    '
},{
    type : 'Word' ,
    value : 'member'
},{
    type : 'Space' ,
    value : ' '
},{
    type : 'Colon' ,
    value : ':'
},{
    type : 'Space' ,
    value : ' '
},{
    type : 'Word' ,
    value : '\'String'
},{
    type : 'Space' ,
    value : ' '
},{
    type : 'Word' ,
    value : 'Value\''
},{
    type : 'Newline' ,
    value : '\n'
},{
    type : 'ObjectEnd' ,
    value : '}'
}];


test('Simple member',() => {
    
    assertSameTokens(hjson,tokens);

})