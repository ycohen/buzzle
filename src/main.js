(function() {
    function init() {
        canvas = jQuery('#gameBoard')[0];
        var ctx = canvas.getContext('2d');
        board.disks.forEach(function(disk) { drawDisk(disk, ctx); });
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

        drawTriangle(
            rotateAround([
                {x: x, y: y - disk.radius},
                {x: x + Math.sqrt(3) * disk.radius / 4, y: y - disk.radius / 4},
                {x: x - Math.sqrt(3) * disk.radius / 4, y: y - disk.radius / 4}
            ], {x: x, y: y}, disk.rotation), ctx
        );
        
        drawTriangle(
            rotateAround([
                {x: x - Math.sqrt(3) * disk.radius / 4, y: y - disk.radius / 4},
                {x: x - Math.sqrt(3) * disk.radius / 2, y: y + disk.radius / 2},
                {x: x, y: y + disk.radius / 2}
            ], {x: x, y: y}, disk.rotation), ctx
        );
        
        drawTriangle(
            rotateAround([
                {x: x + Math.sqrt(3) * disk.radius / 4, y: y - disk.radius / 4},
                {x: x + Math.sqrt(3) * disk.radius / 2, y: y + disk.radius / 2},
                {x: x, y: y + disk.radius / 2}
            ], {x: x, y: y}, disk.rotation), ctx
        );
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
    }

    window['init'] = init;
})();
