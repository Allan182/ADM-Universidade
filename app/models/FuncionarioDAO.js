function FuncionarioDAO(connection) {
    this._connection = connection;
}

FuncionarioDAO.prototype.getLoginDAO = function (camposDeUsuario, callback) {

    this._connection.query('SELECT id_func, cargo, senha FROM funcionarios WHERE login = "' + camposDeUsuario.login + '"', callback);
}

FuncionarioDAO.prototype.salvarFuncionarioDAO = function (funcionario, callback) {
    this._connection.query('INSERT INTO funcionarios SET ?', funcionario, callback);
}
FuncionarioDAO.prototype.getFuncionariosDAO = function (callback) {
    this._connection.query('SELECT * FROM funcionarios', callback);
}
FuncionarioDAO.prototype.excluirFuncDAO = function (id_func, callback) {
    this._connection.query('DELETE FROM funcionarios WHERE id_func = ' + id_func.id_func, callback);
}
FuncionarioDAO.prototype.getProfessoresDAO = function (callback) {
    this._connection.query('SELECT * FROM funcionarios WHERE cargo = "prof" ', callback);
}
FuncionarioDAO.prototype.formFuncionarioDAO = function (id_func, callback) {
    this._connection.query('SELECT * FROM funcionarios  WHERE id_func = ' + id_func.id_func, callback);
}
FuncionarioDAO.prototype.atualizarFuncionarioDAO = function (funcionario, callback) {
    this._connection.query('UPDATE funcionarios SET nome =  ?, sobrenome  = ?  , login = ? , senha = ? WHERE id_func = ?', [funcionario.nome, funcionario.sobrenome, funcionario.login, funcionario.senha, funcionario.id_func], callback);
}

FuncionarioDAO.prototype.formProfTurmaDAO = function (callback) {
    this._connection.query('SELECT * FROM funcionarios', callback);
}

module.exports = () => {
    return FuncionarioDAO;
}
