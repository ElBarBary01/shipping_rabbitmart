import Shipping from '../../model/shipping.js';

export const getShipments = async (req,res) => {
    try {
        const records = await Shipping.find();
        res.status(200).json(records);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

export const postShipments = async (req, res) => {
    try {
        const details = req.body;
        console.log(details);
        const newShipment = new Shipping(details);
        await newShipment.save();
        res.status(200).json(newShipment);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

export const updateShippingStatus = async(req,res) => {
    try{
        const id = req.params.id;

        const shipment = await Shipping.findOne({order_id: id});

        let newStatus;
        switch(shipment.status){
            case 'CREATED':
                newStatus = 'SHIPPING';
                break;
            case 'SHIPPING':
                newStatus = Math.random() > .5? 'DELIVERED': 'RETURNED'
                break;
                default:
                    newStatus = 'CREATED'
        };

        await Shipping.findOneAndUpdate({order_id: id}, {status: newStatus});
        res.status(200).json(newStatus);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const shipment = await Shipping.findOne({order_id: id});
        res.status(200).json(shipment);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}