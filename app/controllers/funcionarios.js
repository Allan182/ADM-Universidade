const bcrypt = require('bcrypt');

// ===========================  Funcionarios ================================ // 

module.exports.login = (app, req, res) => {
    if (req.session.autorizado !== true) {
        res.render("admin/login", { validacao: {}, camposDeUsuario: {} });
        return;
    }
    res.redirect("/home");
}

module.exports.autenticarLogin = (app, req, res) => {
    const camposDeUsuario = req.body;
    req.assert('login', 'Login é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatória').notEmpty();
    const erros = req.validationErrors();

    if (erros) {
        res.render("admin/login", { validacao: erros, flagAdmin: req.session.autorizado, camposDeUsuario: camposDeUsuario });
        return;
    }

    const connection = app.config.dbConnection();
    const autenticacao = new app.app.models.FuncionarioDAO(connection);



    autenticacao.getLoginDAO(camposDeUsuario, async (error, result) => {

        if(result.length > 0){

            const hashedPasswordFromDB =  result[0].senha; // hash da senha armazenado no banco
            const match = await bcrypt.compare(camposDeUsuario.senha, hashedPasswordFromDB); // Compara input com o banco
            
            console.log(match);
    
            if (!match) {
                const erro = [];
                erro.push({ msg: "Senha incorreta!" });
                res.render("admin/login", { validacao: erro, flagAdmin: req.session.autorizado, camposDeUsuario: camposDeUsuario });
                return;
            }
    
    
            req.session.cargo = result[0].cargo; // Recuperando o cargo pelo result.
            req.session.autorizado = true; // Autenticando que o login foi realizado para não limitar as paginas..
            res.redirect('/home');

        } else {
            const erro = [];
            erro.push({ msg: "Login incorreto!" });
            res.render("admin/login", { validacao: erro, flagAdmin: req.session.autorizado, camposDeUsuario: camposDeUsuario });
            return;
        }


       
        
    });
}

module.exports.listarFuncionarios = ( app, req ,res )=> {
   
    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {} });
        return;
    }

    const connection = app.config.dbConnection();
    const funcModel = new app.app.models.FuncionarioDAO(connection);

    funcModel.getFuncionariosDAO((error, result) => {
        res.render("funcionarios/funcionarios", { JFuncionarios: result , cargo : req.session.cargo});
    });
}

module.exports.sair =  (app, req, res) => {
    req.session.autorizado = "";
    res.redirect('/');
}

