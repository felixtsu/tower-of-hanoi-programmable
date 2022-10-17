namespace SpriteKind {
    export const pointer = SpriteKind.create()
    export const disk = SpriteKind.create()
    export const column = SpriteKind.create()
}

//%icon="\uf135" color="#458FAA"
namespace Hanoi {

    export enum difficulty {
        //% block="很简单"
        easy = 3,
        //% block="普普通通"
        normol = 4,
        //% block="有点难"
        difficult = 5
    }
    export enum pillars {
        //% block="一号"
        num1 = 1,
        //% block="二号"
        num2 = 2,
        //% block="三号"
        num3 = 3
    }

    //%block
    //%blockNamespace=Hanoi
    //%block="get the length of the top disk at %pillar" 
    export function getTopDiskLengthOf(pillar:number) {
        let diskPillar = columns[pillar]
        if (diskPillar.length == 0) {
            return 0
        } 

        return getDiskLength(diskPillar[diskPillar.length - 1])
    }

    
    //%block
    //%blockNamespace=Hanoi
    //%block="get number of disk at %pillar" 
    export function getDiskNumber(pillar:number) {
        return columns[pillar].length
    }

    //%block
    //%blockNamespace=Hanoi
    //%block="on game star set difficulty %l=difficulty set speed %s=gamespeed" 
    //%block.loc.zh-CN="当游戏以%l=difficulty的难度开始时 设置速度为%s=gamespeed"
    //%s.defl = gamespeed.normol
    //%l.defl = difficulty.normol
    //%weight=86
    export function onGameStart(l: difficulty = 4, s = 1000, f: () => void) {
        Hanoi.init()
        createDisk(l)
        Hanoi.isgamestart = 1
        Hanoi.speed = s


        game.onUpdate(() => {
            Hanoi.updateDisks()
        })
        f()
    }
   
    export function createDisk(count: number) {
        color = 1
        length = 32
        DiskY = 100
        for (let index = 0; index < count; index++) {
            picture = image.create(length, 8)
            picture.drawRect(0, 0, length, 8, color)
            color += 1
            picture.fillRect(1, 1, length - 2, 6, color)
            color += 1
            圆盘 = sprites.create(picture, SpriteKind.disk)
            圆盘.setPosition(40, DiskY)
            length += -4
            DiskY += -10
            sprites.changeDataNumberBy(圆盘, "length", length)
            columns[0].push(圆盘)
        }
    }

    function getDiskLength(disk:Sprite) {
        return sprites.readDataNumber(disk, "length")

    }

    export function pickUp(pillar:number) {

        pointPosition = pillar
        setPosition()

        if (currentDisk || columns[pillar].length == 0) {
            scene.cameraShake(6, 500)
            pause(speed)
            return false;
        }

        currentDisk = columns[pillar].pop()
        
        pause(speed)
        return true;
    }

    export function putDownDisk(pillar:number) {

        pointPosition = pillar

        if (!currentDisk) {
            scene.cameraShake(6, 500)

            setPosition()

            pause(speed)
            return false
        }

    
        let pillarDisks = columns[pillar]

        if (pillarDisks.length == 0 || getDiskLength(currentDisk) < getDiskLength(pillarDisks[pillarDisks.length - 1])) {
            columns[pillar].push(currentDisk)
            setPosition()
            pause(speed / 2)
            let x = 40 + (pillar) * 3 * 16;
            let y = 100 - (columns[pillar].length - 1) * 10
            currentDisk.setPosition(x, y)
            currentDisk = null
            info.changeScoreBy(1)
            pause(speed)
            return true;
        } else {
            scene.cameraShake(6, 500)

            setPosition()

            pause(speed)
            return false;
        }
        
        
    }

    export function setPosition() {
        if (pointPosition == 0) {
            光标.setPosition(40, 20)
        } else if (pointPosition == 1) {
            光标.setPosition(40 + 16 * 3, 20)
        } else {
            光标.setPosition(40 + 16 * 6, 20)
        }
        if (currentDisk) {
            currentDisk.setPosition(光标.x, 光标.y + 16)
        }
    }
    
    
    export let speed:number = 1000
    let 圆盘: Sprite = null
    let picture: Image = null
    let DiskY = 0
    let length = 0
    let color = 0

    let currentDisk:Sprite = null

    let columns:Sprite[][] = null
    
    let 柱子: Sprite = null
    export let isgamestart = 0
    let pointPosition = 0
    export let 光标: Sprite = null
    
    let distance = 2
    光标 = sprites.create(img`
        . . . . . . 1 1 1 . . . . . . 
        . . . . . . 1 1 1 . . . . . . 
        . . . . . . 1 1 1 . . . . . . 
        . . . . . . 1 1 1 . . . . . . 
        . . . . . . 1 1 1 . . . . . . 
        . . . . . . 1 1 1 . . . . . . 
        . . . . . . 1 1 1 . . . . . . 
        . . . . . . 1 1 1 . . . . . . 
        . . . . . . 1 1 1 . . . . . . 
        . . . . . . 1 1 1 . . . . . . 
        1 1 1 . . . 1 1 1 . . . 1 1 1 
        1 1 1 1 . . 1 1 1 . . 1 1 1 1 
        1 1 1 1 1 . 1 1 1 . 1 1 1 1 1 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        . . 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . . 1 1 1 . . . . . . 
        . . . . . . 1 1 1 . . . . . . 
        `, SpriteKind.pointer)
    export function init() {
        tiles.setCurrentTilemap(tilemap`级别1`)
        scene.centerCameraAt(88, 0)
        setPosition()
        for (let index = 0; index < 3; index++) {
            柱子 = sprites.create(img`
            ......dddd......
            ......dddd......
            ......dddd......
            ......dddd......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            ......bbbb......
            cccccccccccccccc
            cccccccccccccccc
            cccccccccccccccc
            `, SpriteKind.column)
            tiles.placeOnTile(柱子, tiles.getTileLocation(distance, 4))
            distance += 3
            柱子.y += 6
            columns = [[],[],[]]
        }
    }

    export function updateDisks() {

        // 如果有current disk，那么就不停的刷新位置
            
        
    }

}