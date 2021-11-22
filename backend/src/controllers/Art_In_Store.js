const db = require("../mysql");
const dbmodels = db.models
// const Op = db.Sequelize.Op;



//Create rows in table
exports.create = (req, res) => {
  const rowData = req.body;
  console.log(rowData)
  if(rowData.Status == null || rowData.Status == ''){
    
    rowData.Status=0
    console.log(rowData,"inside rowData")
  }
  
  dbmodels.Art_In_Store.create(rowData)
      .then((result) => {
        console.log(result,"result outside")
        dbmodels.Art.update({Status:1},
          { where: { id_Art: rowData.Art } }
        ).then((result) => {
           console.log(result,"result inside")
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

  dbmodels.Art_In_Store.findAll({})
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
    dbmodels.Art_In_Store.findByPk(req.params.id, {
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
  dbmodels.Art_In_Store.update(req.body,
    { where: { id_Art_In_Store: id } }
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
  dbmodels.Art_In_Store.destroy({
    where: { id_Art_In_Store: id },
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



exports.findCount = (req, res) => {

  console.log("in Where?")
  dbmodels.Art_In_Store.findAll({
      attributes: [
          "AtStore",
          [Sequelize.fn("COUNT", Sequelize.col("Art")),"ArtCount"]
      ],
      group: ["AtStore"]
      
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
exports.findArtInStore = (req, res) => {

  dbmodels.Art_In_Store.findAll({
      where:{ AtStore:req.params.id},
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
      ],
      
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

