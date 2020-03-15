const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from departament", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = departamentId => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from departament where id = ?",
      [departamentId],
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

const create = ({ name }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into departament (name) values (?)",
      [name],
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

const deleteById = pDepartamentId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from departament where id = ?",
      [pDepartamentId],
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

const update = ({ name, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE departament SET name = ? WHERE id = ?",
      [name, id],
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
