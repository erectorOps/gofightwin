var MemoriaUtil = (function() {
	var b = {};
    b.exArr = [0, 100, 210, 330, 460, 600, 760, 950, 1180, 1460, 1800, 2210, 2690, 3240, 3860, 4550, 5310, 6140, 7040, 8010, 9050, 10160, 11340, 12590, 13910, 15300, 16760, 18290, 19890, 21560, 23300, 25110, 26990, 28940, 30960, 33050, 35210, 37440, 39740, 42110, 44550, 47060, 49640, 52290, 55010, 57800, 60660, 63590, 66590, 69660];
    b.parExArr = [0, 100, 110, 120, 130, 140, 160, 190, 230, 280, 340, 410, 480, 550, 620, 690, 760, 830, 900, 970, 1040,
        1110, 1180, 1250, 1320, 1390, 1460, 1530, 1600, 1670, 1740, 1810, 1880, 1950, 2020, 2090, 2160, 2230, 2300, 2370, 2440, 2510, 2580, 2650, 2720, 2790, 2860, 2930, 3E3, 3070
    ];
    b.getComposeExp = function(a, d, h, f) {
        var c = 0,
            e = [100, 200, 500, 1E3];
        g.each(h, function(a) {
            switch (a.piece.rank) {
                case "RANK_1":
                    c += e[0] + (a.experience + b.exArr[a.level - 1]) / 10;
                    break;
                case "RANK_2":
                    c += e[1] + (a.experience + b.exArr[a.level - 1]) / 10;
                    break;
                case "RANK_3":
                    c += e[2] + (a.experience + b.exArr[a.level - 1]) / 10;
                    break;
                case "RANK_4":
                    c += e[3] + (a.experience + b.exArr[a.level - 1]) / 10;
                    break;
                default:
                    c += 0
            }
        });
        return c
    };
    b.getNextExp = function(lv) {
    	if (lv >= 100 || lv <= 0)
    		return 0;
    	return b.exArr[lv] - b.exArr[lv - 1];
    };
    b.getGuageLength = function(a, d) {
        a = Math.floor(a / b.parExArr[d] * 100);
        return 100 < a ? 100 : a
    };
    b.getComposeFactor = function(a) {
        switch (a) {
            case "RANK_1":
                return 1;
            case "RANK_2":
                return 2;
            case "RANK_3":
                return 3;
            case "RANK_4":
                return 4
        }
        return 60
    };
    var k = function(a) {
        switch (a) {
            case "RANK_1":
                return 10;
            case "RANK_2":
                return 15;
            case "RANK_3":
                return 20;
            case "RANK_4":
                return 30;
            case "RANK_5":
                return 50;
            default:
                return 30
        }
    };
    b.getMaxLevel = function(a,
        b) {
        b = 4 < b ? 4 : b;
        a = k(a) + 5 * b;
        50 < a && (a = 50);
        return a
    };
    var l = [1, 1, 1.05, 1.11, 1.16, 1.22, 1.27, 1.33, 1.38, 1.44, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2, 2.05, 2.1, 2.15, 2.2, 2.25, 2.3, 2.35, 2.4, 2.45, 2.5],
        m = [1, 1, 1.03, 1.07, 1.1, 1.14, 1.17, 1.21, 1.25, 1.28, 1.32, 1.35, 1.39, 1.42, 1.46, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2, 2.05, 2.1, 2.15, 2.2, 2.25, 2.3, 2.35, 2.4, 2.45, 2.5],
        n = [1, 1, 1.02, 1.05, 1.07, 1.1, 1.13, 1.15, 1.18, 1.21, 1.23, 1.26, 1.28, 1.31, 1.34, 1.36, 1.39, 1.42, 1.44, 1.47, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2, 2.05,
            2.1, 2.15, 2.2, 2.25, 2.3, 2.35, 2.4, 2.45, 2.5
        ],
        p = [1, 1, 1.01, 1.03, 1.05, 1.06, 1.08, 1.1, 1.12, 1.13, 1.15, 1.17, 1.18, 1.2, 1.22, 1.24, 1.25, 1.27, 1.29, 1.31, 1.32, 1.34, 1.36, 1.37, 1.39, 1.41, 1.43, 1.44, 1.46, 1.48, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2, 2.05, 2.1, 2.15, 2.2, 2.25, 2.3, 2.35, 2.4, 2.45, 2.5];
    b.getParam = function(a, b) {
        var d = a.attack | 0,
            f = a.defense | 0,
            c = a.rank,
            c = "RANK_1" === c ? l : "RANK_2" === c ? m : "RANK_3" === c ? n : p,
            e = {};
        e.hp = Math.floor((a.hp | 0) * c[b]) | 0;
        e.attack = Math.floor(d * c[b]) | 0;
        e.defense = Math.floor(f *
            c[b]) | 0;
        return e
    };
    b.priceArr = [0, 100, 300, 1E3, 5E3, 2E3];
    b.priceCalc = function(a, d) {
        a = a.split("_")[1];
        4 < d && (d = 4);
        return b.priceArr[a] * (d + 1)
    };
	return b;
})();