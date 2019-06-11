class Game_over {
    constructor(x, y, energy) {
        this.x = x;
        this.y = y;
        this.energy = energy
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(character) {
        this.getNewDirections()
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;

    }

    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 350) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            var gm = new Game_over(newX, newY, 400)
            gameArr.push(gm)
        }
    }

    move() {
        var empty = random(this.chooseCell(0))
        this.energy += 2;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }

    eat() {
        var food1 = this.chooseCell(1)
        var food3 = this.chooseCell(3)
        var food4 = this.chooseCell(4)
        var food2 = this.chooseCell(2)
        var food = random(food1.concat(food3, food2, food4));
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                    this.energy++
                }
            }
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == newX && xotakerArr[i].y == newY) {
                    xotakerArr.splice(i, 1)
                    this.energy += 2
                }
            }
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == newX && gishatichArr[i].y == newY) {
                    gishatichArr.splice(i, 1)
                    this.energy += 5
                }
            }
            for (var i in angelArr) {
                if (angelArr[i].x == this.x && angelArr[i].y == this.y) {
                    angelArr.splice(i, 1)
                    this.energy += 6
                }
            }
            this.x = newX
            this.y = newY
            }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in gameArr) {
                if (gameArr[i].x == this.x && gameArr[i].y == this.y) {
                    gameArr.splice(i, 1)
                }
            }
        }
    }
}