const db = require("../mysql");
const dbmodels = db.models
// const Op = db.Sequelize.Op;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



//Create rows in table
exports.create = (req, res) => {
  const rowData = req.body;

  dbmodels.Art_in_Exhibition.create(rowData)
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

  dbmodels.Art_in_Exhibition.findAll({
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
exports.findArtinExhibit = (req, res) => {

  dbmodels.Art_in_Exhibition.findAll({
    where:{
      Exhibition: req.params.id
    },
    include: [
      {
        model: dbmodels.Art,
        as: "Art_Art",
        include: [
          {
            model: dbmodels.Art_Styles,
            as: "Style_Art_Style"
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





  //Get all from Table
  exports.findArtCountExhibit = (req, res) => {

    const museumId = req.params.id
    dbmodels.Art_in_Exhibition.findAll({
            attributes: [
              "Exhibition",
              [Sequelize.fn("COUNT", Sequelize.col("Art")),"ArtCount"]
          ],
          group: ["Exhibition"]
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
    dbmodels.Art_in_Exhibition.findByPk(req.params.id, {
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
  dbmodels.Art_in_Exhibition.update(req.body,
    { where: { id_Art_in_Exhibition: id } }
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



// Manage art in exhibtion
exports.manageArt = (req, res) => {
  const id = req.params.id;
  const values = req.body
  console.log(id, values, "-here")
  var addList=[]
  var delList=[]

  var deletearray = req.body.deletearray
  var add
  if(req.body.addarray.length >0){
    req.body.addarray.forEach(element => {
      var obj = {
        Exhibition:id,
        Art:parseInt(element)
      }
      addList.push(obj)
    });

    dbmodels.Art_in_Exhibition.bulkCreate(addList,{})
    .then((res) =>{
        console.log(res,'-- adding result')
    })
    .catch(err => { console.log(err)});
  }

  if(req.body.deletearray.length >0){
    req.body.deletearray.forEach(element => {
      delList.push(parseInt(element))
    });
    console.log(delList)

      dbmodels.Art_in_Exhibition.destroy({
          where:{
            Exhibition: id,
            Art:{
              [Op.in]: req.body.deletearray,
            }
          }
      }).then((res) =>{
        console.log(res,'-- deleting result')
      })
      .catch(err => { console.log(err)});
      res.status(200).json({
        status: true,
        message: "Art in exhibitons updated",
      });
  }

};


// Delete a Artist by Id
exports.delete = (req, res) => {
  const id = req.params.id;
  dbmodels.Art_in_Exhibition.destroy({
    where: { id_Art_in_Exhibition: id },
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