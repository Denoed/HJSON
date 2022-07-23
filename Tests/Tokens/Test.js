
import { assertEquals } from 'Assert'
import Tokenizer from 'Tokenizer'


export const test = Deno.test;


export function assertSameTokens(hjson,tokens){
    assertEquals(tokenize(hjson),tokens);
}

function tokenize(string){
    return new Tokenizer(string).tokens();
}

