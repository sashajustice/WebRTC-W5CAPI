   /*convert dataurl into file object*/
   
    function FileReceiver(w5peer) {
        var content = {},
            packets = {},
            numberOfPackets = {};

        function receive(data) {
            var uuid = data.uuid;

            if (typeof data.packets !== 'undefined') {
                numberOfPackets[uuid] = packets[uuid] = parseInt(data.packets);
                w5peer.emit('file-start', data);
            }

            packets[uuid]--;
            w5peer.emit('file-progress', {
                uuid: uuid,
                maxChunks: numberOfPackets[uuid],
                currentPosition: numberOfPackets[uuid] - packets[uuid]
            });

            if (!content[uuid]) content[uuid] = [];

            content[uuid].push(data.message);

            if (data.last) {
                var dataURL = content[uuid].join('');

                FileConverter.DataURLToBlob(dataURL, data.fileType, function (blob) {
                    blob.uuid = uuid;
                    blob.name = data.name;
                    blob.type = data.fileType;
                    blob.extra = data.extra || {};

                    blob.url = (window.URL || window.webkitURL).createObjectURL(blob);

                    if (w5peer.autoSaveToDisk) {
                        FileSaver.SaveToDisk(blob.url, data.name);
                    }

                    w5peer.emit('file-end', blob);

                    delete content[uuid];
                });
            }
        }

        return {
            receive: receive
        };
    }
