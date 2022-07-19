const receiveData = (socketInstance, socketInstances) => {
  socketInstance.on('data', (data) => {
    console.log(data.toString());
  });
}


module.exports = receiveData;



