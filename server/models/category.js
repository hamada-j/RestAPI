const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from category", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = pId => {
  return new Promise((resolve, reject) => {
    db.query("select * from category where id = ?", [pId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length === 0) {
          resolve(null);
        } else {
          resolve(rows[0]);
        }
      }
    });
  });
};

const create = ({ name, description }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into category (name, description) values (?,?)",
      [name, description],
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
    db.query("delete from category where id = ?", [pId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const update = ({ name, description, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE category SET name = ?, description = ? WHERE id = ?",
      [name, description, id],
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
