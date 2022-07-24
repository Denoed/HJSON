
import { assertEquals } from 'Assert'
import Tokenizer from 'Tokenizer'

const { log } = console;


export const test = Deno.test;


export function assertSameTokens(hjson,tokens){
    
    const parsed = tokenize(hjson);
    
    log(parsed);
    
    assertEquals(parsed,tokens);
}

function tokenize(string){
    return [ ... new Tokenizer(string) ];
}

