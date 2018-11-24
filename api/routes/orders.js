const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'order was fetched'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    // 201 to say that order was created and everything went ok
    res.status(201).json({
        message: 'Order was created',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'order details',
        id: req.params.orderId
    });
});

router.patch('/:orderId', (req, res, next) => {
        res.status(200).json({
        message: 'updated order',
        id: req.params.orderId
    })
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'deleted order',
        id: req.params.orderId
    })
});

module.exports = router;