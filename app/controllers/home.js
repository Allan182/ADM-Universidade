module.exports.index = (app, req, res) => {
    if (req.session.autorizado !== true) {
        const erro = [{ msg: 'Você precisa estar logado!' }];
        res.render("admin/login", { validacao: erro, camposDeUsuario: {} });
        return;
    }
    res.render("home/index", {cargo : req.session.cargo});
}
