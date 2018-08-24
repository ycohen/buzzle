(function() {
    function init() {
        canvas = jQuery('#gameBoard')[0];
        var ctx = canvas.getContext('2d');

        setInterval(function() {
            board.disks.forEach(function(disk) {
                disk.rotation += Math.PI / 48;
                disk.rotation %= (2 * Math.PI)
                drawDisk(disk, ctx);
            });
        }, 20);
    }
    
    function drawDisk(disk, ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'brown';
        if (disk.row % 2 == 0) {
            var x = 2 * disk.radius * (disk.col + 1);
            var y = (disk.row * Math.sqrt(3) + 1) * disk.radius;
        } else {
            var x = disk.radius * (2 * disk.col + 1);
            var y = (disk.row * Math.sqrt(3) + 1) * disk.radius;
        }
        ctx.arc(x, y, disk.radius, 0, Math.PI* 2, true);
        ctx.fill();

        ctx.fillStyle = 'grey';
        
        disk.triangles().forEach(function(triangle) {
            drawTriangle(triangle, ctx)
        });
    }

    function drawTriangle(vertices, ctx) {
        ctx.beginPath();
        ctx.moveTo(vertices[vertices.length - 1].x, vertices[vertices.length - 1].y);

        vertices.forEach(function(vertex) {
            ctx.lineTo(vertex.x, vertex.y);
        });
        ctx.fill();
        ctx.stroke();
    }

    function rotateAround(points, centre, radians) {
        return points.map(function(point) {
            var x = point.x - centre.x;
            var y = point.y - centre.y;
            return {x: x * Math.cos(radians) - y * Math.sin(radians) + centre.x,
                    y: x * Math.sin(radians) + y * Math.cos(radians) + centre.y};
        });
    }
    
    board = {
        disks: [
            new Disk(0, 0),
            new Disk(0, 1),
            new Disk(1, 0),
            new Disk(1, 1),
            new Disk(1, 2),
            new Disk(2, 0),
            new Disk(2, 1) 
        ]
    }

    function Disk(row, col) {
        this.rotation = 0;
        this.radius = 50;
        this.triangleColours = ['grey', 'grey', 'grey'];
        this.row = row;
        this.col = col;
        this.triangles = function () {
            var x = this.x();
            var y = this.y();
            var radius = this.radius;
            return [
            rotateAround([
                {x: x, y: y - radius},
                {x: x + Math.sqrt(3) * radius / 4, y: y - radius / 4},
                {x: x - Math.sqrt(3) * radius / 4, y: y - radius / 4}
            ], {x: x, y: y}, this.rotation),
        
            rotateAround([
                {x: x - Math.sqrt(3) * radius / 4, y: y - radius / 4},
                {x: x - Math.sqrt(3) * radius / 2, y: y + radius / 2},
                {x: x, y: y + radius / 2}
            ], {x: x, y: y}, this.rotation),
        
            rotateAround([
                {x: x + Math.sqrt(3) * radius / 4, y: y - radius / 4},
                {x: x + Math.sqrt(3) * radius / 2, y: y + radius / 2},
                {x: x, y: y + radius / 2}
            ], {x: x, y: y}, this.rotation)
            ];
        }
        this.x = function() {
            if (this.row % 2 == 0) {
                var x = 2 * this.radius * (this.col + 1);
            } else {
                var x = this.radius * (2 * this.col + 1);
            }

            return x;
        }
        this.y = function() {
            var y = (this.row * Math.sqrt(3) + 1) * this.radius;
    
            return y;
        }
    }


    window['init'] = init;
})();
