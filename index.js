const express = require("express");
const app = express();
const port = 50101;
const cors = require("cors");
const querystring = require("querystring");

app.use(cors());

app.get("/dmx", (req, res) => {
  let successHTML;
  if (req.query.light && req.query.r && req.query.g && req.query.b) {
    successHTML = `<h3>Your request was successful</h3><h3 style="display:inline;padding:8px; border: 1px solid black;color:rgb(${req.query.r},${req.query.g},${req.query.b})">
    Set Light ${req.query.light} to RGB Value (${req.query.r},${req.query.g},${req.query.b})
    </h3>`;
  } else {
    successHTML = `<h3>Your request was invalid</h3>`;
  }

  let baseURL = `"${req.protocol}://${req.hostname}${
    req.originalUrl.split("?")[0]
  }?light=1&r=255&g=0&b=125"`;
  let html = `<html><body>
<h3>DMX HTTP ENDPOINT TEST</h3>

${successHTML}
<br/>
<br/>
<table style="border: 1px solid black;text-align:center;">
<tr>
<th>Param</th><th>Value</th>
</tr>
<tr>
<td>light</td><td><i>int</i> DMX Light to address</td>
</tr>
<tr>
<td>r</td><td><i>int</i> Red value 0-255</td>
</tr>
<tr>
<td>g</td><td><i>int</i> Green value 0-255</td>
</tr>
<tr>
<td>b</td><td><i>int</i> Blue value 0-255</td>
</tr>

</table>
<p>
e.g.<br/>
${baseURL}<br/>
Would set DMX Light 1 to <span style="color:rgb(255,0,125);">RGB Value (255,0,125)</span>
</p>

    </body></html>`;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// http://ipaddress:port?light=1&r=255&g=0&b=0
