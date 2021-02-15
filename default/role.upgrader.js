//module to maintain room controller
var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var energy = creep.room.find(FIND_SOURCES);
            if(creep.harvest(energy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energy[0]);
            }
        }
	}
};
module.exports = roleUpgrader;