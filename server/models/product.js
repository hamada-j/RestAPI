const getAllInfo = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "select products.*, order_ord_prod.*, orders.* from order_ord_prod inner join products on order_ord_prod.fk_product = products.id inner join orders on order_ord_prod.fk_orders = orders.id where products.id ",
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

const getAllInfoId = pId => {
  return new Promise((resolve, reject) => {
    db.query(
      " select products.*, order_ord_prod.*, orders.* from order_ord_prod inner join products on order_ord_prod.fk_product = products.id inner join orders on order_ord_prod.fk_orders = orders.id where products.id = ?",
      [pId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

const getProductbyDiscont = pDescunt => {
  return new Promise((resolve, reject) => {
    db.query(
      "select products.*, order_ord_prod.discunt from products, order_ord_prod where fk_product = products.id and order_ord_prod.discunt = ?",
      [pDescunt],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};
const getAllMistakes = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from mistakes", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from products", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = pProductsId => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from products  where id = ?",
      [pProductsId],
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

const create = ({
  name,
  photo,
  unitprice,
  unitstock,
  unitonorder,
  fk_supplier,
  fk_category
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into products  (name, photo, unitprice, unitstock, unitonorder, fk_supplier, fk_category) values (?,?,?,?,?,?,?)",
      [
        name,
        photo,
        unitprice,
        unitstock,
        unitonorder,
        fk_supplier,
        fk_category
      ],
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
      "delete from products where id = ?",
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

const update = ({
  name,
  photo,
  unitprice,
  unitstock,
  unitonorder,
  fk_supplier,
  fk_category,
  id
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE products SET name = ?, photo = ?, unitprice = ?, unitstock = ?, unitonorder = ?, fk_supplier = ?, fk_category = ? WHERE id = ?",
      [
        name,
        photo,
        unitprice,
        unitstock,
        unitonorder,
        fk_supplier,
        fk_category,
        id
      ],
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
  update: update,
  getAllInfo: getAllInfo,
  getProductbyDiscont: getProductbyDiscont,
  getAllInfoId: getAllInfoId,
  getAllMistakes: getAllMistakes
};
