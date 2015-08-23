define(["Data", "Player", "UI"], function(Data, Player, UI){
    "use strict";

	function Game(){
        this.init();
	}

    Game.prototype.init = function(){
        this.deathCount = 0;
        this.escapeCount = 0;
        this.enemies = [];
        this.enemyMap = {};
        this.player = new Player();
        this.messages = [];
        this.nextId = 0;
        this.nextEnemyTurnIndex = 0;
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

    Game.prototype.addEnemy = function(enemy, death){
        if(!enemy.id){
            enemy.id = enemy.name + "_" + this.nextId;
            this.nextId++;
        }
        if(!this.enemyMap[enemy.id]){
            this.enemyMap[enemy.id] = enemy;
            this.enemies.push(enemy);
            enemy.maxHP = enemy.hp;
            enemy.maxMP = enemy.mp;
        }
        if(this.lastAttack.indexOf(enemy) === -1){
            enemy.anger += death ? 2 : 1;
        }
    };

    Game.prototype.addEnemies = function(enemies, death){
        for (var i = 0; i < enemies.length; i++) {
            this.addEnemy(enemies[i], death);
        }
    };

    Game.prototype.getAttackingEnemies = function() {
        var atEnemies = [];
        var restEnemies = [];
        while (this.enemies.length > 0) {
            var enemy = this.enemies.shift();
            if (typeof enemy.anger === "undefined" || enemy.anger > 0) {
                atEnemies.push(enemy);
            } else {
                restEnemies.push(enemy);
            }
            if (enemy.hardEnd) {
                break;
            }
        }
        this.enemies = this.enemies.concat(restEnemies);
        return atEnemies;
    };

    Game.prototype.attack = function(enemies){
        this.lastAttack = enemies.slice();
        var messages = [];
        for (var i = 0; i < enemies.length; i++) {
            messages = messages.concat(enemies[i].getAttackMessages());
        }
        this.ui.fight(this.player, enemies);
        this.showMessages(messages, function(){
            this.currentEnemies = enemies;
            this.ui.enableSkills();
        });
    };

    Game.prototype.useSkill = function(from, to, skill){
        if(skill.escape){
            from.isEscaping = true;
            from.turnsTillEscape = 3;
            this.ui.update();
            this.nextTurn();
            return true;
        }
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
        if(to.hp <= 0) {
            this.kill(to);
        } else {
            this.nextTurn();
        }
        return true;
    };

    Game.prototype.nextTurn = function(){
        if(this.nextEnemyTurnIndex < this.currentEnemies.length){
            var enemy = this.currentEnemies[this.nextEnemyTurnIndex];
            window.setTimeout(this.makeEnemyTurn.bind(this, enemy), 2000);
            this.nextEnemyTurnIndex++;
        } else {
            window.setTimeout(this.ui.enableSkills.bind(this.ui), 1000);
            this.nextEnemyTurnIndex = 0;
        }
    };

    Game.prototype.makeEnemyTurn = function(enemy){
        if(enemy.isEscaping){
            if(enemy.turnsTillEscape > 0){
                enemy.turnsTillEscape--;
                this.ui.update();
                this.nextTurn();
            } else {
                this.letEscape(enemy);
            }
        } else {
            var attack = enemy.getAttack(this.player, this.currentEnemies);
            this.useSkill(enemy, attack.to, attack.skill)
        }
    };

    Game.prototype.continueFight = function(){
        this.ui.update();
        if(this.currentEnemies.length > 0){
            this.nextTurn();
        } else {
            this.endFight();
        }
    };

    Game.prototype.kill = function(fighter){
        var self = this;
        if(fighter == this.player){
            this.showMessages(Data.getMessages("player dead"), function () {
                self.end();
            });
        } else {
            fighter.dead = true;
            this.deathCount++;
            var index = this.currentEnemies.indexOf(fighter);
            if(index < this.nextEnemyTurnIndex){
                this.nextEnemyTurnIndex--;
            }
            this.currentEnemies.splice(index,1);
            var result = Data.getEnemiesRelatedTo(fighter);
            this.addEnemies(result, true);
            this.showMessages(fighter.getDeathMessages(), function(){
                if(self.player.learnByDeaths.length > 0 && self.deathCount >= self.player.learnByDeaths[0].when){
                    var skill = self.player.learnByDeaths.shift();
                    self.player.skills.push(skill);
                    this.player.update(this.deathCount, this.escapeCount);
                    self.ui.update();
                    self.showMessages(skill.messages, self.continueFight.bind(self));
                } else {
                    this.player.update(this.deathCount, this.escapeCount);
                    self.continueFight()
                }
            });
        }
    };

    Game.prototype.letEscape = function(enemy){
        var self = this;
        this.escapeCount++;
        if(!enemy.hardEnd) {
            enemy.anger -= this.lastAttack.length;
            this.enemies.push(enemy);
            var enemies = Data.getEnemiesRelatedTo(enemy);
            this.addEnemies(enemies, false);
        }
        enemy.escaped = true;
        var index = this.currentEnemies.indexOf(enemy);
        if(index < this.nextEnemyTurnIndex){
            this.nextEnemyTurnIndex--;
        }
        this.currentEnemies.splice(index,1);
        this.showMessages(enemy.getEscapeMessages(), function(){
            if(self.player.learnByEscapes.length > 0 && self.escapeCount >= self.player.learnByEscapes[0].when){
                var skill = self.player.learnByEscapes.shift();
                self.player.skills.push(skill);
                this.player.update(this.deathCount, this.escapeCount);
                self.showMessages(skill.messages, self.continueFight.bind(self));
            } else {
                this.player.update(this.deathCount, this.escapeCount);
                self.continueFight()
            }
        });
    };

    Game.prototype.endFight = function(){
        var self = this;
        self.ui.removeEnemies();
        if(this.enemies.length === 0){
            this.showMessages(Data.getMessages("all dead"), function(){
                self.end();
            });
        }else{
            var eventMessages = Data.getEventMessages(this.deathCount, this.escapeCount);
            this.showMessages(eventMessages, function(){
                var enemies = this.getAttackingEnemies();
                if(enemies.length === 0){
                    self.showMessages(Data.getMessages("peace"), function(){
                        self.end();
                    });
                } else {
                    self.attack(enemies);
                }
            })
        }
    };

    Game.prototype.start = function(){
        var self = this;
        this.addEnemies(Data.getStartingEnemies());
        this.showMessages(Data.getMessages("opening"), function(){
            self.endFight();
        });
    };

	return Game;
});