const { animalIdentity_pb } = require('cattlechain-proto');


function wrapAsync(fn) {
	return function(req, res, next) {
		fn(req, res, next).catch(e => {
			next(e);
		});
	};
}

function isNotEmpty(value) {
	return typeof value == 'string' && value.trim() || typeof value !== 'undefined' || value !== null;
}

function animalSpecies(str) {
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

exports.wrapAsync = wrapAsync;
exports.isNotEmpty = isNotEmpty;
exports.animalSpecies = animalSpecies;
