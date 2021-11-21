const db = require("../mysql");
const dbmodels = db.models
// const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');



//Create rows in table
exports.create = (req, res) => {
  const rowData = req.body;

  dbmodels.Art_bids.create(rowData)
      .then((result) => {
      res.status(200).json({
        status: true,
        message: "Row created successfully",
        data:result
      });
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while adding data."
      });
    });
  };


// Get bids on condition

exports.findsBids = (req, res) => {
  console.log(req.params, "--body")

    dbmodels.Art_bids.findAll({
      include: [
        {
          model: dbmodels.Customer,
          as: "Customer_Customer"
        }
      ],
      where:{ 
        Art: req.params.Art 
      },
      order:[
        ['BidValue', 'DESC'],
      ]
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    });
  
}


// Get bids on condition

exports.findHighBid = (req, res) => {
  console.log(req.params, "--body")

    dbmodels.Art_bids.findOne({
      include: [
        {
          model: dbmodels.Customer,
          as: "Customer_Customer"
        },{
          model: dbmodels.Art_Show,
          as: "ArtShow_Art_Show"
        }
      ],
      where:{ 
        Art: req.params.Art
      },
      order:[
        ['BidValue', 'DESC'],
      ]
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    });
  
}

//Get all from Table
exports.findAll = (req, res) => {

  dbmodels.Art_bids.findAll({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.send({
          message:
            err.message || "Some error occurred while retrieving ."
        });
      });
  };


// Find a Table by Id
exports.findByPk = (req, res) => {
    dbmodels.Art_bids.findByPk(req.params.id, {
    })
      .then((result) => {
      res.status(200).json({
        status: true,
        data: result,
      });
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    });
};


// Update a Table
exports.update = (req, res) => {
  const id = req.params.id;
  dbmodels.Art_bids.update(req.body,
    { where: { id_Art_Bids: id } }
  ).
  then(() => {
    res.status(200).json({
        status: true,
        message: "Updated successfully with id = " + id,
    });
  })
  .catch(err => {
    res.send({
      message:
        err.message || "Some error occurred while retrieving ."
    });
  });
};



// Delete a Artist by Id
exports.delete = (req, res) => {
  const id = req.params.id;
  dbmodels.Art_bids.destroy({
    where: { id_Art_Bids: id },
  }).then(() => {
    res.status(200).json({
        status: true,
        message: "Deleted successfully with id = " + id
    });
  })
  .catch(err => {
    res.send({
      message:
        err.message || "Some error occurred while deleting."
    });
  });
};