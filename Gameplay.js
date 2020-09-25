class Gameplay {

    attacks = (target) => {
        let isHit = this.isHit(target);
        console.log(isHit);
        if (isHit == "Hit!") {
            let damage = this.attackDamage(target);
            console.log("Attack damage: " + damage);
            target.hp.current_stat = target.hp.current_stat - damage;
            console.log("HP left: " + target.hp.current_stat);
            this.isHPNegative(target);
            return isHit;
        } else {
            return isHit;
        }
    }

    isHit = (target) => {
        let missChance = this.evalMissChance(target);
        let randomNumber = Math.random() * 100;
        if (randomNumber < missChance) {
            return "You missed!";

        } else {
            return "Hit!";
        }
    }

    attackDamage = (target) => {
        let damage = Math.floor((this.attack.current_stat / target.defense.current_stat) * (Math.floor(Math.random() * 51)));
        if (damage == 0) {
            damage = 1;
        }
        return damage;
    }

    evalMissChance = (target) => {
        //defaulst miss chance is 2%
        let missChance = 2;
        if (this.compareSpeed(target) == target) {
            return missChance;
        } else {
            missChance = (this.speed.base_stat - target.speed.base_stat) / 2;
            if (missChance > 25) {
                //max miss chance is 25%
                missChance = 25;
            }
            return missChance;
        }
    }

    compareSpeed = (target) => {
        if (this.speed.base_stat > target.speed.base_stat) {
            return this;
        } else {
            return target;
        }
    }

    displayHealth = (displayOnto) => {
        let percent = this.evalHpPercent();
        let color = "";
        if (percent > 50) {
            color = "#28e27c";
        } else if (percent > 20) {
            color = "yellow";
        } else {
            color = "red";
        }
        displayOnto.firstElementChild.nextElementSibling.textContent = "HP: " + this.hp.current_stat + "/" + this.hp.max_stat;
        displayOnto.lastElementChild.style.width = `${percent}%`;
        displayOnto.lastElementChild.style.backgroundColor = color;
        // console.log(displayOnto.lastElementChild);
        // console.log(displayOnto.firstElementChild.nextElementSibling);
    }
    evalHpPercent = () => {
        let percent = this.hp.current_stat / this.hp.max_stat;
        percent = Math.floor(percent * 100);
        console.log(`HP is ${percent}%`);
        return percent;
    }

    isHPNegative = (target) => {
        if (target.hp.current_stat < 0) {
            target.hp.current_stat = 0;
        }
    }
}