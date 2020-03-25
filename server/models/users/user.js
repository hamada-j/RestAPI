const create = ({ employeeNum, email, password }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into users (employeeNum, email, password) values (?,?,?)",
      [employeeNum, email, password],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const emailExists = pEmail => {
  return new Promise((resolve, reject) => {
    db.query("select * from users where email = ?", [pEmail], (err, rows) => {
      if (err) return reject(err);
      if (rows.length === 0) return resolve(null);
      resolve(rows[0]);
    });
  });
};

module.exports = {
  create: create,
  emailExists: emailExists
};
