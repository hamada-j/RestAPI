const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from region", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = pRegionId => {
  return new Promise((resolve, reject) => {
    db.query("select * from region where id = ?", [pRegionId], (err, rows) => {
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

const create = ({ region }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into region (region) values (?)",
      [region],
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

const deleteById = pRegionId => {
  return new Promise((resolve, reject) => {
    db.query("delete from region where id = ?", [pRegionId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const update = ({ region, id }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE region SET region = ? WHERE id = ?",
      [region, id],
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
