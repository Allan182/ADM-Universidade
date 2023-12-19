module.exports.listarTurmas = (app, req, res) => {

    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {} });
        return;
    }

    const connection = app.config.dbConnection();
    const turmasModel = new app.app.models.TurmaDAO(connection);
    const funcionarioModel = new app.app.models.FuncionarioDAO(connection);
    const disciplinaModel = new app.app.models.DisciplinaDAO(connection);


    turmasModel.getTurmasDAO((error, resultTurmas) => {

        funcionarioModel.getProfessoresDAO((error, resultProf) => {

            disciplinaModel.getDisciplinasDAO((error, disciplinasResult) => {

                const turmasRelacionadas = resultTurmas.map((turma) => {
                    const professor = resultProf.find((prof) => prof.id_func === turma.id_func_FK);
                    const disciplina = disciplinasResult.find((disc) => disc.id_disciplina === turma.id_disciplina_FK);
                  
                    return {
                      id_turma: turma.id_turma,
                      nome_turma: turma.nome,
                      ano_turma: turma.ano,
                      nome_professor: professor ? `${professor.nome} ${professor.sobrenome}` : 'Professor não encontrado',
                      nome_disciplina: disciplina ? disciplina.nome : 'Disciplina não encontrada'
                    };
                  });
                  

                res.render("turmas/turmas", {
                    validacao: {},
                    JTurmas: turmasRelacionadas,
                    cargo : req.session.cargo
                });
            });
        });

    });

}
