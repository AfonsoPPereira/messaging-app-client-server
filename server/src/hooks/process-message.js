module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data } = context;

    if (!data.message) {
      throw new Error('A message must have a text');
    }

    const { user } = context.params;
    const message = data.message.substring(0, 200);
    data.targetIds.push(user._id.toString());

    context.data = {
      ...data,
      message,
      userId: user._id.toString(),
      createdAt: new Date().getTime(),
    };

    return context;
  };
};
