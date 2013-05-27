# CoffeeScript
<small>[Alexander Ivanov - Karamfil](http://karamfil.avalith.bg)</small>



# TODO
## Who am I
<aside class="notes"> NOTES </aside>

* All-End Developer



# What is CoffeeScript



## Coffee ain't so cool anymore



## And the winner is...



# LiveScript


## What is LiveScript
<aside class="notes">LiveScript is a language which compiles to JavaScript. It has a straightforward mapping to JavaScript and allows you to write expressive code devoid of repetitive boilerplate. While LiveScript adds many features to assist in functional style programming, it also has many improvements for object oriented and imperative programming.</aside>

* Language which compiles to JavaScript
* Coco fork
* CoffeeScript descendant


## Requirements
* node.js
* Node Package Manager


## Installation
`npm install -g LiveScript`


## Example Usage
* `lsc -wco src_dir out_dir`
* `lsc -i`
* `lsc -pe '[1 to 5]'`



# Syntax - Basic
* blocks delimited indentation
* newlines are used to terminate statements
* semicolons for one-line statements



# Syntax - Literals


## Comment
* `# single line`
* `/* multiline */`


## Numbers
<aside class="notes">2~100 = 4<br />36~zz = 1295</aside>

* `123`
* `12.3`
* `0.123`
* `10_000_000km`
* `2~100`
* `36~zz`


## Booleans
* true, on, yes
* false, off, no


## Null, Undefined
<aside class="notes">
	In JavaScript, undefined can be redefined, so it is prudent to use the void operator which produces the undefined value, always. 
</aside>

* null
* void instead of undefined


## Strings
* `'fancy string'`
* `"fancy string"`
* `\string-without-spaces`


## String Interpolation
* `'2 + 2 = #{2 + 2}'`
* `"2 + 2 = #{2 + 2}"`
* `"Hello #name"`
* `%"#x #y"` compiles to `[x, " ", y];`


## Multiline Strings
```livescript
'strings can span 
to multiple lines'
```


## Heredoc Strings
```livescript
'''
	- string can be multiline with newlines
	- beginning whitespace is ignored
	- interpolation is #possible
'''
```


## Regular Expressions
```livescript
/regexp/g
```
```livescript
//
 multiline   # whitespaces and
 regexp      # comments are stripped
//g
```


## Variable Names
# TODO


## Objects
```livescript
obj = {foo: 1, bar: 'baz'}
```
```livescript
obj = foo: 1, bar: 'baz'
```
```livescript
obj = 
	foo: 1,
	bar: 'baz'
```


## Objects - Dynamic Keys
```livescript
obj =
	"#keyname"  : 234
	(key[name]) : false
	(key.name)  : false
```


## Objects - Shorthand Properties
```livescript
obj = {
	+this_is_true
	-this_is_false
}
```


## Objects - This
```livescript
this
@
@prop_name
```


## Lists
<aside class="notes">Commas are not needed if the item preceding is not callable <br><br>They need at least two items for it to work. If you have only one item, you can add a ... to force the implicit list</aside>

```livescript
list = [1, 'string', variable]
list = [1 'string' variable]

vertical_list = 
	1
	'string'
	variable

matrix =
	1 2 3
	4 5 6
	7 8 9

one_item =
	1
	...
```


## Lists - Trees
```livescript
tree = 
	* 1
		'a'
		'b'
	* 2
		'c'
		'd'

obj_list = 
	*   a: 1
	    b: 2
	*   a: 3
	    b: 4

```


## Lists - Words
```livescript
<[ list of words ]>
```


## Ranges
```livescript
[1 to 5]       #=> [1, 2, 3, 4, 5]
[1 til 5]      #=> [1, 2, 3, 4]
[1 to 10 by 2] #=> [1, 3, 7, 9]
[5 to 1]       #=> [5, 4, 3, 2, 1]
[to 5]         #=> [0, 1, 2, 3, 4, 5]
[\a to \d]     #=> ['a', 'b', 'c', d']

x = 5
[1 to x]       #=> [1, 2, 3, 4, 5]
```



# Syntax - Operators


## Number - Starndard Math
```livescript
1 + 2 #=> 3
3 - 4 #=> -1
6 * 2 #=> 12
8 / 4 #=> 2
```


## Number - Remainder and Modulo
```livescript
-3 % 4  #=> -3
-3 %% 4 #=> 1
```


## Number - Power
```livescript
2 ** 4     # Math.pow(2, 4); => 16
2 ^ 4      # Math.pow(2, 4); => 16
```


## Number - Increment and Decrement
```livescript
n++ #=> 0
++n #=> 2
n-- #=> 2
--n #=> 0
```


## Number - Bitwise and Shift
```livescript
14 .&. 9   # 14 & 9;     => 8
14 .|. 9   # 14 | 9;     => 15
14 .^. 9   # 14 ^ 9;     => 7
~9         # ~9;         => -10
9  .<<. 2  # 9 << 2;     => 36
-9 .>>. 2  # -9 >> 2;    => -3
-9 .>>>. 2 # -9 >>> 2;   => 1073741821
```


## Number - Casting
```livescript
+'4' #=>  4
-'3' #=> -3
```


## Comparison - Strict Equality
```livescript
2 + 4 == 6      # 2 + 4 === 6;         => true
\boom is 'boom' # 'boom' === 'boom';   => true

\boom != null   # 'boom' !== null;     => true
2 + 2 is not 4  # 2 + 2 !== 4;         => false
0 + 1 isnt 1    # 0 + 1 !== 1;         => false
```


## Comparison - Fuzzy Equality
```livescript
2 ~= '2'   # 2 == '2';  => true
\1 !~= 1   # '1' != 1;  => false
```


## Comparison - Greater and Less
```livescript
2 < 4    #=> true
9 > 7    #=> true
8 <= 8   #=> true
7 >= 8   #=> false
```


## Comparison - Chained
```livescript
1 < 2 < 4        #=> true
1 < 2 == 4/2 > 0 #=> true
```


## Comparison - Minimum and Maximum
```livescript
4 >? 8     #=> 8
9 - 5 <? 6 #=> 4
```


## Comparison - Regular Expression
<aside class="notes">Equality compiles to exec so you can use the results, while the negative simply compiles to test</aside>

```livescript
/^e(.*)/ is 'enter' #=> ["enter","nter"]
/^e(.*)/ == 'zx'    #=> null
/moo/ != 'loo'      #=> true
```


## Logic
```livescript
true and false #=> false
true && false  #=> false

true or false  #=> true
true || false  #=> true

not false      #=> true
!false         #=> true
```


## Logic - XOR
```livescript
false xor true  #=> true
false xor false #=> false
1 xor 0         #=> 1
1 xor 1         #=> false
```


## Logic - Magic
```livescript
even 0 and 3 # even(0) && 3;  => 3
even 0 &&  3 # even(0 && 3);  => true

(f or g) 1           # f(1) || g(1);
(f and g or h) 3 4   # f(3, 4) && g(3, 4) || h(3, 4);
```


## In and Of
```livescript
list = [1 2 3]
2 in lsit    #=> true
5 in list    #=> false

obj = id: 23, name: \rogers
\id of obj   #=> true
```


## Existential
```livescript
do_this ? do_that
string = \boom if window?
string = 'yeah' if window!?
document?.host
```


## Strings
```livescript
'hello' + ' ' + 'world'  #=> 'hello world'
string = 'hello '        #=> 'hello '
string += \world         #=> 'hello world'

'a' * 3                  #=> 'aaa'
'hello world' - /l/      #=> 'hello world'.replace(/l/, '');
'hello world' / \o       #=> 'hello world'.split('o');
```


## Objects
```livescript
new Date() instanceof Date           #=> true
new Date() instanceof [Date, Object] #=> true

typeof /^/  #=> object
typeof! /^/ #=> RegEx
```


## Objects - Delete

```livescript
obj = one: 1, two: 2
r = delete obj.one
r #=> 1

obj = {one: 1, two: 2}
delete! obj.one #=> true
delete! Math.PI #=> false
```


## Objects - Import
```livescript
obj = {one: 1, two: 2}
obj <<< three: 3 #=> {one: 1, two: 2, three: 3}
{go: true} <<<< window
import obj
```


## Objects - Clone ???
<aside class="notes">Clone - creates a prototypical clone of the operand. It does not create a deep clone of the object, rather the resulting object's prototype is the operand. Remember that prototypes are ignored when serializing to JSON. </aside>

```livescript
obj = {one: 1}
obj2 = ^^obj
obj2.two = 2
obj2 #=> {one: 1, two: 2}
# above includes its prototype's properties
# JSON serialization would be just `{two: 2}`
obj  #=> {one: 1}
```


## Objects - With ???
<aside class="notes">The infix with (aka the cloneport) combines the clone and property copy operators for easy object creation. It is equivalent to ^^obj <<< obj2. Remember that the clone operator creates a prototypical clone, and prototypes are not serialized in JSON. </aside>

```livescript
girl = {name: \hanna, age: 22}
guy  = girl with name: \john
guy  #=> {name: 'john',  age: 22}
# the above result include the object's prototype
# in the result - the actual JSON: {name: 'john'}
girl #=> {name: 'hanna', age: 22}
```


## Lists
```livescript
[1, 'two', 3] ++ [4]    #=> [1, 'two', 3, 4]
['test'] * 3            #=> ['test', 'test', 'test']
['test'] * 3 * ', '     #=> test, test, test
```


## Lists - Unary Spread
<aside class="notes">Unary spread - when the operand is a list literal, apply the unary op to each item</aside>

```livescript
a = +[4, 5, 6]          #=> [+4, +5, +6];
a = -[4, 5, 6]          #=> [-4, -5, -6];
a = ~[4, 5, 6]          #=> [~5, ~6, ~7];

a = typeof  [\b 5 {}]   #=> ["string","number","object"];
a = typeof! [\b 5 {}]   #=> ["String", "Number", "Object"];

a = new [some, classes] #=> [new some, new classes];
a = ^^[copy, these]     #=> [clone$(copy), clone$(these)];

do [a, b, c]            #=> a(), b(), c();

list[1,2,3]             #=> [list[1], list[2], list[3]];
++list[1,2,3]           #=> --list[1], --list[2], --list[3];
delete list[1, 2]       #=> delete list[1], delete list[2];

```


## Pipes
```livescript
[1 2 3] |> reverse    #=> [3,2,1]
reverse <| [1 2 3]    #=> [3,2,1]
```


## Function Composing
```livescript
a = (f << g)    # f(g(param))
a = (f . g)     # f(g(param))

a = (f >> g)    # g(f(param))
```


## As Function and Partial Application
```livescript
plus2 = (+ 2)
plus2 4            #=> 6

in3 = (in [to 3])
in3 2              #=> true

plus = (+)
plus 2 4           #=> 6
```



## Operators 
```livescript
```

















# Syntax - Functions




# Syntax - Conditionals
if..., switch



# Syntax - Loops and Coprehensions



# Syntax - Assignment




# Syntax - OOP

string = \boom if window?