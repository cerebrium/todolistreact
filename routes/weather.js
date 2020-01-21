require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const publicIp = require('public-ip');
var geoip = require('geoip-lite');

var geo;
(async () => {
    let myIp = await publicIp.v4()
    if (myIp) {
        let localGeo = geoip.lookup(myIp);
        geo = localGeo.ll
    }
  })();

router.get('/weather', (req, res) => {
    console.log('in this block')
    if (geo.length > 0) {
        let lat = geo.toString()
        console.log(lat)
        axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API}/${lat}`).then( response => {
            console.log(response.data)
            res.json(response.data.daily)
        })
    }
})

module.exports = router