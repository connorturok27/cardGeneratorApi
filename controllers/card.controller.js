const Card = require('../models/card.model');

const creditCard = require('../utils/creditCard');
const db = require('../utils/database');
const RESPONSES = require('../constants/responses');

exports.postTransaction = async (req, res, next) => {
    try {
        const {number, total} = req.body;
        let card = await Card.fetchAll();
        card = JSON.parse(card).filter(c => c.card_number === number);

        if (!card) {
            return res.status(404).json(RESPONSES.CODE8('Card'));
        } else {
            const {id, card_funds} = card[0];

            const leftFunds = parseInt(card_funds) - total;
            if (leftFunds < 0) {
                return res.status(400).json(RESPONSES.CODE5)
            } else {
                await Card.updateFunds(leftFunds.toString(), parseInt(id))
                return res.status(200).json(RESPONSES.CODE1)
            }
        }

    } catch (e) {
        res.status(500).json(RESPONSES.CODE7);
    }
};

const parseCreditCards = (cards) => {
    return cards.map(card => {
        return {
            id: card.id,
            cardType: card.card_type,
            number: card.card_number,
            expirationMonth: card.expiration_month,
            expirationYear: card.expiration_year,
            cvv: card.cvv,
            name: card.name,
            cardFunds: parseInt(card.card_funds)
        }
    })
}

exports.postCreditCard = async (req, res, next) => {
    try {
        const {type} = req.query;

        const card = await creditCard.generateCreditCard(type);

        if (card) {

            const {
                cardType, number, expirationMonth,
                expirationYear, cvv, cardFunds, name
            } = card;

            let newCard = new Card(
                cardType, number, expirationMonth.toString(),
                expirationYear.toString(), cvv.toString(),
                cardFunds.toString(), name
            )

            await newCard.save();
            newCard.cardFunds = parseInt(newCard.cardFunds)

            const id = await db.getLastInsertId();
            newCard = {id, ...newCard};


            return res.status(200).json(
                newCard
            )
        } else {
            return res.status(400).json(
                RESPONSES.CODE2
            )
        }

    } catch (e) {
        res.status(500).json(RESPONSES.CODE7);
    }

};

exports.getAllCards = async (req, res, next) => {
    try {
        let cards = await Card.fetchAll();
        cards = JSON.parse(cards);
        cards = parseCreditCards(cards);
        return res.status(200).send(cards);
    } catch (e) {
        res.status(500).json(RESPONSES.CODE7);
    }
}

exports.getSingleCreditCard = async (req, res, next) => {
    try {
        const {cardId} = req.params;
        let card = await Card.fetchSingle(cardId);
        card = JSON.parse(card);
        card = parseCreditCards(card);
        return res.status(200).json(card[0]);
    } catch (e) {
        res.status(500).json(RESPONSES.CODE7);
    }
}

exports.updateCard = async (req, res, next) => {
    try {
        const {cardId} = req.params;
        const {cardFunds} = req.body;

        await Card.updateFunds(cardFunds.toString(), parseInt(cardId))

        let card = await Card.fetchSingle(cardId);
        card = parseCreditCards(JSON.parse(card));
        return res.status(200).json(card[0]);

    } catch (e) {
        res.status(500).json(RESPONSES.CODE7);
    }
}

exports.deleteCard = async (req, res, next) => {
    try {
        const {cardId} = req.params;
        await Card.delete(parseInt(cardId));
        return res.status(200).json(RESPONSES.CODE9)
    } catch (e) {
        res.status(500).json(RESPONSES.CODE7);
    }
}
