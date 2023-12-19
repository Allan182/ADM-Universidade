module.exports = (app) => {

    app.get('/', (req, res) => {
        app.app.controllers.funcionarios.login(app, req, res);
    });

    app.post('/autenticar', (req, res) => {
        app.app.controllers.funcionarios.autenticarLogin(app, req, res);
    });

    app.get('/sair', (req, res) => {
        app.app.controllers.funcionarios.sair(app, req, res);
    });

}