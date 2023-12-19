module.exports = (app) => {
    app.get('/home', (req, res) => {
        app.app.controllers.home.index(app, req, res);
    });
}