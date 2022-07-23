
import { stringify } from '../../Source/mod.ts'

const { log } = console;


const object = {
    difficulty : 3 ,
    name : 'lab' ,
    planet : 'pluto' ,
    sector : 3 ,
    captureWave : 10 ,

    research : {

        name : '\ntesting \'wow\'\n' ,

        parent : 'nuclearFacility' ,

        objectives: [{
            preset : 'nuclearFacility' ,
            type : 'SectorComplete'
        }]
    }
}



Deno.test('Basic Stringification Test',() => {

    const hjson = stringify(object);

    log(hjson);
});