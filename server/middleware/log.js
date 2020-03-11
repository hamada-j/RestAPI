const jwt = require("jwt-simple");
const moment = require("moment");
const fs = require("fs");

// Modelos de los Middleware

const checkToken = (req, res, next) => {
  // coprobar el paso que se realiza del paso de la middleware
  // console.log("pasa por CheckToken");

  // pasamos el token por la cabecera para identificar el token que nos perimite identificar el permiso y fecha
  // req.headers nos permite vder la internalidad del sistema de la header
  //console.log(req.headers["user-token"]);

  // filtramos por la cabecer creada por nosotros mismos
  if (!req.headers["user-token"]) {
    return res.status(431).json({
      message: "debes incluir la cabecera (cabecera)"
    });
  }

  //  comrobamos si el token es correcto, desencriptoamos el token
  const token = req.headers["user-token"];
  // delaracion de la constante fuera del try-catch BLOCK
  let payload = null;
  try {
    payload = jwt.decode(token, process.env.TOKEN);
  } catch (err) {
    return res.status(431).json({
      message: "no se ha podido decodificar le token (decodificar el token)"
    });
  }
  console.log(payload);

  // Mirar si el token ha expirado
  const fechaActual = moment().unix();
  if (fechaActual > payload.fechaExpiracion) {
    return res.status(431).json({
      message: "el token esta caducado (fecha de expiracion)"
    });
  }

  // sobre la propiiedad inventada paylod asociada a req, equivale el valor de payload
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
