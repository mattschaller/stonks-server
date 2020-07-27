// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
/* eslint-disable require-atomic-updates */
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return async context => {
        // Get `app`, `method`, `params` and `result` from the hook context
        const { app, method, result, params } = context;

         // Function that adds the user to a single memberId
        const addMember = async member => {
            return app.service('users').get(member)
        }

         // Function that adds the user to a message or room.
        const addUser = async message => {
            let data = message;
            if(message.members) {
                const users = await Promise.all(message.members.map(addMember))
                data = { ...data, users }
            }
            if(message.userId){
                const user = await app.service('users').get(message.userId)
                data = { ...data, user }
            }
            return data;
        };
  
      // In a find method we need to process the entire page
      if (method === 'find') {
        context.result.data = await Promise.all(context.result.data.map(addUser));
      } else {
        // Otherwise just update the single result
        context.result = await addUser(result);
      }
      return context;
    };
  };
  