require('dotenv').config();

const mysql = require("mysql");
const express = require('express')
const cors = require("cors")
const path = require("path")


const ArtistRouter = require("./routers/Artist");
const AddressRouter = require("./routers/Address");
const ArtRouter = require("./routers/Art");
const Art_bidsRouter = require("./routers/Art_bids");
const Art_ExhibitionRouter = require("./routers/Art_Exhibition");
const Art_For_RentRouter = require("./routers/Art_For_Rent");
const Art_in_AuctionRouter = require("./routers/Art_in_Auction");
const Art_in_ExhibitionRouter = require("./routers/Art_in_Exhibition");
const Art_In_StoreRouter = require("./routers/Art_In_Store");
const Art_ShowRouter = require("./routers/Art_Show");
const Art_StatusRouter = require("./routers/Art_Status");
const Art_SuppliesRouter = require("./routers/Art_Supplies");
const Artist_PurchasesRouter = require("./routers/Artist_Purchases");
const CustomerRouter = require("./routers/Customer");
const Customer_PurchasesRouter = require("./routers/Customer_Purchases");
const Exhibition_TicketsRouter = require("./routers/Exhibition_Tickets");
const InStore_Art_StatusRouter = require("./routers/InStore_Art_Status");
const MuseumRouter = require("./routers/Museum");
const OrderRouter = require("./routers/Order");
const Painting_ArtRouter = require("./routers/Painting_Art");
const Payment_StatusRouter = require("./routers/Payment_Status");
const Premium_CustomerRouter = require("./routers/Premium_Customer");
const Purchase_TypesRouter = require("./routers/Purchase_Types");
const Sculpture_ArtRouter = require("./routers/Sculpture_Art");
const StateRouter = require("./routers/State");
const StoreRouter = require("./routers/Store");
const ZipcodeRouter = require("./routers/ZipCode_in_States");
const ArtStyleRouter = require("./routers/Art_Styles")
const CountryRouter = require("./routers/Country")
const ImageRouter = require("./routers/images");
const Art_In_MuseumRouter = require("./routers/Art_In_Museum")



const app = express()
const port = process.env.PORT || 5000
app.set('port', port);

// For parsing application/json
app.use(express.json());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:["http://localhost:3000"]
}));

console.log(__dirname)
// const direc = path.join(__dirname, 'public')

app.use(express.static(path.join(__dirname, '/public')))
  
app.use(ArtistRouter);
app.use(ArtStyleRouter);
app.use(CountryRouter);
app.use(ImageRouter);
app.use(StateRouter)
app.use(ZipcodeRouter)
app.use(ArtRouter)
app.use(Art_StatusRouter)
app.use(Art_ShowRouter)
app.use(InStore_Art_StatusRouter)
app.use(StoreRouter)
app.use(Art_ShowRouter)
app.use(MuseumRouter)
app.use(Art_In_StoreRouter)
app.use(Art_in_AuctionRouter)
app.use(Art_in_ExhibitionRouter)
app.use(Art_ExhibitionRouter)
app.use(Art_In_MuseumRouter)
app.use(CustomerRouter)
app.use(Art_bidsRouter)



app.listen(port,()=>{
    console.log('server is up on port '+ port)
})