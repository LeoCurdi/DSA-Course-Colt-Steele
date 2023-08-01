
// node class
class Node {
    constructor(value) {
        this.value = value; // piece of data
        this.next = null; // reference to next node
    }
}

// list class
class SinglyLinkedList {
    // constructor
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // insert member methods here
    push(val){
        
    }
}

// create a linked list of nodes without even having a list class
// var first = new Node("Hi")
// first.next = new Node("there")
// first.next.next = new Node("how")
// first.next.next.next = new Node("are")
// first.next.next.next.next = new Node("you")

var list = new SinglyLinkedList()
list.push("HELLO")
list.push("GOODBYE")


