 /*receive text and emit to event*/
 function TextReceiver(w5peer) {
        var content = {};

        function receive(data) {
            var uuid = data.uuid;
            if (!content[uuid]) content[uuid] = [];

            content[uuid].push(data.message);
            if (data.last) {
                var message = content[uuid].join('');
                if (data.isobject) message = JSON.parse(message);

                w5peer.emit('datachannel-message', message);

                delete content[uuid];
            }
        }

        return {
            receive: receive
        };
    }
