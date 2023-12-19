module.exports = (app) => {
    app.get('/listar-alunos', (req, res) => {
        app.app.controllers.alunos.listarAlunos(app, req, res)
    });
};
