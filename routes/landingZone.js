const express = require("express");

const router = express.Router();

const isSubsetCheck = (arr1, arr2) => {
  let valid = [];
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr2[i] === arr1[j]) {
          valid.push(true);
      }
    }
  }
  if(valid.length === arr2.length){
    return true;
  }
  return false;
};

router.get("/", (req, res) => {
  const response = "DL32 needs to fly to 10 landing zones, but not sure which one has the correct cordinates <br/>, as the 2 NASA rovers which mapped the locations, 1 of them shared garbage cordinates and another malfunctioned in the middle.<br/> So now after talking to NASA they found out if the cordinates shared by second rover R2 and Rover R1 match, that landing zone is good to go."+
  "So for this we have an API where we pass Z1, Z2, Z3... Z10 as Zone names. <br/>"+
  "it returns Valid Zone, and Invalid Zone. <br/>"+
  "api Name : landingZone/{zoneName} <br/>"+
  "ex. if user pass Z1 as zone name, we would have 2 arrays R1 and R2, the API only checks if R2 contains all the cordinates of R1 <br/>"+
  "it returns true and false and also time taken to run the function. <br/>";
  
  res.send(response)
})

router.get("/:zone", (req, res) => {
  const isValid = [
    "Z1",
    "Z2",
    "Z3",
    "Z4",
    "Z5",
    "Z6",
    "Z7",
    "Z8",
    "Z9",
    "Z10",
  ].includes(req.params.zone);
  if (isValid) {
    let zone = require('../assets/' + req.params.zone + '.json');
    const selectedZone = zone.data;
    const response = []

    let start = performance.now();
    if (isSubsetCheck(selectedZone.R1, selectedZone.R2)) {
      const end = performance.now();
      response.push(`SubSet 2 : true ${end - start}`);
    } else {
      const end = performance.now();
      response.push(`SubSet 2 : false ${end - start}`);
    }
    res.status(200).send(`${response}`);
  } else {
    res.status(400).send({ error: "selected zone is not on the list" });
  }
});

module.exports = router;
