/**
 * Created by Rialgar on 2015-08-22.
 */
define([], function(){
    function UI(
        rootElement,
        game
    ){
        var self = this;

        var parentElement = rootElement;
        this.rootElement = rootElement;
        if(rootElement === window || rootElement === document || rootElement === document.documentElement){
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
        playerTile.addEventListener("click", function(){
            self.select(playerTile);
        });
        this.playerTile = playerTile;


        this.enemyDiv = document.createElement("div");
        this.enemyDiv.classList.add("enemy");
        this.battleElement.appendChild(this.enemyDiv);

        var enemyTile = document.createElement("div");
        enemyTile.classList.add("tile");
        this.enemyDiv.appendChild(enemyTile);
        this.enemyName = document.createElement("div");
        this.enemyName.classList.add("name");
        enemyTile.appendChild(this.enemyName);
        var enemyHPFrame = document.createElement("div");
        enemyHPFrame.classList.add("hpFrame");
        enemyTile.appendChild(enemyHPFrame);
        this.enemyHP = document.createElement("div");
        this.enemyHP.classList.add("hp");
        enemyHPFrame.appendChild(this.enemyHP);
        var enemyMPFrame = document.createElement("div");
        enemyMPFrame.classList.add("mpFrame");
        enemyTile.appendChild(enemyMPFrame);
        this.enemyMP = document.createElement("div");
        this.enemyMP.classList.add("mp");
        enemyMPFrame.appendChild(this.enemyMP);
        enemyTile.addEventListener("click", function(){
            self.select(enemyTile);
        });
        this.enemyTile = enemyTile;

        this.parentElement = parentElement;
        rootElement.addEventListener("click", this.rootElementClicked.bind(this));
    }

    UI.prototype.makeSkillTile = function(skill){
        var tile = document.createElement("div");
        tile.classList.add("skill");
        var name = document.createElement("div");
        name.classList.add("skillName");
        name.textContent = skill.name;
        tile.appendChild(name);
        var damage = document.createElement("div");
        damage.classList.add("skillDamage");
        damage.textContent = "Damage: " + (skill.damageText || "0");
        tile.appendChild(damage);
        var targeted = document.createElement("div");
        targeted.classList.add("skillTargeted");
        targeted.textContent = skill.target ? "Targeted" : "Self";
        tile.appendChild(targeted);
        var costs = document.createElement("div");
        costs.classList.add("skillCosts");
        costs.textContent = "Mana: " + (skill.costs || "0");
        tile.appendChild(costs);

        var self = this;
        tile.addEventListener("click", function(event){
            if(!tile.classList.contains("disabled")) {
                if (self.selectedSkillTile) {
                    self.selectedSkillTile.classList.remove("selected");
                }
                if(skill.target) {
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
                    self.game.useSkill(self.player, self.player,  skill);
                }
                event.stopPropagation();
            }
        });
        return tile;
    };

    UI.prototype.select = function(tile){
        if(this.selectedSkill){
            var skill = this.selectedSkill;
            if(this.game.useSkill(this.player, tile.entity, skill)) {
                this.disableSkills();
            }

        }
    };

    UI.prototype.disableSkills = function(){
        var tile = this.playerDiv.firstElementChild.nextElementSibling;
        while(tile){
            tile.classList.add("disabled");
            tile = tile.nextElementSibling;
        }
        this.playerDiv.classList.remove("selectable");
        this.enemyDiv.classList.remove("selectable");
    };

    UI.prototype.enableSkills = function(){
        var tile = this.playerDiv.firstElementChild.nextElementSibling;
        while(tile){
            tile.classList.remove("disabled");
            tile = tile.nextElementSibling;
        }
        if(this.selectedSkill){
            this.playerDiv.classList.add("selectable");
            this.enemyDiv.classList.add("selectable");
        }
    };

    UI.prototype.init = function(){
        this.fullScreenMessageElement.textContent = "Click or touch to start.";
        this.fullScreenMessageElement.style.display = "block";
        this.fullScreenMessageElement.style.width = this.rootElement.clientWidth-210+"px";
        this.fullScreenMessageElement.style.height = this.rootElement.clientHeight-210+"px";

        this.fullScreenCallback = this.game.start.bind(this.game);
    };

    UI.prototype.showMessage = function(message){
        this.messageElement.textContent = message.text;
        this.messageElement.style.display = "block";

        switch(message.position){
            case "left":
                this.messageElement.style.left = "50px";
                this.messageElement.style.top = "50px";
                break;
            case "right":
                this.messageElement.style.left = (this.rootElement.clientWidth-400)+"px";
                this.messageElement.style.top = "50px";
                break;
            case "center":
                this.messageElement.style.left = (this.rootElement.clientWidth-350)/2+"px";
                this.messageElement.style.top = "100px";
        }
    };

    UI.prototype.fight = function(player, enemy){
        this.player = player;
        this.playerTile.entity = player;
        this.enemy = enemy;
        this.enemyTile.entity = enemy;

        var tile = this.playerTile.nextElementSibling;
        while(tile){
            this.playerDiv.removeChild(tile);
            tile = this.playerTile.nextElementSibling;
        }
        for (var i = 0; i < this.player.skills.length; i++) {
            var skill = this.player.skills[i];
            this.playerDiv.appendChild(this.makeSkillTile(skill));
        }

        this.enemyName.textContent = enemy.name;
        this.update();
    };

    UI.prototype.showSkill = function(from, to, name){
        var element = document.createElement("div");
        element.classList.add("usedSkill");
        element.textContent = name;
        if(from === this.player){
            element.style.left = "300px";
        } else {
            element.style.right = "300px";
        }
        this.parentElement.appendChild(element);
        window.setTimeout(function(){
            element.style.opacity = 0;
            element.style.top = "50px";
        },0);
        window.setTimeout(function(){
            element.parentElement.removeChild(element);
        },1000);
    };

    UI.prototype.showDamage = function(to, damage, mana){
        var element = document.createElement("div");
        element.classList.add("damage");
        element.textContent = Math.abs(damage);
        var top = 100;
        if(to === this.player){
            element.style.left = mana ? "200px" : "100px";
            top = mana
                ? this.playerMP.getBoundingClientRect().top
                : this.playerHP.getBoundingClientRect().top;
        } else {
            element.style.right = mana ? "200px" : "100px";
            top = mana
                ? this.enemyMP.getBoundingClientRect().top
                : this.enemyHP.getBoundingClientRect().top;
        }
        element.style.top = top+"px";
        if(damage >= 0){
            element.style.color = "red";
        } else {
            element.style.color = "green";
        }
        this.parentElement.appendChild(element);
        window.setTimeout(function(){
            element.style.opacity = 0;
            element.style.top = (top - 50) +"px";
        },0);
        window.setTimeout(function(){
            element.parentElement.removeChild(element);
        },1000);
    };

    UI.prototype.update = function(){
        this.playerHP.style.width = Math.max(0,(this.player.hp /this.player.maxHP)*100)+"%";
        this.playerMP.style.width = Math.max(0,(this.player.mp /this.player.maxMP)*100)+"%";
        this.enemyHP.style.width = Math.max(0,(this.enemy.hp /this.enemy.maxHP)*100)+"%";
        this.enemyMP.style.width = Math.max(0,(this.enemy.mp /this.enemy.maxMP)*100)+"%";
    };

    UI.prototype.showTargetSelection = function(enemies){
        for (var i = 0; i < enemies.length; i++) {
            var enemy = enemies[i];
            if(enemy.hp > 0){
                this.game.selectTarget(enemy);
                return;
            }
        }
    };

    UI.prototype.showFinalMessage = function(text){
        this.fullScreenMessageElement.textContent = text;
        this.fullScreenMessageElement.style.display = "block";

        this.fullScreenCallback = this.game.init.bind(this.game);
    };

    UI.prototype.rootElementClicked = function(event){
        if(this.messageElement.style.display != "none") {
            this.messageElement.style.display = "none";
            this.game.showNextMessage();
            event.preventDefault();
            event.stopPropagation();
        } else if (this.fullScreenMessageElement.style.display != "none"){
            this.fullScreenMessageElement.style.display = "none";
            this.fullScreenCallback();
            event.preventDefault();
            event.stopPropagation();
        }
    };

    return UI;
});