exports.insert = () => {
return `INSERT INTO Card 
(card_type, card_number , expiration_month,
expiration_year, cvv, card_funds, name )
VALUES 
(?, ?, ?, ?, ?, ?, ?); 
`
}

exports.selectAll = () => {
    return `SELECT 
id, card_type, card_number,
expiration_month, expiration_year, 
cvv, card_funds, name 
FROM Card 
ORDER BY id DESC
;`
}

exports.selectSingle = () => {
    return `SELECT 
id, card_type, card_number,
expiration_month, expiration_year, 
cvv, card_funds, name 
FROM Card 
WHERE id = ?
;`
}

exports.updateFunds = () => {
    return `UPDATE Card 
SET card_funds = ?
WHERE id = ?
;`
}

exports.delete = () => {
    return `DELETE
FROM Card 
WHERE id = ?
;`
}
