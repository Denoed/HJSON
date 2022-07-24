
const raw = `
    
    AnArray : [
        10,
        2
        
        3
        
        4,
        
        5
    ]



`

const model = {
    AnArray : [ 10 , 2 , 3 , 4 , 5 ]
}


import { assertEquals } from 'Assert';
import { parse } from '../Source/mod.ts'


Deno.test('Array Parsing Test',() => {

    const parsed = parse(raw);

    assertEquals(parsed,model);
});