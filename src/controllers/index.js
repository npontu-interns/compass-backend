const getHome = (req, res) => {
    res.json({ message: 'Welcome to our Express API!' });
  };
  
  module.exports = { getHome };