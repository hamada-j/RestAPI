const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from orders", (err, rows) => {
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
    db.query("select * from orders where id = ?", [pOrderId], (err, rows) => {
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

const create = ({
  fk_customer,
  fk_employee,
  orderdate,
  requiredate,
  address
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into orders (fk_customer, fk_employee, orderdate, requiredate, address ) values (?,?,?,?,?)",
      [fk_customer, fk_employee, orderdate, requiredate, address],
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
    db.query("delete from orders where id = ?", [pOrderId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const update = ({
  fk_customer,
  fk_employee,
  orderdate,
  requiredate,
  address,
  id
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE orders SET fk_customer = ?, fk_employee = ?, orderdate = ?, requiredate = ?, address = ? WHERE id = ?",
      [fk_customer, fk_employee, orderdate, requiredate, address, id],
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
