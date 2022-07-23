
const raw = `{
    captureWave : 10
    difficulty : 3
    planet : pluto
    sector : 3
    name : lab
    
    research : {
        
        parent : nuclearFacility
        
        objectives: [{
            preset : nuclearFacility
            type : SectorComplete
        }],
        
        name :
        
        '''
        
        testing 'wow'
        
        '''
    }
}


`

const model = {
    captureWave : 10 ,
    difficulty : 3 ,
    planet : 'pluto' ,
    sector : 3 ,
    name : 'lab' ,
    
    research : {
        
        name : '\ntesting \'wow\'\n' ,
        
        parent : 'nuclearFacility' ,
        
        objectives: [{
            preset : 'nuclearFacility' ,
            type : 'SectorComplete'
        }]
    }
}


import { assertEquals } from 'Assert';
// import { parse } from '../Source/mod.ts'
import HJSON from '../Source/mod.ts'


Deno.test('Generic Parsing Test',() => {

    const parsed = HJSON.parse(raw);

    assertEquals(parsed,model);
});