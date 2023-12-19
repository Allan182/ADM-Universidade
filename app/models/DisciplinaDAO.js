function DisciplinaDAO(connection) {
    this._connection = connection;
}

// Disciplina

DisciplinaDAO.prototype.salvarDisciplinaDAO = function (disciplina, callback) {
    this._connection.query('INSERT INTO disciplinas SET ?', disciplina, callback);
}

DisciplinaDAO.prototype.getDisciplinasDAO = function (callback) {
    this._connection.query('SELECT * FROM disciplinas', callback);
}

DisciplinaDAO.prototype.formDisciplinaDAO = function (id_disciplina, callback) {
    this._connection.query('SELECT nome, ementa, id_disciplina FROM disciplinas WHERE id_disciplina = ' + id_disciplina.id_disciplina, callback);
};

DisciplinaDAO.prototype.excluirDisciplinaDAO = function (id_disciplina, callback) {
    this._connection.query('DELETE FROM disciplinas WHERE id_disciplina = ' + id_disciplina.id_disciplina, callback);
}

DisciplinaDAO.prototype.atualizarDisciplinaDAO = function (disciplina, callback) {
    this._connection.query('UPDATE disciplinas SET nome = ?, ementa = ? WHERE id_disciplina = ?', [disciplina.nome, disciplina.ementa, disciplina.id_disciplina], callback);
}

module.exports = () => {
    return DisciplinaDAO;
}
