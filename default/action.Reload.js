/*
Module to simplify recharging of energy
## DO NOT USE FOR HARVESTERS ##
*/
var actionReload = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var ContainerReload = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
            }
            })
            if(ContainerReload.length > 0){
                if(creep.withdraw(ContainerReload[0],RESOURCE_ENERGY,50) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ContainerReload[0],RESOURCE_ENERGY,50);
                }
            }
            else{
                var EnergySource = creep.room.find(FIND_SOURCES);
            if(creep.harvest(EnergySource[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(EnergySource[0]);
            }
            }
    }
}
module.exports = actionReload;