class Pokemon extends Gameplay {
    constructor(options) {
        // super();
        super();
        this.playerControlled = false;
        this.name = options.name;
        this.name = capitalizeText(this.name);

        this.abilities = [];
        //add ability array
        for (let i = 0; i < options.abilities.length; i++) {
            this.abilities.push(options.abilities[i].ability);
        }

        for (let i = 0; i < options.abilities.length; i++) {
            //capitalize ability name
            this.abilities[i].name = capitalizeText(this.abilities[i].name);
            // cull non-English ability effect text
            for (let j = 0; j < this.abilities[i].effect.length; j++) {
                if (this.abilities[i].effect[j].language.name == "en") {
                    this.abilities[i].effect[0] = this.abilities[i].effect[j];
                } else {
                    delete this.abilities[i].effect[j];
                }
            }
            this.abilities[i].effect.pop();
        }


        this.moves = [options.moves[0].move, options.moves[1].move, options.moves[2].move, options.moves[3].move];
        for (let i = 0; i < options.moves.length; i++) {
            this.moves[i].name = capitalizeText(this.moves[i].name);
        }
        this.hp = {
            base_stat: options.stats[0].base_stat,
            stat_stage: 0,
            current_stat: options.stats[0].base_stat,
            max_stat: options.stats[0].base_stat
        };
        this.attack = {
            base_stat: options.stats[1].base_stat,
            stat_stage: 0,
            current_stat: options.stats[1].base_stat
        };
        this.defense = {
            base_stat: options.stats[2].base_stat,
            stat_stage: 0,
            current_stat: options.stats[2].base_stat
        };
        this.special_attack = {
            base_stat: options.stats[3].base_stat,
            stat_stage: 0,
            current_stat: options.stats[3].base_stat
        };
        this.special_defense = {
            base_stat: options.stats[4].base_stat,
            stat_stage: 0,
            current_stat: options.stats[4].base_stat
        };
        this.speed = {
            base_stat: options.stats[5].base_stat,
            stat_stage: 0,
            current_stat: options.stats[5].base_stat
        };
        this.sprites = options.sprites;

    }

    resetPokemon = () => {
        this.hp.current_stat = this.hp.base_stat;
        this.attack.current_stat = this.attack.base_stat;
        this.defense.current_stat = this.defense.base_stat;
        this.special_attack.current_stat = this.special_attack.base_stat;
        this.special_defense.current_stat = this.special_defense.base_stat;
        this.speed.current_stat = this.speed.base_stat;
    }

    //calculate current_stat based on stat_stage multipliers
    scaleHP = () => {
        this.hp.max_stat = this.hp.base_stat * this.stageModifier(this.hp.stat_stage);
        //change current health in proportion to max health change
    }
    scaleAttack = () => {
        this.attack.current_stat = this.attack.base_stat * this.stageModifier(this.attack.stat_stage);
    }
    scaleDefense = () => {
        this.defense.current_stat = this.defense.base_stat * this.stageModifier(this.defense.stat_stage);
    }
    scaleSpecial_Attack = () => {
        this.special_attack.current_stat = this.special_attack.base_stat * this.stageModifier(this.special_attack.stat_stage);
    }
    scaleSpecial_Defense = () => {
        this.special_defense.current_stat = this.special_defense.base_stat * this.stageModifier(this.special_defense.stat_stage);
    }
    scaleSpeed = () => {
        this.speed.current_stat = this.speed.base_stat * this.stageModifier(this.speed.stat_stage);
    }


    stageModifier = (stage) => {
        switch (stage) {
            case 6:
                return 3;
            case 5:
                return 8 / 3;
            case 4:
                return 7 / 3;
            case 3:
                return 2;
            case 2:
                return 5 / 3;
            case 1:
                return 4 / 3;
            case 0:
                return 1;
            case -1:
                return 3 / 4;
            case -2:
                return 3 / 5;
            case -3:
                return 3 / 6;
            case -4:
                return 3 / 7;
            case -5:
                return 3 / 8;
            case -6:
                return 3 / 9;
        }
    }
}


