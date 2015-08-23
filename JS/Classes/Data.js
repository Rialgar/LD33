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
        ],
        deer_attack2: [
            {position:"center",  text: "You find two deers fighting each other, they would make an excellent meal."}
        ],
        deer_death: [
            {position:"center",  text: "The deer drops dead, it is now ready for eating."}
        ],
        mom_attack1: [
            {position:"right", text: "Be calm Child. Remember: we possess magic. You can channel your energy to bend the laws of our world."},
            {position:"right", text: "The most important thing to learn is quickly healing wounds. Let me show you how it is done."}
        ],
        mom_escape1: [
            {position:"center", text: "The dream fades, you wake up rested and fully healed."}
        ],
        mom_attack2: [
            {position:"right", text: "Calm your breath, my child. Our breath is the source of our magic."},
            {position:"right", text: "Focus on your breath, keep it slow and steady. Lead it to your heart. Follow my lead."}
        ],
        mom_escape2: [
            {position:"center", text: "The dream fades, you wake up early and well rested."}
        ]
    };
    var skills = {
        escape: {
            name: "Escape",
            escape: true
        },
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
        },
        mom_heal: {
            name: "Heal",
            damage: {
                base: -2,
                dice: [-3, -3]
            }
        },
        mom_focus: {
            name: "Heal",
            damage: {
                base: -10,
                dice: [],
                mp: true
            },
            costs: -10
        }
    };

    var escapeEvents = [
        {
            when: 1,
            messages: [
                {position: "center", text:  "You miss your mother more than ever."},
                {position: "center", text:  "You start crying."},
                {position: "center", text:  "You crawl up in a corner and hide."},
                {position: "center", text:  "The tears dry, but you can not do anything today. You will have to hunt" +
                                            " again tomorrow, though."},
                {position: "center", text:  "As the day passes, you fall in a dreamless slumber."},
                {position: "center", text:  "You wake up late the next day, feeling a little better.\n\n" +
                                            "You go on a hunt."}
            ]
        }
    ];

    var deathEvents = [
        {
            when: 1,
            messages: [
                {position:"center", text: "Wounded but with a full belly, you get back home."},
                {position:"center", text: "As you fall asleep, you dream of your mother."}
            ]
        },{
            when: 3,
            messages: [
                {position:"center", text: "Your hunt was very successful, you can even keep some meat for tomorrow."},
                {position:"center", text: "You return home, proud of yourself, but very tired. Your breath still goes fast from the fight."},
                {position:"center", text: "As you close your eyes, you can hear the voice of your mother."}
            ]
        }
    ];

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

    function getAttack(player, enemies){
        var l = this.skills.length;
        var skill = this.skills[Math.floor(Math.random()*l)];
        while(skill.costs && skill.costs > this.mp){
            skill = this.skills[Math.floor(Math.random()*l)];
        }
        if(skill.damage < 0){
            return {to: this, skill: skill};
        } else {
            return {to: player, skill: skill};
        }
    }

    function getEventMessages(deaths, escapes){
        var messages = [];
        while(deathEvents.length > 0 && deaths >= deathEvents[0].when){
            messages = messages.concat(deathEvents.shift().messages);
        }
        while(escapeEvents.length > 0 && escapes >= escapeEvents[0].when){
            messages = messages.concat(escapeEvents.shift().messages);
        }
        return messages;
    }

    return {
        getMessages: function(key){
            return getMessages(key);
        },
        getEventMessages: getEventMessages,
        getStartingEnemies: function(seed){
            return [{
                name: "Deer",
                hp: 10,
                mp: 1,
                skills: [skills.deer_charge, skills.deer_kick],
                getAttackMessages: function(){return getMessages("deer_attack")},
                getDeathMessages: function(){return getMessages("deer_death")},
                getEscapeMessages: function(){return []},
                getAttack: getAttack,
                hardEnd: true
            },{
                name: "Memory of Mom",
                hp: 5000,
                mp: 20,
                skills: [skills.mom_heal],
                getAttackMessages: function(){return getMessages("mom_attack1")},
                getDeathMessages: function(){return []},
                getEscapeMessages: function(){return getMessages("mom_escape1")},
                getAttack: function(player, enemies){
                    if(player.hp < player.maxHP) {
                        return {to: player, skill: skills.mom_heal}
                    } else {
                        return {to: this, skill: skills.escape}
                    }
                },
                hardEnd: true
            },{
                name: "Deer",
                hp: 10,
                mp: 1,
                skills: [skills.deer_charge, skills.deer_kick],
                getAttackMessages: function(){return getMessages("deer_attack2")},
                getDeathMessages: function(){return getMessages("deer_death")},
                getEscapeMessages: function(){return []},
                getAttack: getAttack
            },{
                name: "Deer",
                hp: 10,
                mp: 1,
                skills: [skills.deer_charge, skills.deer_kick],
                getAttackMessages: function(){return []},
                getDeathMessages: function(){return getMessages("deer_death")},
                getEscapeMessages: function(){return []},
                getAttack: getAttack,
                hardEnd: true
            },{
                name: "Memory of Mom",
                hp: 5000,
                mp: 0,
                maxMp: 20,
                skills: [skills.mom_focus],
                getAttackMessages: function(){return getMessages("mom_attack2")},
                getDeathMessages: function(){return []},
                getEscapeMessages: function(){return getMessages("mom_escape2")},
                getAttack: function(player, enemies){
                    if(player.mp < player.maxMP || this.mp < this.maxMP) {
                        return {to: player, skill: skills.mom_focus}
                    } else {
                        return {to: this, skill: skills.escape}
                    }
                },
                hardEnd: true
            }]
        },
        getEnemiesRelatedTo: function(enemy, seed){
            return [];
        }
    }
});