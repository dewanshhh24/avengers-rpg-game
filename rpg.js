let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let level;
let monsterHealth;
let inventory = ["Vibranium Spear"];

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterNameText = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");

const weapons = [
    {
        name: "Vibranium Spear",
        power: 5,
    },

    {
        name: "Mjolnir",
        power: 30,
    },

    {
        name: "Storm Breaker",
        power: 50,
    },

    {
        name: "Necrosword",
        power: 100,
    }
];

const monsters = [
    {
        name: "Ultron",
        level: 5,
        health: 15,
    },
    {
        name: "Hela",
        level: 10,
        health: 60,
    },

    {
        name: "Thanos",
        level: 20,   
        health: 300,
    }
];

const locations = [
    {
        name: "New York",
        "button text": ["Go to AvengersHQ", "Go to Battlefield", "Fight Thanos"],
        "button functions": [goAvengersHQ, goBattlefield, fightThanos],
        text: "Welcome to Thanos Repeller. You must defeat the Thanos that is preventing people from leaving the town. You are in the New York. Where do you want to go? Use the buttons above."
    },

    {
        name: "AvengersHQ",
        "button text": ["Buy 10 Health (💰10)", "Buy Weapon (💰30)", "Go to New York"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "Welcome to the Avengers HQ! You can buy health or a weapon here."
    },
        
    {
        name: "Battlefield",
        "button text": ["Fight Ultron","Fight Hela", "Go to New York"],
        "button functions": [fightUltron, fightHela, goTown],
        text: "You are in a dark Battlefield. You can hear the sounds of a monster lurking nearby."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster!"
    },
    {
        name: "kill monster",
        "button text": ["Go to New York", "Go to New York", "Go to New York"],
        "button functions": [goTown, goTown, easterEgg],
        text: "You defeated the monster! You gained gold and experience points. You can go back to the New York."
    },
    {
        name: "lose",
        "button text": ["Restart", "Restart", "Restart"],
        "button functions": [restart, easterEgg, restart],
        text: "You have been defeated! You can restart the game."
    },
    {
        name: "win",
        "button text": ["Restart", "Restart", "Restart"],
        "button functions": [restart, restart, easterEgg],
        text: "You have defeated the Thanos! You are a hero!"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to the New York?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You found a secret game mode! Pick a number from above, ten numbers will be randomly chosen between 0 and 10. If the number you picked matches one of the random numbers, you WIN 10 GOLD! But if it doesn't match, you LOSE 10 HEALTH!"
    }
]
// initialize buttons

button1.onclick =  goAvengersHQ;
button2.onclick =  goBattlefield;
button3.onclick =  fightThanos;


function update(locations){
    monsterStats.style.display = "none"; // hide monster stats when not fighting
    button1.innerText = locations["button text"][0];
    button2.innerText = locations["button text"][1];
    button3.innerText = locations["button text"][2];
    text.innerText = locations.text;
    button1.onclick =  locations["button functions"][0];
    button2.onclick =  locations["button functions"][1];
    button3.onclick =  locations["button functions"][2];
}

function goTown() {
    update(locations[0]);
}

function goAvengersHQ() {
    update(locations[1]);
}
function goBattlefield() {
    update(locations[2]);
}

function buyHealth() {
    if(gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else{
        text.innerText = "You don't have enough gold to buy health!";
    }
}
function buyWeapon() {
    if(currentWeapon < weapons.length - 1) {
        if(gold >= 30) {
        gold -= 30;
        currentWeapon += 1;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You bought a " + newWeapon + "!";
        inventory.push(newWeapon);
        text.innerText += " Your inventory: " + inventory.join(", ");
        
    } else {
        text.innerText = "You don't have enough gold to buy a weapon!";
    }
    }
    else {
        text.innerText = "You already have the best weapon!";
        button2.innerText="Sell Weapon for 15 Gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if(inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift(); // shift removes the first element from the array and returns it to the variable
        text.innerText = "You sold your " + currentWeapon + "!";
        text.innerText += " Your inventory: " + inventory.join(", ");
    }
}

function fightUltron() {
    fighting = 0;
    goFight();
}
function fightHela() {
    fighting = 1;
    goFight();
}
function fightThanos() {
    fighting = 2;
    goFight();
}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}
function attack() {
    text.innerText = "You attack the " + monsters[fighting].name + " with your " + weapons[currentWeapon].name + ".";
    
    if(isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    }
    else{
        text.innerText += "You missed the Attack on the " + monsters[fighting].name + ".";
    }

    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; // adds a random number between 0 and 9 to the attack power
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health<=0){
        lose();
    }
    else if(monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
    if(Math.random() <= 0.1 && inventory.length !== 1) { // 10% chance to break the weapon
        text.innerText = "Your " + inventory.pop() + " broke!";
        currentWeapon--;
    }
    
}

function getMonsterAttackValue(level){
    let hit = (level * 5) - (Math.floor(Math.random() * xp)); // subtracts a random number between 0 and 9 from the attack value
    return hit;
}
function isMonsterHit() {
    return Math.random() > 0.2 || health < 20;
} 
function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}
function defeatMonster(){
    gold +=Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose() {
    update(locations[5]);
}
function winGame() {
    update(locations[6]);
}
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["Vibranium Spear"];
    healthText.innerText = health;
    goldText.innerText = gold;
    xpText.innerText = xp;
    goTown();
}
function easterEgg(){
    update(locations[7]);
}
function pickTwo() {
    pick(2)
}
function pickEight() {
    pick(8)
}
function pick(guess){
    let numbers = [];
    while(numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11)); // generates a random number between 0 and 10
        
    }
    text.innerText = "You picked " + guess + ". The numbers are: \n" + numbers.join(", ");
    
    for(let i = 0; i < 10; i++){
        text.innerText += numbers[i] + "\n";
    }
    if(numbers.indexOf(guess) !== -1){
        text.innerText += "Congratulations! You found your number, YOU WON 10 GOLD!";
        gold += 10;
        goldText.innerText = gold;
    }
    else {
        text.innerText += "Sorry, you didn't find your number.";
        health -= 10;
        healthText.innerText = health;
        if(health <= 0) {
            lose();
        }
    }

}
