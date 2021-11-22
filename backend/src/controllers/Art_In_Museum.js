const db = require("../mysql");
const dbmodels = db.models
// const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');



//Create rows in table
exports.create = (req, res) => {
  const rowData = req.body;
  console.log(req.body)
  dbmodels.Art_In_Museum.create(rowData)
      .then((result) => {
        dbmodels.Art.update({Status:3},
          { where: { id_Art: rowData.Art } }
        ).then((result) => {
        res.status(200).json({
          status: true,
          message: "Row created successfully",
          data:result
        });
      })
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while adding data."
      });
    });
  };


  //Get all from Table
  exports.findCount = (req, res) => {

    dbmodels.Art_In_Museum.findAll({
        attributes: [
            "Musem",
            [Sequelize.fn("COUNT", Sequelize.col("Art")),"ArtCount"]
        ],
        group: ["Musem"]
        
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
  

//Get all from Table
exports.findAll = (req, res) => {

  dbmodels.Art_In_Museum.findAll({})
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
    dbmodels.Art_In_Museum.findByPk(req.params.id, {
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
  dbmodels.Art_In_Museum.update(req.body,
    { where: { id_Art_In_Museum: id } }
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
  dbmodels.Art_In_Museum.destroy({
    where: { id_Art_In_Museum: id },
  }).then((result) => {
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