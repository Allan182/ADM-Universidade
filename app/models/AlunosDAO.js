function AlunosDAO(connection) {
    this._connection = connection;
}

AlunosDAO.prototype.getAlunosDAO = function (callback) {
    this._connection.query('SELECT * FROM alunos', callback);
}
AlunosDAO.prototype.salvarAlunoDAO = function (aluno, callback) {
    this._connection.query('INSERT INTO alunos SET ?', aluno, callback);
}

AlunosDAO.prototype.excluirAlunoDAO = function (id_aluno, callback) {
    this._connection.query('DELETE FROM alunos WHERE id_aluno = ' + id_aluno.id_aluno, callback);
}

AlunosDAO.prototype.FormEditAlunosDAO = function (id_aluno, callback) {
    this._connection.query('SELECT * FROM alunos WHERE id_aluno = ' + id_aluno.id_aluno, callback);
}

AlunosDAO.prototype.editAlunosDAO = function (id_aluno, callback) {
    this._connection.query('SELECT * FROM alunos WHERE id_aluno = ' + id_aluno.id_aluno, callback);
}

AlunosDAO.prototype.atualizarAlunoDAO = function(aluno, callback){
    this._connection.query('UPDATE alunos SET nome = ?, sobrenome = ?  , dataNascimento = ? , id_turma_FK = ? WHERE id_aluno = ?', [aluno.nome, aluno.sobrenome, aluno.dataNascimento, aluno.id_turma_FK, aluno.id_aluno], callback);
}


module.exports = () => {
    return AlunosDAO;
}