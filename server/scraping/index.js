const axios = require("axios");
const cheerio = require("cheerio");

// funcion auto ejecutada

const url = (async () => {
  const response = await axios.get(`https://www.nytimes.com/section/world`);
  // la pagina libreia
  console.log(Object.keys(response));
  const $ = cheerio.load(response.data);
  const info = $(".ekkqrpp3");
  console.log(info[1].attribs);
  for (let i = 0; i < info.length; i++) {
    let p = {};

    console.log(info[i].attribs.firstChild);
    // p.nombre = productos[i].attribs["data-product-name"];
    // p.price = productos[i].attribs["data-price"];
    // p.marca = productos[i].attribs["data-product-brand"];

    // // console.log(
    //   $(productos[i])
    //     .children()
    //     .first()
    //     .children()[3]
    // );
  }
})();
