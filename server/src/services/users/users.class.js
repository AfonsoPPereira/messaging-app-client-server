const { Service } = require( 'feathers-mongoose');

exports.Users = class Users extends Service {
  find(params) {
    const customFields = ['_id', 'displayName', 'online', 'imageUrl'];
    let newParams = params;

    if (!params.query || !Object.keys(params.query).length) {
      newParams.query.$select = customFields;
    }

    return super.find(newParams);
  }
};
