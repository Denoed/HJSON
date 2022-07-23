
import { assertEquals } from 'Assert'
import normalizer from 'Normalize'
import Tokenizer from 'Tokenizer'


export const test = Deno.test;


export function assertSameTokens(hjson,tokens){
    assertEquals(normalize(hjson),tokens);
}

function normalize(hjson){
    return [ ... normalizer(tokenize(hjson)) ];
}

function tokenize(string){
    return new Tokenizer(string).iterator();
}

