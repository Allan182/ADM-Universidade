module.exports = (app) => {

    // ===========================  Alunos ================================ // 

    app.get('/add-alunos', (req, res) => {
        app.app.controllers.admin.formAddAluno(app, req, res);
    });

    app.post('/alunos/salvar', (req, res) => {
        app.app.controllers.admin.salvarAluno(app, req, res);
    });

    app.get('/alunos/excluir', function (req, res) {
        app.app.controllers.admin.excluirAluno(app, req, res);
    });

    app.get('/alunos/editar', (req, res) => {
        app.app.controllers.admin.formEditAluno(app, req, res);
    });

    app.post('/atualizarAluno', (req, res) => {
        app.app.controllers.admin.atualizarAluno(app, req, res);
    });

    


    // ===========================  Turma ================================ // 

    app.get('/add-turma', (req, res) => {
        app.app.controllers.admin.formAddTurma(app, req, res);
    });

    app.post('/turmas/salvar', (req, res) => {
        app.app.controllers.admin.salvarTurma(app, req, res);
    })

    app.get('/turmas/excluir', function (req, res) {
        app.app.controllers.admin.excluirTurma(app, req, res);
    });

    app.get('/turmas/editar', (req, res) => {
        app.app.controllers.admin.formEditTurma(app, req, res);
    });

    app.post('/atualizarTurmas', (req, res) => {
        app.app.controllers.admin.atualizarTurma(app, req, res);
    })

    // ===========================  Disciplina ================================ // 

  
    app.get('/add-disciplina', (req, res) => {
        app.app.controllers.admin.formAddDisciplina(app, req, res);
    });

    app.post('/disciplinas/salvar', (req, res) => {
        app.app.controllers.admin.salvarDisciplina(app, req, res);
    });

    app.get('/disciplinas/excluir', function (req, res) {
        app.app.controllers.admin.excluirDisciplina(app, req, res);
    });

    app.get('/disciplinas/editar', (req, res) => {
        app.app.controllers.admin.formEditDisciplina(app, req, res);
    });

    app.post('/atualizarDisciplina', (req, res ) => {
        app.app.controllers.admin.atualizarDisciplina(app, req, res)
    })



    // ===========================  Funcionarios ================================ // 

    app.get('/add-funcionarios', (req,res) => {
        app.app.controllers.admin.formAddFuncionario(app, req ,res);
    });

    app.post('/funcionarios/salvar', (req, res) => {
        app.app.controllers.admin.salvarFuncionario(app, req, res);
    });

    app.get('/funcionarios/excluir', (req, res) => {
        app.app.controllers.admin.excluirFuncionario(app, req ,res);
    });

    app.get('/funcionarios/editar', (req, res) => {
        app.app.controllers.admin.formEditFuncionario(app, req, res);
    });

    app.post('/atualizarFuncionario', (req, res) => {
        app.app.controllers.admin.atualizarFuncionario(app, req, res);
    });


}