/*
Eventually to be made to work
*/
var roleBuilder = require('role.builder');
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var ForEnergy = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    else {
        if(ForEnergy.length > 0) {
            if(creep.transfer(ForEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(ForEnergy[0]);
            }
        }
        else{
            roleBuilder.run(creep)
        }
        }
    }
}
module.exports = roleHarvester;