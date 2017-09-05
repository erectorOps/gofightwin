var CardUtil = (function() {
	var d = {};
    var p = {
        BALANCE: "バランス",
        ATTACK: "アタック",
        DEFENSE: "ディフェンス",
        MAGIA: "マギア",
        HEAL: "ヒール",
        SUPPORT: "サポート"
    };
    d.episodeExp = [0, 1E3, 4E3, 14E3, 64E3];
    d.exArr = [
    	0, 110, 250, 430, 660, 950, 1310, 1750, 2280, 2910, 
    	3640, 4470, 5400, 6430, 7560, 8790, 10120, 11550, 13080, 14710,
    	16440, 18270, 20200, 22230, 24360, 26590, 28920, 31350, 33880, 36510,
    	39240, 42070, 45E3, 48030, 51160, 54390, 57720, 61150, 64680, 68310,
    	72040, 75870, 79800, 83830, 87960, 92190, 96520, 100950, 105480, 110110, 
    	114840, 119670, 124600, 129630, 134760, 139990, 145320, 150750, 156280, 161910, 
    	167640, 173470, 179400, 185430, 191560, 197790, 204120, 210550, 217080, 223710, 
    	230440, 237270, 244200, 251230, 258360, 265590, 272920, 280350, 287880, 295510,
    	303240, 311070, 319E3, 327030, 335160, 343390, 351720, 360150, 368680, 377310, 
    	386040, 394870, 403800, 412830, 421960, 431190, 440520, 449950, 459480, 469110
    ];
    d.itemExp = [100, 500, 2500];
    d.getNextExp = function(lv) {
    	if (lv >= 100 || lv <= 0)
    		return 0;
    	return d.exArr[lv] - d.exArr[lv - 1];
    };
    d.getMaxLevel = function(a) {
        switch (a) {
            case "RANK_1":
                return 40;
            case "RANK_2":
                return 50;
            case "RANK_3":
                return 60;
            case "RANK_4":
                return 80;
            case "RANK_5":
                return 100;
            default:
                return 1
        }
    };
    d.getAfterParam = function(a, b, h, c) {
        a = b.defaultCardId === a ? b.defaultCard : b.evolutionCardId1 === a ? b.evolutionCard1 : b.evolutionCardId2 === a ? b.evolutionCard2 :
            b.evolutionCardId3 === a ? b.evolutionCard3 : b.evolutionCardId4 === a ? b.evolutionCard4 : b.evolutionCard5;
        b = a.growthType;
        h = a.rank;
        var f = d.getMaxLevel(h);
        c > f && (c = f);
        f = {
            attack: a.attack,
            defense: a.defense,
            hp: a.hp
        };
        c = w(h, c);
        var e, k, g;
        switch (b) {
            case "BALANCE":
                g = k = e = 1;
                break;
            case "ATTACK":
                e = 1.03;
                k = .97;
                g = .98;
                break;
            case "DEFENSE":
                e = .98;
                k = 1.05;
                g = .97;
                break;
            case "HP":
                e = .97;
                k = .98;
                g = 1.04;
                break;
            case "ATKDEF":
                e = 1.02;
                k = 1.01;
                g = .99;
                break;
            case "ATKHP":
                e = 1.01;
                k = .99;
                g = 1.02;
                break;
            case "DEFHP":
                e = .99, k = 1.02, g = 1.01
        }
        f.attack = a.attack +
            a.attack * c * e | 0;
        f.defense = a.defense + a.defense * c * k | 0;
        f.hp = a.hp + a.hp * c * g | 0;
        return f
    };
    var w = function(a, b) {
        var d = [0, .05, .1, .15, .2, .25, .3, .35, .41, .46, .51, .56, .61, .66, .71, .76, .82, .87, .92, .97, 1.02, 1.07, 1.12, 1.17, 1.23, 1.28, 1.33, 1.38, 1.43, 1.48, 1.53, 1.58, 1.64, 1.69, 1.74, 1.79, 1.84, 1.89, 1.94, 2],
            c = [0, .04, .08, .13, .17, .22, .26, .31, .35, .4, .44, .49, .53, .58, .62, .67, .71, .76, .8, .85, .89, .94, .98, 1.03, 1.07, 1.12, 1.16, 1.21, 1.25, 1.3, 1.34, 1.39, 1.43, 1.48, 1.52, 1.57, 1.61, 1.66, 1.7, 1.75, 1.79, 1.84, 1.88, 1.93, 1.97, 2.02, 2.06, 2.11, 2.15,
                2.2
            ],
            f = [0, .04, .08, .12, .16, .2, .24, .28, .32, .36, .4, .44, .48, .52, .56, .61, .65, .69, .73, .77, .81, .85, .89, .93, .97, 1.01, 1.05, 1.09, 1.13, 1.17, 1.22, 1.26, 1.3, 1.34, 1.38, 1.42, 1.46, 1.5, 1.54, 1.58, 1.62, 1.66, 1.7, 1.74, 1.78, 1.83, 1.87, 1.91, 1.95, 1.99, 2.03, 2.07, 2.11, 2.15, 2.19, 2.23, 2.27, 2.31, 2.35, 2.4],
            e = [0, .03, .06, .09, .13, .16, .19, .23, .26, .29, .32, .36, .39, .42, .46, .49, .52, .55, .59, .62, .65, .69, .72, .75, .78, .82, .85, .88, .92, .95, .98, 1.02, 1.05, 1.08, 1.11, 1.15, 1.18, 1.21, 1.25, 1.28, 1.31, 1.34, 1.38, 1.41, 1.44, 1.48, 1.51, 1.54, 1.57, 1.61, 1.64,
                1.67, 1.71, 1.74, 1.77, 1.81, 1.84, 1.87, 1.9, 1.94, 1.97, 2, 2.04, 2.07, 2.1, 2.13, 2.17, 2.2, 2.23, 2.27, 2.3, 2.33, 2.36, 2.4, 2.43, 2.46, 2.5, 2.53, 2.56, 2.6
            ],
            g = [0, .03, .06, .09, .12, .15, .18, .21, .24, .27, .3, .33, .36, .39, .42, .45, .48, .51, .54, .57, .6, .63, .66, .69, .72, .75, .78, .81, .84, .87, .9, .93, .96, 1, 1.03, 1.06, 1.09, 1.12, 1.15, 1.18, 1.21, 1.24, 1.27, 1.3, 1.33, 1.36, 1.39, 1.42, 1.45, 1.48, 1.51, 1.54, 1.57, 1.6, 1.63, 1.66, 1.69, 1.72, 1.75, 1.78, 1.81, 1.84, 1.87, 1.9, 1.93, 1.96, 2, 2.03, 2.06, 2.09, 2.12, 2.15, 2.18, 2.21, 2.24, 2.27, 2.3, 2.33, 2.36, 2.39, 2.42, 2.45,
                2.48, 2.51, 2.54, 2.57, 2.6, 2.63, 2.66, 2.69, 2.72, 2.75, 2.78, 2.81, 2.84, 2.87, 2.9, 2.93, 2.96, 3
            ];
        switch (a) {
            case "RANK_1":
                return d[b - 1];
            case "RANK_2":
                return c[b - 1];
            case "RANK_3":
                return f[b - 1];
            case "RANK_4":
                return e[b - 1];
            case "RANK_5":
                return g[b - 1];
            default:
                return 1
        }
    };
	return d;
})();