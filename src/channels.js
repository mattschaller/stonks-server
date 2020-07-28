module.exports = function(app) {
    if(typeof app.channel !== 'function') {
        // If no real-time functionality has been configured just return
        return;
    }

    // Join a channel given a user and connection
    const joinChannels = (user, connection) => {
        console.log(`Joining channels for ${user._id}`)
        app.channel('anonymous').leave(connection);
        app.channel('authenticated').join(connection);
        app.channel(`messages/${user._id}`).join(connection);
        app.channel(`userIds/${user._id}`).join(connection);
        user.rooms.forEach(room =>
            app.channel(`rooms/${room}`).join(connection)
        );
    }

    const leaveChannels = (user, connection) => {
        console.log(`Leaving channels for ${user._id}`)
        app.channel('anonymous').join(connection);
        app.channel('authenticated').leave(connection);
        app.channel(`messages/${user._id}`).leave(connection);
        app.channel(`userIds/${user._id}`).leave(connection);
        user.rooms.forEach(room =>
            app.channel(`rooms/${room}`).leave(connection)
        );
    };

    // Leave and re-join all channels with new user information
    const updateChannels = user => {
        console.log(app.channel(app.channels))

        const { connections } = app.channel(app.channels).filter(connection =>
            connection.user && connection.user._id === user._id
        );
        
        connections.forEach(connection => leaveChannels(user, connection));
        connections.forEach(connection => joinChannels(user, connection));
    }

    app.on('connection', connection => {
        app.channel('anonymous').join(connection);
    });

    app.on('login', (authResult, { connection }) => {
        if(connection) {
            console.log(`${connection.user._id} has logged on.`)
            joinChannels(connection.user, connection);
        }
    });

    app.service('users').on('updated', updateChannels);
    app.service('users').on('patched', updateChannels);
    app.service('users').on('removed', leaveChannels);

    // eslint-disable-next-line no-unused-vars
    app.publish((data, hook) => {
        console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line
        return app.channel('authenticated');
    });

    app.service('users').publish((user, context) => {  
        console.log(`Publishing user event to ${user._id}.`)
        return app.channel(`userIds/${user._id}`)
    });

    app.service('messages').publish((message, context) => {  
        console.log(`Publishing message event roomId ${message.roomId}: \n-- userId: ${message.userId}\n-- text: ${message.text}`)
        return app.channel(`rooms/${message.roomId}`)
    });

    app.service('rooms').publish((room, context) => {
        room.members.map(member => console.log(`Publishing room ${room._id} to user ${member}`));
        const userChannel = userId => app.channel(`userIds/${userId}`)
        return room.members.map(userChannel)
    });

};
