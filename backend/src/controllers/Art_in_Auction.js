const db = require("../mysql");
const dbmodels = db.models
// const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');



//Create rows in table
exports.create = (req, res) => {
  const rowData = req.body;

  dbmodels.Art_in_Auction.create(rowData)
      .then((result) => {
        dbmodels.Art.update({Status:2},
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
exports.findAll = (req, res) => {

  dbmodels.Art_in_Auction.findAll({})
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
exports.findCount = (req, res) => {

  console.log("in WHere?")
  dbmodels.Art_in_Auction.findAll({
      attributes: [
          "AtArtShow",
          [Sequelize.fn("COUNT", Sequelize.col("Art")),"ArtCount"]
      ],
      group: ["AtArtShow"]
      
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



//Get arts from artshow from Table
exports.findArtInShow = (req, res) => {

  dbmodels.Art_in_Auction.findAll({
      where:{ AtArtShow:req.params.id},
      include: [
        {
          model: dbmodels.Art,
          as: "Art_Art",
          include: [
            {
              model: dbmodels.Art_Styles,
              as: "Style_Art_Style"
            },{
              model: dbmodels.ArtStatus,
              as: "Status_ArtStatus"
            },{
              model: dbmodels.Artist,
              as: "CreatedBy_Artist"
            }
          ]
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
    dbmodels.Art_in_Auction.findByPk(req.params.id, {
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
  dbmodels.Art_in_Auction.update(req.body,
    { where: { id_Art_Auction: id } }
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
  dbmodels.Art_in_Auction.destroy({
    where: { id_Art_Auction: id },
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