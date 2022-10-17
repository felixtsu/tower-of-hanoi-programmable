let DISK_NUMBER = 5
let STEP_INTERVAL = 1000
Hanoi.onGameStart(DISK_NUMBER, STEP_INTERVAL, function solveHanoi() {
    // 有两个已经写好的函数可以操作盘子
    //  这个函数可以将第0号柱子（最左边）最上面的盘子拿起来
    Hanoi.pickUp(0)
    //  这个函数可以将第2号当前拿在手里的盘子放到2好柱子上(最右边)
    Hanoi.putDownDisk(2)
    //  这个函数可以拿到1号柱子(中间的)有几个盘
    //  Hanoi.get_disk_number(1)
    //  这个函数可以拿到1号柱子(中间的)最上面的盘的宽度，如果没有盘，就返回0
    //  Hanoi.get_top_disk_length_of(1)
    //  尝试写这个函数，自动的把碟片搬到最右边的柱子上
    
})
