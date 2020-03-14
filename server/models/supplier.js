const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from suppliers", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = pSupplierId => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from suppliers where id = ?",
      [pSupplierId],
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

const create = ({ company, contact, address }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into suppliers (company, contact, address) values (?,?,?)",
      [company, contact, address],
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

const deleteById = pSupplierId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from suppliers where id = ?",
      [pSupplierId],
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

const update = ({ company, contact, address, fk_region, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE suppliers SET company = ?,  contact = ?, address = ? fk_region = ? WHERE id = ?",
      [company, contact, address, fk_region, id],
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