const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from order_ord_prod", (err, rows) => {
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
    db.query(
      "select * from order_ord_prod where id = ?",
      [pId],
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

const create = ({ fk_orders, fk_product, quantity, discunt }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into order_ord_prod (fk_orders, fk_product, quantity, discunt) values (?,?,?,?)",
      [fk_orders, fk_product, quantity, discunt],
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

const deleteById = pProductId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from order_ord_prod where id = ?",
      [pProductId],
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

const update = ({ fk_orders, fk_product, quantity, discunt, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE order_ord_prod SET fk_orders = ?, fk_product = ?, quantity = ?, discunt = ? WHERE id = ?",
      [fk_orders, fk_product, quantity, discunt, id],
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
