/**
 * Created by Rialgar on 2015-08-22.
 */
define([], function(){
    var messages = {
        opening: [
            {position:"center",  text: "Yesterday your mother died."},
            {position:"center",  text: "She left in the morning, as always, but this time she did not return."},
            {position:"center",  text: "You wait."},
            {position:"center",  text: "You are scared."},
            {position:"center",  text: "..."},
            {position:"center",  text: "Days pass."},
            {position:"center",  text: "You are hungry."},
            {position:"center",  text: "All your food is gone."},
            {position:"center",  text: "You need to hunt."},
            {position:"center",  text: "Trying to remember your mothers lessons, you enter the forrest."}
        ],
        deer_attack: [
            {position:"center",  text: "You find a lone male deer. It is mating season, those antlers look dangerous.\n\nYou are very hungry, though."}
        ]
    };
    var skills = {
        deer_kick: {
            name: "Kick",
            damage: {
                base: 1,
                dice: [2]
            }
        },
        deer_charge: {
            name: "Charge",
            damage: {
                base: 0,
                dice: [3]
            }
        }
    };

    function getMessages(key){
        var msg = messages[key];
        if(!msg){
            return [{
                position: "center",
                text: "messages for key '" + key + "' not found;"
            }];
        } else {
            return msg.slice();
        }
    }

    return {
        getMessages: function(key){
            return getMessages(key);
        },
        getStartingEnemies: function(seed){
            return [{
                name: "Deer",
                hp: 10,
                mp: 1,
                skills: [skills.deer_charge, skills.deer_kick],
                getAttackMessages: function(){return getMessages("deer_attack")},
                getDeathMessages: function(){return getMessages("deer_death")}
            }]
        },
        getEnemiesRelatedTo: function(enemy, seed){
            return [];
        }
    }
});