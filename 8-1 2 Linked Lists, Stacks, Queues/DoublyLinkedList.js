
class Node {
    constructor(value) {
        this.value = value
        this.prev = null
        this.next = null
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // push to end of list
    push(value) {
        // create a new node
        let newNode = new Node(value)
        // if empty list update head
        if (!this.head) {
            this.head = newNode
        }
        // else update current tail
        else {
            this.tail.next = newNode
            newNode.prev = this.tail
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
        // we dont need to traverse since its doubly linked
        // get target
        let targetNode = this.tail
        // if 1 node in list - head and tail go null
        if (this.length === 1) {
            this.head = null
            this.tail = null
        }
        // else - update tail, tail.next, and target node
        else {
            this.tail = targetNode.prev
            this.tail.next = null
            targetNode.prev = null // we have to make sure removed node loses its lingering connection
        }
        this.length--
        return targetNode
    }

    // shift - remove a node from the beginning of a list
    shift() {
        // check empty list
        if (!this.head) return undefined
        // get target node
        let targetNode = this.head
        // if length is 1 - update head and tail
        if (this.legnth === 1) {
            this.head = null
            this.tail = null
        }
        // else - update head and links
        else {
            this.head = this.head.next
            this.head.prev = null
            targetNode.next = null // sever the removed node
        }
        this.length--
        return targetNode
    }

    // unshift - insert at front
    unshift(value) {
        // create a new node
        let newNode = new Node(value)
        // if empty list - update tail
        if (!this.head) {
            this.tail = newNode
        }
        // else - update links
        else {
            this.head.prev = newNode
            newNode.next = this.head
        }
        // update head either way
        this.head = newNode
        this.length++
        return this;
    }

    // get - get the value at a specific index (o(1) in an array but o(n) in a linked list)
    get(index) {
        // check for invalid index
        if (index < 0 || index >= this.length) return null
        // set up ptr
        let cur, count
        // choose whether to traverse from the head or tail based on which is faster
        // traverse from head
        if (index <= this.length / 2) {
            count = 0
            cur = this.head
            while (count !== index) {
                cur = cur.next
                count++
            } 
        }
        // traverse from tail
        else {
            count = this.length - 1
            cur = this.tail
            while (count !== index) {
                cur = cur.prev
                count--
            } 
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
        prev.next = newNode, newNode.prev = prev
        newNode.next = next, next.prev = newNode
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
        let prev = this.get(index - 1), target = prev.next, next = target.next
        // change the link
        prev.next = next
        next.prev = prev
        // sever the removed node
        target.next = null
        target.prev = null
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
            // update links
            cur.next = prev
            cur.prev = next
/*             let t = cur.prev
            cur.prev = cur.next
            cur.next = t */
            
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
