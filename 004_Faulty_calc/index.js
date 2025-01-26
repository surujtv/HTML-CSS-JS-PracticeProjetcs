/*
Problem statement:
Create a faulty calculator that gives the wrong answer for the following operations:
+ ---> -
* ---> +
- ---> /
/ ---> **

##It perform wrong operation 10% of the time.

*/ 

// Solution:

function calculator(a, b, operation) {
    // 10% chance of faulty operation
    if (Math.random() > 0.1) {
        // Perform faulty operation
        switch (operation) {
            case '+':
                return a - b;
            case '*':
                return a + b;
            case '-':
                return a / b;
            case '/':
                return a ** b;
        }
    }
}

// Test cases
console.log(calculator(5, 2, '+'));
console.log(calculator(5, 2, '*'));
console.log(calculator(5, 2, '-'));