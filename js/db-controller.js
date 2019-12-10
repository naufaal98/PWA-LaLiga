const idbPromised = idb.open('football_database', 1, upgradedDb => {
  if (!upgradedDb.objectStoreNames.contains('jadwalNobar')) {
    upgradedDb.createObjectStore("jadwalNobar", {keyPath: "idNobar"});
  }
});

const dbGetAllJadwalNobar = () => {
  return new Promise((resolve, reject) => {
    idbPromised.then(db => {
      const transaction = db.transaction("jadwalNobar", `readonly`);
      return transaction.objectStore("jadwalNobar").getAll();
    }).then(data => {
      if (data !== undefined) {
        resolve(data)
      } else {
        reject(new Error("Favorite not Found"))
      }
    })
  })
};

const dbInsertJadwalNobar = jadwalNobar => {
  return new Promise((resolve, reject) => {
    idbPromised.then(db => {
      const transaction = db.transaction("jadwalNobar", `readwrite`);
      transaction.objectStore("jadwalNobar").add(jadwalNobar);
      return transaction;
    }).then(transaction => {
      if (transaction.complete) {
        resolve(true)
      } else {
        reject(new Error(transaction.onerror))
      }
    })
  })
};

const dbDeleteJadwalNobar = nobarId => {
  return new Promise((resolve, reject) => {
    idbPromised.then(db => {
      const transaction = db.transaction("jadwalNobar", `readwrite`);
      transaction.objectStore("jadwalNobar").delete(nobarId);
      return transaction;
    }).then(transaction => {
      if (transaction.complete) {
        resolve(true)
      } else {
        reject(new Error(transaction.onerror))
      }
    })
  })
};