module.exports = (app) => {
    app.get('/listar-disciplinas', (req, res) => {
        app.app.controllers.disciplinas.listarDisciplinas(app,req,res);
    });
}