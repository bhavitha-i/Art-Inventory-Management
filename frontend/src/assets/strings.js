const Strings ={
common:{
    artInventoryManagement: 'Art Inventory Management',
    art: 'Art',
    artist: 'Artist',
    settings: 'Settings'
},
ArtStyles:{
    id:"ArtStyleId",
    name:"Name",
    desc: "Description"
},
Artist: {
    id: "ArtistId",
    name: "Name",
    dob: "Date of Birth",
    placebirth: "Place of Birth",
    phone: "Phone",
    style:"Famous Style",
    website:"Website",

},
Country: {
    id: "CountryId",
    name: "Country Name"
},
State: {
    id: "StateId",
    name: "State Name",
    country: "Country"
},
City: {
    zipcode: "Zip Code",
    name: "City Name",
    state: "State"
},
Art: {
    art: "Art",
    id: "ArtId",
    description: "Description",
    year: "Year",
    country: "Country of origin",
    created: "Created By",
    style: "Style",
    status: "Status",
    title: "Title",
    image: "Image",
    type: "Art Type",
    painting:"Painting",
    sculpture: "Sculpture",
    pStyle: "Painting Style",
    pdrawnOn: "Drawn On",
    plength: "Length",
    pwidth: "Width",
    sheight :"Height",
    sweight: "Weight",
    smaterial: "Material",
    stexture: "Texture/Type"
},
ArtShow:{
    artshow:"Art Show",
    host:"Host",
    location: "Location",
    phone:"Phone",
    title:"Title",
    id:"Id Art Show",
    url: "Website",
    artCount: "Art available",
    price: "Price",
    startbid: "Starting bid value",
    chooseshow: "Choose a show",
    bidValue: "Customer Bid value",
    customer: "Customer",
    bid: "Bid Value",
    higgestedbid: "Highest Bid",
    highbidby: "Highest Bid by"

},
ArtStore:{
    store: "Art Store",
    price: "Price",
    rent: "Rent per day",
    status: "Status",
    art: "Art",
    choosestore:"Choose a store"

},
Museum:{
    choosemusem:"Choose a Museum",
    chooseExhibit: "Choose an exhibit",
    name: "Name",
    found: "Founded by",
    location: "Location",
    artCount: "Art Available",
    exhibitcount: "Number of Exhibitions"

}

}

export default Strings
