const { exec } = require('child_process');

const syncDB = () => {
  const atlasURI = process.env.MONGO_URI; // Base de datos en la nube
  const localURI = 'mongodb://localhost:27017/local_backup'; // Base de datos local

  console.log('Iniciando sincronización de bases de datos...');

  // Exportar datos desde Atlas
  const dumpCommand = `mongodump --uri="${atlasURI}" --archive=backup.gzip --gzip`;
  const restoreCommand = `mongorestore --uri="${localURI}" --archive=backup.gzip --gzip --drop`;

  exec(dumpCommand, (dumpErr) => {
    if (dumpErr) {
      console.error('Error al hacer dump de MongoDB Atlas:', dumpErr);
      return;
    }

    // Restaurar datos en la base local
    exec(restoreCommand, (restoreErr) => {
      if (restoreErr) {
        console.error('Error al restaurar la base de datos local:', restoreErr);
      } else {
        console.log('Sincronización completada exitosamente.');
      }
    });
  });
};

module.exports = syncDB;
