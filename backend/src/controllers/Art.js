const db = require("../mysql");
const dbmodels = db.models
// const Op = db.Sequelize.Op;



//Create rows in table
exports.create = (req, res) => {
  const rowData = req.body;
  console.log(rowData, "-- rowdata")
  dbmodels.Art.create(rowData.inputs)
      .then((result) => {
      
      // -- creating painting/sculpture
      if(rowData.inputs.Type == 1 || rowData.inputs.Type == '1'){
        rowData.typeinputs.Art = result.id_Art
        console.log(rowData.typeinputs,"--tye")
            dbmodels.Painting_Art.create(rowData.typeinputs)
                .then((presult) => {
                res.status(200).json({
                  status: true,
                  message: "Art - painting created successfully",
                  data:{result,presult}
                });
            })
            .catch(err => {console.log(err)});
      }else if(rowData.inputs.Type ==2 || rowData.inputs.Type == '2'){
        rowData.typeinputs.ArtId = result.id_Art
          dbmodels.Sculpture_Art.create(rowData.typeinputs)
              .then((sresult) => {
              res.status(200).json({
                status: true,
                message: "Art - scuplture created successfully",
                data:{result,sresult}
              });
          })
          .catch(err => {console.log(err)});

      }else{
        console.log("Error getting art type")
      }

      // res.status(200).json({
      //   status: true,
      //   message: "Row created successfully",
      //   data:result
      // });
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

  dbmodels.Art.findAll({
    include: [
      {
        model: dbmodels.Art_Styles,
        as: "Style_Art_Style"
      },{
        model: dbmodels.ArtStatus,
        as: "Status_ArtStatus"
      },{
        model: dbmodels.Country,
        as: "CountryOfOrigin_Country"
      },{
        model: dbmodels.Artist,
        as: "CreatedBy_Artist"
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
    dbmodels.Art.findByPk(req.params.id, {
      include: [
        {
          model: dbmodels.Art_Styles,
          as: "Style_Art_Style"
        },{
          model: dbmodels.ArtStatus,
          as: "Status_ArtStatus"
        },{
          model: dbmodels.Country,
          as: "CountryOfOrigin_Country"
        },{
          model: dbmodels.Artist,
          as: "CreatedBy_Artist"
        },{
          model: dbmodels.Painting_Art,
          as: "Painting_Arts"
        },{
          model: dbmodels.Sculpture_Art,
          as: "Sculpture_Arts"
        },{
          model: dbmodels.Art_in_Auction,
          as: "Art_in_Auctions",
          include: [
            {
              model: dbmodels.Art_Show,
              as: "AtArtShow_Art_Show",
            }
          ]
        },
        {
          model: dbmodels.Art_In_Store,
          as: "Art_In_Stores",
          include: [
            {
              model: dbmodels.Store,
              as: "AtStore_Store",
            }
          ]
        },
        {
          model: dbmodels.Art_In_Museum,
          as: "Art_In_Museums",
          include: [
            {
              model: dbmodels.Museum,
              as: "Musem_Museum",
            }
          ]
        },
        {
          model: dbmodels.Art_in_Exhibition,
          as: "Art_in_Exhibitions",
          include: [
            {
              model: dbmodels.Art_Exhibition,
              as: "Exhibition_Art_Exhibition",
            }
          ]
        },
        {
          model: dbmodels.Customer_Art_Purchases,
          as: "Customer_Art_Purchases",
          include: [
            {
              model: dbmodels.Customer,
              as: "Customer_Customer",
            }
          ]
        },
        {
          model: dbmodels.Art_For_Rent,
          as: "Art_For_Rents",
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
      console.log(err)
      res.send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    });
};


// Update a Table
exports.update = (req, res) => {
  const id = req.params.id;
  dbmodels.Art.update(req.body,
    { where: { id_Art: id } }
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
  dbmodels.Art_For_Rent.destroy({ where: { Art: id } }).then( (res) => console.log(res))
  dbmodels.Art_in_Auction.destroy({ where: { Art: id } }).then( (res) => console.log(res))
  dbmodels.Art_In_Store.destroy({ where: { Art: id } }).then( (res) => console.log(res))
  dbmodels.Art_In_Museum.destroy({ where: { Art: id } }).then( (res) => console.log(res))
  dbmodels.Art_in_Exhibition.destroy({ where: { Art: id } }).then( (res) => console.log(res))
  dbmodels.Customer_Art_Purchases.destroy({ where: { Purchase_Ref_Id: id } }).then( (res) => console.log(res))
  dbmodels.Painting_Art.destroy({ where: { Art: id } }).then( (res) => console.log(res))
  dbmodels.Sculpture_Art.destroy({ where: { ArtId: id } }).then( (res) => console.log(res))

  dbmodels.Art.destroy({
    where: { id_Art: id },
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