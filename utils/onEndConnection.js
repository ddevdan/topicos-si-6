const onEndConnection = (socketInstance) => {
  socketInstance.on('end', () => {
    console.log('disconnected from server');
  });
};


module.exports = onEndConnection;
