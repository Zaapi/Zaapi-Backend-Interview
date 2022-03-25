const express = require("express");
var seedrandom = require("seedrandom");

const router = express.Router();

const fillArray = (length, type) => {
  let finalArray = [];
  for (let i = 0; i <= length; i++) {
    finalArray[i] =
      type === "seed"
        ? Math.floor(seedrandom(i)() * 1000)
        : Math.floor(Math.random() * (1000000 - 100) + 100);
  }
  return finalArray;
};

const zoneCollection = {
  Z1: {
    R1: fillArray(100000, "seed"),
    R2: fillArray(80000),
  },
  Z2: {
    R1: fillArray(100000, "seed"),
    R2: fillArray(70000),
  },
  Z3: {
    R1: fillArray(100000, "seed"),
    R2: fillArray(90000),
  },
  Z4: {
    R1: fillArray(1000000, "seed"),
    R2: fillArray(80000, "seed"),
  },
  Z5: {
    R1: fillArray(100000, "seed"),
    R2: fillArray(50000),
  },
  Z6: {
    R1: fillArray(100000, "seed"),
    R2: fillArray(80000),
  },
  Z7: {
    R1: fillArray(1000000, "seed"),
    R2: fillArray(50000, "seed"),
  },
  Z8: {
    R1: fillArray(100000, "seed"),
    R2: fillArray(70000),
  },
  Z9: {
    R1: fillArray(1000000, "seed"),
    R2: fillArray(70000, "seed"),
  },
  Z10: {
    R1: fillArray(100000, "seed"),
    R2: fillArray(60000),
  },
};

const isSubSet = (arr1, arr2) => {
    let time = new Date().getTime()
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr2[i] === arr1[j]) {
        break;
      }
      if (j == arr1.length - 1) return false;
    }
    let newTime = new Date().getTime()
    console.log(newTime - time)
    return true;
  }
};

router.get("/:zone", (req, res) => {
  const start = performance.now();
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
    const selectedZone = zoneCollection[req.params.zone];

    if (isSubSet(selectedZone.R1, selectedZone.R2)) {
      const end = performance.now();
      res.status(200).send(`true ${end - start}`);
    } else {
      const end = performance.now();
      res.status(200).send(`false ${end - start}`);
    }
  } else {
    res.status(400).send({ error: "selected zone is not on the list" });
  }
});

module.exports = router;
