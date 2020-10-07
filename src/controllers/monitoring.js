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