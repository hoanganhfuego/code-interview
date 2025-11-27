var sum_to_n_a = function(n) {
    return n * (n + 1) / 2;
};

var sum_to_n_b = function(n) {
    let result = 0
    for(let i = 1; i <= n;i++) {
        result += i
    }
    return result
};

var sum_to_n_b_v2 = function(n) {
    let result = 0
    for(let i = n; i > 0;i--) {
        result += i
    }
    return result
};

var sum_to_n_c = function(n) {
    if(n > 0)
        return n = n + sum_to_n_c(n - 1)
    return n
};