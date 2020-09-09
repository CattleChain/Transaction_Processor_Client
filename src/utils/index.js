import { version, name } from '../../package.json';
const { animalIdentity_pb } = require('cattlechain_protos');

/**
 * Returns version information about this concrete instance of the STH component
 * @return {object} A JSON-formatted object including the version information
 */
const getVersion = () => {
    const message = {};
    if (version) {
            message.version = version;
    }
    if (Object.getOwnPropertyNames(message).length === 0) {
        message.version = 'No version information available';
    }
    return message;
}

const getName = () => {
    const message = {};
    if (name) {
            message.name = name;
    }
    if (Object.getOwnPropertyNames(name).length === 0) {
        message.name = 'No name information available';
    }
    return message;
}


const isNotEmpty = (value) => {
	return typeof value == 'string' && value.trim() || typeof value !== 'undefined' || value !== null;
}

const animalSpecies = (str) => {
	if(str == 'cow') {
		return animalIdentity_pb.AnimalIdentity.Species.DAIRY_CATTLE;
	}else if(str == 'bull') {
		return animalIdentity_pb.AnimalIdentity.Species.BEEF_CATTLE;
	}else if(str == 'goat') {
		return animalIdentity_pb.AnimalIdentity.Species.GOAT;
	}else if(str == 'horse') {
		return animalIdentity_pb.AnimalIdentity.Species.HOURSE;
	}else if(str == 'pig') {
		return animalIdentity_pb.AnimalIdentity.Species.PIG;
	}else if(str == 'sheep'){
		return animalIdentity_pb.AnimalIdentity.Species.SHEEP;
	}
}

export {
    getVersion,
	getName,
	isNotEmpty,
	animalSpecies,
}
