const config = {

	// basic config
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	db_sync: process.env.DB_SYNC || 'false',

	// sawtooth config
	sawtooth_rest_api: process.env.SAWTOOTH_REST_ENDPOINT || "http://localhost:8008",
	transaction_family: process.env.TP_FAMILY || "CattleChain",
	family_version: process.env.TP_VERSION || "0.0.2",
	family_namespace: process.env.TP_NAMESPACE || "ebc4f9",

	//event list
	payload_type: {
		    // animal
			CREATE_ANIMAL_IDENTIY: 'create_animal_identity',
			UPDATE_ANIMAL_IDENTITY: 'update_animal_identity',
			// dairy
			CREATE_DAIRY_IDENTITY: 'create_farm_identity',
			UPDATE_DAIRY_IDENTITY: 'update_farm_identity',
			// device
			ADD_ANIMAL_MONITORING_EVENT: 'animal_monitor_event',
			ADD_ANIMAL_INDICATORS_EVENT: 'animal_welfare_indicator_event',
	},

	// db cofig
	db_name : process.env.DB_NAME || 'cattlechain',
    db_username : process.env.DB_USER || 'postgres',
	db_password : process.env.DB_PASSWORD || 'root',
	db_host : process.env.DB_HOST || 'localhost',
	db_dialect : process.env.DB_DIALECT || 'postgres',
};

module.exports = {
	config
}

