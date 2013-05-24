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
<!--
* Comments
* Strings
* Regular Expressions
* Arrays
* Objects
* Conditions
* Operators and Aliases
* Loops
* Comprehensions
* Functions
* Function Binding
* Splats...
* Classes
* Try/Catch/Finally
* Embedded JavaScript
</ul> -->



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

```coffee
''' Exact Block String '''
""" Some "other" String """
```

```coffee
"Strings
Can Be
On Many Lines"
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

my_object = 
	another_obj:
		a: 1
		b: 2
		c: 3
	qwerty: 123
```
