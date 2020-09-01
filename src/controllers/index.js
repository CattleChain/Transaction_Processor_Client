const { createContext, CryptoFactory } = require('sawtooth-sdk/signing');
const { createHash } = require('crypto');
const cbor = require('cbor');
const { protobuf } = require('sawtooth-sdk');
const request = require('request');
const { animalIdentity_pb } = require('cattlechain-proto');
const { isNotEmpty, animalSpecies } = require('../utils');
const HttpStatus = require('http-status-codes');
const { config } = require('../config');
const { Transactions } =  require('../model/transaction');

const context = createContext('secp256k1')
const privateKey = context.newRandomPrivateKey()
const signer = new CryptoFactory(context).newSigner(privateKey)


const status = async (req, res) => { res.status(HttpStatus.OK).send({success: 'working'});}

const CreateAnimalIdentity = async (req, res) => {
	let payload = req.body.data[0];
	let animal = new animalIdentity_pb.AnimalIdentity();
	let location = new animalIdentity_pb.AnimalIdentity.LOCATION();
	if(!isNotEmpty(payload.id)) {
		res.status(HttpStatus.BAD_REQUEST).send({Error: 'Id is missing'});
	}
	if(!isNotEmpty(payload.type)) {
		res.status(HttpStatus.BAD_REQUEST).send({Error: 'type is missing'});
	}
	if(!isNotEmpty(payload.breed)) {
		res.status(HttpStatus.BAD_REQUEST).send({Error: 'breed is missing'});
	}
	if(!isNotEmpty(payload.sex)) {
		res.status(HttpStatus.BAD_REQUEST).send({Error: 'sex is missing'});
	}
	if(!isNotEmpty(payload.legalId)) {
		res.status(HttpStatus.BAD_REQUEST).send({Error: 'legalId is missing'});
	}

	let sex = (payload.sex == 'male') ? animalIdentity_pb.AnimalIdentity.Sex.MALE : animalIdentity_pb.AnimalIdentity.Sex.FEMALE;
	let species = isNotEmpty(payload.species) ? animalSpecies(payload.species) : '';
	let birthdate = isNotEmpty(payload.birthdate) ? payload.birthdate : '';
	let calvedBy = isNotEmpty(payload.calvedBy) ? payload.calvedBy : '';
	let siredBy = isNotEmpty(payload.siredBy) ? payload.siredBy : '';
	let weight = isNotEmpty(payload.weight) ? payload.weight : '';
	let ownedBy = isNotEmpty(payload.ownedBy) ? payload.ownedBy : '';
	let locatedAt = isNotEmpty(payload.locatedAt) ? payload.locatedAt : '';
	let phenologicalCondition = isNotEmpty(payload.phenologicalCondition) ? payload.phenologicalCondition : '';
	let healthCondition = isNotEmpty(payload.healthCondition) ? payload.healthCondition : '';
	let fedWith = isNotEmpty(payload.fedWith) ? payload.fedWith : '';
	let welfareCondition = isNotEmpty(payload.welfareCondition) ? payload.welfareCondition : '';
	let locationtype = isNotEmpty(payload.location.type) ? payload.location.type : '';
	let coordinates = (payload.location.coordinates != null || payload.location.coordinates != undefined && typeof payload.location.coordinates == 'array') ? payload.location.coordinates: ["10.00", "10.00"];
	// let
	//protobuf set
	animal.setId(payload.id);
	location.setType(payload.type);
	animal.setBreed(payload.breed);
	animal.setSpecies(species);
	animal.setLegalid(payload.legalId);
	animal.setBirthdate(birthdate);
	animal.setSex(sex);
	animal.setCalvedby(calvedBy);
	animal.setSiredby(siredBy);
	animal.setWeight(weight);
	animal.setOwnedby(ownedBy);
	animal.setLocatedat(locatedAt);
	animal.setPhenologicalcondition(phenologicalCondition);
	animal.setHealthcondition(healthCondition);
	animal.setFedwith(fedWith);
	animal.setWelfarecondition(welfareCondition);
	location.setType(locationtype);
	location.setCoordinatesList([coordinates[0],coordinates[1]]);
	animal.setLocation(location);
	let serializeBinary = animal.serializeBinary();
	let payload_data = { action: config.payload_type.create_animal_identity, data:serializeBinary};
	let payloadBytes = cbor.encode(payload_data);
	let transactionHeaderBytes = protobuf.TransactionHeader.encode({
		familyName: config.transaction_family,
		familyVersion: config.family_version,
		inputs: [config.family_namespace],
		outputs: [config.family_namespace],
		signerPublicKey: signer.getPublicKey().asHex(),
		batcherPublicKey: signer.getPublicKey().asHex(),
		dependencies: [],
		payloadSha512: createHash('sha512').update(payloadBytes).digest('hex'),
		nonce: (new  Date()).toString()
	}).finish();

	let signature = signer.sign(transactionHeaderBytes);

	let transaction = protobuf.Transaction.create({
		header: transactionHeaderBytes,
		headerSignature: signature,
		payload: payloadBytes
	});

	let transactions = [transaction];

	let batchHeaderBytes = protobuf.BatchHeader.encode({
		signerPublicKey: signer.getPublicKey().asHex(),
		transactionIds: transactions.map((txn) => txn.headerSignature),
	}).finish();

	let headerSignature = signer.sign(batchHeaderBytes);

	let batch = protobuf.Batch.create({
		header: batchHeaderBytes,
		headerSignature: headerSignature,
		transactions: transactions
	});

	let batchListBytes = protobuf.BatchList.encode({
		batches: [batch]
	}).finish();

	request.post({
		url: config.sawtooth_rest_api + '/batches',
		body: batchListBytes,
		headers: { 'Content-Type': 'application/octet-stream' }
	}, (err, response) => {
		if (err) {
			console.log(err);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({Error: err});
		}
		const tx = JSON.parse(response.body).link.toString().toString().replace(config.sawtooth_rest_api + '/batch_statuses?id=', '');

		Transactions.create({'id': payload.id, 'txhash': tx.toString()}).then((response) => {
			res.status(HttpStatus.NO_CONTENT).send({success: JSON.parse(response.body)})
		}).catch((err) => {
			console.log(err);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({Error: err});
		})
	});
}

// const AddAnimalEvent = async (req, res) => {
// 	let payload = req.body;
// 	let animal = new animalIdentity_pb.AnimalIdentity();
// 	let event = new animalIdentity_pb.AnimalMonitoringEvent();
// 	if(!isNotEmpty(payload.legalId)) {
// 		errorCallback({Error: 'legalId is missing'});
// 	}
// 	let activityalert = isNotEmpty(payload.activity) ? payload.activity : '';
// 	let tempraturealert = isNotEmpty(payload.temprature) ? payload.temprature : '';
// 	let weightalert = isNotEmpty(payload.weight) ? payload.weight : '';
// 	let drikingBehaviouralert = isNotEmpty(payload.drinkingbehaviour) ? payload.drinkingbehaviour : '';
// 	let rest_time = isNotEmpty(payload.rest_time) ? payload.rest_time : '';
// 	let dairy_time = isNotEmpty(payload.dairy_time) ? payload.dairy_time : '';

// 	event.setActityalert(activityalert);
// 	event.setTempraturealert(tempraturealert);
// 	event.setWeightalert(weightalert);
// 	event.setDrikingbehaviouralert(drikingBehaviouralert);
// 	event.setResttimealert(rest_time);
// 	event.setDairytimealert(dairy_time);
// 	animal.setLegalid(payload.legalId);
// 	animal.setEventsList([event]);
// 	let serializeBinary = animal.serializeBinary();
// 	let payload_data = { action: config.payload_type.add_animal_event, data: serializeBinary};
// 	let payloadBytes = cbor.encode(payload_data);
// 	let transactionHeaderBytes = protobuf.TransactionHeader.encode({
// 		familyName: config.transaction_family,
// 		familyVersion: config.family_version,
// 		inputs: [config.family_namespace],
// 		outputs: [config.family_namespace],
// 		signerPublicKey: signer.getPublicKey().asHex(),
// 		batcherPublicKey: signer.getPublicKey().asHex(),
// 		dependencies: [],
// 		payloadSha512: createHash('sha512').update(payloadBytes).digest('hex'),
// 		nonce: (new  Date()).toString()
// 	}).finish();

// 	let signature = signer.sign(transactionHeaderBytes);

// 	let transaction = protobuf.Transaction.create({
// 		header: transactionHeaderBytes,
// 		headerSignature: signature,
// 		payload: payloadBytes
// 	});

// 	let transactions = [transaction];

// 	let batchHeaderBytes = protobuf.BatchHeader.encode({
// 		signerPublicKey: signer.getPublicKey().asHex(),
// 		transactionIds: transactions.map((txn) => txn.headerSignature),
// 	}).finish();

// 	let headerSignature = signer.sign(batchHeaderBytes);

// 	let batch = protobuf.Batch.create({
// 		header: batchHeaderBytes,
// 		headerSignature: headerSignature,
// 		transactions: transactions
// 	});

// 	let batchListBytes = protobuf.BatchList.encode({
// 		batches: [batch]
// 	}).finish();

// 	request.post({
// 		url: config.sawtooth_rest_api + '/batches',
// 		body: batchListBytes,
// 		headers: { 'Content-Type': 'application/octet-stream' }
// 	}, (err, response) => {
// 		if (err) {
// 			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({Error: err});
// 		}
// 		res.status(HttpStatus.CREATED).send({success: JSON.parse(response.body)});
// 	});
// }


module.exports = {
	CreateAnimalIdentity,
	// AddAnimalEvent,
	status,
}