const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from customers", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = pOrderId => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from customers where id = ?",
      [pOrderId],
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

const create = ({ name, address, fk_region }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into customers (name, address, fk_region) values (?,?,?)",
      [name, address, orderdate, fk_region],
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

const deleteById = pOrderId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from customers where id = ?",
      [pOrderId],
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

const update = ({ name, address, fk_region, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE customers SET name = ?, address = ?, fk_region = ? WHERE id = ?",
      [name, address, fk_region, id],
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
