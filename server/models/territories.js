const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from territories", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = pZonaId => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from territories where id = ?",
      [pZonaId],
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

const create = ({ zona, fk_region }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into territories (zona, fk_region) values (?,?)",
      [zona, fk_region],
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

const deleteById = pId => {
  return new Promise((resolve, reject) => {
    db.query("delete from territories where id = ?", [pId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const update = ({ zona, fk_region, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE territories SET zona = ?, fk_region = ? WHERE id = ?",
      [zona, fk_region, id],
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
