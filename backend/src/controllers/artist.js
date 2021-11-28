const db = require("../mysql");
const dbmodels = db.models
// const Op = db.Sequelize.Op;


//Create Artists
exports.create = (req, res) => {
  const Artist = req.body;

  dbmodels.Artist.create(Artist)
      .then((artist) => {
      res.status(200).json({
        status: true,
        message: "Artist created successfully",
        data:artist
      });
    })
    .catch(err => {
      console.log(err)
      res.send({
        message:
          err.message || "Some error occurred while creaitng row."
      });
    });
  };




//Get all Artists
exports.findAll = (req, res) => {

  dbmodels.Artist.findAll({
        include: [
            {
              model: dbmodels.Art_Styles,
              as: "FamousStyle_Art_Style"
            },{
              model: dbmodels.Country,
              as: "BirthPlace_Country"
            }
          ]
    })
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.send({
          message:
            err.message || "Some error occurred while retrieving Artists."
        });
      });
  };


// Find a Artist by Id
exports.findByPk = (req, res) => {
    dbmodels.Artist.findByPk(req.params.id, {
      include: [
          {
            model: dbmodels.Art_Styles,
            as: "FamousStyle_Art_Style"
          },{
            model: dbmodels.Country,
            as: "BirthPlace_Country"
          },{
            model: dbmodels.Art,
            as:"Arts"
          },{
            model: dbmodels.Artist_Purchases,
            as:"Artist_Purchases",
            include:[{
              model:dbmodels.Art_Supplies,
              as:"ArtSupplies_Art_Supply"}
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
          err.message || "Some error occurred while retrieving Artist."
      });
    });
};


// Update a Artist
exports.update = (req, res) => {
  const id = req.params.id;
  // const Artist = req.body
  dbmodels.Artist.update(req.body,
    { where: { id_Artist: id } }
  ).
  then(() => {
    res.status(200).json({
        status: true,
        message: "Artist updated successfully with id = " + id,
        data:result
    });
  })
  .catch(err => {
    res.send({
      message:
        err.message || "Some error occurred while retrieving Artist."
    });
  });
};



// Delete a Artist by Id
exports.delete = (req, res) => {
  const id = req.params.id;
  dbmodels.Artist.destroy({
    where: { id_Artist: id },
  }).then((result) => {
    res.status(200).json({
        status: true,
        message: "Artist deleted successfully with id = " + id,
        data:result
    });
  })
  .catch(err => {
    res.send({
      message:
        err.message || "Some error occurred while deleting Artist."
    });
  });
};