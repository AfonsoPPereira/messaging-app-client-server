// messages-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'messages';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    userId: { 
      type: String,
      required: true
    },
    targetIds: {
      type: Array,
      required: true
    },
    message: {
      type: String,
      required: true,
      maxlength: 200
    },
    status: {
      type: String,
      required: true,
      default: 'sent'
    },
    reaction: {
      type: String,
      default: undefined
    },
  },
  {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
