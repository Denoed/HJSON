
const raw = `{
    some : 3
    variables : [
        with ,
        a
        lot
    ]
    inside : {
        them : 9
    }
}`

const model = {
    some : 3 ,
    variables : [ 'with' , 'a' , 'lot' ] ,
    inside : { them : 9 }
}


import { assertEquals } from 'Assert';
import { parse } from '../Source/mod.ts'


Deno.test('Example Parsing Test',() => {

    const parsed = parse(raw);

    assertEquals(parsed,model);
});