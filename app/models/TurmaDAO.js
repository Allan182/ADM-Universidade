function TurmaDAO(connection) {
    this._connection = connection;
}

TurmaDAO.prototype.getTurmasDAO = function (callback) {
    this._connection.query('SELECT * FROM turmas', callback);
}
TurmaDAO.prototype.salvarTurmaDAO = function (turma, callback) {
    this._connection.query('INSERT INTO turmas SET ?', turma, callback);
}

TurmaDAO.prototype.excluirTurmaDAO = function (id_turma, callback) {
    this._connection.query('DELETE FROM turmas WHERE id_turma = ' + id_turma.id_turma, callback);
}

TurmaDAO.prototype.editTurmasDAO = function (id_turma, callback) {
    this._connection.query('SELECT * FROM turmas WHERE id_turma = ' + id_turma.id_turma, callback);
}

TurmaDAO.prototype.atualizarTurmasDAO = function (turma, callback) {
    this._connection.query('UPDATE turmas SET nome = ?, ano = ? , id_disciplina_FK = ? , id_func_FK = ? WHERE id_turma = ?', [turma.nome, turma.ano, turma.id_disciplina_FK, turma.id_func_FK, turma.id_turma], callback);
}

module.exports = () => {
    return TurmaDAO;
}

