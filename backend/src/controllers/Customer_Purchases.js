const db = require("../mysql");
const dbmodels = db.models
// const Op = db.Sequelize.Op;



//Create rows in table
exports.create = (req, res) => {
  const rowData = req.body;

  dbmodels.Customer_Purchases.create(rowData)
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

  dbmodels.Customer_Purchases.findAll({})
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
  dbmodels.Customer_Purchases.findByPk(req.params.id, {
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
  dbmodels.Customer_Purchases.update(req.body,
    { where: { id_Customer_Purchases: id } }
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
  dbmodels.Customer_Purchases.destroy({
    where: { id_Customer_Purchases: id },
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

exports.order = (req, res) => {

  console.log("inside order")
  const id = req.params.id;
  dbmodels.Art.update({ Status: 4 },
    { where: { id_Art: id } }
  ).then((result) => {
    console.log(result, "updated art status")
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




      newDataRow = {
        "Customer": req.body.Customer,
        "Order": result.id_Order,
        "Type": 1,
        "Price": req.body.price,
        "Purchase_Ref_Id": 1

      }

      console.log(newDataRow, "helo----------------")

      dbmodels.Customer_Purchases.create(newDataRow)
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

    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while adding data."
      });
    });

}

exports.rent = (req, res) => {

  console.log("inside rent")
  const id = req.params.id;
  dbmodels.Art.update({ Status: 5 },
    { where: { id_Art: id } }
  ).then((result) => {
    console.log(result, "updated art status")
  })

  rowData = {
    "Customer": req.body.Customer,
    "Value": req.body.price,
    "PaymentStatus": 0,
    "Date": Date.now()
  }


  dbmodels.Order.create(rowData)
    .then((result) => {




      newDataRow = {
        "Customer": req.body.Customer,
        "Order": result.id_Order,
        "Type": 1,
        "Price": req.body.price,
        "Purchase_Ref_Id": id

      }

      console.log(newDataRow, "helo----------------")

      dbmodels.Customer_Purchases.create(newDataRow)
        .then((result) => {
          console.log("row added in customer purchases")
        })
        .catch(err => {
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



  const rentData = {
    "Art": id,
    "Customer": req.body.Customer,
    "FromStore": req.body.store,
    "StartDate": req.body.RentFrom,
    "EndDate": req.body.RentTo,
    "TotalRentValue": req.body.TotalRentValue
  }

  dbmodels.Art_For_Rent.create(rentData)
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

exports.closebid = (req, res) => {
  const id = req.params.id;
  dbmodels.Art.update({ Status: 6 },
    { where: { id_Art: id } }
  ).then((result) => {
    console.log(result, "updated art status")
  })


  rowData = {
    "Customer": req.body.Customer,
    "Value": req.body.price,
    "PaymentStatus": 0,
    "Date": Date.now()
  }


  dbmodels.Order.create(rowData)
    .then((result) => {




      newDataRow = {
        "Customer": req.body.Customer,
        "Order": result.id_Order,
        "Type": 1,
        "Price": req.body.price,
        "Purchase_Ref_Id": id

      }

      console.log(newDataRow, "helo----------------")

      dbmodels.Customer_Purchases.create(newDataRow)
        .then((result) => {
          console.log("row added in customer purchases")
        })
        .catch(err => {
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





};


