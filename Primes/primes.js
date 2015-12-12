var primesSum = 0,
    primeCounter = 0,
    isPrime = function (no) {
        for (var i = 2; i < no; i++) {
            if ((no % i) === 0) {
                return false;
            }
        }
        return true;
};

for (var i=2; primeCounter < 1000; i++) {
   if (isPrime(i)) {
       primeCounter = primeCounter + 1;
       primesSum = primesSum + i;
   }
}

console.log(primesSum);


