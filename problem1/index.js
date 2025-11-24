var sum_to_n_a = function(n) {
    return n * (n + 1) / 2;
};

var sum_to_n_b = function(n) {
    // your code here
    let result = 0
    for(let i = 1; i <= n;i++) {
        result += i
    }
    return result
};

var sum_to_n_b_v2 = function(n) {
    // your code here
    let result = 0
    for(let i = n; i > 0;i--) {
        result += i
    }
    return result
};

var sum_to_n_c = function(n) {
    // your code here
    if(n > 0)
        return n = n + sum_to_n_c(n - 1)
    return n
};

console.log(sum_to_n_a(5))
console.log(sum_to_n_b(5))
console.log(sum_to_n_b_v2(5))
console.log(sum_to_n_c(5))