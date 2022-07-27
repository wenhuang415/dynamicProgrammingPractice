//O(2^n) without memoization
//O(n)
const fibMemo = (n, memo) => {
    memo = memo || {}
    if(memo[n]) return memo[n]
    if(n <= 2) return 1
    return memo[n] = fib(n-1,memo) + fib(n-2,memo)
};

//iterate through array O(n) time and space
const fibTab = (n) => {
    const table = Array(n+1).fill(0)
    table[1] = 1;

    for(let i = 0; i <n; i++) {
        table[i+1] += table[i]
        if(table[i+2] != null) {
            table[i+2] += table[i]
        }
        
    }
    console.log(table)
}
//fibTab(100)

//O(2^(m+n)) without memoization
//O(n*m)
const gridTravelerMemo = (n, m, memo) => {
    //create key for memo
    const key = n + ','+ m
    //check memo
    memo = memo || {}
    if(key in memo) return memo[key]
    if((m==1) && (n==1)) return 1
    if((m==0)||(n==0)) return 0
    return memo[key] = gridTravelerMemo(n-1,m,memo) + gridTravelerMemo(n,m-1,memo)
};

//O(mn) time sapce
const gridTab = (m,n) => {
    const table = Array(m+1)
    .fill()
    .map(() => Array(n+1).fill(0))
    table[1][1] = 1;

    for(let i = 0; i <= m; i++) {
        for(let j = 0; j <= n; j++) {
            const current = table[i][j]
            if(j+1 <= n)table[i][j+1] += current
            if(i+1 <= m)table[i+1][j] += current
        }
    }
    //console.log(table)
    console.log(table[m][n])
}
gridTab(3,3)

//m = target, n = length of arrary
//O(n^m)
//O(n*m) n*m recursive calls
const canSum = (target, numbers, memo={}) => {
    memo = memo || {}
    if(target in memo) return memo[target];
    if(target === 0) return true;
    if(target < 0) return false;

    for(let num of numbers) {
       const remainder = target-num;
       if(canSum(remainder,numbers,memo)) {
            memo[target] = true;
            return true;
       }
    }

    memo[target] = false;
    return false;
};

//m = target, n = length of arrary
//O(n^m * m)  without memoization 
//O(n*m*m) = O(nm^2) (n*m recursive calls and each call copies contents of array m long)
const howSum = (target, numbers, memo={}) => {
    memo = memo || {}
    if(target in memo) return memo[target];
    if(target === 0) return [];
    if(target < 0) return null;

    for(let num of numbers) {
        const remainder = target-num;
        const result = howSum(remainder,numbers,memo);
        if(result !== null) {
            memo[target] = result
            return memo[target];//creates copy of array, copies m times in worse case if number=[1]
        }
    }
    memo[target] = null;
    return null;
};

// console.log(howSum(7,[2,3]))
// console.log(howSum(7,[5,3,4,7]))
// console.log(howSum(8,[5,3,2]))
// console.log(howSum(300,[7,14]))


//m = target, n = length of array
//O(n^m * m) no memoization
//O(nm^2)
const bestSum = (target, numbers, memo) => {
    memo = memo || {}
    if(target in memo) return memo[target];
    if(target === 0) return [];
    if(target < 0) return null;

    let shortestCombo = null;

    for(let num of numbers) {
        const remainder = target - num;
        const remainderCombo = bestSum(remainder,numbers,memo);//returns a numbered array, or null

        if(remainderCombo !== null) {//if not null then we have a combination for the remainder
            const aCombo = [...remainderCombo, num]//add our number into remainder combo for a new combination

            //update shortest if new combo is shorter or if no shortest
            if(shortestCombo===null || aCombo.length < shortestCombo.length) {
                shortestCombo = aCombo;
            }
        }
    }
    memo[target] = shortestCombo;
    return shortestCombo;
}

// console.log(bestSum(7,[5,3,4,7])) // 7
// console.log(bestSum(8,[2,3,5]))//5, 3
// console.log(bestSum(8,[1,4,5]))//4, 4
// console.log(bestSum(100,[1,2,5,25]))//25 ,25,25,25

//m = length of larget, n = length of wordBank
//O(n^m * m) without memoization
//O(nm^2)
const canConstruct = (target, wordBank, memo={}) => {
    memo = memo || {}
    if(target in memo) return memo[target];
    if(target==='') return true;
    
    for(let word of wordBank){
        //check prefix if exists
        if(target.indexOf(word) === 0){
            //cut prefix out of word and pass into recursive call
            const suffix = target.slice(word.length);//copying over part of the target string, worse case m copies
            if(canConstruct(suffix,wordBank,memo)){
                memo[target] = true;
                return true;
            } 
        }
    }
    memo[target] = false;
    return false;
}

// console.log(canConstruct('skateboard',['bo','rd','ate','t','ska','sk','boar'])) //false
// console.log(canConstruct('abcdef',['ab','abc','cd','def','abcd'])) // true
// console.log(canConstruct('',['cat','dog','cow'])) // true
// console.log(canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef',['e','ee','eee','eeee','eeeee','eeeeee']))//false

//m = target length, n = wordBank length
//O(n^m * m) time without memoization O(m^2) space
//O(nm^2) time O(m^2) space
const countConstruct = (target,wordBank,memo={} ) => {
    memo = memo || {}
    if(target in memo) return memo[target];
    if(target==='') return 1;

    let totalCount = 0;

    for(let word of wordBank){
        if(target.indexOf(word) === 0) { //check if valid prefix
            const suffix = target.slice(word.length);//slice prefix off to generate suffix, m steps
            totalCount += countConstruct(suffix,wordBank,memo);
        }

    }
    memo[target] = totalCount;
    return totalCount;
}

// console.log(countConstruct('purple',['purp','p','ur','le','purpl'])) //2
// console.log(countConstruct('skateboard',['bo','rd','ate','t','ska','sk','boar'])) //0
// console.log(countConstruct('abcdef',['ab','abc','cd','def','abcd'])) //1
// console.log(countConstruct('',['cat','dog','cow'])) //1
// console.log(countConstruct('enterapotentpot',['a','p','ent','enter','ot','o','t'])) //4
// console.log(countConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef',['e','ee','eee','eeee','eeeee','eeeeee']))//0

//m = target length, n = wordBank length
//O(n^m) time, O(m) space
const allConstruct = (target, wordBank, memo={}) => {
    memo = memo || {}
    if(target in memo) return memo[target];
    if(target ==='') return [[]];

    const solutions = [];
    for(let word of wordBank){
        if(target.indexOf(word)===0) {
            const suffix = target.slice(word.length);
            const suffixWays = allConstruct(suffix,wordBank,memo);//returns [], or [[]], or [[data]]
            const targetWays = suffixWays.map(way => [word, ...way])//spread suffixes and add prefix to beginning
            solutions.push(...targetWays)//spread solution and add target to end
        }
    }

    memo[target] = solutions;
    return solutions;
}

// console.log((allConstruct('purple',['purp','p','ur','le','purpl']))) //2
// console.log(allConstruct('skateboard',['bo','rd','ate','t','ska','sk','boar'])) //0
// console.log(allConstruct('abcdef',['ab','abc','cd','def','abcd','ef','c'])) //4
// console.log(allConstruct('',['cat','dog','cow'])) //1
// console.log(allConstruct('enterapotentpot',['a','p','ent','enter','ot','o','t'])) //4
// console.log(allConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef',['e','ee','eee','eeee','eeeee','eeeeee']))//0

//tabulation strategy
//visualize it as a table
//size and dimension of table
//seed table trivial answer (base case)
//iterate through table
//fill further positions based on current