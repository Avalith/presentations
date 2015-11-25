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
    for(i = 1; $i <= 3; $i++) {
        yield $i;
    }
}

$generator = gen_one_to_three();
foreach(generator as $value) {
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
    foreach(xplode("\n", $input) as $line) {
        $fields = explode(';', $line);
        $id = array_shift($fields);

        yield $id => $fields;
    }
}

foreach(nput_parser($input) as $id => $fields) {
    echo "$id:\n";
    echo "    $fields[0]\n";
    echo "    $fields[1]\n";
}
?>
```


### Yielding null values

```
function gen_three_nulls() {
    foreach(ange(1, 3) as $i) {
        yield;
    }
}

var_dump(iterator_to_array(gen_three_nulls()));
```


### Yielding by reference

```
function &gen_reference() {
    $value = 3;

    while(value > 0) {
        yield $value;
    }
}

foreach(en_reference() as &$number) {
    echo(-$number).'... ';
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

foreach(ount_to_ten() as $num) {
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
foreach(gen as $num) {
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
        if($this->fileHandle = fopen($fileName, 'r')) {
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
        if(alse !== $this->line) {
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
    if($fileHandle = fopen($fileName, 'r')) {
        return;
    }
 
    while(alse !== $line = fgets($fileHandle)) {
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
    abstract public int count(void)
}
```

* ::count - Count elements of an object


### OuterIterator
Classes implementing OuterIterator can be used to iterate over iterators.

```
OuterIterator extends Iterator
{
    /* Methods */
    public Iterator getInnerIterator(void)

    /* Inherited methods */
    abstract public mixed Iterator::current(void)
    abstract public scalar Iterator::key(void)
    abstract public void Iterator::next(void)
    abstract public void Iterator::rewind(void)
    abstract public boolean Iterator::valid(void)
}
```

* ::getInnerIterator - Returns the inner iterator for the current entry.


### RecursiveIterator
Classes implementing RecursiveIterator can be used to iterate over iterators recursively.

```
RecursiveIterator extends Iterator
{
    /* Methods */
    public RecursiveIterator getChildren(void)
    public bool hasChildren(void)
    
    /* Inherited methods */
    abstract public mixed Iterator::current(void)
    abstract public scalar Iterator::key(void)
    abstract public void Iterator::next(void)
    abstract public void Iterator::rewind(void)
    abstract public boolean Iterator::valid(void)
}
```

* ::getChildren - Returns an iterator for the current entry.
* ::hasChildren - Returns if an iterator can be created fot the current entry.


### SeekableIterator
```
SeekableIterator extends Iterator
{
    /* Methods */
    abstract public void seek(int $position)
    
    /* Inherited methods */
    abstract public mixed Iterator::current(void)
    abstract public scalar Iterator::key(void)
    abstract public void Iterator::next(void)
    abstract public void Iterator::rewind(void)
    abstract public boolean Iterator::valid(void)
}
```

* ::seek - Seeks to a position

***

## Predefined Interfaces and Classes


### Traversable
```
if(!is_array($items) && !$items instanceof Traversable)
{
    // $items is not iterable
    // Throw exception here
}
```

* Must be implemented by either IteratorAggregate or Iterator.
* No methods, its only purpose is to be the base interface for all traversable classes.
* Built-in classes that implement this interface can be used in a foreach construct and do not need to implement IteratorAggregate or Iterator.


### Iterator
Interface for external iterators or objects that can be iterated themselves internally.

```
Iterator extends Traversable {
    /* Methods */
    abstract public mixed current(void)
    abstract public scalar key(void)
    abstract public void next(void)
    abstract public void rewind(void)
    abstract public boolean valid(void)
}
```

* ::current - Return the current element
* ::key - Return the key of the current element
* ::next - Move forward to next element
* ::rewind - Rewind the Iterator to the first element
* ::valid - Checks if current position is valid


### IteratorAggregate
Interface to create an external Iterator.

```
IteratorAggregate extends Traversable
{
    /* Methods */
    abstract public Traversable getIterator(void)
}
```

* ::getIterator - Retrieve an external iterator


### Throwable
PHP classes cannot implement the Throwable interface directly, and must instead extend Exception.

```
 Throwable {
    /* Methods */
    abstract public string getMessage(void)
    abstract public int getCode(void)
    abstract public string getFile(void)
    abstract public int getLine(void)
    abstract public array getTrace(void)
    abstract public string getTraceAsString(void)
    abstract public Throwable getPrevious(void)
    abstract public string __toString(void)
}
```

* Throwable is the base interface for any object that can be thrown via a throw statement, including Error and Exception. 


* ::getMessage - Gets the message
* ::getCode - Gets the exception code
* ::getFile - Gets the file in which the exception occurred
* ::getLine - Gets the line on which the object was instantiated
* ::getTrace - Gets the stack trace
* ::getTraceAsString - Gets the stack trace as a string
* ::getPrevious - Returns the previous Throwable
* ::__toString - Gets a string representation of the thrown object


### ArrayAccess
Interface to provide accessing objects as arrays.

```
ArrayAccess
{
    /* Methods */
    abstract public boolean offsetExists(mixed $offset)
    abstract public mixed offsetGet(mixed $offset)
    abstract public void offsetSet(mixed $offset, mixed $value)
    abstract public void offsetUnset(mixed $offset)
}
```

* ::offsetExists - Whether an offset exists
* ::offsetGet - Offset to retrieve
* ::offsetSet - Assign a value to the specified offset
* ::offsetUnset - Unset an offset


### Serializable
Interface for customized serializing.

```
Serializable
{
    /* Methods */
    abstract public string serialize(void)
    abstract public void unserialize(string $serialized)
}
```

* ::serialize - String representation of object
* ::unserialize - Constructs the object


### Closure
Class used to represent anonymous functions.

```
Closure {
    /* Methods */
    private __construct(void)
    public static Closure bind(Closure $closure, 
        object $newthis [, mixed $newscope = "static" ])
    public Closure bindTo(
        object $newthis [, mixed $newscope = "static" ])
    public mixed call(object $newthis [, mixed $... ])
}
```

* ::__construct - Constructor that disallows instantiation
* ::bind - Duplicates a closure with a specific bound object and class scope
* ::bindTo - Duplicates the closure with a new bound object and class scope
* ::call - Binds and calls the closure


### Generator
Generator objects are returned from generators and cannot be instantiated via new.

```
Generator implements Iterator {
    /* Methods */
    public mixed current(void)
    public mixed key(void)
    public void next(void)
    public void rewind(void)
    public mixed send(mixed $value)
    public mixed throw(Exception $exception)
    public bool valid(void)
    public void __wakeup(void)
}
```


* ::current - Get the yielded value
* ::key - Get the yielded key
* ::next - Resume execution of the generator
* ::rewind - Rewind the iterator
* ::send - Send a value to the generator
* ::throw - Throw an exception into the generator
* ::valid - Check if the iterator has been closed
* ::__wakeup - Serialize callback

***

## Datastructures


### SplDoublyLinkedList
The SplDoublyLinkedList class provides the main functionalities of a doubly linked list.

```
SplDoublyLinkedList implements Iterator , ArrayAccess , Countable {
    /* Methods */
    public __construct(void)
    public void add(mixed $index , mixed $newval)
    public mixed bottom(void)
    public int count(void)
    public mixed current(void)
    public int getIteratorMode(void)
    public bool isEmpty(void)
    public mixed key(void)
    public void next(void)
    public bool offsetExists(mixed $index)
    public mixed offsetGet(mixed $index)
    public void offsetSet(mixed $index , mixed $newval)
    public void offsetUnset(mixed $index)
    public mixed pop(void)
    public void prev(void)
    public void push(mixed $value)
    public void rewind(void)
    public string serialize(void)
    public void setIteratorMode(int $mode)
    public mixed shift(void)
    public mixed top(void)
    public void unserialize(string $serialized)
    public void unshift(mixed $value)
    public bool valid(void)
}
```


* ::add - Add/insert a new value at the specified index
* ::bottom - Peeks at the node from the beginning of the doubly linked list
* ::__construct - Constructs a new doubly linked list
* ::count - Counts the number of elements in the doubly linked list.
* ::current - Return current array entry
* ::getIteratorMode - Returns the mode of iteration


* ::isEmpty - Checks whether the doubly linked list is empty.
* ::key - Return current node index
* ::next - Move to next entry
* ::offsetExists - Returns whether the requested $index exists
* ::offsetGet - Returns the value at the specified $index
* ::offsetSet - Sets the value at the specified $index to $newval


* ::offsetUnset - Unsets the value at the specified $index
* ::pop - Pops a node from the end of the doubly linked list
* ::prev - Move to previous entry
* ::push - Pushes an element at the end of the doubly linked list
* ::rewind - Rewind iterator back to the start


* ::serialize - Serializes the storage
* ::setIteratorMode - Sets the mode of iteration
* ::shift - Shifts a node from the beginning of the doubly linked list
* ::top - Peeks at the node from the end of the doubly linked list
* ::unserialize - Unserializes the storage
* ::unshift - Prepends the doubly linked list with an element
* ::valid - Check whether the doubly linked list contains more nodes


### SplStack
The SplStack class provides the main functionalities of a stack implemented using a doubly linked list.

```
SplStack extends SplDoublyLinkedList implements Iterator , ArrayAccess , Countable {
    /* Methods */
    __construct(void)
    void setIteratorMode(int $mode)
    
    /* Inherited methods */
    /* All SplDoublyLinkedList methods */
}
```

* ::__construct - Constructs a new stack implemented using a doubly linked list
* ::setIteratorMode - Sets the mode of iteration


### SplQueue
The SplQueue class provides the main functionalities of a queue implemented using a doubly linked list.

```
SplQueue extends SplDoublyLinkedList implements Iterator , ArrayAccess , Countable {
    /* Methods */
    __construct(void)
    mixed dequeue(void)
    void enqueue(mixed $value)
    void setIteratorMode(int $mode)
    
    /* Inherited methods */
    /* All SplDoublyLinkedList methods */
}
```

* ::__construct - Constructs a new queue implemented using a doubly linked list
* ::dequeue - Dequeues a node from the queue
* ::enqueue - Adds an element to the queue.
* ::setIteratorMode - Sets the mode of iteration


### SplHeap
The SplHeap class provides the main functionalities of a Heap.

```
abstract SplHeap implements Iterator , Countable
{
    /* Methods */
    public __construct(void)
    abstract protected int compare(mixed $value1 , mixed $value2)
    public int count(void)
    public mixed current(void)
    public mixed extract(void)
    public void insert(mixed $value)
    public bool isEmpty(void)
    public mixed key(void)
    public void next(void)
    public void recoverFromCorruption(void)
    public void rewind(void)
    public mixed top(void)
    public bool valid(void)
}
```


* ::compare - Compare elements in order to place them correctly in the heap while sifting up.
* ::__construct - Constructs a new empty heap
* ::count - Counts the number of elements in the heap.
* ::current - Return current node pointed by the iterator
* ::extract - Extracts a node from top of the heap and sift up.
* ::insert - Inserts an element in the heap by sifting it up.
* ::isEmpty - Checks whether the heap is empty.


* ::key - Return current node index
* ::next - Move to the next node
* ::recoverFromCorruption - Recover from the corrupted state and allow further actions on the heap.
* ::rewind - Rewind iterator back to the start(no-op)
* ::top - Peeks at the node from the top of the heap
* ::valid - Check whether the heap contains more nodes


### SplMaxHeap
The SplMaxHeap class provides the main functionalities of a heap, keeping the maximum on the top.

```
SplMaxHeap extends SplHeap implements Iterator , Countable
{
    /* Methods */
    protected int compare(mixed $value1 , mixed $value2)
    
    /* Inherited methods */
    /* All SplHeap methods */
}
```

* ::compare - Compare elements in order to place them correctly in the heap while sifting up.


### SplMinHeap
The SplMinHeap class provides the main functionalities of a heap, keeping the minimum on the top.

```
SplMinHeap extends SplHeap implements Iterator , Countable
{
    /* Methods */
    protected int compare(mixed $value1 , mixed $value2)
    
    /* Inherited methods */
    /* All SplHeap methods */
}
```

* ::compare - Compare elements in order to place them correctly in the heap while sifting up.


### SplPriorityQueue
The SplPriorityQueue class provides the main functionalities of a prioritized queue, implemented using a max heap.

```
SplPriorityQueue implements Iterator , Countable
{
    /* Methods */
    public __construct(void)
    public int compare(mixed $priority1 , mixed $priority2)
    public int count(void)
    public mixed current(void)
    public mixed extract(void)
    public void insert(mixed $value , mixed $priority)
    public bool isEmpty(void)
    public mixed key(void)
    public void next(void)
    public void recoverFromCorruption(void)
    public void rewind(void)
    public void setExtractFlags(int $flags)
    public mixed top(void)
    public bool valid(void)
}
```


* ::compare - Compare priorities in order to place elements correctly in the heap while sifting up.
* ::__construct - Constructs a new empty queue
* ::count - Counts the number of elements in the queue.
* ::current - Return current node pointed by the iterator
* ::extract - Extracts a node from top of the heap and sift up.
* ::insert - Inserts an element in the queue by sifting it up.
* ::isEmpty - Checks whether the queue is empty.


* ::key - Return current node index
* ::next - Move to the next node
* ::recoverFromCorruption - Recover from the corrupted state and allow further actions on the queue.
* ::rewind - Rewind iterator back to the start(no-op)
* ::setExtractFlags - Sets the mode of extraction
* ::top - Peeks at the node from the top of the queue
* ::valid - Check whether the queue contains more nodes


### SplFixedArray
SplFixedArray an array with fixed length and allows only integers within the range as indexes.

```
SplFixedArray implements Iterator , ArrayAccess , Countable
{
    /* Methods */
    public __construct([ int $size = 0 ])
    public int count(void)
    public mixed current(void)
    public static SplFixedArray fromArray(array $array [, bool $save_indexes = true ])
    public int getSize(void)
    public int key(void)
    public void next(void)
    public bool offsetExists(int $index)
    public mixed offsetGet(int $index)
    public void offsetSet(int $index , mixed $newval)
    public void offsetUnset(int $index)
    public void rewind(void)
    public int setSize(int $size)
    public array toArray(void)
    public bool valid(void)
    public void __wakeup(void)
}
```


* ::__construct - Constructs a new fixed array
* ::count - Returns the size of the array
* ::current - Return current array entry
* ::fromArray - Import a PHP array in a SplFixedArray instance
* ::getSize - Gets the size of the array
* ::key - Return current array index
* ::next - Move to next entry
* ::offsetExists - Returns whether the requested index exists


* ::offsetGet - Returns the value at the specified index
* ::offsetSet - Sets a new value at a specified index
* ::offsetUnset - Unsets the value at the specified $index
* ::rewind - Rewind iterator back to the start
* ::setSize - Change the size of an array
* ::toArray - Returns a PHP array from the fixed array
* ::valid - Check whether the array contains more elements
* ::__wakeup - Reinitialises the array after being unserialised


### SplObjectStorage
The SplObjectStorage class provides a map from objects to data or, by ignoring data, an object set.

```
SplObjectStorage implements Countable , Iterator , Serializable , ArrayAccess
{
    /* Methods */
    public void addAll(SplObjectStorage $storage)
    public void attach(object $object [, mixed $data = NULL ])
    public bool contains(object $object)
    public int count(void)
    public object current(void)
    public void detach(object $object)
    public string getHash(object $object)
    public mixed getInfo(void)
    public int key(void)
    public void next(void)
    public bool offsetExists(object $object)
    public mixed offsetGet(object $object)
    public void offsetSet(object $object [, mixed $data = NULL ])
    public void offsetUnset(object $object)
    public void removeAll(SplObjectStorage $storage)
    public void removeAllExcept(SplObjectStorage $storage)
    public void rewind(void)
    public string serialize(void)
    public void setInfo(mixed $data)
    public void unserialize(string $serialized)
    public bool valid(void)
}
```


* ::addAll - Adds all objects from another storage
* ::attach - Adds an object in the storage
* ::contains - Checks if the storage contains a specific object
* ::count - Returns the number of objects in the storage
* ::current - Returns the current storage entry
* ::detach - Removes an object from the storage
* ::getHash - Calculate a unique identifier for the contained objects


* ::getInfo - Returns the data associated with the current iterator entry
* ::key - Returns the index at which the iterator currently is
* ::next - Move to the next entry
* ::offsetExists - Checks whether an object exists in the storage
* ::offsetGet - Returns the data associated with an object
* ::offsetSet - Associates data to an object in the storage
* ::offsetUnset - Removes an object from the storage


* ::removeAll - Removes objects contained in another storage from the current storage
* ::removeAllExcept - Removes all objects except for those contained in another storage from the current storage
* ::rewind - Rewind the iterator to the first storage element
* ::serialize - Serializes the storage
* ::setInfo - Sets the data associated with the current iterator entry
* ::unserialize - Unserializes a storage from its string representation
* ::valid - Returns if the current iterator entry is valid

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
The SplFileInfo class offers a high-level object oriented interface to information for an individual file.

```
 SplFileInfo
 {
    /* Methods */
    public __construct(string $file_name)
    public int getATime(void)
    public string getBasename([ string $suffix ])
    public int getCTime(void)
    public string getExtension(void)
    public SplFileInfo getFileInfo([ string $class_name ])
    public string getFilename(void)
    public int getGroup(void)
    public int getInode(void)
    public string getLinkTarget(void)
    public int getMTime(void)
    public int getOwner(void)
    public string getPath(void)
    public SplFileInfo getPathInfo([ string $class_name ])
    public string getPathname(void)
    public int getPerms(void)
    public string getRealPath(void)
    public int getSize(void)
    public string getType(void)
    public bool isDir(void)
    public bool isExecutable(void)
    public bool isFile(void)
    public bool isLink(void)
    public bool isReadable(void)
    public bool isWritable(void)
    public SplFileObject openFile([ string $open_mode = "r" 
        [, bool $use_include_path = false 
        [, resource $context = NULL ]]])
    public void setFileClass([ string $class_name = "SplFileObject" ])
    public void setInfoClass([ string $class_name = "SplFileInfo" ])
    public void __toString(void)
}
```


* ::__construct - Construct a new SplFileInfo object
* ::getATime - Gets last access time of the file
* ::getBasename - Gets the base name of the file
* ::getCTime - Gets the inode change time
* ::getExtension - Gets the file extension
* ::getFileInfo - Gets an SplFileInfo object for the file
* ::getFilename - Gets the filename


* ::getGroup - Gets the file group
* ::getInode - Gets the inode for the file
* ::getLinkTarget - Gets the target of a link
* ::getMTime - Gets the last modified time
* ::getOwner - Gets the owner of the file
* ::getPath - Gets the path without filename
* ::getPathInfo - Gets an SplFileInfo object for the path


* ::getPathname - Gets the path to the file
* ::getPerms - Gets file permissions
* ::getRealPath - Gets absolute path to file
* ::getSize - Gets file size
* ::getType - Gets file type
* ::isDir - Tells if the file is a directory
* ::isExecutable - Tells if the file is executable
* ::isFile - Tells if the object references a regular file


* ::isLink - Tells if the file is a link
* ::isReadable - Tells if file is readable
* ::isWritable - Tells if the entry is writable
* ::openFile - Gets an SplFileObject object for the file
* ::setFileClass - Sets the class used with SplFileInfo::openFile
* ::setInfoClass - Sets the class used with SplFileInfo::getFileInfo and SplFileInfo::getPathInfo
* ::__toString - Returns the path to the file as a string


### SplFileObject
The SplFileObject class offers an object oriented interface for a file.

```
 SplFileObject extends SplFileInfo implements RecursiveIterator , SeekableIterator
 {
    /* Constants */
    const integer DROP_NEW_LINE = 1 ;
    const integer READ_AHEAD = 2 ;
    const integer SKIP_EMPTY = 4 ;
    const integer READ_CSV = 8 ;
    
    /* Methods */
    public string|array current(void)
    public bool eof(void)
    public bool fflush(void)
    public string fgetc(void)
    public array fgetcsv([ string $delimiter = "," 
        [, string $enclosure = "\"" [, string $escape = "\\" ]]])
    public string fgets(void)
    public string fgetss([ string $allowable_tags ])
    public bool flock(int $operation [, int &$wouldblock ])
    public int fpassthru(void)
    public int fputcsv(array $fields [, string $delimiter = "," 
        [, string $enclosure = '"' [, string $escape = "\" ]]])
    public string fread(int $length)
    public mixed fscanf(string $format [, mixed &$... ])
    public int fseek(int $offset [, int $whence = SEEK_SET ])
    public array fstat(void)
    public int ftell(void)
    public bool ftruncate(int $size)
    public int fwrite(string $str [, int $length ])
    public void getChildren(void)
    public array getCsvControl(void)
    public int getFlags(void)
    public int getMaxLineLen(void)
    public bool hasChildren(void)
    public int key(void)
    public void next(void)
    public void rewind(void)
    public void seek(int $line_pos)
    public void setCsvControl([ string $delimiter = "," 
        [, string $enclosure = "\"" [, string $escape = "\\" ]]])
    public void setFlags(int $flags)
    public void setMaxLineLen(int $max_len)
    public void __toString(void)
    public bool valid(void)
    
    /* Inherited methods */
    /* All SplFileInfo methods */
```


* ::DROP_NEW_LINE - Drop newlines at the end of a line.
* ::READ_AHEAD - Read on rewind/next.
* ::SKIP_EMPTY - Skips empty lines in the file. This requires the READ_AHEAD flag be enabled, to work as expected.
* ::READ_CSV - Read lines as CSV rows.


* ::__construct - Construct a new file object.
* ::current - Retrieve current line of file
* ::eof - Reached end of file
* ::fflush - Flushes the output to the file
* ::fgetc - Gets character from file
* ::fgetcsv - Gets line from file and parse as CSV fields
* ::fgets - Gets line from file
* ::fgetss - Gets line from file and strip HTML tags


* ::flock - Portable file locking
* ::fpassthru - Output all remaining data on a file pointer
* ::fputcsv - Write a field array as a CSV line
* ::fread - Read from file
* ::fscanf - Parses input from file according to a format
* ::fseek - Seek to a position
* ::fstat - Gets information about the file
* ::ftell - Return current file position
* ::ftruncate - Truncates the file to a given length


* ::fwrite - Write to file
* ::getChildren - No purpose
* ::getCsvControl - Get the delimiter and enclosure character for CSV
* ::getCurrentLine - Alias of SplFileObject::fgets
* ::getFlags - Gets flags for the SplFileObject
* ::getMaxLineLen - Get maximum line length
* ::hasChildren - SplFileObject does not have children
* ::key - Get line number


* ::next - Read next line
* ::rewind - Rewind the file to the first line
* ::seek - Seek to specified line
* ::setCsvControl - Set the delimiter and enclosure character for CSV
* ::setFlags - Sets flags for the SplFileObject
* ::setMaxLineLen - Set maximum line length
* ::__toString - Alias of SplFileObject::current
* ::valid - Not at EOF



### SplTempFileObject
The SplTempFileObject class offers an object oriented interface for a temporary file.

```
SplTempFileObject extends SplFileObject implements SeekableIterator , RecursiveIterator
{
    /* Methods */
    public __construct([ int $max_memory ])
    
    /* Inherited methods */
    /* All SplFileObject methods */
}
```

* ::__construct - Construct a new temporary file object

***

## Miscellaneous Classes and Interfaces


### ArrayObject
This class allows objects to work as arrays.

```
ArrayObject implements IteratorAggregate , ArrayAccess , Serializable , Countable
{
    /* Constants */
    const integer STD_PROP_LIST = 1 ;
    const integer ARRAY_AS_PROPS = 2 ;
    
    /* Methods */
    public __construct([ mixed $input = [] [, int $flags = 0 
        [, string $iterator_class = "ArrayIterator" ]]])
    public void append(mixed $value)
    public void asort(void)
    public int count(void)
    public array exchangeArray(mixed $input)
    public array getArrayCopy(void)
    public int getFlags(void)
    public ArrayIterator getIterator(void)
    public string getIteratorClass(void)
    public void ksort(void)
    public void natcasesort(void)
    public void natsort(void)
    public bool offsetExists(mixed $index)
    public mixed offsetGet(mixed $index)
    public void offsetSet(mixed $index , mixed $newval)
    public void offsetUnset(mixed $index)
    public string serialize(void)
    public void setFlags(int $flags)
    public void setIteratorClass(string $iterator_class)
    public void uasort(callable $cmp_function)
    public void uksort(callable $cmp_function)
    public void unserialize(string $serialized)
}
```


* ::STD_PROP_LIST - Properties of the object have their normal functionality when accessed as list (var_dump, foreach, etc.).
* ::ARRAY_AS_PROPS - Entries can be accessed as properties (read and write).


* ::append - Appends the value
* ::asort - Sort the entries by value
* ::__construct - Construct a new array object
* ::count - Get the number of public properties in the ArrayObject
* ::exchangeArray - Exchange the array for another one.
* ::getArrayCopy - Creates a copy of the ArrayObject.
* ::getFlags - Gets the behavior flags.


* ::getIterator - Create a new iterator from an ArrayObject instance
* ::getIteratorClass - Gets the iterator classname for the ArrayObject.
* ::ksort - Sort the entries by key
* ::natcasesort - Sort an array using a case insensitive "natural order" algorithm
* ::natsort - Sort entries using a "natural order" algorithm
* ::offsetExists - Returns whether the requested index exists
* ::offsetGet - Returns the value at the specified index


* ::offsetSet - Sets the value at the specified index to newval
* ::offsetUnset - Unsets the value at the specified index
* ::serialize - Serialize an ArrayObject
* ::setFlags - Sets the behavior flags.
* ::setIteratorClass - Sets the iterator classname for the ArrayObject.
* ::uasort - Sort the entries with a user-defined comparison function and maintain key association
* ::uksort - Sort the entries by keys using a user-defined comparison function
* ::unserialize - Unserialize an ArrayObject


### SplObserver
The SplObserver interface is used alongside SplSubject to implement the Observer Design Pattern.

```
SplObserver
{
    /* Methods */
    abstract public void update(SplSubject $subject)
}
```

* ::update — Receive update from subject


### SplSubject
The SplSubject interface is used alongside SplObserver to implement the Observer Design Pattern.

```
SplSubject
{
    /* Methods */
    abstract public void attach(SplObserver $observer)
    abstract public void detach(SplObserver $observer)
    abstract public void notify(void)
}
```

* ::attach — Attach an SplObserver
* ::detach — Detach an observer
* ::notify — Notify an observer

***

### Library

* https://secure.php.net/manual/en/language.generators.php

* https://secure.php.net/manual/en/spl.interfaces.php

* https://secure.php.net/manual/en/reserved.interfaces.php

* https://secure.php.net/manual/en/book.spl.php

***

# THE
(FUCKING ANNOYING THIS WAS)
# END