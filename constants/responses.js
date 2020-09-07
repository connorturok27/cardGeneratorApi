exports.CODE1 = {
    code: 1,
    result: 'Transaccion exitosa'
};

exports.CODE2 = {
    code: 2,
    result: 'Tarjeta Invalida'
};

exports.CODE3 = {
    code: 3,
    result: 'Tarjeta Expirada'
};

exports.CODE4 = {
    code: 4,
    result: 'Tarjeta No Soportada'
};

exports.CODE5 = {
    code: 5,
    result: 'Fondos Insuficientes'
};

exports.CODE6 = field =>  {
    return {
        code: 6,
        result: `${field} is required`
    }
}

exports.CODE7 = {
    code: 7,
    result: 'Internal Server Error'
};

exports.CODE8 = (item) => {
    return {
        code: 8,
        result: `${item} not found`
    }
}

