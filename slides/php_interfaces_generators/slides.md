#PHP Interfaces, Generators & other shit

***

## Generators Overview


### Generators 

* Provides methods that can be called to manipulate the state of the generator, including sending values to and returning values from it. 

* No Iterator interface.

* No need to build an array in memory.

* It's not returning once, but as many times as it needs to.

* They are forward-only iterators


### A simple example of this is to reimplement the range() function as a generator. 

* Calling range(0, 1000000) will result in well over 100 MB of memory being used.

* Implementing an xrange() generator will only need enough memory to create an Iterator object, which turns out to be less than 1 kilobyte. 


### Example - Implementing range() as a generator

```
function xrange($start, $limit, $step = 1)
{
    if($start < $limit) {
       if($step <= 0){ throw new LogicException('Step must be +ve'); }
        
       for($i = $start; $i <= $limit; $i += $step){ yield $i; }
    }
    else {
       if($step >= 0){ throw new LogicException('Step must be -ve'); }
        
       for($i = $start; $i >= $limit; $i += $step){ yield $i; }
    }
}

foreach(range(1, 9, 2) as $number){ echo "$number "; }
foreach(xrange(1, 9, 2) as $number){ echo "$number "; }
```
Both range() and xrange() will result in the same output - 1 3 5 7 9

***

## Generator syntax


### Keyword - yield

```
function gen_one_to_three() {
    for ($i = 1; $i <= 3; $i++) {
        yield $i;
    }
}

$generator = gen_one_to_three();
foreach ($generator as $value) {
    echo "$value ";
}
```
* Note that $i is preserved between yields.


### Yielding a key/value pair

```
$input = <<<'EOF'
1;PHP;Likes dollar signs
2;Python;Likes whitespace
3;Ruby;Likes blocks
EOF;

function input_parser($input) {
    foreach (explode("\n", $input) as $line) {
        $fields = explode(';', $line);
        $id = array_shift($fields);

        yield $id => $fields;
    }
}

foreach (input_parser($input) as $id => $fields) {
    echo "$id:\n";
    echo "    $fields[0]\n";
    echo "    $fields[1]\n";
}
?>
```


### Yielding null values

```
function gen_three_nulls() {
    foreach (range(1, 3) as $i) {
        yield;
    }
}

var_dump(iterator_to_array(gen_three_nulls()));
```


### Yielding by reference

```
function &gen_reference() {
    $value = 3;

    while ($value > 0) {
        yield $value;
    }
}

foreach (gen_reference() as &$number) {
    echo (--$number).'... ';
}
```
* Note that we can change $number within the loop, and
because the generator is yielding references, $value
within gen_reference() changes.
* result = 2... 1... 0... 


### Generator delegation via yield from

```
function count_to_ten() {
    yield 1;
    yield 2;
    yield from [3, 4];
    yield from new ArrayIterator([5, 6]);
    yield from seven_eight();
    yield 9;
    yield 10;
}

function seven_eight() {
    yield 7;
    yield from eight();
}

function eight() {
    yield 8;
}

foreach (count_to_ten() as $num) {
    echo "$num ";
}
```


### Yield from and return values

```
function count_to_ten() {
    yield 1;
    yield 2;
    yield from [3, 4];
    yield from new ArrayIterator([5, 6]);
    yield from seven_eight();
    return yield from nine_ten();
}

function seven_eight() {
    yield 7;
    yield from eight();
}

function eight() {
    yield 8;
}

function nine_ten() {
    yield 9;
    return 10;
}

$gen = count_to_ten();
foreach ($gen as $num) {
    echo "$num ";
}
echo $gen->getReturn();
```

***

## Comparing generators with Iterator objects


### Iterator
```
class LineIterator implements Iterator {
    protected $fileHandle;
 
    protected $line;
    protected $i;
 
    public function __construct($fileName) {
        if (!$this->fileHandle = fopen($fileName, 'r')) {
            throw new RuntimeException('Couldn\'t open file "' . $fileName . '"');
        }
    }
 
    public function rewind() {
        fseek($this->fileHandle, 0);
        $this->line = fgets($this->fileHandle);
        $this->i = 0;
    }
 
    public function valid() {
        return false !== $this->line;
    }
 
    public function current() {
        return $this->line;
    }
 
    public function key() {
        return $this->i;
    }
 
    public function next() {
        if (false !== $this->line) {
            $this->line = fgets($this->fileHandle);
            $this->i++;
        }
    }
 
    public function __destruct() {
        fclose($this->fileHandle);
    }
}
```


### Generator
```
function getLinesFromFile($fileName) {
    if (!$fileHandle = fopen($fileName, 'r')) {
        return;
    }
 
    while (false !== $line = fgets($fileHandle)) {
        yield $line;
    }
 
    fclose($fileHandle);
}
```

***

## Interfaces


### Countable
Classes implementing Countable can be used with the count() function.

```
Countable
{
    /* Methods */
    abstract public int count ( void )
}
```

* Countable::count — Count elements of an object


### OuterIterator
Classes implementing OuterIterator can be used to iterate over iterators.

```
OuterIterator extends Iterator
{
    /* Methods */
    public Iterator getInnerIterator ( void )

    /* Inherited methods */
    abstract public mixed Iterator::current ( void )
    abstract public scalar Iterator::key ( void )
    abstract public void Iterator::next ( void )
    abstract public void Iterator::rewind ( void )
    abstract public boolean Iterator::valid ( void )
}
```

* OuterIterator::getInnerIterator — Returns the inner iterator for the current entry.


### RecursiveIterator
Classes implementing RecursiveIterator can be used to iterate over iterators recursively.

```
RecursiveIterator extends Iterator
{
    /* Methods */
    public RecursiveIterator getChildren ( void )
    public bool hasChildren ( void )
    
    /* Inherited methods */
    abstract public mixed Iterator::current ( void )
    abstract public scalar Iterator::key ( void )
    abstract public void Iterator::next ( void )
    abstract public void Iterator::rewind ( void )
    abstract public boolean Iterator::valid ( void )
}
```

* RecursiveIterator::getChildren — Returns an iterator for the current entry.
* RecursiveIterator::hasChildren — Returns if an iterator can be created fot the current entry.


### SeekableIterator
```
SeekableIterator extends Iterator
{
    /* Methods */
    abstract public void seek ( int $position )
    
    /* Inherited methods */
    abstract public mixed Iterator::current ( void )
    abstract public scalar Iterator::key ( void )
    abstract public void Iterator::next ( void )
    abstract public void Iterator::rewind ( void )
    abstract public boolean Iterator::valid ( void )
}
```

* SeekableIterator::seek — Seeks to a position

***

## Predefined Interfaces and Classes
asd
```
```


### Traversable
asd
```
```


### Iterator
asd
```
```


### IteratorAggregate
asd
```
```


### Throwable
asd
```
```


### ArrayAccess
asd
```
```


### Serializable
asd
```
```


### Closure
asd
```
```


### Generator
asd
```
```

***

## Datastructures


### SplDoublyLinkedList
asd
```
```


### SplStack
asd
```
```


### SplQueue
asd
```
```


### SplHeap
asd
```
```


### SplMaxHeap
asd
```
```


### SplMinHeap
asd
```
```


### SplPriorityQueue
asd
```
```


### SplFixedArray
asd
```
```


### SplObjectStorage
asd
```
```

***

## Iterators


### AppendIterator
asd
```
```


### ArrayIterator
asd
```
```


### CachingIterator
asd
```
```


### CallbackFilterIterator
asd
```
```


### DirectoryIterator
asd
```
```


### EmptyIterator
asd
```
```


### FilesystemIterator
asd
```
```


### FilterIterator
asd
```
```


### GlobIterator
asd
```
```


### InfiniteIterator
asd
```
```


### IteratorIterator
asd
```
```


### LimitIterator
asd
```
```


### MultipleIterator
asd
```
```


### NoRewindIterator
asd
```
```


### ParentIterator
asd
```
```


### RecursiveArrayIterator
asd
```
```


### RecursiveCachingIterator
asd
```
```


### RecursiveCallbackFilterIterator
asd
```
```


### RecursiveDirectoryIterator
asd
```
```


### RecursiveFilterIterator
asd
```
```


### RecursiveIteratorIterator
asd
```
```


### RecursiveRegexIterator
asd
```
```


### RecursiveTreeIterator
asd
```
```


### RegexIterator
asd
```
```

***

## File Handling


### SplFileInfo
asd
```
```


### SplFileObject
asd
```
```


### SplTempFileObject
asd
```
```

