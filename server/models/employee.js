const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from employee", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = pEmployeeId => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from employee where id = ?",
      [pEmployeeId],
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
  lastname,
  email,
  password,
  address,
  phone,
  photo,
  birthdate,
  salary
  //fk_departamen
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into employee (name, lastname, email, password, address, phone, photo, birthdate, salary) values (?,?,?,?,?,?,?,?,?)",
      [
        name,
        lastname,
        email,
        password,
        address,
        phone,
        photo,
        birthdate,
        salary
        //fk_departamen
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

const deleteById = pEmployeeId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from employee where id = ?",
      [pEmployeeId],
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
  lastname,
  email,
  password,
  address,
  phone,
  photo,
  birthdate,
  salary,
  //fk_departamen, ¿por que en algunos si ?
  id
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE employee SET name = ?, lastname = ?, email = ?, password = ?, address = ?, phone = ?, photo = ?, birthdate = ?, salary = ?  WHERE id = ?",
      [
        name,
        lastname,
        email,
        password,
        address,
        phone,
        photo,
        birthdate,
        salary,
        //fk_departamen,
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
  update: update
};
