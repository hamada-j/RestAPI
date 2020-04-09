exports.registerAction = (req, res, next) => {
  // creamos un fichero de registro del log creando un archivo: su ruta y la informacion extraida del req.
  fs.appendFileSync(
    "logs/userActions.log",
    ` Método: ${req.method}. Url: ${req.url}`
  );
  next();
};
