import AnimalController from './animal';
const { getName, getVersion } = require('../utils/index');

class NotificationHandlerController {
    
    /**
     * Handler for version requests
     * @param {Object}   request The request
     * @param {Object} response  the response
     */
    getVerionHandler(request, response) {
        let message = {};
        message.version = getVersion().version;
        message.name = getName().name;
        return response.jsonp(message);
    }
    
    /**
     * Handler of notification sent by the Context Broker
     * @param {Object}   request The request
     * @param {Object}   response The response
     * @param {Object}   next The next
     */
    async notificationHandler(request, response, next) {
        const contextResponses = request.body.data;
        if (contextResponses && Array.isArray(contextResponses)) {
            // process only data 0 rest is pending
            await AnimalController.CreateAnimalIdentity(request.originalUrl, contextResponses[0], response);
        } else {
            var err = new Error();
            err.status = 403;
            err.message = 'request body missing';
            return response.json(err);
        }
    }
}

export default new NotificationHandlerController();