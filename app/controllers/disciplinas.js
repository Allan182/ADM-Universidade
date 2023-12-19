module.exports.listarDisciplinas = (app, req, res) => {
    
    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {} });
        return;
    }

    const connection = app.config.dbConnection();
    const disciplinasModel = new app.app.models.DisciplinaDAO(connection);

    disciplinasModel.getDisciplinasDAO((error, result) => {
        res.render("disciplinas/disciplinas", { JDisciplinas: result, cargo : req.session.cargo });
    });
}

