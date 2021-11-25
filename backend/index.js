require('dotenv').config();

const mysql = require("mysql");
const express = require('express')
const cors = require("cors")
const path = require("path")


const ArtistRouter = require("./src/routers/Artist");
const AddressRouter = require("./src/routers/Address");
const ArtRouter = require("./src/routers/Art");
const Art_bidsRouter = require("./src/routers/Art_bids");
const Art_ExhibitionRouter = require("./src/routers/Art_Exhibition");
const Art_For_RentRouter = require("./src/routers/Art_For_Rent");
const Art_in_AuctionRouter = require("./src/routers/Art_in_Auction");
const Art_in_ExhibitionRouter = require("./src/routers/Art_in_Exhibition");
const Art_In_StoreRouter = require("./src/routers/Art_In_Store");
const Art_ShowRouter = require("./src/routers/Art_Show");
const Art_StatusRouter = require("./src/routers/Art_Status");
const Art_SuppliesRouter = require("./src/routers/Art_Supplies");
const Artist_PurchasesRouter = require("./src/routers/Artist_Purchases");
const CustomerRouter = require("./src/routers/Customer");
const Customer_PurchasesRouter = require("./src/routers/Customer_Purchases");
const Exhibition_TicketsRouter = require("./src/routers/Exhibition_Tickets");
const MuseumRouter = require("./src/routers/Museum");
const OrderRouter = require("./src/routers/Order");
const Painting_ArtRouter = require("./src/routers/Painting_Art");
const Payment_StatusRouter = require("./src/routers/Payment_Status");
const Premium_CustomerRouter = require("./src/routers/Premium_Customer");
const Purchase_TypesRouter = require("./src/routers/Purchase_Types");
const Sculpture_ArtRouter = require("./src/routers/Sculpture_Art");
const StateRouter = require("./src/routers/State");
const StoreRouter = require("./src/routers/Store");
const ZipcodeRouter = require("./src/routers/ZipCode_in_States");
const ArtStyleRouter = require("./src/routers/Art_Styles")
const CountryRouter = require("./src/routers/Country")
const ImageRouter = require("./src/routers/Images");
const Art_In_MuseumRouter = require("./src/routers/Art_In_Museum")





const app = express()
const port = process.env.PORT || 5000
app.set('port', port);

// For parsing application/json
app.use(express.json());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(express.urlencoded({ extended: true }));

// app.use(cors())
app.use(cors({
    origin:["http://localhost:3000"]
}));

console.log(__dirname)


  
app.use(ArtistRouter);
app.use(ArtStyleRouter);
app.use(CountryRouter);
app.use(ImageRouter);
app.use(StateRouter)
app.use(ZipcodeRouter)
app.use(ArtRouter)
app.use(Art_StatusRouter)
app.use(Art_ShowRouter)
app.use(StoreRouter)
app.use(Art_ShowRouter)
app.use(MuseumRouter)
app.use(Art_In_StoreRouter)
app.use(Art_in_AuctionRouter)
app.use(Art_in_ExhibitionRouter)
app.use(Art_ExhibitionRouter)
app.use(Art_In_MuseumRouter)
app.use(CustomerRouter)
app.use(Customer_PurchasesRouter)
app.use(Art_bidsRouter)
app.use(Premium_CustomerRouter)
app.use(OrderRouter)
app.use(Painting_ArtRouter)
app.use(Sculpture_ArtRouter)
app.use(Exhibition_TicketsRouter)

app.use(Art_SuppliesRouter)
app.use(Artist_PurchasesRouter)
app.use(AddressRouter)


app.use("/uploadImages",express.static(path.join(__dirname, '/src/public/uploadImages')))

// app.use("/uploadImages",express.static(path.join(__dirname, '/public')))


// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });



app.listen(port,()=>{
    console.log('server is up on port '+ port)
})
