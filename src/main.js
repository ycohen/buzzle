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

        ctx.beginPath();
        ctx.fillStyle = 'grey';
        ctx.moveTo(x, y - disk.radius);
        ctx.lineTo(x + Math.sqrt(3) * disk.radius / 4, y - disk.radius / 4);
        ctx.lineTo(x - Math.sqrt(3) * disk.radius / 4, y - disk.radius / 4);
        ctx.lineTo(x, y - disk.radius);
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x - Math.sqrt(3) * disk.radius / 4, y - disk.radius / 4);
        ctx.lineTo(x - Math.sqrt(3) * disk.radius / 2, y + disk.radius / 2);
        ctx.lineTo(x, y + disk.radius / 2);
        ctx.lineTo(x - Math.sqrt(3) * disk.radius / 4, y - disk.radius / 4);
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x + Math.sqrt(3) * disk.radius / 4, y - disk.radius / 4);
        ctx.lineTo(x + Math.sqrt(3) * disk.radius / 2, y + disk.radius / 2);
        ctx.lineTo(x, y + disk.radius / 2);
        ctx.lineTo(x + Math.sqrt(3) * disk.radius / 4, y - disk.radius / 4);
        ctx.fill();
        ctx.stroke();
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
