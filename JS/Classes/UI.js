/**
 * Created by Rialgar on 2015-08-22.
 */
define([], function () {
    function UI (rootElement,
                 game) {
        var self = this;

        var parentElement = rootElement;
        this.rootElement = rootElement;
        if (rootElement === window || rootElement === document || rootElement === document.documentElement) {
            parentElement = document.body;
            this.rootElement = document.documentElement;
        }
        this.game = game;

        this.messageElement = document.createElement("div");
        this.messageElement.classList.add("message");
        this.messageElement.style.display = "none";
        parentElement.appendChild(this.messageElement);

        this.fullScreenMessageElement = document.createElement("div");
        this.fullScreenMessageElement.classList.add("fullScreenMessage");
        this.fullScreenMessageElement.style.display = "none";
        parentElement.appendChild(this.fullScreenMessageElement);

        this.battleElement = document.createElement("div");
        this.battleElement.classList.add("battle");
        parentElement.appendChild(this.battleElement);

        this.playerDiv = document.createElement("div");
        this.playerDiv.classList.add("player");
        this.battleElement.appendChild(this.playerDiv);

        var playerTile = document.createElement("div");
        playerTile.classList.add("tile");
        this.playerDiv.appendChild(playerTile);
        this.playerName = document.createElement("div");
        this.playerName.classList.add("name");
        this.playerName.textContent = "[Click to name yourself]";
        this.playerName.contentEditable = true;
        playerTile.appendChild(this.playerName);
        var playerHPFrame = document.createElement("div");
        playerHPFrame.classList.add("hpFrame");
        playerTile.appendChild(playerHPFrame);
        this.playerHP = document.createElement("div");
        this.playerHP.classList.add("hp");
        playerHPFrame.appendChild(this.playerHP);
        var playerMPFrame = document.createElement("div");
        playerMPFrame.classList.add("mpFrame");
        playerTile.appendChild(playerMPFrame);
        this.playerMP = document.createElement("div");
        this.playerMP.classList.add("mp");
        playerMPFrame.appendChild(this.playerMP);
        playerTile.addEventListener("click", function () {
            self.select(playerTile);
        });
        this.playerTile = playerTile;

        this.enemyDiv = document.createElement("div");
        this.enemyDiv.classList.add("enemy");
        this.battleElement.appendChild(this.enemyDiv);

        this.parentElement = parentElement;
        rootElement.addEventListener("click", this.rootElementClicked.bind(this));
    }

    UI.prototype.makeSkillTile = function (skill) {
        var tile = document.createElement("div");
        tile.classList.add("skill");
        tile.classList.add("disabled");
        var name = document.createElement("div");
        name.classList.add("skillName");
        name.textContent = skill.name;
        tile.appendChild(name);
        var damage = document.createElement("div");
        damage.classList.add("skillDamage");
        damage.textContent = (skill.damageText || "0");
        tile.damageDiv = damage;
        tile.appendChild(damage);
        var targeted = document.createElement("div");
        targeted.classList.add("skillTargeted");
        targeted.textContent = skill.target ? "Targeted" : (skill.all ? "All" : "Self");
        tile.appendChild(targeted);
        var costs = document.createElement("div");
        costs.classList.add("skillCosts");
        costs.textContent = "Mana: " + (skill.costs || "0");
        tile.appendChild(costs);

        var self = this;
        tile.addEventListener("click", function (event) {
            if (!tile.classList.contains("disabled")) {
                if (self.selectedSkillTile) {
                    self.selectedSkillTile.classList.remove("selected");
                }
                if (skill.target) {
                    self.selectedSkill = skill;
                    self.selectedSkillTile = tile;
                    self.selectedSkillTile.classList.add("selected");
                    self.playerDiv.classList.add("selectable");
                    self.enemyDiv.classList.add("selectable");
                } else {
                    self.selectedSkill = false;
                    self.selectedSkillTile = false;
                    self.playerDiv.classList.remove("selectable");
                    self.enemyDiv.classList.remove("selectable");
                    if (self.game.useSkill(self.player, self.player, skill)) {
                        self.disableSkills();
                    }
                }
                event.stopPropagation();
            }
        });
        return tile;
    };

    UI.prototype.select = function (tile) {
        if (this.selectedSkill && !tile.classList.contains("done") && !this.selectedSkillTile.classList.contains("disabled")) {
            var skill = this.selectedSkill;
            if (this.game.useSkill(this.player, tile.entity, skill)) {
                this.disableSkills();
            }

        }
    };

    UI.prototype.disableSkills = function () {
        var tile = this.playerDiv.firstElementChild.nextElementSibling;
        while (tile) {
            tile.classList.add("disabled");
            tile = tile.nextElementSibling;
        }
        this.playerDiv.classList.remove("selectable");
        this.enemyDiv.classList.remove("selectable");
    };

    UI.prototype.enableSkills = function () {
        var tile = this.playerDiv.firstElementChild.nextElementSibling;
        while (tile) {
            tile.classList.remove("disabled");
            tile = tile.nextElementSibling;
        }
        if (this.selectedSkill) {
            this.playerDiv.classList.add("selectable");
            this.enemyDiv.classList.add("selectable");
        }
    };

    UI.prototype.makeEnemyTile = function (enemy) {
        var self = this;
        var enemyTile = document.createElement("div");
        enemyTile.classList.add("tile");
        var enemyName = document.createElement("div");
        enemyName.classList.add("name");
        enemyName.textContent = self.enemies.indexOf(enemy) + 1 + ": " + enemy.name;
        enemyTile.enemyName = enemyName;
        enemyTile.appendChild(enemyName);
        var enemyHPFrame = document.createElement("div");
        enemyHPFrame.classList.add("hpFrame");
        enemyTile.appendChild(enemyHPFrame);
        enemyTile.enemyHP = document.createElement("div");
        enemyTile.enemyHP.classList.add("hp");
        enemyHPFrame.appendChild(enemyTile.enemyHP);
        var enemyMPFrame = document.createElement("div");
        enemyMPFrame.classList.add("mpFrame");
        enemyTile.appendChild(enemyMPFrame);
        enemyTile.enemyMP = document.createElement("div");
        enemyTile.enemyMP.classList.add("mp");
        enemyMPFrame.appendChild(enemyTile.enemyMP);
        enemyTile.addEventListener("click", function (event) {
            self.select(enemyTile);
            event.preventDefault();
            event.stopPropagation();
        });
        enemyTile.entity = enemy;
        enemy.tile = enemyTile;
        return enemyTile;
    };

    UI.prototype.removeEnemies = function () {
        var tile = this.enemyDiv.firstElementChild;
        while (tile) {
            this.enemyDiv.removeChild(tile);
            tile = this.enemyDiv.firstElementChild;
        }
    };

    UI.prototype.fight = function (player, enemies) {
        this.player = player;
        this.playerTile.entity = player;
        this.enemies = enemies.slice();

        this.removeEnemies();
        for (var i = 0; i < enemies.length; i++) {
            var enemy = enemies[i];
            enemy.dead = false;
            enemy.escaped = false;
            this.enemyDiv.appendChild(this.makeEnemyTile(enemy));
        }
        this.update();
    };

    UI.prototype.showSkill = function (from, to, name) {
        var element = document.createElement("div");
        element.classList.add("usedSkill");
        element.textContent = name;
        if (from === this.player) {
            element.style.left = "300px";
        } else {
            element.style.right = "300px";
        }
        var top = 100;
        if (from.tile) {
            top = from.tile.getBoundingClientRect().top + 50;
            if (top < 100) {
                from.tile.scrollIntoView(true);
                top = 100;
            } else if (top > this.rootElement.clientHeight - 100) {
                from.tile.scrollIntoView(false);
                top = this.rootElement.clientHeight - 100;
            }
        }
        element.style.top = top + "px";
        this.parentElement.appendChild(element);
        window.setTimeout(function () {
            element.style.opacity = 0;
            element.style.top = (top - 50) + "px";
        }, 100);
        window.setTimeout(function () {
            element.parentElement.removeChild(element);
        }, 2000);
    };

    UI.prototype.showDamage = function (to, damage, mana) {
        var element = document.createElement("div");
        element.classList.add("damage");
        element.textContent = Math.abs(damage);
        var top = 100;
        if (to === this.player) {
            element.style.left = mana ? "200px" : "100px";
            top = mana
                ? this.playerMP.getBoundingClientRect().top
                : this.playerHP.getBoundingClientRect().top;
        } else {
            element.style.right = mana ? "200px" : "100px";
            top = mana
                ? to.tile.enemyMP.getBoundingClientRect().top
                : to.tile.enemyHP.getBoundingClientRect().top;
        }
        element.style.top = top + "px";
        if (damage >= 0) {
            element.style.color = "red";
        } else {
            element.style.color = "green";
        }
        this.parentElement.appendChild(element);
        window.setTimeout(function () {
            element.style.opacity = 0;
            element.style.top = (top - 50) + "px";
        }, 100);
        window.setTimeout(function () {
            element.parentElement.removeChild(element);
        }, 2000);
    };

    UI.prototype.update = function () {
        this.playerHP.style.width = Math.max(0, (this.player.hp / this.player.maxHP) * 100) + "%";
        this.playerMP.style.width = Math.max(0, (this.player.mp / this.player.maxMP) * 100) + "%";
        var tile = this.playerDiv.firstElementChild;
        for (var i = 0; i < this.player.skills.length; i++) {
            tile = tile && tile.nextElementSibling;
            if (tile) {
                tile.damageDiv.textContent = this.player.skills[i].damageText || "0";
            } else {
                this.playerDiv.appendChild(this.makeSkillTile(this.player.skills[i]));
            }
        }
        for (i = 0; i < this.enemies.length; i++) {
            var enemy = this.enemies[i];
            if (enemy.dead || enemy.escaped) {
                if (enemy.tile.childElementCount > 1) {
                    enemy.tile.classList.remove("escaping");
                    enemy.tile.classList.add("done");
                    enemy.tile.enemyName.textContent = this.enemies.indexOf(enemy) + 1 + ": " + enemy.name + (enemy.dead ? " (dead)" : " (esc)");
                    var div = enemy.tile.firstElementChild.nextElementSibling;
                    while (div) {
                        enemy.tile.removeChild(div);
                        div = enemy.tile.firstElementChild.nextElementSibling;
                    }
                }
            } else {
                enemy.tile.enemyHP.style.width = Math.max(0, (enemy.hp / enemy.maxHP) * 100) + "%";
                enemy.tile.enemyMP.style.width = Math.max(0, (enemy.mp / enemy.maxMP) * 100) + "%";
                if (enemy.isEscaping) {
                    enemy.tile.classList.add("escaping");
                    enemy.tile.enemyName.textContent = this.enemies.indexOf(enemy) + 1 + ": " + enemy.name + " (escaping: " + enemy.turnsTillEscape + ")";
                }
            }
        }
    };

    UI.prototype.rootElementClicked = function (event) {
        if (this.messageElement.style.display != "none") {
            this.messageElement.style.display = "none";
            this.game.showNextMessage();
            event.preventDefault();
            event.stopPropagation();
        } else if (this.fullScreenMessageElement.style.display != "none") {
            this.fullScreenMessageElement.style.display = "none";
            this.fullScreenCallback();
            event.preventDefault();
            event.stopPropagation();
        }
    };

    UI.prototype.showMessage = function (message) {
        this.messageElement.textContent = message.text;
        this.messageElement.style.display = "block";

        switch (message.position) {
            case "left":
                this.messageElement.style.left = "50px";
                this.messageElement.style.top = "50px";
                break;
            case "right":
                this.messageElement.style.left = (this.rootElement.clientWidth - 400) + "px";
                var top = 50;
                if (message.source) {
                    top = message.source.tile.getBoundingClientRect().top + 50;
                    if (top < 50) {
                        message.source.tile.scrollIntoView(true);
                        top = 50;
                    } else if (top > this.rootElement.clientHeight - 160) {
                        message.source.tile.scrollIntoView(false);
                        top = this.rootElement.clientHeight - 160;
                    }
                }
                this.messageElement.style.top = top + "px";
                break;
            case "center":
                this.messageElement.style.left = (this.rootElement.clientWidth - 350) / 2 + "px";
                this.messageElement.style.top = "100px";
        }
    };

    UI.prototype.init = function () {
        this.fullScreenMessageElement.textContent = "Click or touch to start.";
        this.fullScreenMessageElement.style.display = "block";
        this.fullScreenMessageElement.style.width = this.rootElement.clientWidth - 210 + "px";
        this.fullScreenMessageElement.style.height = this.rootElement.clientHeight - 210 + "px";

        this.fullScreenCallback = this.game.start.bind(this.game);

        var tile = this.playerDiv.firstElementChild.nextElementSibling;
        while (tile) {
            this.playerDiv.removeChild(tile);
            tile = this.playerDiv.firstElementChild.nextElementSibling;
        }

        this.playerHP.style.width = "100%";
        this.playerMP.style.width = "100%";
    };

    UI.prototype.showFinalMessage = function (text) {
        this.fullScreenMessageElement.textContent = text;
        this.fullScreenMessageElement.style.display = "block";

        this.fullScreenCallback = this.game.init.bind(this.game);
    };

    return UI;
});