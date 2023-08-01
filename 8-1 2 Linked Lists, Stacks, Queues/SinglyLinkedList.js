
// we need a node class
class Node {
    constructor(value) {
        this.value = value; // piece of data
        this.next = null; // reference to next node
    }
}

class SinglyLinkedList {
    // constructor
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    } 

    // push to end of list
    push(value) {
        // create a new node
        let newNode = new Node(value)
        // if empty list update head and tail
        if (!this.head) {
            this.head = newNode
        }
        // else just update current tail
        else {
            this.tail.next = newNode
        }
        // update tail either way
        this.tail = newNode
        // increment length
        this.length++
        // return the new node
        return this
    }

    // pop from end of list
    pop() {
        // if empty list
        if (!this.head) return undefined
        // set up pointers to traverse the list (since its singly linked)
        let cur = this.head, prev = null
        // traverse
        while (cur.next) {
            prev = cur
            cur = cur.next
        } // cur now points to target
        // update tail and length
        this.tail = prev
        this.tail.next = null
        this.length--
        // if list is empty update head
        if (this.length === 0) {
            this.head = null
        }
        return current
    }

    // shift - remove a node from the beginning of a list
    shift() {
        // check empty list
        if (!this.head) return undefined
        // set up ptr
        let cur = this.head
        // update head
        this.head = cur.next
        this.length--
        // if empty update tail
        if (this.length === 0) {
            this.tail = null
        }
        return cur
    }

    // unshift - insert at front
    unshift(value) {
        // create a new node
        let newNode = new Node(value)
        // if empty list - update tail
        if (!this.head) {
            this.tail = newNode
        }
        // update newNode link THEN head
        newNode.next = this.head
        this.head = newNode
        this.length++
        return this;
    }

    // get - get the value at a specific index (o(1) in an array but o(n) in a linked list)
    get(index) {
        // check for invalid index
        if (index < 0 || index >= this.length) return null
        // set up ptr
        let cur = this.head
        let count = 0
        // traverse
        while (count !== index) {
            cur = cur.next
            count++
        } 
        // return the node
        return cur
    }

    // set - update (overwrite) the value at an index 
    set(index, value) {
        // get the node at index using get method
        var targetNode = this.get(index) // get returns a node
        // if it doesnt exist return false
        if (!targetNode) return false
        // update value
        targetNode.value = value
        return true
    }

    // insert at a given index
    insert(index, value) {
        // check for invalid index
        if (index < 0 || index >= this.length) return null
        // if inserting at end - we can call push
        if (index === this.length) return !!this.push(value) // double negate the return of push to coerce it into a boolean value
        // if inserting at front - we can call unShift
        if (index === 0) return !!this.unshift(value) // convert to boolean here too
        // else we must write new code lol
        // make new node
        let newNode = new Node(value)
        // set up ptrs
        let prev = this.get(index - 1), next = prev.next
        // connect the new node
        prev.next = newNode
        newNode.next = next
        this.length++
        return true
    }

    // remove the node at an index
    remove(index) {
        // check for invalid index
        if (index < 0 || index >= this.length) return null
        // if deleting front - call shift
        if (index === 0) return this.shift()
        // if deleting end - call pop
        if (index === this.legnth - 1) return this.pop()
        // else write new code again lol
        // set up ptrs
        let prev = this.get(index - 1), target = prev.next
        // change the link
        prev.next = target.next
        this.length--
        return target
    }

    // reverse the list
    reverse() {
        // swap head and tail
        let temp = this.head
        this.head = this.tail
        this.tail = temp
        // set up ptrs
        let cur = this.tail, next, prev = null
        // iterate
        for (let i = 0; i < this.length; i++) {
            // tail is technically still at the front so we can go through and swap the links
            next = cur.next
            cur.next = prev
            prev = cur
            cur = next
        }
        return this
    }

    // print the list
    print() {
        // make an array to fill with values (this isn't the best way to print it's just convenient)
        var arr = [];
        // set up a pointer
        var current = this.head
        // traverse
        while(current) {
            // push all values to the array
            arr.push(current.val)
            // shift
            current = current.next
        }
        console.log(arr);
    }
}
