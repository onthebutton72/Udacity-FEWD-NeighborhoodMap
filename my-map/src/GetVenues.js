export function getVenues() {
    var apiURL = 'https://api.foursquare.com/v2/venues/explore?cat=food&near=sacramento&limit=10&client_id=UOEZ5B4CMFC2YOAMQEL0OPZYS0FQIMQZMOTDCCBQHJWKOTWD&client_secret=OYSVFKAMTPPNMLYA2GVB14E4AH4RPBMM0GWVFNYY4OTHDIYD&v=20190201'
    return fetch(apiURL)
    .then(response => response.json())
}
 