module.exports.listarAlunos = (app, req, res) => {
    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {} });
        return;
    }
    const connection = app.config.dbConnection();
    const alunosModel = new app.app.models.AlunosDAO(connection);
    
    const getTurmas = new app.app.models.TurmaDAO(connection);

    alunosModel.getAlunosDAO((error, resultAlunos) => {

        getTurmas.getTurmasDAO((error, resultTurmas) => {

            const alunosRelacionados = resultAlunos.map((aluno) => {

                const turmas = resultTurmas.find((turma) => aluno.id_turma_FK == turma.id_turma);

                function calcularIdade(dataNascimento) {
                    const hoje = new Date();
                    const dataNasc = new Date(dataNascimento);
                    let idade = hoje.getFullYear() - dataNasc.getFullYear();
                    const mesAtual = hoje.getMonth();
                    const mesNascimento = dataNasc.getMonth();

                    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < dataNasc.getDate())) {
                        idade--;
                    }

                    return idade;
                }
                const idadeAluno = calcularIdade(aluno.dataNascimento);
                return {
                    id_aluno: aluno.id_aluno,
                    nome: aluno.nome,
                    sobrenome: aluno.sobrenome,
                    idade: idadeAluno,
                    turma: turmas ? `${turmas.nome}` : 'Turma não encontrada',
                };
            });

            res.render("alunos/alunos", {
                validacao: {},
                JAlunos: alunosRelacionados,
                cargo: req.session.cargo
            });

        });

    });
}