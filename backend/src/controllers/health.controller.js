function getHealth(req, res) {
  res.json({
    status: 'ok',
    service: 'DATIAOWNP_backend',
    time: new Date().toISOString()
  });
}

module.exports = {
  getHealth
};
