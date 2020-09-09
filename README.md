# Cattlechain Transacation Processor Client

[![Build Status](https://api.travis-ci.com/CattleChain/Transaction_Processor_Client.svg?token=AyxbT6xSu5zpxMuneAWd&branch=master)](https://travis-ci.com/github/CattleChain/Transaction_Processor_Client)
[![Support badge](https://nexus.lab.fiware.org/repository/raw/public/badges/stackoverflow/fiware.svg)](https://stackoverflow.com/questions/tagged/fiware)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


# Background
Cattlechain Transaction Proccessor Client responsible to submit the data to the Sawtooth Network using API/ Context Broker Subscriptions.
DBSync also be done with any ORM DB.

# Configuration
**config can be found in src/config/index.js**
```sh
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
		ANIMAL_MONITORING_EVENT: 'animal_monitor_event',
		ANIMAL_WELFARE_INDICATOR: 'animal_welfare_indicator',	
		// dairy
		CREATE_DAIRY_IDENTITY: 'create_farm_identity',
		UPDATE_DAIRY_IDENTITY: 'update_farm_identity',
		DAIRY_MONITORING_EVENT: 'dairy_monitor_event',
		DAIRY_WELFARE_INDICATOR: 'dairy_welfare_indicator',
	},

	// db cofig
	db_name : process.env.DB_NAME || 'cattlechain',
    db_username : process.env.DB_USER || 'postgres',
	db_password : process.env.DB_PASSWORD || 'root',
	db_host : process.env.DB_HOST || 'localhost',
	db_dialect : process.env.DB_DIALECT || 'postgres',
```
# Api End-Points

1.**version**
----
* **URL**
  * `/version`
* **Method:**
  * `GET`
* **Header:**
  * `Content-Type:application/json`

* **Success Response:**
 ```json
{
    "version": "0.0.1",
    "name": "cattlechainclient"
}
```

2.**Create Account**
----
* **URL**
  * `/account`
* **Method:**
  * `POST`
* **Header:**
  * `Content-Type:application/json`

* **Request Body** *
 ```json
{
    "legalId": "dsdsdsd1"
}
 ```
* **Success Response: Status 200**
* **Response Body** *
 ```json
{
    "account": "'ebc4f9'a48b85415f13737a104ec05b986c89f1d59ebe7aab7b610bde17a22618f24c25"
}
 ```

3.**Context Broker Subscription**
----
* **URL**
  * `/notify`
* **Method:**
  * `POST`
* **Header:**
  * `Content-Type:application/json`

* **Request Body** *
 ```json
{
    "data": [
        {
  "id": "urn:ngsi-ld:Animal:ca3f1295-500c-4aa3-b745-12122212212",
  "type": "Animal",
  "species": {
    "value": "sheep"
  },
  "relatedSource": {
    "value": [
      {
        "application": "urn:ngsi-ld:AgriApp:72d9fb43-53f8-4ec8-a33c-fa931360259a",
        "applicationEntityId": "app:sheep1"
      }
    ]
  },
  "legalId": {
    "value": "ES142589fdffd652140"
  },
  "birthdate": {
    "type": "DateTime",
    "value": "2017-01-01T01:20:00Z"
  },
  "dateModified": {
    "type": "DateTime",
    "value": "2017-05-04T12:30:00Z"
  },
  "sex": {
    "value": "female"
  },
  "breed": {
    "value": "Merina"
  },
  "calvedBy": {
    "type": "Relationship",
    "value": "urn:ngsi-ld:Animal:aa9f1295-425c-8ba3-b745-b653097d5a87"
  },
  "siredBy": {
    "type": "Relationship",
    "value": "urn:ngsi-ld:Animal:aa9f1295-425c-8ba3-b745-b653097d5a87"
  },
  "location": {
    "type": "geo:json",
    "value": {
      "type": "Point",
      "coordinates": [-4.754444444, 41.640833333]
    }
  },
  "weight": {
    "value": 65.3
  },
  "ownedBy": {
    "type": "Relationship",
    "value": "http://person.org/leon"
  },
  "locatedAt": {
    "type": "Relationship",
    "value": "urn:ngsi-ld:AgriParcel:1ea0f120-4474-11e8-9919-672036642081"
  },
  "phenologicalCondition": {
    "value": "adult"
  },
  "reproductiveCondition": {
    "value": "inCalf"
  },
  "healthCondition": {
    "value": "healthy"
  },
  "fedWith": {
    "type": "Relationship",
    "value": "urn:ngsi-ld:FEED:1ea0f120-4474-11e8-9919-0000000081"
  },
  "welfareCondition": {
    "value": "adequate"
  }
}
    ]
}
 ```

* **Success Response: Status 204**

4.**Create Animal Identity**
----
* **URL**
  * `/CreateAnimalIdentity`
* **Method:**
  * `POST`
* **Header:**
  * `Content-Type:application/json`

* **Request Body** *
 ```json
{
  "id": "urn:ngsi-ld:Animal:ca3f1295-500c-4aa3-b745-12122212212",
  "type": "Animal",
  "species": {
    "value": "sheep"
  },
  "relatedSource": {
    "value": [
      {
        "application": "urn:ngsi-ld:AgriApp:72d9fb43-53f8-4ec8-a33c-fa931360259a",
        "applicationEntityId": "app:sheep1"
      }
    ]
  },
  "legalId": {
    "value": "ES142589fdffd652140"
  },
  "birthdate": {
    "type": "DateTime",
    "value": "2017-01-01T01:20:00Z"
  },
  "dateModified": {
    "type": "DateTime",
    "value": "2017-05-04T12:30:00Z"
  },
  "sex": {
    "value": "female"
  },
  "breed": {
    "value": "Merina"
  },
  "calvedBy": {
    "type": "Relationship",
    "value": "urn:ngsi-ld:Animal:aa9f1295-425c-8ba3-b745-b653097d5a87"
  },
  "siredBy": {
    "type": "Relationship",
    "value": "urn:ngsi-ld:Animal:aa9f1295-425c-8ba3-b745-b653097d5a87"
  },
  "location": {
    "type": "geo:json",
    "value": {
      "type": "Point",
      "coordinates": [-4.754444444, 41.640833333]
    }
  },
  "weight": {
    "value": 65.3
  },
  "ownedBy": {
    "type": "Relationship",
    "value": "http://person.org/leon"
  },
  "locatedAt": {
    "type": "Relationship",
    "value": "urn:ngsi-ld:AgriParcel:1ea0f120-4474-11e8-9919-672036642081"
  },
  "phenologicalCondition": {
    "value": "adult"
  },
  "reproductiveCondition": {
    "value": "inCalf"
  },
  "healthCondition": {
    "value": "healthy"
  },
  "fedWith": {
    "type": "Relationship",
    "value": "urn:ngsi-ld:FEED:1ea0f120-4474-11e8-9919-0000000081"
  },
  "welfareCondition": {
    "value": "adequate"
  }
}
 ```
* **Success Response: Status 201**
* **Success Response** *
 ```json
{
    "txHash": "177c800111f74599405fa933c0817270fe59f903a65c80268dbb428a1459ec6836a4e2a4ff818fd167388f2118ee2c281338175aa6f1aca53f898633c7b0b69b"
}
 ```
 
 5.**Get All Transactions from ORM (if db_sync is true)**
----
* **URL**
  * `/transactions`
* **Method:**
  * `GET`
* **Header:**
  * `Content-Type:application/json`


 6.**Get Transaction by id from ORM (if db_sync is true)**
----
* **URL**
  * `/transaction/:id`
* **Method:**
  * `GET`
* **Header:**
  * `Content-Type:application/json`

 
 