# CoffeeScript
<small>[Alexander Ivanov - Karamfil](http://karamfil.avalith.bg)</small>


## Who am I
<aside class="notes"> NOTES </aside>

* All-End Developer
* Bla bla bla



# What is CoffeeScript


## Coffee ain't so cool anymore


## And the winner is...



# LiveScript


## What is LiveScript
* Compiles to JavaScript
* Coco fork
* CoffeeScript descendant
* Functional
* Object oriented


## Requirements
* node.js
* Node Package Manager


## Installation
`npm install -g LiveScript`


## Example Usage
* `lsc -wco src_dir out_dir`
* `lsc -i`
* `lsc -pe '[1 to 5]'`



# Syntax


## Code Blocks
* blocks delimited indentation
* newlines are used to terminate statements
* semicolons for one-line statements



# Literals


## Comment
<aside class="notes">Multiline comments are whitespace formatted and preserved in the output.</aside>

```livescript
# single line
/* multiline */
```


## Variables
```livescript
var_name
var-name
varName

var var-name
const x = 10
```


## YadaYadaYada
```livescript
...
```


## Numbers
<aside class="notes">2~100 = 4<br />36~zz = 1295</aside>

```livescript
123
12.3
0.123
10_000_000km
2~100
36~zz
```


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
```livescript
'fancy string'
"fancy string"
\string-without-spaces
```


## String Interpolation
```livescript
"2 + 2 = #{2 + 2}"
'2 + 2 = #{2 + 2}'
"Hello #name"
%"#x #y"  #=> [x, " ", y];
```


## Multiline Strings
```livescript
'strings can span 
to multiple lines'
```


## Heredoc Strings
```livescript
'''
	- string can be multi-line with newlines
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
 multiline   # whitespace and
 regexp      # comments are stripped
 #variable   # interpolation
//g
```


## Objects
```livescript
obj = { foo: 1, bar: 'baz' }
```
```livescript
obj = foo: 1, bar: 'baz'
```
```livescript
obj = 
	foo: 1
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
	*	1
		'a'
		'b'
	*	2
		'c'
		'd'

obj_list = 
	*	a: 1
		b: 2
	*	a: 3
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


## This
```livescript
this
@
@prop_name
```


## Literal JavasScript
```livescript
``alert(123);``
```



# Operators


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
/^e(.*)/ is 'enter' #=> ["enter", "nter"]
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
<aside class="notes">and, or, and xor close implicit calls, while || and && do not.<br /><br />You can call logic operators.</aside>
  
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


## Existential?!?
```livescript
do_this ? do_that
string = \boom if window?
string = \yeah if window!?
document?.host
```


## Strings
```livescript
'hello' + ' ' + 'world'  #=> 'hello world'
'hello world' - /l/      #=> 'hello world'.replace(/l/, '');

'a' * 3                  #=> 'aaa'
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
obj import window
{go: true} <<<< window
obj import all window
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

a = typeof  [\b 5 {}]   #=> ["string", "number", "object"];
a = typeof! [\b 5 {}]   #=> ["String", "Number", "Object"];

a = new [some, classes] #=> [new some, new classes];
a = ^^[copy, these]     #=> [clone$(copy), clone$(these)];

do [a, b, c]            #=> a(), b(), c();

list[1,2,3]             #=> [list[1], list[2], list[3]];
--list[1,2,3]           #=> --list[1], --list[2], --list[3];
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

plus = (+)
plus 2 4           #=> 6

in3 = (in [to 3])
in3 2              #=> true
```



# Functions


## Defining
```livescript
->    # an empty function

(x, y) -> x + y

mul = (x, y) ->
	x * y

f = !-> 2
g = !(x) -> x + 2
```


## Named Functions
```livescript
function f
	...

function f then ...

!function f then ...
```


## Calling
<aside class="notes">you can omit the comma separating the arguments if the preceding item is not callable, just like in arrays.</aside>

```livescript
func()
func!
func 1, 2
func 1 2

$ \h1 .find \a .text!

do -> 3 + 2    #=> 5

add = (x, y) -> x + y
3 `add` 4      #=> 7
```


## Arguments
```livescript
(x = 4, y = 3) -> x + y

f = ({x, y = 2}) -> "#x,#y"
f y: 2, x: 3    #=> '3,2'

f = (@text) ->

f = (obj.age = 1) -> obj

f = -> it + 2
f = -> &
f = -> &0 + 2
```


## Splats...
```livescript
f = (x, ...ys) -> 
f = (x, ...ys, last) -> 

f ...[a, b, c, d]
g = (a, b, c, d) -> f ...

posts['op' ...'replies'] = thread
```


## Unary Arguments
```livescript
f = (!!x) -> x
f = (+x) -> x
f = (-x) -> x
f = (^^x) -> x
```


## Context Creation
```livescript
obj = new
	@x = 10
	@

let $ = jQuery
	$.isArray [] #=> true

x = let @ = a: 1, b: 2
	@b ^ 3
```


## Bound Functions
```livescript
obj = new
	@x      = 10
	@normal = -> @x
	@bound  = ~> @x
	
	~function f then @x
```


## Currying
```livescript
multiply = (x, y) --> x * y
multiply 2, 3     #=> 6 (normal use works as expected)
double = multiply 2
double 5          #=> 10

multiply = (x, y) ~~> x * y
```


## Shorthand Access/Call
```livescript
map (.length), <[ hello there you ]>
filter (.length < 4), <[ hello there you ]>

obj = one: 1, two: 2, three: 3
map (obj.), <[ one three ]>
```


## Partial Application
```livescript
filter-nums = filter _, [1 to 5]
filter-nums even      #=> [2,4]
filter-nums odd       #=> [1,3,5]
filter-nums (< 3)     #=> [1,2]

[1 2 3] |> _.reduce _, (+), 0    #=> 6
```



# Conditionals


## If Then Else
```livescript
if 2 + 2 == 6
	'something'
else if 2 + 2 == 5
	'something else'
else
	'the default'

if 2 + 2 == 4 then 'something' else 'something else'
if 2 + 2 == 4 => 'something' else 'something else'
```


## Unless
```livescript
unless 2 + 2 == 6
	'something'
else unless 2 + 2 == 5
	'something else'
else
	'the default'
```


## As Expression
```livescript
result = if 2 / 2 is 0
         then 'something'
         else 'something else'
```


## Postfix
```livescript
x = 3 if 2 + 2 == 4
x = 3 unless 2 + 2 == 5
```


## That
```livescript
if /^(e.*)/ == 'enter'
	that.1    #=> 'enter'
```


## Switch
```livescript
switch 6
case 1    then \hello
case 2, 4 then \boom
case 6
	'here it is'
default \something
```


## Switch on Nothing
```livescript
switch
case 5 == 6
	\never
case false
	'also never'
case 6 / 2 is 3
	'here'
```


## fallthrough
```livescript
switch 6
case 6
	something = 5
	fallthrough
case 4
	'this is it'
```


## CoffeeScript Style
```livescript
switch day
	when \Mon then 'go to work'
	when \Tue then 'go to a movie'
	when \Thu then 'go drinking'
	when \Fri, \Sat
		'go dancing'
	when \Sun then 'drink more'
	
	else 'go to work'
```


## As Epxression
```livescript
result = switch
	case 5 == 6
		\never
	case 6 / 2 is 3
		'here'
```


## Haskell Style
```livescript
switch 'moto'
| "some thing"     => \hello
| \explosion \bomb => \boom
| <[ the moto ? ]> => 'here it is'
| otherwise        => \something

func = (param) ->
  | param.length < 5 => param.length
  | otherwise        => param.slice 3

state = | 2 + 2 is 5 => 'not 5'
        | otherwise  => 'something else'

state:  | 2 + 2 is 5 => 'not 5'
        | _          => 'something else'
```



# Loops


## While
```livescript
i = 0
while i < 10
	list[i++]

while i < 10 then i++
```


## Until
```livescript
i = 0
until i > 10
	list[i++]
```


## Do
```livescript
i = 0
do
	list[i++]
while i < 10

i = 0
do
	list[i++]
until i > 10
```


## For
```livescript
for i from 1 to 10 by 3
	i

for i from 1 til 10 then i
for i til 10 then i

for val, index in list then val
for val in list then val
for , index in list then index

for key, val of obj then val
for key of obj then key
for , val of obj then val
```


## Else
```livescript
i = 0
while i < 10
	list[i++]
else
	-1

until i > 10
	list[i]
else
	-1

for i from 1 to 10 by 3
	i
else
	-1
```


## Update Clause
```livescript
i = 0
while i < 10, i++
	list[i]
```


## Guard Clause
```livescript
i = 0
while i < 10 when i != 5
	list[i]

until i > 10 when i != 5
	list[i]

for i from 1 to 10 by 3 when i != 5
	i
```


## Infinite Loops
```livescript
i = 0
loop
	break if ++i > 20

i = 0
for ever
	break if ++i > 20
```



# Comprehensions


## Comprehensions
<aside class="notes">List comprehensions always produce a list. Nested comprehensions produce a flattened list. </aside>

```livescript
[x + 1 for x to 10 by 2 when x isnt 4]   #=> [1,3,7,9,11]

table = [{id: 1 name: 11}, {id: 2 name: 22}]
[{the-id, name} for {id: the-id, name} in table]
    #=> [{"theId":1,"name":11},{"theId":2,"name":22}]

{[val, val * 2] for , val of [1, 2, 3]} #=> {"1": 2, "2": 4, "3": 6}
```


## Comprehension Cascades
```livescript
[.. + 1 for [1 2 3]]   #=> [2, 3, 4]

table = [{id: 1 name: 11}, {id: 2 name: 22}]
[ ..name  for table]  #=> [11, 22]
[{..name} for table]  #=> [{"name": 11}, {"name": 22}]
```



# Assignment


## Basics
```livescript
x = 10

do ->
	x = 5

x    #=> 10

do ->
	x := 2

x    #=> 2
```


## Compound Assignment
```livescript
x =   2    #=> 2
x +=  2    #=> 4
x -=  1    #=> 3
x *=  3    #=> 9
x /=  3    #=> 3
x %=  3    #=> 0
x %%= 3    #=> 0
x <?= -1   #=> -1
x >?= 2    #=> 2
x **= 2    #=> 4
x ^=  2    #=> 16

xs = [1 2]
xs ++= [3]
xs           #=> [1 2 3]
```


## Compound Assignment Prefix
```livescript
# ?, ||, or && can prefix any compound assignment

x = 16

x ?= 10
x            #=> 16

x ||= 5      #=> 16
x &&= 5      #=> 5

x &&+= 3     #=> 8
x ?*= 2
x            #=> 8
```


## Unary Assignment
```livescript
y    = \45
+    = y   #=> 45   (make into number)
!!   = y   #=> true (make into boolean)
-~-~ = y #=> 3    (intcasting bicrement)
```


## Soak Assignment
```livescript
age = 21
x? = age
x    #=> 21

x? = years
x    #=> 21
```


## Destructuring Assignment
```livescript
[first, second] = [1, 2]

{name, age} = {weight: 110, name: 'emma', age: 20}

[first, ...middle, last] = [1 to 5]

[x, ...xs]:list = [1 to 5]
```


## Substructuring Assignment
```livescript
mitch =
	age:    21
	height: 180cm
	pets:    [\dog, \goldfish]

phile = {}
phile{height, pets} = mitch

phile.height     #=> 180
phile.pets       #=> ['dog', 'goldfish']
```


## Almost Everything is an Expression
* If / Unless
* Switch
* Loops
* Try / Catch



# Property Access


## Basics
```livescript
{a: 1, b: 2}.b    #=> 2
[1 2 3][1]        #=> 2
[1 2 3].1         #=> 2
```


## Accessignment
```livescript
str = 'string'
str .= to-upper-case!   #=> 'STRING'
```


## Array Slice and Splice
```livescript
list = [1 2 3 4 5]
list[2 to 4]     #=> [3, 4, 5]
list[2 til 4]    #=> [3, 4]
list[2, 4]       #=> [3, 5]

list[1 til 3] = [7 8]
list             #=> [1,7,8,4,5]
```


## Object Slice
```livescript
obj = one: 1, two: 2
obj{one, second: two}    #=> {first: 1, two: 2}
```


## Length *
```livescript
list = [1 2 3 4 5]
list[*] = 6
list          #=> [1,2,3,4,5,6]
list[*-1]     #=> 6
```


## Semiautovivification
<aside class="notes">Ensures that the property exists as an object or as an array</aside>

```livescript
x = [{key: \hello}, [\world]]
q = x.{}0   #=> {"key":"hello"}
w = x.[]1   #=> ["world"]

e = x.{}2   #=> {}
r = x.[]3   #=> []
```


## Binding Access
```livescript
obj =
	x: 5
	add: (y) -> @x + y

target =
	x: 600
	not-bound: obj.add
	bound: obj~add

target.not-bound 5 #=> 605
target.bound 5     #=> 10
```


## Cascades
```livescript
a = [2 7 1 8]
	..push 3
	..sort!
a #=> [1, 2, 3, 7, 8]

document.query-selector \h1
	..style
		..color = \red
	..inner-HTML = 'LIVESCRIPT!'

a = [2 7 1 8]..push 3 ..sort! #=> [1, 2, 3, 7, 8]
```


## More Cascades
```livescript
console.log
	x = 1
	y = 2
	.. x, y

x = with {a: 1, b: 2}
	..a = 7
	..b = 11

x   #=> {a: 7, b: 11}
```



# Exceptions


## Throw
```livescript
throw new Error 'an error has occurred!'
```


## Try Catch and Finally
```livescript
try
	...
catch
	handle-exception e
finally
	do-something!
```



# OOP


## Classes
```livescript
class A
```


## Properties
```livescript
class A
	x: null
	
	(num) ->
		@x = num
	
	property: 1
	method: (y) ->
		@x + @property + y

a = new A 3
a.x           #=> 3
a.property    #=> 1
a.method 6    #=> 10
```


## Static Properties
```livescript
class A
	@static-prop = 10
	get-static: ->
		@@static-prop + 2

A.static-prop   #=> 10
a = new A
a.get-static!   #=> 12
```


## Private Static Properties
```livescript
class A
	secret = 10
	
	get-secret: ->
		secret

a = new A
a.get-secret!   #=> 10
```


## Bound Methods
```livescript
class A
	x: 10
	bound-func: (x) ~>
		@x
	reg-func: (x) ->
		@x

a = new A
obj =
	x: 1
	bound: a.bound-func
	reg: a.reg-func

obj.bound!   #=> 10
obj.reg!     #=> 1
```


## Set Properties in Constructor
```livescript
class A
	(@x) ->
	
	f: (@y) ->
		@x + @y

a = new A 2
a.x     #=> 2
a.f 3   #=> 5
a.y     #=> 3
```


## Bound Constructors
<aside class="notes">constructor as a bound function ~>, you don't need to use new when making a new instance</aside>

```livescript
class A
	(@x) ~>

a = A 4
a.x #=> 4
```


## Inheritance
```livescript
class A
	->
		@x = 1
	
	@static-prop = 8
	method: ->
		@x + 2

class B extends A
	->
		@x = 10

B.static-prop #=> 8
b = new B
b.x         #=> 10
b.method!   #=> 12
```


## Super
```livescript
class A
	-> @x = 1
	
	method: (num) ->
		@x + num

class B extends A
	->
		@y = 2
		super!
	
	method: (num) ->
		@y + super ...

b = new B
b.y #=> 2
b.method 10 #=> 13
```


## Mixins
```livescript
Renameable =
	set-name: (@name) ->
	get-name: -> @name ? @id

class A implements Renameable
	->
		@id = Math.random! * 1000

a = new A
a.get-name!    #=> some random number
a.set-name 'moo'
a.get-name!    #=> 'moo'
```


## Prototype
```livescript
class A
	prop: 10
	func: -> @prop

a = new A
b = new A
a.func! #=> 10

A::prop = 6
a.func!    #=> 6
b.func!    #=> 6

A::=
	prop: 5
	func: -> @prop + 4

a.func!    #=> 9
b.func!    #=> 9
```


## Extended parameters
<aside class="notes">In LiveScript, parameters accept much more than simple literals. You can assign properties, but also do more complex things, like semiautovivification:</aside>

```livescript
class Person
	# @name defaults to [], and assigns the first element
	set-first-name: (@[]names.0) ->
	
	# @name defaults to [], and adds the element to the the array's end
	add-name: (@[]names[*]) ->
	
	# @hair defaults to {}, and assigns color
	set-hair-color: (@{}hair.color) ->
```



# MOARRR


## Support
* Syntax higlight (SublimeText, Vim)
* No linting yet
* No source maps yet
* LiveScript 2.0 comming


## Links
* http://avalith.bg
* http://livescript.net
* https://github.com/gkz/LiveScript


## In Practice
* javascript => livescript => compiled
* lines: __275__ => __171__ => __216__
* size: __9403__ => __7047__ => __9606__
* time needed to convert: __~2__ hours


## The code



# Thank You!


# Questions?
![Ain't Nobody Got Time For That](http://mvposts.com/wp-content/uploads/2013/05/Aint-Nobody-Got-Time-for-That-389x267.jpg)