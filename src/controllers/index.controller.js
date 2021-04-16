const indexControlador = {};

indexControlador.renderIndex = (req,res) => {
    res.render('index');
}

indexControlador.renderAbaut = (req,res) => {
    res.render('abaut');
}

module.exports = indexControlador;