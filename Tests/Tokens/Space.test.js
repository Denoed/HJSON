
import { assertSameTokens , test } from 'TokenTest';


const spaces = {
    zero_no_break : '﻿' ,
    ideographic : '　' ,
    punctuation : ' ' ,
    no_break : ' ' ,
    figure : ' ' ,
    narrow : ' ' ,
    medium : ' ' ,
    space : ' ' ,
    three : ' ' ,
    thin : ' ' ,
    four : ' ' ,
    hair : ' ' ,
    six : ' ' ,
    em : ' ' ,
    en : ' '
}
    

const hjson = Object
    .values(spaces)
    .join('');
    

const tokens = [{
    type : 'Space' ,
    value : hjson
}];

test('String made of whitespace',() => {
    
    assertSameTokens(hjson,tokens);

})