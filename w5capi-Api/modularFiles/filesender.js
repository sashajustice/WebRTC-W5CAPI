/*convert dataurll into chunck and send to receiver*/
var FileSender = {
        send: function (file, w5peer) {
            // max chunk sending limit on chrome is 64k
            // max chunk receiving limit on firefox is 16k
            var packetSize = 15 * 1000;

            if (w5peer.chunkSize) {
                packetSize = w5peer.chunkSize;
            }

            var textToTransfer = '';
            var numberOfPackets = 0;
            var packets = 0;

            file.uuid = getRandomString();

            function processInWebWorker() {
                var blob = URL.createObjectURL(new Blob(['function readFile(_file) {postMessage(new FileReaderSync().readAsDataURL(_file));};this.onmessage =  function (e) {readFile(e.data);}'], {
                    type: 'application/javascript'
                }));

                var worker = new Worker(blob);
                URL.revokeObjectURL(blob);
                return worker;
            }

            if ( !! window.Worker) {
                var webWorker = processInWebWorker();

                webWorker.onmessage = function (event) {
                    onReadAsDataURL(event.data);
                };

                webWorker.postMessage(file);
            } else {
                var reader = new FileReader();
                reader.onload = function (e) {
                    onReadAsDataURL(e.target.result);
                };
                reader.readAsDataURL(file);
            }

            function onReadAsDataURL(dataURL, text) {
                var data = {
                    type: 'file',
                    uuid: file.uuid,
                    maxChunks: numberOfPackets,
                    currentPosition: numberOfPackets - packets,
                    name: file.name,
                    fileType: file.type,
                    size: file.size
                };

                if (dataURL) {
                    text = dataURL;
                    numberOfPackets = packets = data.packets = parseInt(text.length / packetSize);

                    file.maxChunks = data.maxChunks = numberOfPackets;
                    data.currentPosition = numberOfPackets - packets;

                    w5peer.emit('file-start', file);
                }

                packets--;
                w5peer.emit('file-progress', {
                    uuid: file.uuid,
                    maxChunks: numberOfPackets,
                    currentPosition: numberOfPackets - packets
                });

                if (text.length > packetSize) data.message = text.slice(0, packetSize);
                else {
                    data.message = text;
                    data.last = true;
                    data.name = file.name;

                    file.url = URL.createObjectURL(file);

                    w5peer.emit('file-end', file);
                }

                w5peer.send(data);

                textToTransfer = text.slice(data.message.length);
                if (textToTransfer.length) {
                    setTimeout(function () {
                        onReadAsDataURL(null, textToTransfer);
                    }, w5peer.chunkInterval || 500);
                }
            }
        }
    };
