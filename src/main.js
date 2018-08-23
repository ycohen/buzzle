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
            ctx.arc(2 * disk.radius * (disk.col + 1), (disk.row * Math.sqrt(3) + 1) * disk.radius, disk.radius, 0, Math.PI* 2, true);
        } else {
            ctx.arc(disk.radius * (2 * disk.col + 1), (disk.row * Math.sqrt(3) + 1) * disk.radius, disk.radius, 0, Math.PI* 2, true);
        }
        ctx.fill();
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
