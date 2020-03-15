const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from employee_territories", (err, rows) => {
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
      "select * from employee_territories where id = ?",
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

const create = ({ fk_territories, fk_employee }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into employee_territories (fk_territories, fk_employee) values (?,?)",
      [fk_territories, fk_employee],
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
    db.query(
      "delete from employee_territories where id = ?",
      [pId],
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

const update = ({ fk_territories, fk_employee, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE employee_territories SET fk_territories = ?, fk_employee = ? WHERE id = ?",
      [fk_territories, fk_employee, id],
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
