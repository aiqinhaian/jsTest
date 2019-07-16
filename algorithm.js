// 简单查找 O(n)
const simpleSearch = (v, arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === v) {
            return i
        }
    }
    return null
}

// 二分查找 O(log(n))
const binarySearch = (v, arr) => {
    let low = 0
    let high = arr.length - 1

    while(low <= high) {
        const middle = Math.floor((low + high) / 2)
        const guess = arr[middle]
        if (guess === v) {
            return middle
        }
        low = v > guess ? middle + 1 : low
        high = v < guess ? middle - 1 : high
    }

    return 'end'
}


// 选择排序 O(n^2)
const findSmallest = arr => {
    if (arr.length === 0) {
        return 0
    }
    let smallLest = arr[0]
    let smallLestIndex = 0
    for (let i = 0; i < arr.length; i++) {
        const v = arr[i]
        if (v < smallLest) {
            smallLest = v 
            smallLestIndex = i
        }
    }

    return smallLestIndex
}

const selectionSort = arr => {
    let newArr = []
    while(arr.length > 0) {
        const smallLestIndex = findSmallest(arr)
        newArr.push(arr[smallLestIndex])
        arr.splice(smallLestIndex, 1)
    }
    return newArr
}

// 快速排序 分而治之 D&C divide and conquer  O(n*logn)
const qsort = arr => {
    if (arr.length === 1 || arr.length === 0) {
        return arr
    }
    const pivot = arr[0]
    const smallList = arr.slice(1).filter(i => i <= pivot) 
    const bigList = arr.slice(1).filter(i => i > pivot) 
    
    return [...qsort(smallList), pivot, ...qsort(bigList)]
}

// 递归 实现 阶乘
// 线性递归
const facttail = v => {
    return v <= 1 ? v : v * facttail(v - 1)
}
// 尾递归
const tailFacttail = (v, s = 1) => {
    return v <= 1 ? s : tailFacttail(v - 1, s * v)
}

/**************************************************************************/
/**
 * 给定一个正整数组a，是否能以3个数为边长构成三角形?
• 即是否存在不同的i，j，k，
• 满足 a[i] < a[j] + a[k]
• 并且 a[j] < a[i] + a[k]
• 并且 a[k] < a[i] + a[j]
 */
const getTriggleValues1 = (arr) => {
    // 方法1， 穷举
    const isTriggleValues = (v1, v2, v3) =>
        v1 + v2 > v3 && v1 + v3 > v2 && v2 + v3 > v1
    const len = arr.length
    const res = []
    for (let i = 0; i < len - 2; i++) {
        for (let j = i + 1; j < len - 1; j++) {
            for (let m = j + 1; m < len; m++) {
                const values = [arr[i], arr[j], arr[m]]
                if (isTriggleValues(...values)) {
                    res.push(values)
                }
            }
        }
    }
    return res
}

const getTriggleValues2 = (arr) => {
    // 方法2： 先排序，减少最后一层循环操作
    const len = arr.length
    const res = []
    arr.sort((a, b) => a - b)
    for (let i = 0; i < len - 2; i++) {
        for (let j = i + 1; j < len - 1; j++) {
            for (let m = j + 1; m < len; m++) {
                if (arr[i] + arr[j] > arr[m]) {
                    res.push([arr[i], arr[j], arr[m]])
                } else {
                    break;
                }
            }
        }
    }
    return res
}


/**
 * 给定一个整数数组 nums ，找出一个序列中乘积最大的连续子序列（该序列至少包含一个数）。
 *  输入: [2,3,-2,4]
    输出: 6
    解释: 子数组 [2,3] 有最大乘积 6。
 */
var maxProduct = function(nums) {
    let max = nums[0];
    let tempMin = nums[0];
    let tempMax = nums[0];
    const len = nums.length;

    // 由于乘积的话，需要考虑最大负数的情况，所以需要存储最小值，当循环的乘数变为负数时，最小值和最大值互换位置
    for (let i = 1; i < len; i++) {
        const v = nums[i];
        if (v < 0) {
            [tempMin, tempMax] = [tempMax, tempMin];   
        }
        tempMax = Math.max(v, tempMax * v);
        tempMin = Math.min(v, tempMin * v);
        
        max = Math.max(tempMax, max)
    }
    
    return max
}

/**
 * 最小栈: 设计一个支持 push，pop，top 操作，并能在常数时间内检索到最小元素的栈。
    push(x) -- 将元素 x 推入栈中。
    pop() -- 删除栈顶的元素。
    top() -- 获取栈顶元素。
    getMin() -- 检索栈中的最小元素。
 */
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.arr = []
    this.min = Infinity;
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  if (x < this.min) {
      this.min = x;
  }
  this.arr.push(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    const len = this.arr.length
    if (!len) {
        return null
    }
    
    const lastV = this.arr.pop();
    if (lastV === this.min) {
        this.min = Math.min(...this.arr)
    }
    
    return null;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    const len = this.arr.length
    try {
        return len === 0 ? null : this.arr[len - 1]
    } catch (e) {
        console.log(e)
    }
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min
};


/**
 * @param {array}
 * @return {number}
 * 给定一个未排序的整数数组，找出最长连续序列的长度。要求算法的时间复杂度为 O(n)。
 * 示例:
 * 输入: [100, 4, 200, 1, 3, 2]
 * 输出: 4
 * 解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。
 */
var longestConsecutive = function(nums) {
    if (nums.length === 0) {
        return 0
    }
    const arr = Array.from(new Set(nums))
    const m = {}
    for (let i = 0; i < arr.length; i++) {
        const v = arr[i]
        if (m[v - 1] && m[v + 1]) {
            m[m[v - 1][0]][1] = m[v + 1][1]
            m[m[v + 1][1]][0] = m[v - 1][0]
        } else if (m[v - 1]) {
            m[v - 1][1] = v
            m[v] = m[v - 1]
        } else if (m[v + 1]) {
            m[v + 1][0] = v
            m[v] = m[v + 1]
        } else {
            m[v] = [v, v]
        }
    }
    return Math.max(...Object.values(m).map(item => item[1] - item[0] + 1))
}

const test = () => {
    
}

test()
