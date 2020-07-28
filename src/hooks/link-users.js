// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
/* eslint-disable require-atomic-updates */
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
    return async context => {
        // Get `app`, `method`, `params` and `result` from the hook context

        const { app, method, result, params } = context;

        //
        // Loops through data.members and attached the new roomId to their user.
        // User PATCH triggers a channel reconnect for the data.members.each, keeping
        // their list up to date.  
        // TODO: use map and Promise.all 
        
        const addRoomToMembers = async data => {
            if(!data.members || data.members.length === 0 ) return false;
            let { members } = data;
            for (let i = 0; i < members.length; i++) {
                let user = await app.service('users').get(members[i])
                if(user && user._id && user.rooms){
                    let updatedUser = await app.service('users').patch(user._id, { rooms: [...user.rooms, data._id] }, params).catch(err => console.log(err));
                    if(updatedUser){
                        console.log(`Added room ${data._id} to user ${user._id}`)
                    }
                }
            }
        }

        if(method === 'find') {
            await Promise.all(context.result.data.map(addRoomToMembers))
        } else {
            await addRoomToMembers(context.result)
        }

        return context;
    };
};
