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
                name: "Bite",
                damage: {
                    base: 1,
                    dice: [3]
                },
                damageText: "2 to 4",
                target: true
            },
            {
                name: "Heal",
                damage: {
                    base: -2,
                    dice: [-3, -3]
                },
                damageText: "-4 to -10",
                costs: 3,
                target: true
            },
            {
                name: "Focus",
                costs: -10,
                damageText: "0"
            }
        ];
    }

    return Player;
});