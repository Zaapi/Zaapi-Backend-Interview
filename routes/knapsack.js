const express = require("express");
const router = express.Router();

function max(a, b) {
  return a > b ? a : b;
}

// Returns the maximum value that can
// be put in a knapsack of capacity W
function knapSack(W, wt, val, n) {
  // Base Case
  if (n == 0 || W == 0) return 0;

  // If weight of the nth item is
  // more than Knapsack capacity W,
  // then this item cannot be
  // included in the optimal solution
  if (wt[n - 1] > W) return knapSack(W, wt, val, n - 1);
  // Return the maximum of two cases:
  // (1) nth item included
  // (2) not included
  else
    return max(
      val[n - 1] + knapSack(W - wt[n - 1], wt, val, n - 1),
      knapSack(W, wt, val, n - 1)
    );
}

// let val = [ 60, 100, 120 ];
// let wt = [ 10, 20, 30 ];
//    let W = 50;
// let n = val.length;

router.get("/", (req, res) => {
  const { W, wt, val } = req.body;
  const knapSackResult = knapSack(W, wt, val, val.length);
  res.status(200).send(`answer is ${JSON.stringify(knapSackResult)}`);
});

module.exports = router;
