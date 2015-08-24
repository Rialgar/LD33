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
        ],
        cow_attack: [
            {position:"center", text: "With newly found confidence, you expand your reach and explore the land."},
            {position:"center", text: "At the edge of the forrest, you find a herd of cows. You can fill the icy caverns below your home with these."}
        ],
        cow_death: [
            {position:"center", text: "The cow collapses, looking very tasty."}
        ],
        peasant_first: [
            {position:"center", text: "Something is not right, somebody followed you."},
            {position:"center", text: "There is a two-legged pink thing standing in front of your home, waving with a pitchfork and yelling."},
            {position:"center", text: "You can kill it or just fight until it runs away."},
            {position:"center", text: "As it sees you, it's eyes widen and it attacks."}
        ],
        peasant_attack: [
            {position:"right", text: "You stole our cows, beast!"},
            {position:"right", text: "Don't you dare steeling from our farms again!"},
            {position:"right", text: "DIE! So we can live in peace!"},
            {position:"right", text: "I will sacrifice no virgin, nu huh!"}
        ],
        peasant_escape: [
            {position:"right", text: "Aaaaaahh!"},
            {position:"right", text: "Please, I don't wanna die!"},
            {position:"right", text: "Help! Help! I am being suppressed!."},
            {position:"right", text: "I'm going to leave now, I need to loose my virginity."}
        ],
        peasant_death: [
            {position:"right", text: "The peasant falls into his own pitchfork."},
            {position:"right", text: "That's it. I'm dead."},
            {position:"right", text: "I am sorry my love, but you will have to learn how to cook."},
            {position:"right", text: "Please, spare my children!"}
        ],
        soldier_first: [
            {position:"center", text: "This one looks different. It has a blade and thick leather armor."},
            {position:"center", text: "Should these fools be the murderers of your mother? You can and will not believe that."}
        ],
        soldier_attack: [
            {position:"right", text: "BEGUN! ... no ... BE A GOON! ... no ... BE GONE! that's it! BE GONE, BEAST!"},
            {position:"right", text: "I will sell your hide and retire!"},
            {position:"right", text: "Today is a good day to die! For you!"},
            {position:"right", text: "I will be promoted for this!"}
        ],
        soldier_escape: [
            {position:"right", text: "I'm out, the tavern is more fun."},
            {position:"right", text: "Screw this, I'm gonna hunt bandits for bounty."},
            {position:"right", text: "Today is NOT a good day to die!"},
            {position:"right", text: "I'm not payed enough for this."}
        ],
        soldier_death: [
            {position:"right", text: "Well, it's a job hazard."},
            {position:"right", text: "\"Join the army\" they said. \"'Gonna be fun\" they said."},
            {position:"right", text: "But... I... just... got... promoted."},
            {position:"right", text: "I knew I should have stayed in bed today."}
        ],
        apprentice_first: [
            {position:"center", text: "One of them wears ill fitting robes and a pointy hat, that is a good deal bigger than its head."}
        ],
        apprentice_attack: [
            {position:"right", text: "Ablahblah Kandelaber!"},
            {position:"right", text: "Oh dear, where is my monsters handbook?"},
            {position:"right", text: "2W4 *mumble* crit *mumble*, oh, whe are here!"},
            {position:"right", text: "This will finally get me my credits in battle magic!"}
        ],
        apprentice_escape: [
            {position:"right", text: "Apparatus! Screw it, I'm gonna run!"},
            {position:"right", text: "OOM! OOM!"},
            {position:"right", text: "At least this will make an interesting diary entry."},
            {position:"right", text: "I hope I'm gonna pass anyways."}
        ],
        apprentice_death: [
            {position:"right", text: "Something missfires and the apprentice disintegrates."},
            {position:"right", text: "Where are the tanks, when you need them?"},
            {position:"right", text: "So that's what Traloony saw in the cup."},
            {position:"right", text: "I was only one course from graduating!"}
        ],
        knight_first: [
            {position:"center", text: "This one is encased in metal and sitting on a horse."}
        ],
        knight_attack: [
            {position:"right", text: "Onward, my noble steed!"},
            {position:"right", text: "For honour and glory!"},
            {position:"right", text: "For the King!"},
            {position:"right", text: "Ni!"}
        ],
        knight_escape: [
            {position:"right", text: "I live to fight another day."},
            {position:"right", text: "Retreat!"},
            {position:"right", text: "Where is the backup!"},
            {position:"right", text: "Ekki-Ekki-Ekki-Ekki-PTANG. Zoom-Boing. Z'nourrwringmm."}
        ],
        knight_death: [
            {position:"right", text: "It's only a flesh wound!"},
            {position:"right", text: "I die in honour, defending the kingdom."},
            {position:"right", text: "Uargh!"},
            {position:"right", text: "If you strike me down, I shall become more powerful than you can possibly imagine."}
        ],
        wizard_first: [
            {position:"center", text: "There is a fat thing with a cigarette, a pointy head, pointy shows, and a staff with a knob on the end."}
        ],
        wizard_attack: [
            {position:"right", text: "Let's get this over with, and then have a meal."},
            {position:"right", text: "Draco Nobilis, not seen often today."},
            {position:"right", text: "I have one...fireball..let'see, how did that go?"},
            {position:"right", text: "Watch and learn."}
        ],
        wizard_escape: [
            {position:"right", text: "QUAAEESTOOR!"},
            {position:"right", text: "I think we should study this specimen from afar."},
            {position:"right", text: "I've seen excitement, and I've seen boredom. And boredom was best."},
            {position:"right", text: "This will make for a nice anecdote in my lectures."}
        ],
        wizard_death: [
            {position:"right", text: "Magic never dies. It merely fades away"},
            {position:"right", text: "Fate can be one mean god at times."},
            {position:"right", text: "Well, that was unexpected."},
            {position:"right", text: "I have only one curiosity left: death."}
        ],
        king_first: [
            {position: "right", text: "One of them has shiny metal on its head and a nicer horse."}
        ],
        king_attack: [
            {position: "right", text: "Ride for ruin, and the world ending! Death!"}
        ],
        king_escape: [
            {position: "right", text: "I will put a bounty on your head, beast!"}
        ],
        king_death: [
            {position: "right", text: "I will not yield. And damn'd be him that first cries, \"Hold, enough!\""}
        ],
        queen_first: [
            {position: "right", text: "Another wears a dress, has shiny metal on its head, too, but no weapon or shield."}
        ],
        queen_attack: [
            {position: "right", text: "Do not let your hearts be troubled."}
        ],
        queen_escape: [
            {position: "right", text: "Our conflict will soon be over, one way or the other."}
        ],
        queen_death: [
            {position: "right", text: "I will diminish."}
        ],
        player_dead: [
            {position: "center", text: "You died. The townsfolk feast on your flesh, furnish armor from your hide and weapons from your bones."}
        ],
        peace: [
            {position: "center", text: "No human is brave enough to attack you anymore. After a while, they realize, that you did not kill any of them. The Queen sends a negotiator."},
            {position: "center", text: "You agree not to eat their cattle without striking a deal, and they agree to treat you as a friend. Especially the wizards like your company."}
        ],
        truce: [
            {position: "center", text: "No human is brave enough to attack you anymore. After a while, the Queen sends a negotiator."},
            {position: "center", text: "You agree not to harm the town, they agree to let you eat their cattle. Once in a while you remind them of your might with a fierce, but harmless demonstration."}
        ],
        fear: [
            {position: "center", text: "You have struck fear in the hearts of the survivors. Wherever you roam, all beings hide and fear for their life."},
            {position: "center", text: "You eat their cattle whenever you like, you plunder their homes, you destroy their forts. Once in a while you kill a family or two, just to keep them scared."}
        ],
        all_dead: [
            {position: "center", text: "There are no survivors. You killed every last inhabitant of the town. You burned down their homes and killed their cattle."},
            {position: "center", text: "Your land has plenty of wild animals for you to hunt. Once in a while, you have to kill some impertinent adventures who think they can reclaim it."}
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
            },
            costs: 3
        },
        mom_focus: {
            name: "Focus",
            damage: {
                base: -10,
                dice: [],
                mp: true
            },
            costs: -10
        },
        cow_kick: {
            name: "Kick",
            damage: {
                base: 0,
                dice: [2]
            }
        },
        cow_charge: {
            name: "Charge",
            damage: {
                base: 0,
                dice: [3]
            }
        },
        peasant_stab: {
            name: "Stab",
            damage: {
                base: 1,
                dice: [4]
            }
        },
        peasant_bash: {
            name: "Bash",
            damage: {
                base: 1,
                dice: [2]
            }
        },
        soldier_stab: {
            name: "Stab",
            damage: {
                base: 4,
                dice: [4,4]
            }
        },
        soldier_strike: {
            name: "Strike",
            damage: {
                base: 4,
                dice: [2,2]
            }
        },
        apprentice_heal: {
            name: "Heal",
            damage: {
                base: -5,
                dice: [-4,-4]
            },
            costs: 3
        },
        apprentice_bolt: {
            name: "Fire Bolt",
            damage: {
                base: 5,
                dice: [5,5]
            },
            costs: 5
        },
        apprentice_punch: {
            name: "Bash",
            damage: {
                base: 2,
                dice: [4]
            }
        },
        knight_charge: {
            name: "Charge",
            damage: {
                base: 6,
                dice: [6,6]
            }
        },
        knight_stab: {
            name: "Stab",
            damage: {
                base: 6,
                dice: [4,4]
            }
        },
        knight_strike: {
            name: "Strike",
            damage: {
                base: 4,
                dice: [4,4]
            }
        },
        wizard_heal: {
            name: "Heal",
            damage: {
                base: -10,
                dice: [-8,-8]
            },
            costs: 3
        },
        wizard_ball: {
            name: "Fire Ball",
            damage: {
                base: 8,
                dice: [8,8]
            },
            costs: 10
        },
        wizard_punch: {
            name: "Bash",
            damage: {
                base: 4,
                dice: [4]
            }
        },
        king_charge: {
            name: "Charge",
            damage: {
                base: 8,
                dice: [8,8]
            }
        },
        king_stab: {
            name: "Stab",
            damage: {
                base: 8,
                dice: [6,6]
            }
        },
        king_strike: {
            name: "Strike",
            damage: {
                base: 6,
                dice: [6,6]
            }
        },
        queen_heal: {
            name: "Heal All",
            all: true,
            damage: {
                base: -15,
                dice: [-10, -10]
            },
            costs: 6
        },
        queen_blast: {
            name: "fire_blast",
            damage: {
                base: 10,
                dice: [10, 10]
            },
            costs: 15
        },
        queen_focus: {
            name: "focus",
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

    function bindMessages(messages, enemy){
        var out = [];
        for (var i = 0; i < messages.length; i++) {
            var message = {
                position: messages[i].position,
                text: messages[i].text,
                source: enemy
            };
            out.push(message);
        }
        return out;
    }

    var peasantCount = 0;
    function makePeasant(){
        return {
            name: "Peasant",
            hp: 20,
            mp: 1,
            courage: 1,
            anger: 0,
            skills: [skills.peasant_stab, skills.peasant_bash],
            getAttackMessages: function(){
                var messages = [];
                if(peasantCount == 0){
                    messages = messages.concat(getMessages("peasant_first"));
                }
                messages.push(getRandomMessage("peasant_attack"));
                peasantCount++;
                return bindMessages(messages, this);
            },
            getDeathMessages: function(){return bindMessages([getRandomMessage("peasant_death")], this);},
            getEscapeMessages: function(){return bindMessages([getRandomMessage("peasant_escape")], this);},
            getAttack: getAttack,
            relatives: []
        }
    }

    var soldierCount = 0;
    function makeSoldier(){
        return {
            name: "Soldier",
            hp: 40,
            mp: 1,
            courage: 2,
            anger: 0,
            skills: [skills.soldier_stab, skills.soldier_strike],
            getAttackMessages: function(){
                var messages = [];
                if(soldierCount == 0){
                    messages = messages.concat(getMessages("soldier_first"));
                }
                messages.push(getRandomMessage("soldier_attack"));
                soldierCount++;
                return bindMessages(messages, this);
            },
            getDeathMessages: function(){return bindMessages([getRandomMessage("soldier_death")], this);},
            getEscapeMessages: function(){return bindMessages([getRandomMessage("soldier_escape")], this);},
            getAttack: getAttack,
            relatives: []
        }
    }

    var apprenticeCount = 0;
    function makeApprentice(){
        return {
            name: "Apprentice",
            hp: 30,
            mp: 20,
            courage: 2,
            anger: 0,
            skills: [skills.apprentice_heal, skills.apprentice_bolt, skills.apprentice_punch],
            getAttackMessages: function(){
                var messages = [];
                if(apprenticeCount == 0){
                    messages = messages.concat(getMessages("apprentice_first"));
                }
                messages.push(getRandomMessage("apprentice_attack"));
                apprenticeCount++;
                return bindMessages(messages, this);
            },
            getDeathMessages: function(){return bindMessages([getRandomMessage("apprentice_death")], this);},
            getEscapeMessages: function(){return bindMessages([getRandomMessage("apprentice_escape")], this);},
            getAttack: getAttack2,
            relatives: []
        }
    }

    var knightCount = 0;
    function makeKnight(){
        return {
            name: "Knight",
            hp: 60,
            mp: 1,
            courage: 5,
            anger: 0,
            skills: [skills.knight_charge, skills.knight_stab, skills.knight_strike],
            getAttackMessages: function(){
                var messages = [];
                if(knightCount == 0){
                    messages = messages.concat(getMessages("knight_first"));
                }
                messages.push(getRandomMessage("knight_attack"));
                knightCount++;
                return bindMessages(messages, this);
            },
            getDeathMessages: function(){return bindMessages([getRandomMessage("knight_death")], this);},
            getEscapeMessages: function(){return bindMessages([getRandomMessage("knight_escape")], this);},
            getAttack: getAttack,
            relatives: []
        }
    }


    var wizardCount = 0;
    function makeWizard(){
        return {
            name: "Wizard",
            hp: 40,
            mp: 40,
            courage: 5,
            anger: 0,
            skills: [skills.wizard_heal, skills.wizard_ball, skills.wizard_punch],
            getAttackMessages: function(){
                var messages = [];
                if(wizardCount == 0){
                    messages = messages.concat(getMessages("wizard_first"));
                }
                messages.push(getRandomMessage("wizard_attack"));
                wizardCount++;
                return bindMessages(messages, this);
            },
            getDeathMessages: function(){return bindMessages([getRandomMessage("wizard_death")], this);},
            getEscapeMessages: function(){return bindMessages([getRandomMessage("wizard_escape")], this);},
            getAttack: getAttack2,
            relatives: []
        }
    }

    var kingCount = 0;
    function makeKing(){
        return {
            name: "King",
            hp: 100,
            mp: 1,
            courage: 10,
            anger: 0,
            skills: [skills.king_charge, skills.king_stab, skills.king_strike],
            getAttackMessages: function(){
                var messages = [];
                if(kingCount == 0){
                    messages = messages.concat(getMessages("king_first"));
                }
                messages.push(getRandomMessage("king_attack"));
                kingCount++;
                return bindMessages(messages, this);
            },
            getDeathMessages: function(){return bindMessages([getRandomMessage("king_death")], this);},
            getEscapeMessages: function(){return bindMessages([getRandomMessage("king_escape")], this);},
            getAttack: getAttack,
            relatives: []
        }
    }

    var queenCount = 0;
    function makeQueen(){
        return {
            name: "Queen",
            hp: 60,
            mp: 60,
            courage: 10,
            anger: 0,
            skills: [skills.queen_heal, skills.queen_blast, skills.queen_focus],
            getAttackMessages: function(){
                var messages = [];
                if(queenCount == 0){
                    messages = messages.concat(getMessages("queen_first"));
                }
                messages.push(getRandomMessage("queen_attack"));
                queenCount++;
                return bindMessages(messages, this);
            },
            getDeathMessages: function(){return bindMessages([getRandomMessage("queen_death")], this);},
            getEscapeMessages: function(){return bindMessages([getRandomMessage("queen_escape")], this);},
            getAttack: getAttackQueen,
            relatives: []
        }
    }

    function makeRelation(e1, e2){
        e1.relatives.push(e2);
        e2.relatives.push(e1);
    }

    var p0 = makePeasant();
    p0.courage = -1;
    var p1 = makePeasant();
    makeRelation(p0, p1);
    var p2 = makePeasant();
    makeRelation(p1, p2);
    var p3 = makePeasant();
    makeRelation(p1, p3);
    makeRelation(p2, p3);
    var p4 = makePeasant();
    makeRelation(p2, p4);
    var p5 = makePeasant();
    makeRelation(p2, p5);
    makeRelation(p4, p5);
    var p6 = makePeasant();
    makeRelation(p3, p6);
    var p7 = makePeasant();
    makeRelation(p3, p7);
    makeRelation(p6, p7);
    var p8 = makePeasant();
    makeRelation(p4, p8);
    makeRelation(p5, p8);
    var p9 = makePeasant();
    makeRelation(p6, p9);
    makeRelation(p7, p9);
    makeRelation(p8, p9);

    var s0 = makeSoldier();
    makeRelation(p8, s0);
    makeRelation(p9, s0);
    var s1 = makeSoldier();
    makeRelation(s0, s1);
    var s2 = makeSoldier();
    makeRelation(s0, s2);
    makeRelation(s1, s2);
    var s3 = makeSoldier();
    makeRelation(s1, s3);
    makeRelation(s2, s3);
    var s4 = makeSoldier();
    makeRelation(s3, s4);

    var a0 = makeApprentice();
    makeRelation(s1, a0);
    var a1 = makeApprentice();
    makeRelation(s2, a1);
    var a2 = makeApprentice();
    makeRelation(a0, a2);
    var a3 = makeApprentice();
    makeRelation(s4, a3);
    makeRelation(a0, a3);
    makeRelation(a2, a3);
    var a4 = makeApprentice();
    makeRelation(s4, a4);
    makeRelation(a1, a4);
    var a5 = makeApprentice();
    makeRelation(a1, a5);
    makeRelation(a4, a5);

    var k0 = makeKnight();
    makeRelation(a3, k0);
    makeRelation(s4, k0);
    var k1 = makeKnight();
    makeRelation(a4, k1);
    makeRelation(s4, k1);
    var k2 = makeKnight();
    makeRelation(k0, k2);
    var k3 = makeKnight();
    makeRelation(k1, k3);
    var k4 = makeKnight();
    makeRelation(k2, k4);
    makeRelation(k3, k4);

    var w0 = makeWizard();
    makeRelation(a2,w0);
    makeRelation(k0,w0);
    makeRelation(k2,w0);
    var w1 = makeWizard();
    makeRelation(k0, w1);
    makeRelation(k1, w1);
    makeRelation(k2, w1);
    makeRelation(k3, w1);
    makeRelation(k4, w1);
    var w2 = makeWizard();
    makeRelation(a5, w2);
    makeRelation(k1, w2);
    makeRelation(k3, w2);
    var w3 = makeWizard();
    makeRelation(k2, w3);
    makeRelation(w0, w3);
    var w4 = makeWizard();
    makeRelation(k3, w4);
    makeRelation(w2, w4);

    var king = makeKing();
    makeRelation(k4, king);
    makeRelation(w3, king);
    makeRelation(w4, king);
    var queen = makeQueen();
    makeRelation(k4, queen);
    makeRelation(w3, queen);
    makeRelation(w4, queen);
    makeRelation(king, queen);

    var enemies = [
        p0,p1,p2,p3,p4,p5,p6,p7,p8,p9,
        s0,s1,s2,s3,s4,a0,a1,a2,a3,a4,a5,
        k0,k1,k2,k3,k4,w0,w1,w2,w3,w4,
        king, queen
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

    var getRandomMessage = function(key){
        var m = messages[key] || getMessages(key);
        var mes = m[Math.floor(m.length*Math.random())];
        while(m.length > 1 && mes === m.last){
            mes = m[Math.floor(m.length*Math.random())];
        }
        m.last = mes;
        return mes;
    };

    function getAttack(player, enemies, startIndex){
        if(!startIndex || startIndex < 0 || startIndex > this.skills.length){
            startIndex = 0;
        }
        var l = this.skills.length - startIndex;
        var skill = this.skills[startIndex + Math.floor(Math.random()*l)];
        while((skill.costs && skill.costs > this.mp)){
            skill = this.skills[startIndex + Math.floor(Math.random()*l)];
        }
        if(skill.damage && skill.damage.base < 0){
            return {to: this, skill: skill};
        } else {
            return {to: player, skill: skill};
        }
    }

    function getAttack2(player, enemies){
        if(this.mp > this.skills[0].costs){
            for (var i = 0; i < enemies.length; i++) {
                var enemy = enemies[i];
                if (enemy.hp < enemy.maxHP / 2){
                    return {to: enemy, skill: this.skills[0]};
                }
            }
        }
        return getAttack.call(this, player, enemies, 1);
    }

    function getAttackQueen(player, enemies){
        if(this.mp < skills.queen_heal.costs){
            return {to: this, skill: skills.queen_focus};
        } else if (this.mp < skills.queen_blast.costs){
            return {to: this, skill: skills.queen_heal};
        }
        var avg = 0;
        var min = Infinity;
        var max = 0;
        for (var i = 0; i < enemies.length; i++) {
            var enemy = enemies[i];
            var ratio = enemy.hp/enemy.maxHP;
            avg += ratio;
            min = Math.min(min, ratio);
            max = Math.max(max, ratio);
        }
        avg /= enemies.length;
        if(min < 0.3 || max < 1.0 || avg < 0.75){
            return {to: this, skill: skills.queen_heal};
        } else if(this.mp > skills.queen_blast.costs || min == 1.0){
            return {to: player, skill: skills.queen_blast};
        } else {
            return {to: this, skill: skills.queen_focus};
        }

    }

    var nextDeathEvent = 0;
    var nextEscapeEvent = 0;
    function getEventMessages(deaths, escapes){
        var messages = [];
        while(nextDeathEvent < deathEvents.length && deaths >= deathEvents[nextDeathEvent].when){
            messages = messages.concat(deathEvents[nextDeathEvent].messages);
            nextDeathEvent++;
        }
        while(nextEscapeEvent < escapeEvents.length && escapes >= escapeEvents[nextEscapeEvent].when){
            messages = messages.concat(escapeEvents[nextEscapeEvent].messages);
            nextEscapeEvent++;
        }
        return messages;
    }

    return {
        getMessages: function(key){
            return getMessages(key);
        },
        getEventMessages: getEventMessages,
        getStartingEnemies: function(){
            return [{
                name: "Deer",
                hp: 10,
                mp: 1,
                skills: [skills.deer_charge, skills.deer_kick],
                getAttackMessages: function(){return bindMessages(getMessages("deer_attack"), this)},
                getDeathMessages: function(){return bindMessages(getMessages("deer_death"), this)},
                getEscapeMessages: function(){return []},
                getAttack: getAttack,
                hardEnd: true
            },{
                name: "Memory of Mom",
                hp: 5000,
                mp: 20,
                skills: [skills.mom_heal],
                getAttackMessages: function(){return bindMessages(getMessages("mom_attack1"), this)},
                getDeathMessages: function(){return []},
                getEscapeMessages: function(){return bindMessages(getMessages("mom_escape1"), this)},
                getAttack: function(player, enemies){
                    if(player.hp < player.maxHP && this.mp >= 3) {
                        return {to: player, skill: skills.mom_heal}
                    } else {
                        return {to: this, skill: skills.escape}
                    }
                },
                hardEnd: true
            },{
                name: "Deer",
                hp: 12,
                mp: 1,
                skills: [skills.deer_charge, skills.deer_kick],
                getAttackMessages: function(){return bindMessages(getMessages("deer_attack2"), this)},
                getDeathMessages: function(){return bindMessages(getMessages("deer_death"), this)},
                getEscapeMessages: function(){return []},
                getAttack: getAttack
            },{
                name: "Deer",
                hp: 12,
                mp: 1,
                skills: [skills.deer_charge, skills.deer_kick],
                getAttackMessages: function(){return []},
                getDeathMessages: function(){return bindMessages(getMessages("deer_death"), this)},
                getEscapeMessages: function(){return []},
                getAttack: getAttack,
                hardEnd: true
            },{
                name: "Memory of Mom",
                hp: 5000,
                mp: 0,
                maxMP: 20,
                skills: [skills.mom_focus],
                getAttackMessages: function(){return bindMessages(getMessages("mom_attack2"), this)},
                getDeathMessages: function(){return []},
                getEscapeMessages: function(){return bindMessages(getMessages("mom_escape2"), this)},
                getAttack: function(player, enemies){
                    if(player.mp < player.maxMP || this.mp < this.maxMP) {
                        return {to: player, skill: skills.mom_focus}
                    } else {
                        return {to: this, skill: skills.escape}
                    }
                },
                hardEnd: true
            },{
                name: "Cow",
                hp: 15,
                mp: 1,
                skills: [skills.cow_charge, skills.cow_kick],
                getAttackMessages: function(){return bindMessages(getMessages("cow_attack"), this)},
                getDeathMessages: function(){return bindMessages(getMessages("cow_death"), this)},
                getEscapeMessages: function(){},
                getAttack: getAttack
            },{
                name: "Cow",
                hp: 15,
                mp: 1,
                skills: [skills.cow_charge, skills.cow_kick],
                getAttackMessages: function(){return []},
                getDeathMessages: function(){return bindMessages(getMessages("cow_death"), this)},
                getEscapeMessages: function(){},
                getAttack: getAttack
            },{
                name: "Cow",
                hp: 15,
                mp: 1,
                skills: [skills.cow_charge, skills.cow_kick],
                getAttackMessages: function(){return []},
                getDeathMessages: function(){return bindMessages(getMessages("cow_death"), this)},
                getEscapeMessages: function(){},
                getAttack: getAttack
            }]
        },
        getEnemiesRelatedTo: function(enemy){
            if (enemy.name === "Cow"){
                return [enemies[0]];
            } else if (enemy.name === "King" || enemy.name === "Queen"){
                return enemies.slice();
            } else if(enemy.relatives){
                return enemy.relatives.slice();
            } else {
                return [];
            }
        },
        getEndMessages: function(playerDead, deathCount, escapeCount){
            if(playerDead){
                return getMessages("player_death");
            } else if (deathCount === 6){
                return getMessages("peace");
            } else if (deathCount < 6+enemies.length/2){
                return getMessages("truce");
            } else if (deathCount < 6+enemies.length){
                return getMessages("fear");
            } else {
                return getMessages("all_dead");
            }

        },
        resetEnemies: function(){
            enemies.forEach(function(e){
                e.dead = false;
                e.isEscaping = false;
                e.escaped = false;
                e.anger = 0;
                if(e.maxMP){
                    e.mp = e.maxMP;
                }
                if(e.maxHP){
                    e.hp = e.maxHP;
                }
                nextDeathEvent = 0;
                nextEscapeEvent = 0;
            })
        }
    }
});