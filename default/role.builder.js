var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
	if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
	}
	if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
		creep.memory.building = true;
	}
	if(creep.memory.building) {
		var ForBuild = creep.room.find(FIND_CONSTRUCTION_SITES);
		var PriBuild = creep.room.find(FIND_CONSTRUCTION_SITES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_CONTAINER)
			}
			})
		if (PriBuild.length > 0) {
			if(creep.build(PriBuild[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(PriBuild[0]);
			}
		}
		else if((ForBuild.length >0 ) && (PriBuild == 0)) {
			if(creep.build(ForBuild[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(ForBuild[0]);
			}
		}
		else {
			creep.suicide()
		}
	}
	else {
	var sources = creep.room.find(FIND_SOURCES);
		if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sources[0]);
		}
	}
	}
};
module.exports = roleBuilder;