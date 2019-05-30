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

