const validateFields = (requiredFields) => (req, res, next) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);
  
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Faltan los siguientes campos: ${missingFields.join(', ')}`,
      });
    }
  
    next();
  };
  
  module.exports = validateFields;
  