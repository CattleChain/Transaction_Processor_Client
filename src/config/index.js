const config = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	sawtooth_rest_api: process.env.SAWTOOTH_REST_ENDPOINT || "http://localhost:8008",
	transaction_family: process.env.TP_FAMILY || "CattleChain",
	family_version: process.env.TP_VERSION || "0.0.2",
	family_namespace: process.env.TP_NAMESPACE || "ebc4f9",
	payload_type: {
		create_animal_identity: "create_animal_identity",
		add_animal_event: "add_animal_event"
	}
};

module.exports = {
	config
}