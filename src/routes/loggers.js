const {Router} = require('express');
const {logger, loggerWarn, loggerError} = require('../helpers/log4.js'); 

const loggersRoute = Router();

const args = minimist(process.argv.slice(2), optionalArgsObject);
const CPUs = os.cpus().length;

loggersRoute.get('/api/randoms', (req, res) => {

    logger.info(`Ruta: ${req.url}`,`Metodo: ${req.method}`);

    res.json({
        pid: process.pid,
        puerto: args.port,
        msg: `/randoms`,
    });
});

loggersRoute.get('/', (req, res) => {

    logger.info(`Ruta: ${req.url}`,`Metodo: ${req.method}`);
    
    res.json({
        pid: process.pid,
        msg: `Hola desde puerto ${args.port} `,
    });
});

loggersRoute.get('/info', (req, res) => {

    logger.info(`Ruta: ${req.url}`,`Metodo: ${req.method}`);
    
    res.json({
        NumeroDeCPUs: CPUs,
        ProcessId: process.pid,
        VersionNode: process.version,
        Puerto: args.port,
        SistemaOperativo: process.platform,
        MemoriaTotalReservada: JSON.stringify(process.memoryUsage()),
        CarpetaProyecto: process.cwd()
    })

});

module.exports = loggersRoute;