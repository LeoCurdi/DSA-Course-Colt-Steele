class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {

    constructor(){
        this.root = null;
    }

    insert(value){
        // create new node
        var newNode = new Node(value);
        // if tree is empty - we just have to set root to new node
        if(this.root === null){
            this.root = newNode;
            return this;
        }
        // else we have to find the location to insert
        var current = this.root;
        while(true){ // infinite while loop. we could also do this recursively
            // if the data were trying to insert already exists in the tree
            if(value === current.value) return undefined;
            // if new data is less than current node - traverse left
            if(value < current.value){
                // if we have a space - insert
                if(current.left === null){
                    current.left = newNode;
                    return this;
                }
                // shift
                current = current.left;
            // else - traverse right
            } else {
                // if we have a space - insert
                if(current.right === null){
                    current.right = newNode;
                    return this;
                }
                // shift
                current = current.right;
            }
        }
    }

    // searches for and returns a target node
    find(value){
        // if empty tree - short circuit
        if(this.root === null) return false;
        // else we traverse to find the node
        var current = this.root
        var found = false;
        // while still searching and havent hit a dead end
        while(current && !found){
            // traverse left
            if(value < current.value){
                current = current.left;
            // traverse right
            } else if(value > current.value){
                current = current.right;
            // else we've found our target
            } else {
                found = true;
            }
        }
        if(!found) return undefined;
        return current;
    }

    // searches for and returns a boolean whether a target is found
    // the only difference from find() is what we return
    contains(value){
        // if empty tree - short circuit
        if(this.root === null) return false;
        // else we traverse to find the node
        var current = this.root
        var found = false;
        // while still searching and havent hit a dead end
        while(current && !found){
            // traverse left
            if(value < current.value){
                current = current.left;
            // traverse right
            } else if(value > current.value){
                current = current.right;
            // else we've found our target
            } else {
                return true;
            }
        }
        return false;
    }

    // breadth first search
    // visits every node on a given level before going down to the next level
    BFS(){
        var node = this.root
        var data = [], queue = [];
        queue.push(node);

        while(queue.length){
           node = queue.shift();
           data.push(node.value);
           if(node.left) queue.push(node.left);
           if(node.right) queue.push(node.right);
        }
        return data;
    }


    // depth first searches

    // will add node to list the first time it gets traversed
    // visit node, then go left, then go right
    DFSPreOrder(){
        var data = [];
        function traverse(node){
            data.push(node.value);
            if(node.left) traverse(node.left);
            if(node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }
    // add node the third time it gets traversed
    // go left, then go right, then visit node
    DFSPostOrder(){
        var data = [];
        function traverse(node){
            if(node.left) traverse(node.left);
            if(node.right) traverse(node.right);
            data.push(node.value);
        }
        traverse(this.root);
        return data;
    }
    // this is the one you want if youre looking to view all data in order
    // add node the second time it gets traversed
    // go left, then visit node, then go right
    DFSInOrder(){
        var data = [];
        function traverse(node){
            if(node.left) traverse(node.left);
            data.push(node.value);
            if(node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }
}


//      10
//   5     13
// 2  7  11  16

var tree = new BinarySearchTree();
tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);
tree.DFSPreOrder();
tree.DFSPostOrder();
tree.DFSInOrder();



