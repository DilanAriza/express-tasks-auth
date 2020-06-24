function paramsBuilder(validParams, body) {
    let params = {};
    validParams.forEach(attr => {
        if (Object.prototype.hasOwnProperty.call(body, attr)) {
            params[attr] = body[attr];
        }
    });
    return params
}

function createResponse(error, code, message, content) {
    console.log('Build respuesta');
    let responseJson = new Object();

    responseJson.error = error || false;
    responseJson.code = code || 200;
    responseJson.message = message || "";
    responseJson.content = content || {};

    return responseJson;
}


module.exports = {
    createResponse,
    paramsBuilder
}