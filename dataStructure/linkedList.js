(function main() {
    // 生成链表节点
    function node(val) {
        return {
            val,
        }
    }
	
    // 根据数组生成链表结构 
    function getLinkedList(list) {
        var res = node(0)
        var currentNode = res
        for (var index = 0; index < list.length; index++) {
            const val = list[index]
            const emptyNode = node(val)
            currentNode.next = emptyNode
            currentNode = emptyNode
        }
        return res.next
    }

    // 读取并打印列表数据    
    function printLinkedList(linkedList) {
        var str = ''
        var list = linkedList
        while (true){
            if (list.next) {
                str += `${list.val} > `
                list = list.next
            } else {
                str += list.val
                break
            }
        }
        return str
    }
    
    console.log(printLinkedList(getLinkedList([1, 2, 3, 4, 5, 6])))
    
}());
