var TextSender = {
        send: function (initialText, w5peer) {
            var packetSize = 1000,
                textToTransfer = '',
                isobject = false;

            if (typeof initialText !== 'string') {
                isobject = true;
                initialText = JSON.stringify(initialText);
            }
            var uuid = getRandomString();

            sendText(initialText);

            function sendText(textMessage, text) {
                var data = {
                    type: 'text',
                    uuid: uuid
                };

                if (textMessage) {
                    text = textMessage;
                    data.packets = parseInt(text.length / packetSize);
                }

                if (text.length > packetSize)
                    data.message = text.slice(0, packetSize);
                else {
                    data.message = text;
                    data.last = true;
                    data.isobject = isobject;
                }

                w5peer.send(data);

                textToTransfer = text.slice(data.message.length);

                if (textToTransfer.length) {
                    if (config.preferSCTP || isFirefox) {
                        setTimeout(function () {
                            sendText(null, textToTransfer);
                        }, 100);
                    } else {
                        setTimeout(function () {
                            sendText(null, textToTransfer);
                        }, 500);
                    }
                }
            }
        }
    };
