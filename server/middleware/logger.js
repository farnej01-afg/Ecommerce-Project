const logger = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    
    console.log(
      `Method: ${req.method} | URL: ${req.originalUrl} | Status: ${res.statusCode} | Time: ${duration}ms`,
    );
  });

  next();
};

export default logger;
