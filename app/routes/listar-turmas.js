module.exports = (app) => {
    app.get('/listar-turmas', (req, res) => {
        app.app.controllers.turmas.listarTurmas(app, req, res)
    });
}