
/* 
	- hash function should be fast as we need to use it each time we go to access values in the array
	- we also need the output to be small bc we dont want to store things at say index 1 trillion
	- we want it to distribute stuff evenly throughout the array
	- Note: this will not be a cryptographically secure hash function
*/

function hash(key, arrayLength) {
    // were going to use the ASCII char codes for the hash
    let total = 0
    for (let char of key) {
        let value = char.charCodeAt(0) - 96 // subtract 96 from the ascii value to get the char's position in the alphabet (a will give 0)
        // mod will ensure the resulting hash is an index within the array
        total = (total + value) % arrayLength // we could have just modded total at the end but this is some variety
    }
    return total
}
// Problems with above function: not constant time (we have o(n)), not random enough, only hashes strings


function betterHash(key, arrayLength) {
    let total = 0;
    // hash functions almost always use prime numbers to spread out (randomize) hash outputs
    let WEIRD_PRIME = 31;
    // well cut the loop at 100 iterations so we get o(1) time. this means only the first 100 chars of a long string will be used
    for (let i = 0; i < Math.min(key.length, 100); i++) {
        let value = key.charCodeAt(i) - 96
        total = (total * WEIRD_PRIME + value) % arrayLength;
    }
    return total;
}


