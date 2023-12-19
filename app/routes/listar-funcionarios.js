module.exports = (app) => {
    app.get('/listar-funcionarios', (req, res) => {
        app.app.controllers.funcionarios.listarFuncionarios(app,req,res);
    });
}