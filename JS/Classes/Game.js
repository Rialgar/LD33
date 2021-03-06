define(["Data", "Player", "UI"], function (Data, Player, UI) {
    "use strict";

    function Game () {
        this.init();
    }

    Game.prototype.init = function () {
        this.deathCount = 0;
        this.escapeCount = 0;
        this.fightCount = 0;
        this.enemies = [];
        this.enemyMap = {};
        this.player = new Player();
        this.messages = [];
        this.nextId = 0;
        this.nextEnemyTurnIndex = 0;
        this.lastAttack = [];
        this._skipMessages = false;
        if (!this.ui) {
            this.ui = new UI(
                window,
                this
            );
        }
        Data.resetEnemies();
        this.ui.init();
    };

    Game.prototype.showNextMessage = function () {
        if (this.messages.length > 0 && !this._skipMessages) {
            this.ui.showMessage(this.messages.shift());
        } else if (typeof this.messageCallback === "function") {
            this.messageCallback();
        } else {
            this.end();
        }
    };

    Game.prototype.end = function () {
        this._skipMessages = false;
        this.showMessages(Data.getEndMessages(this.player.hp <= 0, this.deathCount, this.escapeCount), function () {
            this.ui.removeEnemies();
            this.ui.showFinalMessage("The End\n\n\nClick/Touch to restart");
        });
    };

    Game.prototype.showMessages = function (messages, callback) {
        this.messages = messages;
        this.messageCallback = callback;
        window.setTimeout(this.showNextMessage.bind(this), 0);
    };

    Game.prototype.addEnemy = function (enemy, death) {
        if (enemy.dead) {
            return;
        }
        if (!enemy.id) {
            enemy.id = enemy.name + "_" + this.nextId;
            this.nextId++;
        }
        if (!this.enemyMap[enemy.id]) {
            this.enemyMap[enemy.id] = enemy;
            this.enemies.push(enemy);
            if (!enemy.maxHP) {
                enemy.maxHP = enemy.hp;
            }
            if (!enemy.maxMP) {
                enemy.maxMP = enemy.mp;
            }
        }
        if (typeof enemy.anger !== "undefined" && this.lastAttack.indexOf(enemy) < 0) {
            enemy.anger += death ? 2 : 1;
        }
    };

    Game.prototype.addEnemies = function (enemies, death) {
        for (var i = 0; i < enemies.length; i++) {
            this.addEnemy(enemies[i], death);
        }
    };

    Game.prototype.getAttackingEnemies = function () {
        var atEnemies = [];
        var restEnemies = [];
        while (this.enemies.length > 0) {
            var enemy = this.enemies.shift();
            if (enemy.dead) {
                continue;
            }
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

    Game.prototype.turnsTillEscape = 3;

    Game.prototype.attack = function (enemies) {
        this.lastAttack = enemies.slice();
        var messages = [];
        for (var i = 0; i < enemies.length; i++) {
            var enemy = enemies[i];
            messages = messages.concat(enemy.getAttackMessages());
            if (enemy.courage) {
                enemy.morale = 115;
            }
            enemy.isEscaping = false;
            enemy.turnsTillEscape = this.turnsTillEscape;
        }
        this.ui.fight(this.player, enemies);
        this.showMessages(messages, function () {
            this.currentEnemies = enemies;
            this.ui.enableSkills();
        });
    };

    Game.prototype.applySkill = function (from, to, skill) {
        if (skill.damage) {
            var dmg = skill.damage.base;
            for (var i = 0; i < skill.damage.dice.length; i++) {
                var dice = skill.damage.dice[i];
                var rand = Math.random() * dice;
                dmg += (rand > 0) ? Math.ceil(rand) : Math.floor(rand);
            }
            if (skill.damage.mp) {
                to.mp -= dmg;
            } else {
                to.hp -= dmg;
            }
            this.ui.showDamage(to, dmg, skill.damage.mp);
            if (skill.leech) {
                var leech = Math.ceil(skill.leech * dmg);
                from.hp += leech;
                this.ui.showDamage(from, -leech);
            }
            if (dmg > 0 && to.morale) {
                this.reduceMorale(to, 10);
            }
        }
        if (to.hp > to.maxHP) {
            to.hp = to.maxHP;
        }
        if (to.mp > to.maxMP) {
            to.mp = to.maxMP;
        }
        if (from.hp > from.maxHP) {
            from.hp = from.maxHP;
        }
        if (from.mp > from.maxMP) {
            from.mp = from.maxMP;
        }
        if (skill.scare && to.morale) {
            this.reduceMorale(to, skill.scare);
        }
        this.ui.update();
    };

    Game.prototype.checkEnemy = function(enemy, callback){
        if (enemy.hp <= 0) {
            this.kill(enemy, callback);
        } else {
            callback();
        }
    };

    Game.prototype.checkNextEnemy = function () {
        if (typeof(this.nextEnemyForCheck) === "number" && this.nextEnemyForCheck < this.currentEnemies.length) {
            var enemy = this.currentEnemies[this.nextEnemyForCheck];
            this.nextEnemyForCheck++;
            this.checkEnemy(enemy, this.checkNextEnemy.bind(this));
        } else {
            this.continueFight();
        }
    };

    Game.prototype.useSkill = function (from, to, skill) {
        if(skill.name === "Instascare"){
            this.currentEnemies.forEach(function(e){
                e.isEscaping = true;
                e.turnsTillEscape = 0;
            })
        }
        if (skill.escape) {
            from.isEscaping = true;
            from.turnsTillEscape = this.turnsTillEscape;
            this.ui.update();
            this.ui.showSkill(from, from, "Escape");
            this.nextTurn();
            return true;
        }
        if (skill.costs && from.mp < skill.costs) {
            return false;
        }
        if (skill.costs) {
            from.mp -= skill.costs;
            this.ui.showDamage(from, skill.costs, true);
        }
        this.ui.showSkill(from, to, skill.name);
        if (skill.all) {
            for (var i = 0; i < this.currentEnemies.length; i++) {
                var enemy = this.currentEnemies[i];
                this.applySkill(from, enemy, skill);
            }
            this.nextEnemyForCheck = 0;
            this.checkNextEnemy();
        } else {
            this.applySkill(from, to, skill);
            this.checkEnemy(to, this.continueFight.bind(this))
        }
        return true;
    };

    Game.prototype.nextTurn = function () {
        console.log(this.escapeCount, this.deathCount);
        if (this.nextEnemyTurnIndex < this.currentEnemies.length) {
            var enemy = this.currentEnemies[this.nextEnemyTurnIndex];
            window.setTimeout(this.makeEnemyTurn.bind(this, enemy), 1000);
            this.nextEnemyTurnIndex++;
        } else {
            window.setTimeout(this.ui.enableSkills.bind(this.ui), 1000);
            this.nextEnemyTurnIndex = 0;
        }
    };

    Game.prototype.reduceMorale = function (enemy, amount) {
        amount /= (1 + enemy.courage / 4);
        enemy.morale -= amount;
    };

    var escapeSkill = {
        name: "Escape",
        escape: true
    };
    Game.prototype.makeEnemyTurn = function (enemy) {
        if (enemy.isEscaping) {
            this.ui.showSkill(enemy, enemy, "Escape");
            if (enemy.turnsTillEscape > 0) {
                enemy.turnsTillEscape--;
                this.ui.update();
                this.nextTurn();
            } else {
                this.letEscape(enemy);
            }
        } else {
            if (enemy.courage) {
                if (Math.random() * 100 > enemy.morale) {
                    this.useSkill(enemy, enemy, escapeSkill);
                    return;
                } else {
                    this.reduceMorale(enemy, 4);
                }
            }
            var attack = enemy.getAttack(this.player, this.currentEnemies);
            this.useSkill(enemy, attack.to, attack.skill)
        }
    };

    Game.prototype.continueFight = function () {
        this.ui.update();
        if (this.currentEnemies.length > 0) {
            this.nextTurn();
        } else {
            this.endFight();
        }
    };

    Game.prototype.kill = function (fighter, callback) {
        var self = this;
        if (fighter == this.player) {
            self.end();
        } else {
            fighter.dead = true;
            this.deathCount++;
            var index = this.currentEnemies.indexOf(fighter);
            if (index < this.nextEnemyTurnIndex) {
                this.nextEnemyTurnIndex--;
            }
            if (index < this.nextEnemyForCheck) {
                this.nextEnemyForCheck--;
            }
            this.currentEnemies.splice(index, 1);
            var result = Data.getEnemiesRelatedTo(fighter);
            this.addEnemies(result, true);
            this.showMessages(fighter.getDeathMessages(), function () {
                if (self.player.learnByDeaths.length > 0 && self.deathCount >= self.player.learnByDeaths[0].when) {
                    var skill = self.player.learnByDeaths.shift();
                    self.player.skills.push(skill);
                    this.player.update(this.deathCount, this.escapeCount, this.fightCount);
                    self.ui.update();
                    self.showMessages(skill.messages, callback);
                } else if(self.player.learnByBoth.length > 0 && self.escapeCount >= self.player.learnByBoth[0].when[0] && self.deathCount >= self.player.learnByBoth[0].when[1]){
                    skill = self.player.learnByBoth.shift();
                    self.player.skills.push(skill);
                    this.player.update(this.deathCount, this.escapeCount, this.fightCount);
                    self.ui.update();
                    self.showMessages(skill.messages, callback);
                } else {
                    this.player.update(this.deathCount, this.escapeCount, this.fightCount);
                    callback();
                }
            });
        }
    };

    Game.prototype.letEscape = function (enemy) {
        var self = this;
        this.escapeCount++;
        if (!enemy.hardEnd) {
            enemy.anger -= this.lastAttack.length;
            this.enemies.push(enemy);
            var enemies = Data.getEnemiesRelatedTo(enemy);
            this.addEnemies(enemies, false);
        }
        enemy.escaped = true;
        enemy.hp = enemy.maxHP;
        enemy.mp = enemy.maxMP;
        var index = this.currentEnemies.indexOf(enemy);
        if (index < this.nextEnemyTurnIndex) {
            this.nextEnemyTurnIndex--;
        }
        this.currentEnemies.splice(index, 1);
        this.showMessages(enemy.getEscapeMessages(), function () {
            if (self.player.learnByEscapes.length > 0 && self.escapeCount >= self.player.learnByEscapes[0].when) {
                var skill = self.player.learnByEscapes.shift();
                self.player.skills.push(skill);
                this.player.update(this.deathCount, this.escapeCount, this.fightCount);
                self.showMessages(skill.messages, self.continueFight.bind(self));
            } else if(self.player.learnByBoth.length > 0 && self.escapeCount >= self.player.learnByBoth[0].when[0] && self.deathCount >= self.player.learnByBoth[0].when[1]){
                skill = self.player.learnByBoth.shift();
                self.player.skills.push(skill);
                this.player.update(this.deathCount, this.escapeCount, this.fightCount);
                self.ui.update();
                self.showMessages(skill.messages, self.continueFight.bind(self));
            } else {
                this.player.update(this.deathCount, this.escapeCount, this.fightCount);
                self.continueFight()
            }
        });
    };

    Game.prototype.endFight = function () {
        this.fightCount++;
        var wasKing = false;
        for(var i = 0; i < this.lastAttack.length; i++) {
            if (this.lastAttack[i].name === "King") {
                wasKing = true;
                break;
            }
        }
        if(wasKing){
            this.fightCount += 5;
        }
        this.player.update(this.deathCount, this.escapeCount, this.fightCount);
        var self = this;
        self.ui.removeEnemies();
        if (this.enemies.length === 0) {
            self.end();
        } else {
            var eventMessages = Data.getEventMessages(this.deathCount, this.escapeCount, this.fightCount);
            this.showMessages(eventMessages, function () {
                var enemies = this.getAttackingEnemies();
                if (enemies.length === 0) {
                    self.end();
                } else {
                    self.attack(enemies);
                }
            })
        }
    };

    Game.prototype.start = function () {
        var self = this;
        this.addEnemies(Data.getStartingEnemies());
        this.showMessages(Data.getMessages("opening"), function () {
            self.endFight();
        });
    };

    Game.prototype._learn = function () {
        while (this.player.learnByEscapes[0] && this.player.learnByEscapes[0].when <= this.escapeCount) {
            this.player.skills.push(this.player.learnByEscapes.shift());
        }
        while (this.player.learnByDeaths[0] && this.player.learnByDeaths[0].when <= this.deathCount) {
            this.player.skills.push(this.player.learnByDeaths.shift());
        }
    };
    Game.prototype._skipIntro = function () {
        while (this.currentEnemies[0] && !this.currentEnemies[0].courage) {
            var enemy = this.currentEnemies.shift();
            if (enemy.hp > 100) {
                this.escapeCount++;
                this.addEnemies(Data.getEnemiesRelatedTo(enemy), false);
            } else {
                this.deathCount++;
                this.addEnemies(Data.getEnemiesRelatedTo(enemy), true);
            }
            this._learn();
        }
        this.fightCount++;
        while (this.enemies[0] && !this.enemies[0].courage) {
            enemy = this.enemies.shift();
            if (enemy.hp > 100) {
                this.escapeCount++;
                this.addEnemies(Data.getEnemiesRelatedTo(enemy), false);
            } else {
                this.deathCount++;
                this.addEnemies(Data.getEnemiesRelatedTo(enemy), true);
            }
            this._learn();
            if (enemy.hardEnd) {
                this.fightCount++;
            }
        }
        Data.getEventMessages(this.deathCount, this.escapeCount);
        this.player.update(this.deathCount, this.escapeCount, this.fightCount);
        this.continueFight();
    };

    return Game;
});