const asyncHandler = (asyncFn) => async (req, res, next) => {
  try {
    await asyncFn(req, res, next);
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ success: false, message: err.message });
  }
};

export default asyncHandler;
