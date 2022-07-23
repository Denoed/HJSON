
# HJSON   [![Badge License]][License]

*A parser / stringifier for **[HJSON]**.*

<br>

## Import

```JavaScript
import HJson from 'https://deno.land/x/hjson/mod.ts'
```

<br>
<br>

## Parsing

```JavaScript
import { parse } from 'https://deno.land/x/hjson/mod.ts'

const { log } = console;

const hjson = `{
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

log(parse(hjson));


/*
 *  {
 *      some : 3 ,
 *      variables : [ 'with' , 'a' , 'lot' ] ,
 *      inside : { them : 9 }
 *  }
 */
```

<br>
<br>

## Stringification

**Work In Progress**

<br>


<!----------------------------------------------------------------------------->

[License]: LICENSE
[HJSON]: https://hjson.github.io/


<!----------------------------------[ Badges ]--------------------------------->

[Badge License]: https://img.shields.io/badge/License-AGPL3-015d93.svg?style=for-the-badge&labelColor=blue