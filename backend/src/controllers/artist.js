const db = require("../mysql");
const dbmodels = db.models


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
      res.send({
        message:
          err.message || "Some error occurred while retrieving Artists."
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
      .then(data => {
        res.send(data);
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
          }
        ]
    })
      .then((artist) => {
      res.status(200).json({
        status: true,
        data: artist,
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
  }).then(() => {
    res.status(200).json({
        status: true,
        message: "Artist deleted successfully with id = " + id
    });
  })
  .catch(err => {
    res.send({
      message:
        err.message || "Some error occurred while deleting Artist."
    });
  });
};