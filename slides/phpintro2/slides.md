#PHP Basics
### Part II

***

## PHP Control Structures

***

## Simple control flow


### Let's see IF this sparks your interest
```
if ($a > $b)
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
<?php if ($a == 1): ?>
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

## Iterators


### While
```
$i = 1;
while ($i <= 5)
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


### Require:
Require is idenctical to include for the one difference - if it fails you produce a fatal E_COMPILE_ERROR level error which will halt the script.


### _once
The include_once and require_once commands will first check if the file has already been included and if so - not include(require) it again.


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
Qj patki!
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

***

## Namespaces


### What are namespaces?
Namespaces are a way of encapsulating items.
They solve two main problems in PHP:

  * Name collisions between your code, internal PHP classes/functions/constants and third-party classes/functions/constants
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

To create and instance of Eddard from some-other-file.php
```
require some-other-file.php;
$foo = new \Acme\Tools\Eddard();
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
