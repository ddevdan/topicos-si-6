const receiveData = (socketInstance) => socketInstance.on('data', (data) => {
  console.log(data.toString());
});


module.exports = receiveData;



