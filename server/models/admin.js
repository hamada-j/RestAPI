const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from ejercicios", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = pEjercicioId => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from ejercicios where id = ?",
      [pEjercicioId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows.length === 0) {
            resolve(null);
          } else {
            resolve(rows[0]);
          }
        }
      }
    );
  });
};

const create = ({ titulo, duracion, repeticiones }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into ejercicios (titulo, duracion, repeticiones) values (?,?,?)",
      [titulo, duracion, repeticiones],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteById = pEjercicioId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from ejercicios where id = ?",
      [pEjercicioId],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const update = ({ titulo, duracion, repeticiones, id }) => {
  console.log(titulo, duracion, repeticiones, id);
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE ejercicios SET titulo = ?,  duracion = ?, repeticiones = ?  WHERE id = ?",
      [titulo, duracion, repeticiones, id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  deleteById: deleteById,
  update: update
};
