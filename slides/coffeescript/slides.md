# CoffeeScript
### Faster JavaScript Development
<small>[Alexander Ivanov - Karamfil](http://karamfil.avalith.bg)</small>



## Who am I
* All-End Developer
# TODO

<aside class="notes">
	NOTES
</aside>



## What is CoffeeScript
# TODO



## Installation
Requires node.js and npm

`npm install -g coffee-script`



## Example Usage
`coffee -j project.js -wc src/`



# Syntax



## Comments
```coffee
# Line comment

###
Block
Comment
###
```



## Strings
```coffee
'Exact string'
"Some String"
```


### Block Strings
```coffee
''' Exact Block String '''
""" Some "other" String """
```


### Multiline Strings
```coffee
"Strings
can be wrapped
on many lines"
```



## String Interpolation
```coffee
"String literal, allows the usage of #{var_or_expression}"
"My name is #{name}"
"2 + 2 = #{2 + 2}"
'1 + 1 = #{1 + 1}'
```



## Regular Expressions
```coffee
regexp = /regular expression/

block = ///
	multiline # comment
	regular # comment
	expression
///
```



## Arrays
```coffee
simplelist = ["do", "re", "mi", "fa", "so"]

matrix = [
	1, 0, 1
	0, 0, 1
	1, 1, 0
]
```



## Ranges
```coffee
[1..3]     # [1, 2, 3];
[1...3]    # [1, 2];
```



## Slicing & Splicing
```coffee
my_list = ['a', 'b', 'c', 'd', 'e', 'f']

my_list[1..3]               # ['b', 'c', 'd'];
my_list[1...3]              # ['b', 'c'];
my_list[..3]                # ['a', 'b', 'c', 'd'];
my_list[...3]               # ['a', 'b', 'c'];
my_list[3..]                # ['d', 'e', 'f'];
my_list[..]                 # ['a', 'b', 'c', 'd', 'e', 'f'];

my_list[2..3]  = [1, 2, 3]  # ['a', 'b', 1, 2, 3, 'e', 'f'];
my_list[2...3] = [1, 2, 3]  # ['a', 'b', 1, 2, 3, 'd', 'e', 'f'];
```



## Objects
```coffee
my_object = { a: 1, b: 2, c: 3 }
my_object = a: 1, b: 2, c: 3

my_object = 
	another_obj:
		a: 1
		b: 2
		c: 3
	qwerty: 123
```



## Conditions


### if else
```coffee
if friday
	mood = happy
else if monday
	mood = depressed
else
	mood = sad
```


### if
```coffee
mood = happy if friday
```


### if then else
```coffee
mood = if friday then happy else sad
```


### unless
```coffee
mood = sad unless friday
```


### switch / when / else
```coffee
switch day
	when "Mon" then go work
	when "Fri", "Sat"
		go bingo
	when "Sun" then go church
	else go work
```



## Try / Catch / Finally
```coffee
throw new Error "Error message"

try
	catsAndDogsLivingTogether()
catch error
	print error
finally
	cleanUp()
```



### Chained Comparisons
```coffee
1000 < year < 2000
```



## Operators and Aliases
```coffee
CoffeeScript            JavaScript
==, is                  ===
!==, isnt               !==
!, not                  !
&&, and                 &&
||, or                  ||

true, yes, on           true
false, no, off          false
@, this                 this
of                      in
in                      no JS equivalent
```


### Existential Operator
```coffee
today = worday ? weekend

mood = happy if friday?

console?.log 'message'
console.trace?()
func()? 123

# Assignment
speed = 0
speed ?= 15
```



### Loops


#### While
```coffee
work() while today < saturday
```


#### Until
```coffee
work() until today > friday
```


#### For
```coffee
tasks = ['tast 1', 'task 2', 'task 3']
for i in tasks
	finish(i)

task_times = task1: 4, task2: 2, task3: 5
for task, time of task_times
	console.log "#{task} took #{tim} hours"
```


#### Then
```coffee
for i in tasks then i.finish()
```


#### When
```coffee
for i in tasks when i.hours > 1
	i.finish()
```


#### Closure Wrapper
```coffee
for i in tasks
	do (i) ->
		i.finish()

for i in tasks then do (i) ->
	i.finish()
```



### Comprehensions
```coffee
eat food for food in fridge
eat food for food in fridge when food isnt 'broccoli'

take step for step in path by 2

choice i, dish for dish, i in fridge
choice i, dish for i, dish of fridge
```



## Functions


### Definitions
```coffee
func =-> 123

mul = (x, y) -> x * y

mul = (x, y = 2) -> x * y
```


### Calling
```coffee
func()
mul 1
mul(1)

mul 1,2
mul(1,2)
```


### Splats...
```coffee
medals = (first, second, others...) ->
	gold   : first
	silver : second
	rest   : others
```


### Splats... in the Middle
```coffee
players = (first, second, others..., last) ->
	gold   : first
	silver : second
	rest   : others
	loser  : last

players("M.Phelps", "L.Xiang", "Y.Ming", "A.Felix", "S.Johnson")
```


### Splats... as Parameters
```coffee
contenders = [
	"M.Phelps"
	"L.Xiang"
	"Y.Ming"
	"A.Felix"
	"S.Johnson"
]

players contenders...
```

```coffee
players [
	"M.Phelps"
	"L.Xiang"
	"Y.Ming"
	"A.Felix"
	"S.Johnson"
]...
```



## Classes
```coffee
class Animal
	constructor: (@name, @speed = 5) ->
	
	move: (meters) ->
		console.log "#{@name} moved #{meters}m"

class Snake extends Animal
	move: ->
		console.log "Slithering..."
		super @speed

py = new Snake "The Python"
py.move()
```


### Prototype Access
```coffee
String::to_slug = ->
	this.replace /\W+/g, "-"
```



## Function binding
```coffee
Account = (customer, cart) ->
	@customer  = customer
	@cart      = cart

	$('.shopping_cart').bind 'click', (event) =>
		@customer.purchase @cart
```



## Destructuring Assignment
```coffee
[a, b] = [b, a]

futurists =
	poet:
		name: "William, Shakespeare"
		address: [ "United Kingdom", "London"]

{poet: {name, address: [country, city]}} = futurists

class Person
	constructor: (options) ->
		{@name, @age, @height} = options

[first, middle..., last] = [1..10]
```



## Embedded JavaScript
```coffee
hi = `function(){ return “Hello World”; }`
```



## Everything is an Expression 
At least, as much as possible


### If Statements
```coffee
mood = if friday
	happy
else if monday
	depressed
else
	sad
```


### Switch
```coffee
grade = switch
	when score < 60 then 'F'
	when score < 70 then 'D'
	when score < 80 then 'C'
	when score < 90 then 'B'
	else 'A'
```


### Loops
```coffee
lyrics = while num -= 1
	"#{num} little monkeys, jumping on the bed. 
	 One fell out and bumped his head."

tasks = ['tast 1', 'task 2', 'task 3']
finished = for i in tasks
	finish(i)

task_times = task1: 4, task2: 2, task3: 5
task_times_test = for task, time of task_times
	"#{task} took #{tim} hours"
```


### Comprehensions
```coffee
squares = (i*i for i in [1..10])
```


### Statements
```coffee
globals = (name for name of window)[0...10]
```

### Try / Catch
```coffee
alert(try
	nonexistent / undefined
catch error
	"And the error is ... #{error}"
)
```



## Debugging

[Source maps](http://coffeescript.org/#source-maps)



## Sublime Plugins
* CoffeScript
* JS2Coffee



## Dialects
* [CoffeeScript II](https://github.com/michaelficarra/CoffeeScriptRedux)
* [Coco](https://github.com/satyr/coco)
* [LiveScript](http://livescript.net/)



# Thanks



# Q&A