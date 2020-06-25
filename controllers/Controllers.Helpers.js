function paramsBuilder(validParams, body) {
    // 0.008 ms - 10.0 ms
    console.time();
    let params = {};
    validParams.forEach(attr => {
        if (Object.prototype.hasOwnProperty.call(body, attr)) {
            params[attr] = body[attr];
        }
    });
    console.timeEnd();
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