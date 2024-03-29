const db = require("../mysql");
const dbmodels = db.models
// const Op = db.Sequelize.Op;



//Create rows in table
exports.create = (req, res) => {
  const rowData = req.body;

  dbmodels.Customer.create(rowData)
    .then((result) => {
      res.status(200).json({
        status: true,
        message: "Row created successfully",
        data: result
      });
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while adding data."
      });
    });
};

//Get all from Table
exports.findAll = (req, res) => {

  dbmodels.Customer.findAll({})
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
  dbmodels.Customer.findByPk(req.params.id, {
    include: [
      {
        model: dbmodels.Customer_Art_Purchases,
        as: "Customer_Art_Purchases",
      include: [
        {
          model: dbmodels.Art,
          as: "Purchase_Ref"
        }
      ]
    },
    ]
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
  dbmodels.Customer.update(req.body,
    { where: { id_Customer: id } }
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



// Delete a Customer by Id
exports.delete = (req, res) => {
  const id = req.params.id;


  console.log("--")
  dbmodels.Premium_Customer.destroy({ where: { id_Customer: id } }).then((result) => {console.log(result)})

  dbmodels.Customer_Art_Purchases.destroy({
    where: { Customer: id }
  }).then((result) => {
      console.log(result)
  })


  dbmodels.Order.destroy({
    where: { Customer: id }
  }).then((result) => {
      console.log(result)
  })

  dbmodels.Exhibition_Tickets.destroy({
    where: { Customer: id }
  }).then((result) => {
      console.log(result)
  })


  dbmodels.Customer.destroy({
    where: { id_Customer: id },
  }).then((result) => {
    console.log(result,'---')
    res.status(200).json({
      status: true,
      message: "Deleted successfully with id = " + id
    });
  })
    .catch(err => {
      console.log(err,'---')
      res.send({
        message:
          err.message || "Some error occurred while deleting."
      });
    });
};