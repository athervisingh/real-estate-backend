// seed360.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Define Schema and Model
const damac360Schema = new mongoose.Schema({
  name: String,
  links360: [String],
  image: String,
});

const DAMAC360 = mongoose.model("DAMAC360", damac360Schema);

// Connect to DB
await mongoose.connect(process.env.MONGO_URI);
console.log("✅ Connected to MongoDB");

// Sample 360 data with image field
const seedData = [
  {
    name: "RIVERSIDE VIEWS",
    links360: [
      "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=Riverside%20Views%20Marine%201BR%2001&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=Riverside%20Views%20Marine%201BR01&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=Riverside%20Views%20Indigo%201BR&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=Riverside%20Views%20Indigo%202BR&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=Riverside%20Views%20Azure%201BR&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=Riverside%20Views%20Azure%202BR%2001&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=Riverside%20Views%20Capri%201BR&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=Riverside%20Views%20Capri%202BR&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=Riverside%20Views%20Royal%201BR&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=Riverside%20Views%20Royal%202BR%2001&autoload=true",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746305375/real-estate/yctuxjkrehmbk1q8mkjg.jpg",
  },
  {
    name: "CANAL CROWN",
    links360: [
      "https://virtualtours.damaclabs.com/?m=dnt5Qr4kL1M&play=1/",
      "https://virtualtours.damaclabs.com/?m=VxWuBRTVT7X&play=1/",
      "https://virtualtours.damaclabs.com/?m=6sAQnYVFtqY&play=1/",
      "https://virtualtours.damaclabs.com/?m=ZP7BJBoKqTz&play=1/",
      "https://virtualtours.damaclabs.com/?m=siKeC6kMTmy&play=1/",
      "https://virtualtours.damaclabs.com/?m=AiFfcF3Cdtm&play=1/",
      "https://virtualtours.damaclabs.com/?m=7fGukwZYjdS&play=1/",
      "https://virtualtours.damaclabs.com/?m=aQaA6Uz3ewM&play=1/",
      "https://virtualtours.damaclabs.com/?m=PVdiCucsv7K&play=1/",
      "https://virtualtours.damaclabs.com/?m=Jb7gEqdaWD4&play=1/",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746455924/real-estate/q5vbum9dhiccaqy6yuis.webp",
  },
  {
    name: "COUTURE BY CAVALLI",
    links360: [
      "https://virtualtours.damaclabs.com/?m=1B3vQD4uCiC&play=1/",
      "https://virtualtours.damaclabs.com/?m=pDTGQnAdXkB&play=1/",
      "https://virtualtours.damaclabs.com/?m=FqKW3qak2wJ&play=1/",
      "https://virtualtours.damaclabs.com/?m=FpesNDPc466&play=1/",
      "https://virtualtours.damaclabs.com/?m=ikQjB3okZ3d&play=1/",
      "https://virtualtours.damaclabs.com/?m=3bU2FdMYqkA&play=1/",
      "https://virtualtours.damaclabs.com/?m=WRyHT4MiFY4&play=1/",
      "https://virtualtours.damaclabs.com/?m=2kr6iCMpKvR&play=1/",
      "https://virtualtours.damaclabs.com/?m=8m9LjSyzgqG&play=1/",
      "https://virtualtours.damaclabs.com/?m=qssNojzLVnJ&play=1/",
      "https://virtualtours.damaclabs.com/?m=aNS97DYzCsd&play=1/",
      "https://virtualtours.damaclabs.com/?m=ThhAEDzWGba&play=1/",
      "https://virtualtours.damaclabs.com/?m=CpaFeE4KsZd&play=1/",
      "https://virtualtours.damaclabs.com/?m=fwrZtqeoxwH&play=1/",
      "https://virtualtours.damaclabs.com/?m=nG6U2AyhQ7b&play=1/",
      "https://virtualtours.damaclabs.com/?m=bm5RtpyxCiz&play=1/",
      "https://virtualtours.damaclabs.com/?m=McoEVhU4jwT&play=1/",
      "https://virtualtours.damaclabs.com/?m=Y7X1ezC7sna&play=1/",
      "https://virtualtours.damaclabs.com/?m=uFr6jeDGXky&play=1/",
      "https://virtualtours.damaclabs.com/?m=G89iix8cMwy&play=1/",
      "https://virtualtours.damaclabs.com/?m=DFwbgif9LeD&play=1/",
      "https://virtualtours.damaclabs.com/?m=zm3T7wZVWAQ&play=1/",
      "https://virtualtours.damaclabs.com/?m=4qfWcQu9tUz&play=1/",
      "https://virtualtours.damaclabs.com/?m=vx33i64SiJ2&play=1/",
      "https://virtualtours.damaclabs.com/?m=JvomUtaLTQK&play=1/",
      "https://virtualtours.damaclabs.com/?m=TJkp3NNgdt5&play=1/",
      "https://virtualtours.damaclabs.com/?m=TJkp3NNgdt5&play=1/",
      "https://virtualtours.damaclabs.com/?m=huAq1pqmDcG&play=1/",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746456133/real-estate/mhk1957vskvskocv9zzz.webp",
  },
  {
    name: "UTOPIA",
    links360: [
      "https://pixelstreaming.damaclabs.com/embed.html?cid=iRdFhLmW08hOntxWqG2jI5PMSPH2&proid=Damac%20Utopia&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=iRdFhLmW08hOntxWqG2jI5PMSPH2&proid=Damac%20Utopia%2075&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=iRdFhLmW08hOntxWqG2jI5PMSPH2&proid=Damac%20Hills&autoload=true",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746456255/real-estate/qqadccmc8qeq8qivspp7.webp",
  },
  {
    name: "VIOLET 4",
    links360: [
      "https://pixelstreaming.damaclabs.com/embed?cid=iRdFhLmW08hOntxWqG2jI5PMSPH2&proid=Damac%20Hills%20Violet&autoload=true",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746456492/real-estate/lmlocptccimdgxkorsfl.jpg",
  },
  {
    name: "DAMAC ISLANDS",
    links360: [
      "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=DAMAC%20Islands&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=iRdFhLmW08hOntxWqG2jI5PMSPH2&proid=DAMAC%20Islands%20V3&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=iRdFhLmW08hOntxWqG2jI5PMSPH2&proid=DAMAC%20Islands%20DITH%20M&autoload=true",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=iRdFhLmW08hOntxWqG2jI5PMSPH2&proid=DAMAC%20Islands%20DITH&autoload=true",
      "https: //pixelstreaming.damaclabs.com/embed.html?cid=iRdFhLmW08hOntxWqG2jI5PMSPH2&proid=Damac%20Islands%20Amenities%20Tour&autoload=true",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746456710/real-estate/twl9gckanf4dbujem7ar.jpg",
  },
  {
    name: "DAMAC BAY BY CAVALLI",
    links360: [
      "https://virtualtours.damaclabs.com/?m=Rsq1JybLdvx&play=1/",
      "https://virtualtours.damaclabs.com/?m=PN8QpzUwuXH&play=1/",
      "https://virtualtours.damaclabs.com/?m=LZWETskq8YP&play=1/",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746456825/real-estate/aqdktzfvertdi1olbzpm.webp",
  },
  {
    name: "DAMAC BAY 2 BY CAVALLI",
    links360: [
      "https://virtualtours.damaclabs.com/?m=3PHwGwSz3XU&play=1/",
      "https://virtualtours.damaclabs.com/?m=M94wPkLYP7t&play=1/",
      "https://virtualtours.damaclabs.com/?m=2bB8xCcqxfu&play=1/",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746456933/real-estate/ckbcwufgmy3gzhr1dkxa.webp",
  },
  {
    name: "VOLTA",
    links360: [
      "https://virtualtours.damaclabs.com/?m=HxYU2wx1FKZ&play=1/",
      "https://virtualtours.damaclabs.com/?m=gvFR5RLajtH&play=1/",
      "https://virtualtours.damaclabs.com/?m=Nz2PLvEd9sZ&play=1/",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746457053/real-estate/cwsu9jnyv6npwtpocaru.jpg",
  },
  {
    name: "GOLF GREENS",
    links360: [
      "https://virtualtours.damaclabs.com/?m=AeHFhDuzksM&play=1/",
      "https://virtualtours.damaclabs.com/?m=bF1LeQQVwuA&play=1/",
      "https://virtualtours.damaclabs.com/?m=cGCC6yBXRUo&play=1/",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746457225/real-estate/q8rnsxyufliuiodisevv.webp",
  },
  {
    name: "GOLF GREENS 2",
    links360: [
      "https://virtualtours.damaclabs.com/?m=1KAevR1yXyJ&play=1/",
      "https://virtualtours.damaclabs.com/?m=daV93zahwqy&play=1/",
      "https://virtualtours.damaclabs.com/?m=HzXBCgUxTKG&play=1/",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746457225/real-estate/q8rnsxyufliuiodisevv.webp",
  },
  {
    name: "CANAL HEIGHTS",
    links360: [
      "https://virtualtours.damaclabs.com/?m=sqDD4eU9Vea&play=1/",
      "https://virtualtours.damaclabs.com/?m=Sn8yHZdLPak&play=1/",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746457338/real-estate/gorhydmyvptp94zaoing.webp",
  },
  {
    name: "ELO",
    links360: [
      "https://virtualtours.damaclabs.com/?m=8wgR4EeZLfm&play=1/",
      "https://virtualtours.damaclabs.com/?m=Nnitc2xzG6g&play=1/",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746457443/real-estate/hmcsj5a8fshu8ggiavrz.jpg",
  },
  {
    name: "ALTITUDE DE GRISOGONO",
    links360: [
      "https://virtualtours.damaclabs.com/?m=SWe2JYf9wT2&play=1/",
      "https://virtualtours.damaclabs.com/?m=6VTASpyG5EF&play=1/",
      "https://pixelstreaming.damaclabs.com/embed.html?cid=iRdFhLmW08hOntxWqG2jI5PMSPH2&proid=Altitude%202BR%20D1&autoload=true",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746457527/real-estate/s7vcqslprzmjicgpjmr7.jpg",
  },
  {
    name: "SAFA ONE DE GRISOGONO",
    links360: [
        "https://virtualtours.damaclabs.com/?m=Enoc6wfuBwP&play=1/",
        "https://virtualtours.damaclabs.com/?m=nP4FpEyzGdc&play=1/",
        "https://virtualtours.damaclabs.com/?m=kZTQP76fnA8&play=1/",
        "https://virtualtours.damaclabs.com/?m=2nSpRmAdHWN&play=1/",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746457703/real-estate/saddxxej8jows2ccihyt.jpg",
  },
  {
    name: "SAFA GATE",
    links360: [
        "https://virtualtours.damaclabs.com?m=ntZdM8Cii6P&play=1/",
        "https://virtualtours.damaclabs.com?m=vBmm3JW6nv2&play=1/",
        "https://virtualtours.damaclabs.com?m=NCi6bVjABLb&play=1/",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746457940/real-estate/dvyuaj4zdgazriydit6r.jpg",
  },
  {
    name: "LAGOON VIEWS",
    links360: [
        "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=Lagoon%20Views%2013%201BR%2002&autoload=true",
        "https://pixelstreaming.damaclabs.com/embed.html?cid=QTmTsiIxJsXleB1su6aS0cEs3LE2&proid=Lagoon%20Views%2013%202BR%2002&autoload=true",
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746560348/real-estate/jdipun5w9zekncc4fqot.png",
  },
  {
    name: "CHELSEA RESIDENCES",
    links360: [
        "https://virtualtours.damaclabs.com/?m=4jVFSSGMwC4&play=1/",
        "https://virtualtours.damaclabs.com/?m=G1dLtPG2aiy&play=1/",
        "https://virtualtours.damaclabs.com/?m=XUYFLtwJERb&play=1/"
    ],
    image:
      "https://res.cloudinary.com/dlp6dpcqt/image/upload/v1746560237/real-estate/ppdjjnqow6gjy9m2pgpv.png",
  }
];

// Insert into MongoDB
await DAMAC360.insertMany(seedData);
console.log("✅ DAMAC360 collection seeded with image field");

// Disconnect
await mongoose.disconnect();
