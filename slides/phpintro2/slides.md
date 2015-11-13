#PHP Basics
### Part II

***

## PHP Control Structures

***

## Simple control flow


### Let's see IF this sparks your interest
```
if($a > $b)
{
	echo "A is bigger than B";
}
```


### if/else
```
if($x){ echo "X is True"; }
else{ echo "X is False"; }
```


### And of course - elseif
```
if($a > $b){ echo "A is bigger than B"; }
elseif($a == $b){ echo "A is equal to B"; }
else { echo "A is smaller than B"; }
```


### Alternative Syntax
```
<?php if($a == 1): ?>
A is equal to 1
<?php endif; ?>
```


### And now a if/elseif/else alternative
* No curly braces
* You need to use endif;

```
if($a == 1):
	echo "a equals 1";
elseif($a == 2):
	echo "a equals 2";
else:
	echo "a is neither 1, nor 2";
endif;
```

***

## Loops


### While
```
$i = 1;
while($i <= 5)
{
	echo $i;
	$i++;
}
```


### Alternative While syntax
* Once again no need for curly braces

```
$i = 1;
while($i <= 5):
	echo $i;
	$i++;
endwhile;
```


### Do-While
```
$cookies = 10;
do
{
	echo "Mmm I love sugar *nom nom*";
	$cookies--;
} while ($cookies > 1);
```


### The difference between do and do-while?
* Do-while will execute the code at least once.
* While might not run it even once if the initial condition is not satisfied.


### Simple For everyone (get it? It's a pun!)
```
for($i = 1; $i <= 10; $i++)
{
	echo $i;
}
```

### Alternate "colon syntax"

```
for ($i = 1; $i <= 10; $i++):
	echo $i
endfor;
```


### Using expressions inside the For
* A bit of a clusterfuck imo
* Can be useful in some situations

```
for($i = 1, $j = 0; $i <= 10; $j += $i, print $i, $i++);
```


### Foreach

```
$animals = array("Cow", "Pony", "Duck", "Patkaaaa");

foreach ($animals as $animal)
{
	echo $animal;
}
```


### Adding key -> value to our foreach
```
$featured = array('key1' => 'value1', 'key2' => 'value2');
foreach($featured as $key => $value)
{
	// Here we can access the $key and $value pair for this iteration
	// On the first iteration these would be key1 and value1
}
```


### References and foreach
```
foreach(array(1,2,3) as &$row)
{
	$value = $value * 2
}

// Since the reference is still pointing at the last element in the loop we need to unset
unset($value)
```


### Breaking the loop
We can use
```
break;
```
to end the execution of any of our loops (for, foreach, while, do-while, switch).


### For example:
```
$animals = array('dog', 'cat', 'pigeon', 'tiger');
foreach($animals as $animal)
{
	if($animal == 'cat')
	{
		echo 'Pigeons suck balls';
		break 1;
	}
	echo $animal;
}
```
Notice the break 1?
```
break 1; = break;
```
You can use break n; to exit any number of nested enclosing structures
For example:


### Break 2
```
foreach(...)
{
	foreach(...)
	{
		if(i.name == j) break 2; //Breaks 2 levels, so breaks outermost foreach
	}
}
```


### Let us CONTINUE:
We use continue to skip the rest of the current iteration
```
for ($i = 0; $i < 5; ++$i)
{
	if($i == 2){ continue; }
	print "$i\n";
}
```

So the output we get is
```
0
1
3
4
```


### CONTINUING on:
Much like break - continue accepts an optional argument which tells it how many levels of enclosing loops it should skip to the end of.
Example:
```
$i = 0;
while ($i++ < 5)
{
	echo "Outer";
	while (1)
	{
		echo "Middle";
		while (1)
		{
			echo "Inner";
			continue 3;
		}
		echo "We never get here.";
	}
	echo "Neither do we reach this point.";
}
```


### Let us now SWITCH to a different topic:
```
if($i == 0)
{
	echo "The Variable is equal to 0"
}
elseif($i == 1)
{
	echo "The Variable is equal to 1"
}
elseif($i == 2)
{
	echo "The Variable is equal to 2"
}
elseif($i == 3)
{
	echo "The Variable is equal to 3"
}
```
Alternative syntax, multiple cases, no breaks output example and default case, curly braces for cases


### The previous example seems like a nightmare.

Let's save on some writing.

```
switch ($i)
{
	case 0:
		echo "i equals 0";
		break;
	case 1:
		echo "i equals 1";
		break;
	case 2:
		echo "i equals 2";
		break;
}
```

***

## Other control flow elements


### Return:
* Return returns program control to the calling module and execution resumes at the statement following the called module's invocation


### Include
* Include and evaluate a specified file

vars.php contains:
```
<?php

$breed = 'afghan';
$color = 'brown';

?>
```
now for test.php:
```
<?php

echo "The $breed is $color"; // The is
include vars.php
echo "The $breed is $color"; // The afhan is brown

?>
```


###Variable includes
```
php/product1.php:
<?php echo "This is product 1"; ?>

php/product2.php:
<?php echo "This is product 2"; ?>
```
```
<?php
		$PageName = "1";
		include ('php/product' . $PageName . '.php');
		include ("php/product$PageName.php");

		$PageName = "2";
		include ('php/product' . $PageName . '.php');
		include ("php/product$PageName.php");
?>
```

Output:
```
This is product 1
This is product 1
This is product 2
This is product 2
```


### Require:
Require is idenctical to include for the one difference - if it fails you produce a fatal E_COMPILE_ERROR level error which will halt the script.


### _once
The `include_once()` and `require_once()` commands will first check if the file has already been included and if so - not include(require) it again.


### Go to
You can use goto to jump to a target point in the program.
```
goto a;
echo 'Foo';

a:
echo 'Bar';
```

Output:
```
Bar
```

***

## Functions


### User defined
```
function patka()
{
	echo "PATKAAA!"
}

patka();
```


### Funcception!
Keep in mind that we can't call dve_patki() until we have called patka(), as dve_patki() doesn't exist prior to us calling patka()

```
function patka()
{
	echo "PATKAAA!"
	function dve_patki()
	{
		echo "Dve patkiii!"
	}
}

patka();
dve_patki();
```


### Arguments
```
function patka($number = 5)
{
	return "Qj $number patki!\n";
}
echo patka();
echo patka(null);
echo patka(2);
```

Output:
```
Qj 5 patki!
Qj  patki!
Qj 2 patki!
```


### Variable functions
```
function patka()
{
	echo "We are in function patka\n";
}

$func = 'patka';
$func(); // This is the same as calling patka()
```


### Type check
```
function sum(int $a, int $b)
{
	return $a + $b;
}

var_dump(sum(1.2, 2.5));
```

Output:
```
int(3)
```


### Return type declaration
We can ensure that the returned type is of type
```
function sum($a, $b) : float
{
	return $a + $b
}
```
a + b will always be of type float


### Possible return types:
* Class/Interface name - make sure it's an instance of class X
* self - only usable on class/instance methods
* array
* callable
* bool
* float
* int
* string


### ...$arg:
The `...` denotes that the function accepts a variable number of arguments
```
function sum(...$numbers)
{
	$acc = 0;
	foreach ($numbers as $n)
	{
		$acc += $n;
	}
	return $acc;
}

echo sum(1,2,3,4);
```

Output:
`10`


### func\_get\_
* func_num_args() - returns the number of arguments passed to the function
* func_get_arg( int $arg_num ) - return an item from the argument list
* func_get_args() - returns an array comprising a function's argument list

```
<?php
function sum() {
	$acc = 0;
	foreach (func_get_args() as $n) {
		$acc += $n;
	}
	return $acc;
}

echo sum(1, 2, 3, 4);
?>
```


### Anonymous functions/Closures
```
<?php
echo preg_replace_callback('~-([a-z])~', function ($match)
{
	return strtoupper($match[1]);
}, 'hello-world');
// outputs helloWorld
?>
```


### We can assign functions to a variable
```
<?php
$greet = function($name)
{
	printf("Hello %s\r\n", $name);
};

$greet('World');
$greet('PHP');
?>
```

***

## Classes


### Defining a SimpleClass
```
<?php
class SimpleClass
{
	//a Property of the class
	public $var = 'patka'
	
	// Class method
	public function displayPatka()
	{
		echo $this->var;
	}
}
?>
```


### Now let us create an instance of our class and call it's method
```
$instance = new SimpleClass();
$instance->displayPatka();
```

Output:
```
patka
```


### Inheritance example
```
class MyClass extends SimpleClass
{
	// class property
	public $name = null;
	
	public function assignValuetoObjectVar($val)
	{
		$this->name = $val;
	}
	
	public function printValueFromObjectVar()
	{
		echo $this->name;
	}
}
```
```
// Let's create an instance of MyClass:
$myObject = new MyClass();
//Now let us assign value "Test Name" to object's $name property
$myobject->assignValuetoObject('Test Name');
//Now we call the echo method in order to print the value
$myObject->printValueFromObjectVar();
```


### Visibility
You might have noticed the keyword "public" so far.
Properties in a class have their visibility defined by the "public", "protected" or "private" prefixes.

Public variables can be accessed by an instance of the class and redecalred.
Protected variables can be redeclared but can't be accessed by an instance of the class.
Private variable can neither be redeclared, nor accessed by an instance of the class.


### Final
The `Final` keyword is used in order to stop child classes from overriding the method.
Example:
```
class BaseClass
{
	final public function test()
	{
		echo 'PATKA!'
	}
}

class ChildClass extends BaseClass
{
	public function test()
	{
		echo 'NOT PATKA!'
	}
}

//Fatal Error: Cannot override final method BaseClass::test()
```


### Static
Static methods and constants can be accessed without the need for an instance of the class
```
class Person
{
	public static function countPeople()
	{
		// ...
	}
}
Person::countPeople();
```


### Class constants
It is possible to define constant values inside classes that remain the same and are unchangeable.
```
class MyClass
{
	const CONSTANT = 'unchangeable';
	
	function showConstant()
	{
		echo self::CONSTANT;
	}
}

echo  MyClass:CONSTANT;

$instance\_of\_myclass = new MyClass();
$class->showConstant();
```


### Abstract classes
Abstract classes are classes which cannot be instantiated and contain at least one abstract method
```
abstract class AbstractClass
{
	// Any class which extends AbstractClass needs to define the following methods
	abstract protected function getValue();
	abstract protected function prefixValue($prefix);
	
	// Common method
	public function printOut()
	{
		print $this->getValue() . "\n";
	}
	
}
```


### Extending AbstractClass:
```
class NormalClass extends AbstractClass
{
	public function getValue()
	{
		return "NormalClass";
	}
	
	public function prefixValue($prefix)
	{
		return "{$prefix}NormalClass";
	}
}
```


### Creating and using an instance of a class which inherits an abstract class:
```
$class1 = new NormalClass();
$class1->printOut();
echo $class1->prefixValue('PATKA') ."\n";
```

Resulting in the following output

```
NormalClass
PATKANormalClass
```


### Interfaces
Object interfaces allow you to create code which specifies which methods a class must implement, without having to define how these methods are handled.
```
interface Countable
{
	public function count();
}
```

```
class CountMyThings implements Countable
{
	public function count()
	{
		return count($this->arrayOfThings);
	}
}
```



### Difference between abstract and interface classes?
Use an interface when you want to force developers working in your system to implement a set number of methods on the classes they are building.

Use an abstract class when you want to force developers working in your system to implement a set number of methods AND you want to provide some base methods that will help them develop child classes

***

## Namespaces


### What are namespaces?
Namespaces are a way of encapsulating items.
They solve two main problems in PHP:

  * Name collisions between your code, internal PHP classes\functions\constants and third-party classes\functions\constants
  * Ability to alias longer names and improve readability


### How do we define them?
Namespaces are decalred at the top of the file before any other code using the namespace keyword.
```
namespace MyProject

// Code here
```


### Using namespaces
```
namespace Acme/Tools;

class Eddard
{
	public function death(){ echo 'Beheaded'; }
}
```

To create an instance of Eddard from some-other-file.php
```
require some-other-file.php;
$foo = new Acme\Tools\Eddard();
```


### Let us shorten things up a bit
```
require some-other-file.php;

use \Acme\Tools\Eddard as SomeStark;

$foo = new Stark();
```


### Global space
Everything that doesn't have a namespace definition - gets put into the global space.
Using datetime inside the global space:
```
$dt = new DateTime();
```


### But if we want to call DateTime inside a namespace?
Either refer to the class by it's fully qualified name:
```
namespace Acme/Tools;

$dt = new \DateTime();
```
Or add a use statement
```
namespace Acme/Tools;

use DateTime;
```