const bcrypt = require('bcrypt');

// ===========================  Aluno ================================ // 

module.exports.formAddAluno = (app, req, res) => {
    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {} });
        return;
    }

    const connection = app.config.dbConnection();
    const getTurmas = new app.app.models.TurmaDAO(connection);

    getTurmas.getTurmasDAO((error, result) => {
        res.render("admin/form-add-aluno", { validacao: {}, aluno: {}, turmas: result });
    });
}

module.exports.salvarAluno = (app, req, res) => {
    const aluno = req.body;
    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('sobrenome', 'Sobrenome é obrigatório').notEmpty();
    req.assert('dataNascimento', 'Data de Nascimento é obrigatória').notEmpty();
    req.assert('id_turma_fk', 'Turma é obrigatória').notEmpty();
    const erros = req.validationErrors();
    if (erros) {
        const connection = app.config.dbConnection();
        const getTurmas = new app.app.models.TurmaDAO(connection);
        getTurmas.getTurmasDAO((error, result) => {
            res.render("admin/form-add-aluno", { validacao: erros, aluno: aluno, turmas: result });
        });
        return;
    }
    const connection = app.config.dbConnection();
    const salvarAlunoModel = new app.app.models.AlunosDAO(connection);
    salvarAlunoModel.salvarAlunoDAO(aluno, (error, result) => {
        res.redirect('/listar-alunos');
    });
}

module.exports.excluirAluno = (app, req, res) => {
    const connection = app.config.dbConnection();
    const excluirAluno = new app.app.models.AlunosDAO(connection);
    const id_aluno = req.query;
    excluirAluno.excluirAlunoDAO(id_aluno, function (error, result) {
        res.redirect('/listar-alunos');
    });
}

module.exports.formEditAluno = (app, req, res) => {
    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {} });
        return;
    }

    const connection = app.config.dbConnection();
    const formEditarAluno = new app.app.models.AlunosDAO(connection);
    const turmasEditAluno = new app.app.models.TurmaDAO(connection);

    const id_aluno = req.query;

    formEditarAluno.FormEditAlunosDAO(id_aluno, (error, resultAlunos) => {

        turmasEditAluno.getTurmasDAO((error, resultTurmas) => {
            const aluno = {
                id_aluno: id_aluno.id_aluno,
                nome: resultAlunos[0].nome,
                sobrenome: resultAlunos[0].sobrenome,
                dataNascimento: resultAlunos[0].dataNascimento,
                turma: resultTurmas
            };
            res.render("admin/form-update-aluno", {
                validacao: {},
                aluno: aluno,
            });
        });
    });
}

module.exports.atualizarAluno = (app, req, res) => {
    const aluno = req.body;
    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('sobrenome', 'Sobrenome é obrigatório').notEmpty();
    req.assert('dataNascimento', 'Data de Nascimento é obrigatória').notEmpty();
    req.assert('id_turma_FK', 'Turma é obrigatória').notEmpty();
    const erros = req.validationErrors();

    if (erros) {

        const connection = app.config.dbConnection();
        const errorTurma = new app.app.models.AlunosDAO(connection);
        const turmasAttAluno = new app.app.models.TurmaDAO(connection);

        errorTurma.editAlunosDAO(aluno, (error, resultAlunos) => {

            turmasAttAluno.getTurmasDAO((error, resultTurmas) => {
                const alunoAtualizado = {
                    id_aluno: aluno.id_aluno,
                    nome: resultAlunos[0].nome,
                    sobrenome: resultAlunos[0].sobrenome,
                    dataNascimento: resultAlunos[0].dataNascimento,
                    turma: resultTurmas.length > 0 ? resultTurmas : []
                };
                res.render("admin/form-update-aluno", {
                    validacao: erros,
                    aluno: alunoAtualizado,
                });
            });
        });
        return;
    };

    const connection = app.config.dbConnection();
    const atualizarAluno = new app.app.models.AlunosDAO(connection);
    atualizarAluno.atualizarAlunoDAO(aluno, function (error, result) {
        res.redirect('/listar-alunos');
    });
}


// ===========================  Turma ================================ // 



module.exports.salvarTurma = (app, req, res) => {

    const turma = req.body;
    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('ano', 'Ano é obrigatório').notEmpty();
    req.assert('id_disciplina_FK', 'Disciplina é obrigatória').notEmpty();
    req.assert('id_func_FK', 'Funcionario é obrigatória').notEmpty();
    const erros = req.validationErrors();

    if (erros) {
        const connection = app.config.dbConnection();
        const turmasModel = new app.app.models.TurmaDAO(connection);
        const funcionarioModel = new app.app.models.FuncionarioDAO(connection);
        const disciplinaModel = new app.app.models.DisciplinaDAO(connection);

        turmasModel.getTurmasDAO((error, result) => {

            disciplinaModel.getDisciplinasDAO((error, disciplinasResult) => {

                funcionarioModel.getProfessoresDAO((error, profResult) => {

                    res.render("admin/form-add-turma", {
                        validacao: erros,
                        turma: turma,
                        turmas: result, //conferir nces
                        disciplinas: disciplinasResult,
                        professor: profResult
                    });
                });
            });
        });
        return;
    };

    const connection = app.config.dbConnection();
    const salvarTurmaModel = new app.app.models.TurmaDAO(connection);
    salvarTurmaModel.salvarTurmaDAO(turma, (error, result) => {
        res.redirect('/listar-turmas');
    });
}


module.exports.formAddTurma = (app, req, res) => {

    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {}, professor: {}, disciplinas: {} });
        return;
    }

    const connection = app.config.dbConnection();
    const funcionarioModel = new app.app.models.FuncionarioDAO(connection);
    const disciplinaModel = new app.app.models.DisciplinaDAO(connection);

    funcionarioModel.getProfessoresDAO((error, result) => {

        disciplinaModel.getDisciplinasDAO((error, disciplinasResult) => {

            res.render("admin/form-add-turma", {
                validacao: {},
                turma: {},
                professor: result,
                disciplinas: disciplinasResult
            });
        });
    });

}

module.exports.excluirTurma = (app, req, res) => {
    const connection = app.config.dbConnection();
    const excluirTurma = new app.app.models.TurmaDAO(connection);

    const id_turma = req.query;

    excluirTurma.excluirTurmaDAO(id_turma, (error, result) => {

        console.log("Olá");

        res.redirect('/listar-turmas');
    });
}


module.exports.formEditTurma = (app, req, res) => {

    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {} });
        return;
    }

    const connection = app.config.dbConnection();

    const funcionarioModel = new app.app.models.FuncionarioDAO(connection);
    const disciplinaModel = new app.app.models.DisciplinaDAO(connection);
    const turmaModel = new app.app.models.TurmaDAO(connection);

    const id_turma = req.query;

    turmaModel.editTurmasDAO(id_turma, (error, resultTurmas) => {

        funcionarioModel.getProfessoresDAO((error, resultProf) => {

            disciplinaModel.getDisciplinasDAO((error, disciplinasResult) => {

                const turmas = {
                    id_turma: id_turma.id_turma,
                    nome: resultTurmas[0].nome,
                    ano: resultTurmas[0].ano,
                    disciplina: disciplinasResult,
                    funcionario: resultProf
                };

                res.render("admin/form-update-turma", {
                    validacao: {},
                    turmas: turmas,
                });

            });
        });
    });

}


module.exports.atualizarTurma = (app, req, res) => {
    const turma = req.body;
    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('ano', 'Ano é obrigatório').notEmpty();
    req.assert('id_disciplina_FK', 'Disciplina é obrigatória').notEmpty();
    req.assert('id_func_FK', 'Professor é obrigatório').notEmpty();
    const erros = req.validationErrors();
    if (erros) {
        const connection = app.config.dbConnection();

        const funcionarioModel = new app.app.models.FuncionarioDAO(connection);
        const disciplinaModel = new app.app.models.DisciplinaDAO(connection);
        const turmaModel = new app.app.models.TurmaDAO(connection);


        turmaModel.editTurmasDAO(turma, (error, resultTurmas) => {

            funcionarioModel.getProfessoresDAO((error, resultProf) => {

                disciplinaModel.getDisciplinasDAO((error, disciplinasResult) => {

                    const turmas = {
                        id_turma: turma.id_turma,
                        nome: resultTurmas[0].nome,
                        ano: resultTurmas[0].ano,
                        disciplina: disciplinasResult ? disciplinasResult : [],
                        funcionario: resultProf ? resultProf : []
                    };

                    res.render("admin/form-update-turma", {
                        validacao: erros,
                        turmas: turmas,
                    });

                });
            });
        });
        return;
    };


    const connection = app.config.dbConnection();
    const atualizarTurmas = new app.app.models.TurmaDAO(connection);
    atualizarTurmas.atualizarTurmasDAO(turma, function (error, result) {
        res.redirect('/listar-turmas');
    });

}





// ===========================  Disciplina ================================ // 

module.exports.formAddDisciplina = (app, req, res) => {
    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {} });
        return;
    }
    res.render("admin/form-add-disciplina", { validacao: {}, disciplina: {} });
}

module.exports.salvarDisciplina = (app, req, res) => {
    const disciplina = req.body;
    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('ementa', 'Ementa é obrigatória').notEmpty();
    const erros = req.validationErrors();
    if (erros) {
        res.render("admin/form-add-disciplina", { validacao: erros, disciplina: disciplina });
        return;
    };
    const connection = app.config.dbConnection();
    const salvarDisciplinaModel = new app.app.models.DisciplinaDAO(connection);
    salvarDisciplinaModel.salvarDisciplinaDAO(disciplina, (error, result) => {
        res.redirect('/listar-disciplinas');
    });
}

module.exports.excluirDisciplina = (app, req, res) => {
    const connection = app.config.dbConnection();
    const excluirDisciplina = new app.app.models.DisciplinaDAO(connection);
    const id_disciplina = req.query;
    excluirDisciplina.excluirDisciplinaDAO(id_disciplina, (error, result) => {
        res.redirect('/listar-disciplinas');
    });
}

module.exports.formEditDisciplina = (app, req, res) => {

    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {} });
        return;
    }

    const connection = app.config.dbConnection();
    const formEditarDisc = new app.app.models.DisciplinaDAO(connection);
    const id_disciplina = req.query;

    formEditarDisc.formDisciplinaDAO(id_disciplina, function (error, result) {
        res.render("admin/form-update-disciplina", { validacao: {}, disciplina: result });
    });
}

module.exports.atualizarDisciplina = (app, req, res) => {

    const disciplina = req.body;

    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('ementa', 'Ementa é obrigatória').notEmpty();

    const erros = req.validationErrors();
    if (erros) {
        res.render("admin/form-update-disciplina", { validacao: erros, disciplina: [disciplina] });
        return;
    };

    const connection = app.config.dbConnection();
    const atualizarDisciplina = new app.app.models.DisciplinaDAO(connection);
    atualizarDisciplina.atualizarDisciplinaDAO(disciplina, function (error, result) {
        res.redirect('/listar-disciplinas');
    });
}



// ===========================  Funcionarios ================================ // 


module.exports.formAddFuncionario = (app, req, res) => {
    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {} });
        return;
    }
    res.render("admin/form-add-funcionario", { funcionario: {}, validacao: {} });
}

module.exports.salvarFuncionario = async (app, req, res) => {

    const funcionario = req.body;
    const hashedPassword = await bcrypt.hash(funcionario.senha, 10);
    funcionario.senha = hashedPassword;

    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('sobrenome', 'Sobrenome é obrigatório').notEmpty();
    req.assert('cargo', 'Cargo é obrigatório').notEmpty();
    req.assert('login', 'Login é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatória').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
        res.render("admin/form-add-funcionario", { validacao: erros, funcionario: funcionario });
        return;
    }

    const connection = app.config.dbConnection();
    const salvarFuncModel = new app.app.models.FuncionarioDAO(connection);


    salvarFuncModel.getLoginDAO(funcionario, (error, result) => {

        if (result.length != 0) {
            const erro = [];
            erro.push({ msg: "Login Existente!" });
            res.render("admin/form-add-funcionario", { validacao: erro, funcionario: funcionario });
            return;
        }

        salvarFuncModel.salvarFuncionarioDAO(funcionario, (error, result) => {
            res.redirect('/listar-funcionarios');
        });

    });
}

module.exports.excluirFuncionario = (app, req, res) => {
    const connection = app.config.dbConnection();
    const excluirFuncionario = new app.app.models.FuncionarioDAO(connection);
    const id_func = req.query;
    excluirFuncionario.excluirFuncDAO(id_func, (error, result) => {
        res.redirect('/listar-funcionarios');
    });
}

module.exports.formEditFuncionario = (app, req, res) => {
    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {} });
        return;
    }

    const connection = app.config.dbConnection();
    const formEditarFunc = new app.app.models.FuncionarioDAO(connection);
    const id_func = req.query;

    formEditarFunc.formFuncionarioDAO(id_func, function (error, result) {
        res.render("admin/form-update-funcionario", { validacao: {}, funcionario: result });
    });

}

module.exports.atualizarFuncionario = async (app, req, res) => {

    const funcionario = req.body;


    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('sobrenome', 'Sobrenome é obrigatório').notEmpty();
    req.assert('login', 'Login é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatória').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
        res.render("admin/form-update-funcionario", { validacao: erros, funcionario: [funcionario] });
        return;
    };

    const hashedPassword = await bcrypt.hash(funcionario.senha, 11);
    funcionario.senha = hashedPassword;


    const connection = app.config.dbConnection();
    const atualizarFuncionario = new app.app.models.FuncionarioDAO(connection);
    atualizarFuncionario.atualizarFuncionarioDAO(funcionario, function (error, result) {
        res.redirect('/listar-funcionarios');
    });
}





