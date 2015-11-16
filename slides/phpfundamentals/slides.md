# PHP fundamentals part I
<small>[Alexander Ivanov - Karamfil](http://karamfil.avalith.bg)</small>

***

# Types

* Booleans
* Integers
* Floating point numbers
* Strings
* Arrays
* Objects
* Resources
* NULL
* Callbacks / Callables
* classes


# Booleans


## A boolean expresses a truth value. It can be either TRUE or FALSE.


## To specify a boolean literal, use the constants TRUE or FALSE. Both are case-insensitive.
``` 
    $foo = True; // assign the value TRUE to $foo
```


## When converting to boolean, the following values are considered FALSE
* the boolean FALSE itself
* the integer 0 (zero)
* the float 0.0 (zero)
* the empty string, and the string "0"
* an array with zero elements
* an object with zero member variables (PHP 4 only)
* the special type NULL (including unset variables)
* SimpleXML objects created from empty tags


# Integers


## An integer is a number of the set ℤ = {..., -2, -1, 0, 1, 2, ...}
```
    $a = 1234; // decimal number
    $a = -123; // a negative number
```


##Integers can be specified in:
* decimal (base 10)
* hexadecimal (base 16)
* octal (base 8)
* binary (base 2)
* optionally preceded by a sign (- or +).


#Integer literals
```
$a = 1234; // decimal number
$a = -123; // a negative number
$a = 0123; // octal number (equivalent to 83 decimal)
$a = 0x1A; // hexadecimal number (equivalent to 26 decimal)
$a = 0b11111111; // binary number (equivalent to 255 decimal)
```


## Bounds
### If PHP encounters a number beyond the bounds of the integer type, it will be interpreted as a float instead.
* bounds on 32-bit system [-2147483647:2147483647]
* bounds on 64-bit system [-9223372036854775807:9223372036854775807]
* !!!


## Integer division
There is no integer division operator in PHP. 1/2 yields the float 0.5. The value can be casted to an integer to round it towards zero, or the round() function provides finer control over rounding.

function()


# Floating point numbers
## Floating point numbers (also known as "floats", "doubles", or "real numbers") can be specified using any of the following syntaxes:
```
    $a = 1.234; 
    $b = 1.2e3; 
    $c = 7E-10;
```


## To test floating point values for equality, an upper bound on the relative error due to rounding is used. This value is known as the machine epsilon, or unit roundoff, and is the smallest acceptable difference in calculations.
```
    $a = 1.23456789;
    $b = 1.23456780;
    $epsilon = 0.00001;
    
    if(abs($a-$b) < $epsilon) {
        echo "true";
    }
```


# Strings


## A string is series of characters, where a character is the same as a byte. This means that PHP only supports a 256-character set, and hence does not offer native Unicode support.
* Check PHP 7 for unicode
<aside class="notes"> string can be as large as up to 2GB (2147483647 bytes maximum) </aside>


## A string literal can be specified in four different ways
* single quoted
* double quoted
* heredoc syntax
* nowdoc syntax (since PHP 5.3.0)


### The simplest way to specify a string is to enclose it in single quotes
### To specify a literal single quote ('), or literal backslash (\\), escape it with a backslash (\', \\\\)
```
    echo 'this is a simple string';
    // Outputs: this is a simple string"
```
```
    echo 'Arnold once said: "I\'ll be back"';
    // Outputs: Arnold once said: "I'll be back"
```
```
    echo 'You deleted C:\\*.*?';
    // Outputs: You deleted C:\*.*?
```


### Double quoted

```
echo "My name is $name".

$arr
echo "My name is {$arr['']}".
```


### If the string is enclosed in double-quotes ("), PHP will interpret more escape sequences for special characters:
* \n  linefeed (LF or 0x0A (10) in ASCII)
* \r  carriage return (CR or 0x0D (13) in ASCII)
* \t  horizontal tab (HT or 0x09 (9) in ASCII)
* \v  vertical tab (VT or 0x0B (11) in ASCII)
* \e  escape (ESC or 0x1B (27) in ASCII)
* \f  form feed (FF or 0x0C (12) in ASCII)
* \\  backslash
* \$  dollar sign
* \"  double-quote
* \\[0-7]{1,3} regular expression in octal notation
* \x[0-9A-Fa-f]{1,2} regular expression in hexadecimal notation
* \u{[0-9a-f]{1,6}} regular expression is a Unicode codepoint


### A third way to delimit strings is the heredoc syntax: <<<. After this operator, an identifier is provided, then a newline. The string itself follows, and then the same identifier again to close the quotation.the line with the closing identifier must contain no other characters, except a semicolon (;)
```
$str = <<<EOD
Example of string
using heredoc syntax.
EOD;
```
```
$name = 'MyName';
echo <<<EOT
My name is "$name".
This should print a capital 'A': \x41
EOT;

My name is "MyName".
This should print a capital 'A': A
```


### Nowdocs
single-quoted strings what heredocs are to double-quoted strings. A nowdoc is specified similarly to a heredoc, but no parsing is done inside a nowdoc.
```
$str = <<<EOD
Example of string
using heredoc syntax.
EOD;
```
```
$name = 'MyName';
echo <<<EOT
My name is "$name".
This should print a capital 'A': \x41
EOT;

My name is "$name".
This should print a capital 'A': \x41
```


# Arrays
## An array is an ordered map, that associates values to keys


## An array can be created using the array() language construct. It takes any number of comma-separated key => value pairs as arguments.
```
$array = array(
    "foo" => "bar",
    "bar" => "foo",
);
```
```
// as of PHP 5.4
$array = [
    "foo" => "bar",
    "bar" => "foo",
];
```


# Objects


### Initialization: To create a new object, use the new statement to instantiate a class.
```
class foo
{
    function do_foo()
    {
        echo "Doing foo."; 
    }
}

$bar = new foo;
$bar->do_foo();
```


# Resources


### A resource is a special variable, holding a reference to an external resource. Resources are created and used by special functions.


# NULL


### The special NULL value represents a variable with no value. NULL is the only possible value of type null. A variable is considered to be null if:
* it has been assigned the constant NULL.
* it has not been set to any value yet.
* it has been unset().
```
$var = NULL;
```


# Callbacks / Callables


###Some functions like call_user_func() or usort() accept user-defined callback functions as a parameter. Callback functions can not only be simple functions, but also object methods, including static class methods.


### A PHP function is passed by its name as a string.
```
function my_callback_function() {
    echo 'hello world!';
}
call_user_func('my_callback_function');
```
```
class MyClass {
    static function myCallbackMethod() {
        echo 'Hello World!';
    }
}
call_user_func(array('MyClass', 'myCallbackMethod'));

$obj = new MyClass();
call_user_func(array($obj, 'myCallbackMethod'));
```


# Type casting


### PHP does not require (or support) explicit type definition in variable declaration. a variable's type is determined by the context in which the variable is used
* $foo = "0";  // $foo is string (ASCII 48)
* $foo += 2;   // $foo is now an integer (2)
* $foo = $foo + 1.3;  // $foo is now a float (3.3)
* $foo = 5 + "10 Little Piggies"; // $foo is integer (15)
* $foo = 5 + "10 Small Pigs";     // $foo is integer (15)


### Type casting in PHP works much as it does in C: the name of the desired type is written in parentheses before the variable which is to be cast.
```
$foo = 10;   // $foo is an integer
$bar = (boolean) $foo;   // $bar is a boolean
```

* (int), (integer) - cast to integer
* (bool), (boolean) - cast to boolean
* (float), (double), (real) - cast to float
* (string) - cast to string
* (array) - cast to array
* (object) - cast to object
* (unset) - cast to NULL (PHP 5)

***

# Variables
* Basics
* Predefined Variables
* Variable scope
* Variable variables
* Variables From External Sources


# Basics
### Variables in PHP are represented by a dollar sign followed by the name of the variable. The variable name is case-sensitive
<aside class="notes"> $this is a special variable that can't be assigned. </aside>
```
$var = 'Bob';
$Var = 'Joe';
echo "$var, $Var";      // outputs "Bob, Joe"

$4site = 'not yet';     // invalid; starts with a number
$_4site = 'not yet';    // valid; starts with an underscore
$täyte = 'mansikka';    // valid; 'ä' is (Extended) ASCII 228.
```


# Predefined Variables
#### PHP provides a large number of predefined variables to any script which it runs. Many of these variables, however, cannot be fully documented as they are dependent upon which server is running.
#### From version 4.1.0 onward, PHP provides an additional set of predefined arrays containing variables from the web server (if applicable), the environment, and user input.


# Variable scope
#### The scope of a variable is the context within which it is defined. For the most part all PHP variables only have a single scope.
```
$a = 1; /* global scope */ 
function test()
{ 
    echo $a; /* reference to local scope variable */ 
} 
test();
```
```
$a = 1;
$b = 2;
function Sum()
{
    global $a, $b;

    $b = $a + $b;
} 
Sum();
echo $b;
```


# Variable variables
#### Sometimes it is convenient to be able to have variable variable names. That is, a variable name which can be set and used dynamically. A normal variable is set with a statement such as:
```
$a = 'hello';
```
#### A variable variable takes the value of a variable and treats that as the name of a variable. In the above example, hello, can be used as the name of a variable by using two dollar signs. i.e.
```
$$a = 'world';
```
#### At this point two variables have been defined and stored in the PHP symbol tree: $a with contents "hello" and $hello with contents "world".
```
echo "$a ${$a}";
same as
echo "$a $hello";
```


# Variables From External Sources


### When a form is submitted to a PHP script, the information from that form is automatically made available to the script. There are few ways to access this information, for example:
```
<form action="foo.php" method="post">
    Name:  <input type="text" name="username" /><br />
    Email: <input type="text" name="email" /><br />
    <input type="submit" name="submit" value="Submit me!" />
</form>
```
```
echo $_POST['username'];
echo $_REQUEST['username'];
echo $_GET['username'];
```

***

# Constants
### A constant is an identifier (name) for a simple value. As the name suggests, that value cannot change during the execution of the script (except for magic constants, which aren't actually constants). A constant is case-sensitive by default. By convention, constant identifiers are always uppercase.


# Read on php 7


### You can define a constant by using the define()-function or by using the const keyword outside a class definition as of PHP 5.3.0. Once a constant is defined, it can never be changed or undefined.


### A valid constant name starts with a letter or underscore, followed by any number of letters, numbers, or underscores. As a regular expression, it would be expressed thusly: [a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*
```
// Valid constant names
define("FOO",     "something");
define("FOO2",    "something else");
define("FOO_BAR", "something more");
```
```
// Invalid constant names
define("2FOO",    "something");
```


### PHP provides a large number of predefined constants to any script which it runs. There are eight magical constants that change depending on where they are used.
* \_\_LINE__ The current line number of the file.
* \_\_FILE__ The full path and filename of the file.
* \_\_DIR__ The directory of the file.is returned.
* \_\_FUNCTION__ The function name.
* \_\_CLASS__ The class name. Includes the namespace it was declared in (e.g. Foo\Bar).
* \_\_TRAIT__ The trait name. The trait name includes the namespace it was declared in.
* \_\_METHOD__ The class method name.
* \_\_NAMESPACE__ The name of the current namespace.

***

# Expressions


## Expressions are the most important building stones of PHP. In PHP, almost anything you write is an expression. The simplest yet most accurate way to define an expression is "anything that has a value"


## The most basic forms of expressions are constants and variables
```
$a = 5
$b = $a
```


## Slightly more complex examples for expressions are functions
```
function foo ()
{
    return 5;
}
$c = foo()
```
### Functions are expressions with the value of their return value


## A very common type of expressions are comparison expressions. These expressions evaluate to either FALSE or TRUE. See comparison operators.
```
example
```

## Combined operator-assignment expressions
```
$a = $a + 3;
$a + 3;
$b *= 7;
```


## The trenary conditional operator:


### If the value of the first subexpression is TRUE (non-zero), then the second subexpression is evaluated, and that is the result of the conditional expression. Otherwise, the third subexpression is evaluated, and that is the value.
```
// $first ? $second : $third;

$var = 5;
$var_is_greater_than_two = ($var > 2 ? true : false); // returns true
```


### Since PHP 5.3, it is possible to leave out the middle part of the conditional operator.Expression expr1 ?: expr3 returns expr1 if expr1 evaluates to TRUE, and expr3 otherwise.
```
$first ?: $third;
```


## Null coalesce operator:
### The coalesce, or ??, operator is added, which returns the result of its first operand if it exists and is not NULL, or else its second operand:
```
$first ?? $second;
```

***

# Operators


### An operator is something that takes one or more values (or expressions, in programming jargon) and yields another value (so that the construction itself becomes an expression).


## Operators type list
* Arithmetic Operators
* Assignment Operators
* Bitwise Operators
* Comparison Operators
* Error Control Operators
* Execution Operators
* Incrementing/Decrementing Operators
* Logical Operators
* String Operators
* Array Operators
* Type Operators


# Arithmetic Operators
* -$a Negation    Opposite of $a.
* $a + $b Addition    Sum of $a and $b.
* $a - $b Subtraction Difference of $a and $b.
* $a * $b Multiplication  Product of $a and $b.
* $a / $b Division    Quotient of $a and $b.
* $a % $b Modulus Remainder of $a divided by $b.
* $a ** $b Exponentiation  Result of raising $a to the $b'th power


# Assignment Operators
### The basic assignment operator is "=". Left operand gets set to the value of the expression on the right.
```
$a = ($b = 4) + 5; // $a is equal to 9 now, and $b has been set to 4.
```


## Assignment by Reference
### Assignment by reference is also supported, using the "$var = &$othervar;" syntax. Assignment by reference means that both variables end up pointing at the same data, and nothing is copied anywhere.
```
$a = 3;
$b = &$a; // $b is a reference to $a

print "$a\n"; // prints 3
print "$b\n"; // prints 3

$a = 4; // change $a

print "$a\n"; // prints 4
print "$b\n"; // prints 4 as well, since $b is a reference to $a
```


# Bitwise Operators


### Bitwise operators allow evaluation and manipulation of specific bits within an integer.
* $a & $b And Bits that are set in both $a and $b are set.
* $a | $b Or (inclusive or)   Bits that are set in either $a or $b are set.
* $a ^ $b Xor (exclusive or)  Bits that are set in $a or $b but not both are set.
* ~ $a    Not Bits that are set in $a are not set, and vice versa.
* $a << $b    Shift left  Shift the bits of $a $b steps to the left (each step means "multiply by two")
* $a >> $b    Shift right Shift the bits of $a $b steps to the right (each step means "divide by two")


## Examples
```
       1010
       1100
      --------
OR     1110 
      --------
```
```
       1010
       1100
      -------
AND    1000
      -------
```


# Comparison Operators
* $a == $b    Equal   TRUE if $a is equal to $b after type juggling.
* $a === $b   Identical   TRUE if $a is equal to $b, and they are of the same type.
* $a != $b    Not equal   TRUE if $a is not equal to $b after type juggling.
* $a <> $b    Not equal   TRUE if $a is not equal to $b after type juggling.
* $a !== $b   Not identical   TRUE if $a is not equal to $b, or they are not of the same type.
* $a < $b Less than   TRUE if $a is strictly less than $b.


* $a > $b Greater than    TRUE if $a is strictly greater than $b.
* $a <= $b    Less than or equal to   TRUE if $a is less than or equal to $b.
* $a >= $b    Greater than or equal to    TRUE if $a is greater than or equal to $b.
* $a <=> $b   Spaceship   An integer less than, equal to, or greater than zero when $a is respectively less than, equal to, or greater than $b. Available as of PHP 7.
* $a ?? $b ?? $c  Null coalesce   The first operand from left to right that exists and is not NULL. NULL if no values are defined and not NULL. Available as of PHP 7.


# Error Control Operators
### PHP supports one error control operator: the at sign (@). When prepended to an expression in PHP, any error messages that might be generated by that expression will be ignored.
```
/* Intentional file error */
$my_file = @file ('non_existent_file') or
    die ("Failed opening file: error was '$php_errormsg'");

// this works for any expression, not just functions:
$value = @$cache[$key];
// will not issue a notice if the index $key doesn't exist.
```
## ...just don`t use it, man!
<aside class="notes"> The @-operator works only on expressions </aside>


# Execution Operators
### PHP supports one execution operator: backticks (``). PHP will attempt to execute the contents of the backticks as a shell command; the output will be returned. Use of the backtick operator is identical to shell_exec().
```
$output = `ls -al`;
echo "<pre>$output</pre>";
```
<aside class="notes"> The backtick operator is disabled when safe mode is enabled or shell_exec() is disabled. </aside>
<aside class="notes"> Unlike some other languages, backticks have no special meaning within double-quoted strings. </aside>


# Incrementing/Decrementing Operators


## PHP supports C-style pre- and post-increment and decrement operators.
* ++$a    Pre-increment   Increments $a by one, then returns $a.
* $a++    Post-increment  Returns $a, then increments $a by one.
* --$a    Pre-decrement   Decrements $a by one, then returns $a.
* $a--    Post-decrement  Returns $a, then decrements $a by one.


# Logical Operators
* $a and $b   (And) TRUE if both $a and $b are TRUE.
* $a or $b    (Or)  TRUE if either $a or $b is TRUE.
* $a xor $b   (Xor) TRUE if either $a or $b is TRUE, but not both.
* ! $a    (Not) TRUE if $a is not TRUE.
* $a && $b    (And) TRUE if both $a and $b are TRUE.
* $a || $b    (Or)  TRUE if either $a or $b is TRUE.


# String Operators
### There are two string operators - ('.') and ('.=')
<aside class="notes"> The first is the concatenation operator ('.'), which returns the concatenation of its right and left arguments. The second is the concatenating assignment operator ('.='), which appends the argument on the right side to the argument on the left side. </aside>
```
$a = "Hello ";
$b = $a . "World!"; // now $b contains "Hello World!"

$a = "Hello ";
$a .= "World!";     // now $a contains "Hello World!"
```


# Array Operators
* $a + $b (Union)   Union of $a and $b.
* $a == $b    (Equality)    TRUE if $a and $b have the same key/value pairs.
* $a === $b   (Identity)    TRUE if $a and $b have the same key/value pairs in the same order and of the same types.
* $a != $b    (Inequality)  TRUE if $a is not equal to $b.
* $a <> $b    (Inequality)  TRUE if $a is not equal to $b.
* $a !== $b   (Non-identity)    TRUE if $a is not identical to $b.


# Type Operators
### instanceof is used to determine whether a PHP variable is an instantiated object of a certain class
```
class MyClass
{
}

class NotMyClass
{
}
$a = new MyClass;

var_dump($a instanceof MyClass);
var_dump($a instanceof NotMyClass);

bool(true)
bool(false)
```

***
