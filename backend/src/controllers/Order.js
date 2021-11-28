const db = require("../mysql");
const dbmodels = db.models
// const Op = db.Sequelize.Op;



//Create rows in table
exports.create = (req, res) => {
  const rowData = req.body;

  dbmodels.Order.create(rowData)
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

//Get all from Table
exports.findAll = (req, res) => {

  dbmodels.Order.findAll({
    include:[
      {
        model:dbmodels.Customer,
        as:"Customer_Customer"
      },
      {
        model: dbmodels.Payment_Status,
        as:"PaymentStatus_Payment_Status"
      }
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
  };


// Find a Table by Id
exports.findByPk = (req, res) => {
    dbmodels.Order.findByPk(req.params.id, {
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
  dbmodels.Order.update(req.body,
    { where: { id_Order: id } }
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
  dbmodels.Order.destroy({
    where: { id_Order: id },
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



exports.buy = (req, res) => {

  console.log("inside order")
  console.log(req.body)
  const id = req.params.id;
  dbmodels.Art.update({ Status: 4 },
    { where: { id_Art: id } }
  ).then((result) => {
    console.log(result, "updated art status --buy")
  })

  console.log(req.body.Customer, "---------")
  rowData = {
    "Customer": req.body.Customer,
    "Value": req.body.price,
    "PaymentStatus": 0,
    "Date": Date.now()
  }

  dbmodels.Order.create(rowData)
    .then((result) => {
      



      console.log( result,"Order result created --buy")
      var newDataRow = {
        "Customer": req.body.Customer,
        "Order": result.id_Order,
        "Type": 1,
        "Price": req.body.price,
        "Purchase_Ref_Id": id

      }
       console.log(newDataRow,"--buy new data for custoemr purchases")
 

      dbmodels.Customer_Art_Purchases.create(newDataRow)
        .then((result) => {
          console.log(result,"customer art purhcases --buy")
          res.status(200).json({
            status: true,
            message: "Row created successfully",
            data: result
          });
        })
        .catch(err => {
          console.log(err,"Error art purhcases --buy")
          res.send({
            message:
              err.message || "Some error occurred while adding data."
          });
        });

    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while adding data."
      });
    });

}