var DataTypes = require("sequelize").DataTypes;
var _Address = require("./Address");
var _Art = require("./Art");
var _ArtStatus = require("./ArtStatus");
var _Art_Exhibition = require("./Art_Exhibition");
var _Art_For_Rent = require("./Art_For_Rent");
var _Art_In_Store = require("./Art_In_Store");
var _Art_Show = require("./Art_Show");
var _Art_Styles = require("./Art_Styles");
var _Art_Supplies = require("./Art_Supplies");
var _Art_bids = require("./Art_bids");
var _Art_in_Auction = require("./Art_in_Auction");
var _Art_in_Exhibition = require("./Art_in_Exhibition");
var _Artist = require("./Artist");
var _Artist_Purchases = require("./Artist_Purchases");
var _Country = require("./Country");
var _Customer = require("./Customer");
var _Exhibition_Tickets = require("./Exhibition_Tickets");
var _InStore_Art_Status = require("./InStore_Art_Status");
var _Museum = require("./Museum");
var _Order = require("./Order");
var _Painting_Art = require("./Painting_Art");
var _Payment_Status = require("./Payment_Status");
var _Premium_Customer = require("./Premium_Customer");
var _Purchase_Types = require("./Purchase_Types");
var _Sculpture_Art = require("./Sculpture_Art");
var _State = require("./State");
var _Store = require("./Store");
var _Art_In_Museum = require("./Art_In_Museum");
var _ZipCode_in_States = require("./ZipCode_in_States");
var _Art_In_Museum = require("./Art_In_Museum");
var _Customer_Art_Purchases = require("./Customer_Art_Purchases");


function initModels(sequelize) {
  var Address = _Address(sequelize, DataTypes);
  var Art = _Art(sequelize, DataTypes);
  var ArtStatus = _ArtStatus(sequelize, DataTypes);
  var Art_Exhibition = _Art_Exhibition(sequelize, DataTypes);
  var Art_For_Rent = _Art_For_Rent(sequelize, DataTypes);
  var Art_In_Store = _Art_In_Store(sequelize, DataTypes);
  var Art_Show = _Art_Show(sequelize, DataTypes);
  var Art_Styles = _Art_Styles(sequelize, DataTypes);
  var Art_Supplies = _Art_Supplies(sequelize, DataTypes);
  var Art_bids = _Art_bids(sequelize, DataTypes);
  var Art_in_Auction = _Art_in_Auction(sequelize, DataTypes);
  var Art_In_Museum = _Art_In_Museum(sequelize, DataTypes);
  var Art_in_Exhibition = _Art_in_Exhibition(sequelize, DataTypes);
  var Artist = _Artist(sequelize, DataTypes);
  var Artist_Purchases = _Artist_Purchases(sequelize, DataTypes);
  var Country = _Country(sequelize, DataTypes);
  var Customer = _Customer(sequelize, DataTypes);
  var Exhibition_Tickets = _Exhibition_Tickets(sequelize, DataTypes);
  var InStore_Art_Status = _InStore_Art_Status(sequelize, DataTypes);
  var Museum = _Museum(sequelize, DataTypes);
  var Order = _Order(sequelize, DataTypes);
  var Painting_Art = _Painting_Art(sequelize, DataTypes);
  var Payment_Status = _Payment_Status(sequelize, DataTypes);
  var Premium_Customer = _Premium_Customer(sequelize, DataTypes);
  var Purchase_Types = _Purchase_Types(sequelize, DataTypes);
  var Sculpture_Art = _Sculpture_Art(sequelize, DataTypes);
  var State = _State(sequelize, DataTypes);
  var Store = _Store(sequelize, DataTypes);
  var ZipCode_in_States = _ZipCode_in_States(sequelize, DataTypes);
  var Art_In_Museum = _Art_In_Museum(sequelize, DataTypes);
  var Customer_Art_Purchases = _Customer_Art_Purchases(sequelize, DataTypes);


  Art_Show.belongsTo(Address, { as: "Location_Address", foreignKey: "Location"});
  Address.hasMany(Art_Show, { as: "Art_Shows", foreignKey: "Location"});
  Customer.belongsTo(Address, { as: "Address_Address", foreignKey: "Address"});
  Address.hasMany(Customer, { as: "Customers", foreignKey: "Address"});
  Museum.belongsTo(Address, { as: "Location_Address", foreignKey: "Location"});
  Address.hasMany(Museum, { as: "Museums", foreignKey: "Location"});
  Store.belongsTo(Address, { as: "Location_Address", foreignKey: "Location"});
  Address.hasMany(Store, { as: "Stores", foreignKey: "Location"});
  Art_For_Rent.belongsTo(Art, { as: "Art_Art", foreignKey: "Art"});
  Art.hasMany(Art_For_Rent, { as: "Art_For_Rents", foreignKey: "Art"});
  Art_In_Store.belongsTo(Art, { as: "Art_Art", foreignKey: "Art"});
  Art.hasMany(Art_In_Store, { as: "Art_In_Stores", foreignKey: "Art"});
  Art_bids.belongsTo(Art, { as: "Art_Art", foreignKey: "Art"});
  Art.hasMany(Art_bids, { as: "Art_bids", foreignKey: "Art"});
  Art_in_Auction.belongsTo(Art, { as: "Art_Art", foreignKey: "Art"});
  Art.hasMany(Art_in_Auction, { as: "Art_in_Auctions", foreignKey: "Art"});
  Art_in_Exhibition.belongsTo(Art, { as: "Art_Art", foreignKey: "Art"});
  Art.hasMany(Art_in_Exhibition, { as: "Art_in_Exhibitions", foreignKey: "Art"});
  Painting_Art.belongsTo(Art, { as: "Art_Art", foreignKey: "Art"});
  Art.hasMany(Painting_Art, { as: "Painting_Arts", foreignKey: "Art"});
  Sculpture_Art.belongsTo(Art, { as: "Art", foreignKey: "ArtId"});
  Art.hasMany(Sculpture_Art, { as: "Sculpture_Arts", foreignKey: "ArtId"});
  Art.belongsTo(ArtStatus, { as: "Status_ArtStatus", foreignKey: "Status"});
  ArtStatus.hasMany(Art, { as: "Arts", foreignKey: "Status"});
  Art_in_Exhibition.belongsTo(Art_Exhibition, { as: "Exhibition_Art_Exhibition", foreignKey: "Exhibition"});
  Art_Exhibition.hasMany(Art_in_Exhibition, { as: "Art_in_Exhibitions", foreignKey: "Exhibition"});
  Art_bids.belongsTo(Art_Show, { as: "ArtShow_Art_Show", foreignKey: "ArtShow"});
  Art_Show.hasMany(Art_bids, { as: "Art_bids", foreignKey: "ArtShow"});
  Art_in_Auction.belongsTo(Art_Show, { as: "AtArtShow_Art_Show", foreignKey: "AtArtShow"});
  Art_Show.hasMany(Art_in_Auction, { as: "Art_in_Auctions", foreignKey: "AtArtShow"});
  Art.belongsTo(Art_Styles, { as: "Style_Art_Style", foreignKey: "Style"});
  Art_Styles.hasMany(Art, { as: "Arts", foreignKey: "Style"});
  Artist.belongsTo(Art_Styles, { as: "FamousStyle_Art_Style", foreignKey: "FamousStyle"});
  Art_Styles.hasMany(Artist, { as: "Artists", foreignKey: "FamousStyle"});
  Artist_Purchases.belongsTo(Art_Supplies, { as: "ArtSupplies_Art_Supply", foreignKey: "ArtSupplies"});
  Art_Supplies.hasMany(Artist_Purchases, { as: "Artist_Purchases", foreignKey: "ArtSupplies"});
  Art.belongsTo(Artist, { as: "CreatedBy_Artist", foreignKey: "CreatedBy"});
  Artist.hasMany(Art, { as: "Arts", foreignKey: "CreatedBy"});
  Artist_Purchases.belongsTo(Artist, { as: "Artist_Artist", foreignKey: "Artist"});
  Artist.hasMany(Artist_Purchases, { as: "Artist_Purchases", foreignKey: "Artist"});
  Art.belongsTo(Country, { as: "CountryOfOrigin_Country", foreignKey: "CountryOfOrigin"});
  Country.hasMany(Art, { as: "Arts", foreignKey: "CountryOfOrigin"});
  Artist.belongsTo(Country, { as: "BirthPlace_Country", foreignKey: "BirthPlace"});
  Country.hasMany(Artist, { as: "Artists", foreignKey: "BirthPlace"});
  State.belongsTo(Country, { as: "Country", foreignKey: "Country_id"});
  Country.hasMany(State, { as: "States", foreignKey: "Country_id"});
  Art_For_Rent.belongsTo(Customer, { as: "Customer_Customer", foreignKey: "Customer"});
  Customer.hasMany(Art_For_Rent, { as: "Art_For_Rents", foreignKey: "Customer"});
  Art_bids.belongsTo(Customer, { as: "Customer_Customer", foreignKey: "Customer"});
  Customer.hasMany(Art_bids, { as: "Art_bids", foreignKey: "Customer"});
  Order.belongsTo(Customer, { as: "Customer_Customer", foreignKey: "Customer"});
  Customer.hasMany(Order, { as: "Orders", foreignKey: "Customer"});
  Premium_Customer.belongsTo(Customer, { as: "id_Customer_Customer", foreignKey: "id_Customer"});
  Customer.hasOne(Premium_Customer, { as: "Premium_Customer", foreignKey: "id_Customer"});
  Art_In_Store.belongsTo(InStore_Art_Status, { as: "Status_InStore_Art_Status", foreignKey: "Status"});
  InStore_Art_Status.hasMany(Art_In_Store, { as: "Art_In_Stores", foreignKey: "Status"});
  Art_Exhibition.belongsTo(Museum, { as: "Museum_Museum", foreignKey: "Museum"});
  Museum.hasMany(Art_Exhibition, { as: "Art_Exhibitions", foreignKey: "Museum"});
  Artist_Purchases.belongsTo(Order, { as: "Order_Order", foreignKey: "Order"});
  Order.hasMany(Artist_Purchases, { as: "Artist_Purchases", foreignKey: "Order"});
  Order.belongsTo(Payment_Status, { as: "PaymentStatus_Payment_Status", foreignKey: "PaymentStatus"});
  Payment_Status.hasMany(Order, { as: "Orders", foreignKey: "PaymentStatus"});
  ZipCode_in_States.belongsTo(State, { as: "State", foreignKey: "StateId"});
  State.hasMany(ZipCode_in_States, { as: "ZipCode_in_States", foreignKey: "StateId"});
  Art_For_Rent.belongsTo(Store, { as: "FromStore_Store", foreignKey: "FromStore"});
  Store.hasMany(Art_For_Rent, { as: "Art_For_Rents", foreignKey: "FromStore"});
  Art_In_Store.belongsTo(Store, { as: "AtStore_Store", foreignKey: "AtStore"});
  Store.hasMany(Art_In_Store, { as: "Art_In_Stores", foreignKey: "AtStore"});
  Art_Supplies.belongsTo(Store, { as: "AtStore_Store", foreignKey: "AtStore"});
  Store.hasMany(Art_Supplies, { as: "Art_Supplies", foreignKey: "AtStore"});
  Address.belongsTo(ZipCode_in_States, { as: "ZipCode_ZipCode_in_State", foreignKey: "ZipCode"});
  ZipCode_in_States.hasMany(Address, { as: "Addresses", foreignKey: "ZipCode"});
  Art_In_Museum.belongsTo(Art, { as: "Art_Art", foreignKey: "Art"});
  Art.hasMany(Art_In_Museum, { as: "Art_In_Museums", foreignKey: "Art"});
  Art_In_Museum.belongsTo(Museum, { as: "Musem_Museum", foreignKey: "Musem"});
  Museum.hasMany(Art_In_Museum, { as: "Art_In_Museums", foreignKey: "Musem"});
  Customer_Art_Purchases.belongsTo(Art, { as: "Purchase_Ref", foreignKey: "Purchase_Ref_Id"});
  Art.hasMany(Customer_Art_Purchases, { as: "Customer_Art_Purchases", foreignKey: "Purchase_Ref_Id"});
  Customer_Art_Purchases.belongsTo(Customer, { as: "Customer_Customer", foreignKey: "Customer"});
  Customer.hasMany(Customer_Art_Purchases, { as: "Customer_Art_Purchases", foreignKey: "Customer"});
  Customer_Art_Purchases.belongsTo(Order, { as: "Order_Order", foreignKey: "Order"});
  Order.hasMany(Customer_Art_Purchases, { as: "Customer_Art_Purchases", foreignKey: "Order"});
  Customer_Art_Purchases.belongsTo(Purchase_Types, { as: "Type_Purchase_Type", foreignKey: "Type"});
  Purchase_Types.hasMany(Customer_Art_Purchases, { as: "Customer_Art_Purchases", foreignKey: "Type"});
  Exhibition_Tickets.belongsTo(Art_Exhibition, { as: "Museum_Art_Exhibition", foreignKey: "Museum"});
  Art_Exhibition.hasMany(Exhibition_Tickets, { as: "Exhibition_Tickets", foreignKey: "Museum"});
  Exhibition_Tickets.belongsTo(Customer, { as: "Customer_Customer", foreignKey: "Customer"});
  Customer.hasMany(Exhibition_Tickets, { as: "Exhibition_Tickets", foreignKey: "Customer"});

  return {
    Address,
    Art,
    ArtStatus,
    Art_Exhibition,
    Art_For_Rent,
    Art_In_Store,
    Art_Show,
    Art_Styles,
    Art_Supplies,
    Art_bids,
    Art_in_Auction,
    Art_in_Exhibition,
    Artist,
    Artist_Purchases,
    Country,
    Customer,
    Exhibition_Tickets,
    InStore_Art_Status,
    Museum,
    Order,
    Painting_Art,
    Payment_Status,
    Premium_Customer,
    Purchase_Types,
    Sculpture_Art,
    State,
    Store,
    ZipCode_in_States,
    Art_In_Museum,
    Customer_Art_Purchases,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
