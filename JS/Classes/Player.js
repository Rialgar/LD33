/**
 * Created by Rialgar on 2015-08-22.
 */
define([], function(){
    function Player(){
        this._hp = 20;
        this._mp = 20;

        this.skills= [
            /*{
                name: "Instakill",
                damage: {
                    _base: 10000,
                    _dice: []
                },
                all: true
            },
            {
                name: "Instascare",
                all: true,
                scare: 10000
            },
            {
                name: "Instaheal",
                damage: {
                    _base: -10000,
                    _dice: []
                },
                costs: -10000
            },*/
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

        this.learnByBoth = [
            {
                when: [10, 14],
                messages: [{position:"center", text:"You realize that they shake an tremble, when you hit the ground hard. You decide to enhace this with magic."}],
                name: "Earthquake",
                damage: {
                    _base:.75,
                    _dice: [3, 3]
                },
                costs: 8,
                scare: 20,
                all: true
            }
        ];

        this.learnByEscapes = [
            {
                when: 1,
                messages: [{position:"center", text:"You remembered the healing spell."}],
                name: "Heal",
                damage: {
                    _base: -4,
                    _dice: [-2, -2]
                },
                costs: 3,
                target: true
            },
            {
                when: 2,
                messages: [{position:"center", text:"You remembered how to regenerate your mana by focusing you breath."}],
                name: "Focus",
                costs: -10
            },
            {
                when: 12,
                messages: [{position:"center", text:"These do not seem very brave. Maybe you can scare them away faster if you throw them."}],
                name: "Throw",
                damage: {
                    _base: 0,
                    _dice: [3,3]
                },
                scare: 20,
                target: true
            },
            {
                when: 27,
                messages: [{position:"center", text:"Maybe you can scare them all at once, if you make scary noises, aided by magic."}],
                name: "Roar",
                damage: {
                    _base: 0,
                    _dice: [2]
                },
                all: true,
                scare: 40,
                costs: 10
            }
        ];
        this.learnByDeaths = [
            {
                when: 16,
                messages: [{position:"center", text:"With all this biting, you might as well swallow the parts you bite off. You can hasten the digestion with magic."}],
                name: "Devour",
                damage: {
                    _base: 2,
                    _dice: [3]
                },
                target: true,
                costs: 2,
                leech: 0.5
            },
            {
                when: 26,
                messages: [{position:"center", text:"You feel a heat inside your lungs, fueled by anger and rage. You think you can materialize it using your magic."}],
                name: "Fire Breath",
                damage: {
                    _base: 1,
                    _dice: [4,4]
                },
                all: true,
                costs: 10
            }
        ];

        this.update(0, 0);
    }

    Player.prototype.update = function(deaths, escapes, fights){
        var c = 2*deaths + escapes + fights;
        var delta = this.maxHP - this.hp || 0;
        this.maxHP = Math.floor(this._hp * (1 + c/10));
        this.hp = this.maxHP - delta;

        delta = this.maxMP - this.mp || 0;
        this.maxMP = Math.floor(this._mp * (1 + c/10));
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