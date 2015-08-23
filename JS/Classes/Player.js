/**
 * Created by Rialgar on 2015-08-22.
 */
define([], function(){
    function Player(){
        this.hp = 20;
        this.maxHP = 20;
        this.mp = 20;
        this.maxMP = 20;

        this.skills= [
            {
                name: "Wait"
            },
            {
                name: "Bite",
                damage: {
                    _base: 1,
                    _dice: [3]
                },
                target: true
            }
        ];

        this.learnByEscapes = [
            {
                when: 1,
                messages: [{position:"center", text:"You remembered the healing spell."}],
                name: "Heal",
                damage: {
                    _base: -2,
                    _dice: [-3, -3]
                },
                costs: 3,
                target: true
            },
            {
                when: 2,
                messages: [{position:"center", text:"You remembered how to regenerate your mana by focusing you breath."}],
                name: "Focus",
                costs: -10
            }
        ];
        this.learnByDeaths= [];

        this.update(0, 0);
    }

    Player.prototype.update = function(deaths, escapes){
        var c = 2*deaths + escapes;
        var delta = this.maxHP - this.hp || 0;
        this.maxHP = Math.floor(20 * (1 + c/10));
        this.hp = this.maxHP - delta;

        delta = this.maxMP - this.mp;
        this.maxMP = Math.floor(20 * (1 + c/10));
        this.mp = this.maxMP - delta;

        for (var i = 0; i < this.skills.length; i++) {
            var skill = this.skills[i];
            if(skill.damage){
                skill.damage.base = Math.floor(skill.damage._base * (1 + c/10));
                var min = skill.damage.base;
                var max = skill.damage.base;
                skill.damage.dice = [];
                for (var j = 0; j < skill.damage._dice.length; j++) {
                    var dice = Math.floor(skill.damage._dice[j] * (1 + c/50));
                    skill.damage.dice.push(dice);
                    if(dice > 0){
                        min += 1;
                        max += dice;
                    } else if(dice < 0){
                        min += dice;
                        max -= 1;
                    }
                }
                skill.damageText = min + " " + ( min===max? "" : ("to " + max + " ") ) + (skill.damage.mp ? "MP" : "HP");
            }
        }
    };

    return Player;
});