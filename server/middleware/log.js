const jwt = require("jwt-simple");
const moment = require("moment");
const fs = require("fs");

// Modelos de los Middleware

const checkToken = (req, res, next) => {
  if (!req.headers["token"]) {
    return res.status(431).json({
      message: "debes incluir la cabecera (cabecera)"
    });
  }
  const token = req.headers["token"];
  let payload = null;
  try {
    payload = jwt.decode(token, "token");
  } catch (err) {
    return res.status(431).json({
      message: "no se ha podido decodificar le token (decodificar el token)"
    });
  }
  console.log(payload);
  const fechaActual = moment().unix();
  if (fechaActual > payload.fechaExpiracion) {
    return res.status(431).json({
      message: "el token esta caducado (fecha de expiracion)"
    });
  }
  req.payload = payload;

  next();
};

const registerAction = (req, res, next) => {
  // creamos un fichero de registro del log creando un archivo: su ruta y la informacion extraida del req.
  fs.appendFileSync(
    "logs/userActions.log",
    `Usuario: ${req.payload.usuarioId}. Método: ${req.method}. Url: ${req.url}`
  );
  next();
};

// Exportamos la Middleware
module.exports = {
  checkToken: checkToken,
  registerAction: registerAction
};
