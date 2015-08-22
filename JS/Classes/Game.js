define(["Data", "Player", "UI"], function(Data, Player, UI){
    "use strict";

	function Game(seed){
        this.init(seed);
	}

    Game.prototype.init = function(seed){
        this.seed = seed || Date.now();
        this.deathCount = 0;
        this.enemies = [];
        this.enemyMap = {};
        this.player = new Player();
        this.messages = [];
        if(!this.ui) {
            this.ui = new UI(
                window,
                this
            );
        }
        this.ui.init();
    };

    Game.prototype.showNextMessage = function(){
        if(this.messages.length > 0){
            this.ui.showMessage(this.messages.shift());
        } else if(typeof this.messageCallback === "function"){
            this.messageCallback();
        } else {
            this.end();
        }
    };

    Game.prototype.end = function(){
        this.ui.showFinalMessage("The End");
    };

    Game.prototype.showMessages = function(messages, callback){
        this.messages = messages;
        this.messageCallback = callback;
        this.showNextMessage();
    };

    Game.prototype.addEnemy = function(enemy){
        if(!this.enemyMap[enemy.id]){
            this.enemyMap[enemy.id] = enemy;
            this.enemies.push(enemy);
            enemy.maxHP = enemy.hp;
            enemy.maxMP = enemy.mp;
        }
    };

    Game.prototype.addEnemies = function(enemies){
        for (var i = 0; i < enemies.length; i++) {
            this.addEnemy(enemies[i]);
        }
    };

    Game.prototype.attack = function(enemy){
        this.showMessages(enemy.getAttackMessages(), function(){
            this.currentEnemy = enemy;
            this.ui.fight(this.player, this.currentEnemy);
        });
    };

    Game.prototype.useSkill = function(from, to, skill){
        if(skill.costs && from.mp < skill.costs){
            return false;
        }
        if(skill.costs) {
            from.mp -= skill.costs;
            this.ui.showDamage(from, skill.costs, true);
        }
        this.ui.showSkill(from, to, skill.name);
        if(skill.damage){
            var dmg = skill.damage.base;
            for (var i = 0; i < skill.damage.dice.length; i++) {
                var dice = skill.damage.dice[i];
                var rand = Math.random()*dice;
                dmg += (rand > 0) ? Math.ceil(rand) : Math.floor(rand);
            }
            to.hp -= dmg;
            this.ui.showDamage(to, dmg);
            if(skill.leech){
                var leech = skill.leech * dmg;
                from.hp += leech;
                this.ui.showDamage(from, leech);
            }
        }
        this.ui.update();
        if(to.hp > to.maxHP){
            to.hp = to.maxHP;
        }
        if(from.mp > to.maxMP){
            to.mp = to.maxMP;
        }
        if(to.hp <= 0){
            this.kill(to);
        } else {
            if(from === this.player){
                window.setTimeout(this.makeEnemyTurn.bind(this), 2100);
            } else {
                window.setTimeout(this.ui.enableSkills.bind(this.ui), 1800);
            }
        }
        return true;
    };

    Game.prototype.makeEnemyTurn = function(){
        var l = this.currentEnemy.skills.length;
        var skill = this.currentEnemy.skills[Math.floor(Math.random()*l)];
        while(skill.costs && skill.costs > this.currentEnemy.mp){
            skill = this.currentEnemy.skills[Math.floor(Math.random()*l)];
        }
        if(skill.damage < 0){
            this.useSkill(this.currentEnemy, this.currentEnemy, skill);
        } else {
            this.useSkill(this.currentEnemy, this.player, skill);
        }
    };

    Game.prototype.selectTarget = function(target){
        if (target) {
            self.attack(target);
        } else {
            self.showMessages(Data.getMessages("no target"), function () {
                self.end();
            });
        }
    };

    Game.prototype.kill = function(fighter){
        var self = this;
        if(fighter == this.player){
            this.showMessages(Data.getMessages("player dead"), function () {
                this.end();
            });
        } else {
            self.deathCount++;
            this.showMessages(fighter.getDeathMessages(), function () {
                var result = Data.getEnemiesRelatedTo(fighter, self.seed);
                self.addEnemies(result);
                if (self.enemies.length == self.deathCount) {
                    self.showMessages(Data.getMessages("all dead"), function () {
                        self.end();
                    });
                } else {
                    self.ui.showTargetSelection(this.enemies);
                }
            });
        }
    };

    Game.prototype.start = function(){
        var self = this;
        this.addEnemies(Data.getStartingEnemies());
        this.showMessages(Data.getMessages("opening"), function(){
            self.attack(self.enemies[0]);
        });
    };

	return Game;
});