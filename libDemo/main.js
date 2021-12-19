var record = [];
var markerLayer;
// var mymap = L.map('mapid').setView([40.734636,-73.994997], 13);
var mymap = L.map("mapid", {
    center: [40.734636, -73.994997],
    zoom: 13,
    // layers: [lightmap, earthquakes]
  });

  L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(mymap);
markerLayer = L.layerGroup().addTo(mymap);


// for (var i = 0; i < rawdata.length; i++) {
//     L.marker( [+rawdata[i].lat, +rawdata[i].long] ).bindPopup(JSON.stringify("Address: " + rawdata[i].address + 'times: ' + rawdata[i].start_time )).addTo(mymap);
// }

        //add all markers
        for (var i=0; i<rawdata.length; i++) {
            var mypopup = "<b>Group:&nbsp</b>" +  rawdata[i].groupid + "<br /> <b>Location:&nbsp</b>" + rawdata[i].place  + "<br /> <b>Address:&nbsp</b>" + rawdata[i].address +"<br /><b>Day:&nbsp</b>" + rawdata[i].day;
                mypopup += "<br /><b>Time:&nbsp</b>" + rawdata[i].start_time + "-" + rawdata[i].end_time + "<br /> <b>Wheelchair:&nbsp</b>" + rawdata[i].wheelchair;
            // specify popup options 
           var customOptions =
             {
             'maxWidth': '500',
             'className' : 'custom'
             }
             var marker = L.marker( [rawdata[i].lat, rawdata[i].long]).bindPopup(mypopup,customOptions)
                          .addTo(markerLayer);
                          
             marker.on('click', onClick);
             
         }
     
      
      
     


//Adding the option to choose the day
function filterData(day){
    var dd = [];

    for (let i=0; i<rawdata.length; i++){
        if (rawdata[i].day == day) {
          dd.push(rawdata[i]);
        }
    }

    return dd;
  }

  function removeMarker(){
    if ( markerLayer !== undefined){ mymap.removeLayer(markerLayer);}
  }
  

async function applyFilter(){
    var d = document.getElementById("days");
    var day = d.options[d.selectedIndex].value; 
    
    await removeMarker();
    markerLayer = L.layerGroup().addTo(mymap);

    var data = await filterData(day);
    
    //add new markers
    for (var i=0; i < data.length; i++) {
      
       var mypopup = "<b>Group:&nbsp</b>" +  data[i].groupid + "<br /> <b>Location:&nbsp</b>" + data[i].location + "<br /><b>Day:&nbsp</b>" + data[i].day;
           mypopup += "<br /><b>Time:&nbsp</b>" + data[i].start_time + "-" + data[i].end_time + "<br /> <b>Wheelchair:&nbsp</b>" + data[i].wheelchair;
       // specify popup options 
      var customOptions =
        {
        'maxWidth': '500',
        'className' : 'custom'
        }
       var marker = L.marker( [data[i].lat, data[i].long]).bindPopup(mypopup,customOptions)
                     .addTo(markerLayer);
                     
        marker.on('click', onClick);
        marker.meta = data[i];
    }

    $(document).ready(function() {
        var json = rawdata

    $("#days").on("change", () => {
        $("table").html(`<tr><th>Day</th><th>Address</th><th>Meeting Name</th><th>Time</th><th>Wheelchair Access</th></tr>`);
      var matchJSON = json.filter(e => e["days"].toLowerCase() == $("#days").val().toLowerCase()); matchJSON.forEach(obj => $("table").append(`<tr><td>${obj["day"]}</td><td>${obj["address"]}</td><td>${obj["start_time"]}</td><td>${obj["Color"]}</td><td>${obj["wheelchair"]}</td></tr>`));
    });
    });
}
// var Monday  = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
//     Tuesday    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
//     Wednesday    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
//     Thursday    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
//     Friday    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
//     Saturday    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
//     Sunday    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
// var days = {
//     "Monday": Monday,
//     "Tuesday": Tuesday,
//     "Wednesday" : Wednesday,
//     "Thursday" : Thursday,
//     "Friday" : Friday,
//     "Saturday" : Saturday,
//     "Sunday" : Sunday,
//   };

  function onClick(e) {
    var marker = e.target.meta;
    record.push(marker);
    console.log(marker);
    }
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

var table = new Tabulator("#example-table", {
    height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    layout:"fitColumns", //fit columns to width of table (optional)
    columns:[ //Define Table Columns
        {title:"ID", field:"groupid",align:"center"},
        {title:"Address", field:"address", align:"center"},
        {title:"Start Time", field:"start_time", align:"center"},
        {title:"End Time", field:"end_time", sorter:"date", align:"center"},
    ],
    rowClick:function(e, row){ //trigger an alert message when the row is clicked
        alert("Row " + row.getData().id + " Clicked!!!!");
    },
});

var tabledata = rawdata;

//load sample data into the table
table.setData(tabledata);



