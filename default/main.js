// Import all required modules
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');

module.exports.loop = function () {
    //clear memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    //Select creeps and run all subflows
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'h') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'u') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'b') {
            roleBuilder.run(creep);
        }
    }
    var SpawnTime = Game.time % 20
    if(SpawnTime == 0) {
        var ForBuild = creep.room.find(FIND_CONSTRUCTION_SITES);
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'h');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'u');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'b');
        if(harvesters.length < 6) {
            var newName = 'h' + Game.time;
            Game.spawns['Spawn'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'h'}});
        }
        else if((builders.length < 3) && (ForBuild.length > 0)) {
            var newName = 'b' + Game.time;
            Game.spawns['Spawn'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'b'}});
        }
        else if (upgraders.length < 2) {
            var newName = 'u' + Game.time;
            Game.spawns['Spawn'].spawnCreep([WORK,CARRY,MOVE], newName, 
                {memory: {role: 'u'}});
        }
    }
}