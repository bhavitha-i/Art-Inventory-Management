const db = require("../mysql");
const dbmodels = db.models
// const Op = db.Sequelize.Op;



//Create Artists
exports.create = (req, res) => {
  const ArtStyle = req.body;

  dbmodels.Art_Styles.create(ArtStyle)
      .then((style) => {
      res.status(200).json({
        status: true,
        message: "Art Style created successfully",
        data:style
      });
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while retrieving Data."
      });
    });
  };

//Get all Artists
exports.findAll = (req, res) => {

  dbmodels.Art_Styles.findAll({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send({
          message:
            err.message || "Some error occurred while retrieving ."
        });
      });
  };


// Find a Artist by Id
exports.findByPk = (req, res) => {
    dbmodels.Art_Styles.findByPk(req.params.id, {
    })
      .then((style) => {
      res.status(200).json({
        status: true,
        data: style,
      });
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    });
};


// Update a Artist
exports.update = (req, res) => {
  const id = req.params.id;
  // const Artist = req.body
  dbmodels.Art_Styles.update(req.body,
    { where: { id_Art_Styles: id } }
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
  dbmodels.Art_Styles.destroy({
    where: { id_Art_Styles: id },
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