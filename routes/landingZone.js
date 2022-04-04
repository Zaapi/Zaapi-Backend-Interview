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
