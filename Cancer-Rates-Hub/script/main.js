var data;
var cancerType ="Total Cancer";
var zipSelected ="";
var zipSelected2 = "";
var iscompare = 0;
var lastChanged = 2;
var groceryFlag = 0;
var incomeFlag = 0;
var educationFlag = 0;
//leaflet


// var map = L.map('map-leaf').setView([41.8781, -87.6298], 13);
//
// L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
//     subdomains: 'abcd',
//     maxZoom: 19
// }).addTo(map);
//
// L.geoJSON(map.geojson)


var color = d3.scale.quantile()
        .range(["#ffffff","f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252"]);
//     .range(["#eff3ff","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"]);

// var color = d3.scaleSequential()
//     .interpolator(d3.interpolateBlues)


d3.csv("data/cancerRate(All).csv", function(dataCancer){
    data = dataCancer;
    data.forEach(function(d) {
        d.Total_Count = +d.Total_Count;
    });


    color.domain([
        d3.min(data, function(d){ return d.Total_Count; }),
        d3.max(data, function(d){ return d.Total_Count; })
    ]);
});

//Load in GeoJSON data
d3.json("map.geojson", function(json) {

    //leaflet
    // console.log(json)
    //
    // var map = L.map('map-leaf').setView([41.8781, -87.6298], 10);
    //
    //
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    //     subdomains: 'abcd',
    //     maxZoom: 19
    // }).addTo(map);
    //
    //
    // color.domain([0,2000])
    //
    // function style(feature){
    //     // console.log(feature.properties.totalCancer)
    //     return {
    //         fillColor : color(feature.properties.totalCancer),
    //         opacity : 1,
    //         weight : 0.5,
    //         color : 'black'
    //
    //     }
    //
    // }
    //
    // var layer = L.geoJSON(json, {style: style}).addTo(map);




    //leaflet






    var dropdownChange = function() {
        var cancerType = d3.select(this).property('value');

        // map.removeLayer(layer)
        // var val;
        //
        // if(cancerType=="Total Cancer"){
        //      // val = "totalCancer";
        //     color.domain([0,2220]);
        //
        //     function style(feature){
        //         // console.log(feature.properties.totalCancer)
        //         return {
        //             fillColor : color(feature.properties.totalCancer),
        //             opacity : 1,
        //             weight : 0.5,
        //             color : 'black'
        //
        //         }
        //
        //     }
        //
        //     layer = L.geoJSON(json, {style: style}).addTo(map);
        //
        //
        //     }
        // else if(cancerType=="Cervix"){
        //     color.domain([0,40]);
        //      val = "cervix";
        //
        //     function style(feature){
        //         // console.log(feature.properties.totalCancer)
        //         return {
        //             fillColor : color(feature.properties.cervix),
        //             opacity : 1,
        //             weight : 0.5,
        //             color : 'black'
        //
        //         }
        //
        //     }
        //
        //     layer = L.geoJSON(json, {style: style}).addTo(map);
        //
        //    }
        // else if(cancerType == "Nervous"){
        //      val = "nervous";
        //     color.domain([0,40]);
        //
        //     function style(feature){
        //         // console.log(feature.properties.totalCancer)
        //         return {
        //             fillColor : color(feature.properties.nervous),
        //             opacity : 1,
        //             weight : 0.5,
        //             color : 'black'
        //
        //         }
        //
        //     }
        //
        //     layer = L.geoJSON(json, {style: style}).addTo(map);
        //
        //     }
        // else if(cancerType == "Colorectal"){
        //     // console.log("fill");
        //      val = "colorectal";
        //     color([0, 260]);
        //
        //     function style(feature){
        //         // console.log(feature.properties.totalCancer)
        //         return {
        //             fillColor : color(feature.properties.colorectal),
        //             opacity : 1,
        //             weight : 0.5,
        //             color : 'black'
        //
        //         }
        //
        //     }
        //
        //     layer = L.geoJSON(json, {style: style}).addTo(map);
        //
        //     }
        // else if(cancerType == "Lung and Bronchus"){
        //      val = "lungBron";
        //     color.domain([0,400]);
        //
        //     function style(feature){
        //         // console.log(feature.properties.totalCancer)
        //         return {
        //             fillColor : color(feature.properties.lungBron),
        //             opacity : 1,
        //             weight : 0.5,
        //             color : 'black'
        //
        //         }
        //
        //     }
        //
        //     layer = L.geoJSON(json, {style: style}).addTo(map);
        //
        //     }
        // else{
        //      val = "breastInSitu";
        //     color.domain([0, 100]);
        //
        //
        //     function style(feature){
        //         // console.log(feature.properties.totalCancer)
        //         return {
        //             fillColor : color(feature.properties.breastinSitu),
        //             opacity : 1,
        //             weight : 0.5,
        //             color : 'black'
        //
        //         }
        //
        //     }
        //
        //     layer = L.geoJSON(json, {style: style}).addTo(map);
        //
        //     }
        //
        // layer.setStyle({
        //     fillColor : color(feature.properties.totalCancer)
        //
        // })
    // console.log(cancerType.length);
        updateMap(cancerType);
        legendUpdate(cancerType);
    };

    var cancer = ["Total Cancer","Nervous","Colorectal", "Lung and Bronchus", "Breast In Situ", "Cervix"];

    var dropdown = d3.select("#cancerFilter")
        .append('g')
        .attr("width", 10)
        .attr("height", 10)
        .attr("class","dropdown")
        .attr("transform", "translate(0,20)")
        .insert("select", "svg")
        .on("change", dropdownChange);

    dropdown.selectAll("option")
        .data(cancer)
        .enter().append("option")
        .attr("value", function (d) {return d; })
        .text(function (d) {
            return d;
            // return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
        });


    //map path and projection

    //Width and height
    var width = $("#map-layer").width();
    var height = $("#map-layer").height();
    var center = [-87.623177, 41.881832];
    var scale = 200;


    var projection = d3.geo.mercator().center(center)
        .scale(width *120)
        .translate([width/1.3, height/2.5]);
    var path = d3.geo.path().projection(projection);


    //Create SVG element
    var svg = d3.select(".map")
        .attr("height", height);

    //Create a tooltip
    var tooltip = d3.select("#tooltip-map")
        .attr("class", "tooltip")
        .style("opacity", 0);

    updateMap(cancerType);
    legendUpdate(cancerType);

// mapLayer attributes
    function updateMap(cancerType){

        // console.log(cancerType);
        svg.selectAll('path').remove();
        svg.append('g')
            .selectAll('path')
            .data(json.features)
            .enter().append('path')
            .attr('d', path)
            .attr('vector-effect', 'non-scaling-stroke')
            .attr('class', 'region-path')
            .style("fill",function(d){
                if(cancerType=="Total Cancer"){
                    var val = d.properties.totalCancer;
                    color.domain([0,2220]);
                    return color(val);}
                else if(cancerType=="Cervix"){
                    color.domain([0,40]);
                    var val = d.properties.cervix;
                    return color(val);}
                else if(cancerType == "Nervous"){
                    var val = d.properties.nervous;
                    color.domain([0,40]);
                    return color(val);}
                else if(cancerType == "Colorectal"){
                    var val = d.properties.colorectal;
                    color.domain([0,300]);
                    return color(val);}
                else if(cancerType == "Lung and Bronchus"){
                    var val = d.properties.lungBron;
                    color.domain([0,400]);
                    return color(val);}
                else{
                    var val = d.properties.breastInSitu;
                    color.domain([0, 100]);
                    return color(val);}
            })
            .style("stroke", "#636363")
            .style('stroke-width', "1px")
            .on('mouseover', function(d){
                tooltip.transition()
                    .duration(200)
                    .style("opacity",0.9);

                if(cancerType=="Total Cancer"){

                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidents: " + d.properties.totalCancer )
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else if(cancerType=="Cervix"){
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidents: " + d.properties.cervix )
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else if(cancerType == "Nervous"){
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidents: " + d.properties.nervous )
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else if(cancerType == "Colorectal"){
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidents: " + d.properties.colorectal )
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else if(cancerType == "Lung and Bronchus"){
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidents: " + d.properties.lungBron )
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else{
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidents: " + d.properties.breastInSitu )
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);

            })
            .on('click',function(d){


                if(iscompare == 1){

                    if(lastChanged == 2){


                        d3.selectAll(".clicked1")
                            .classed("clicked1", false)
                            .style('stroke', '#636363')
                            .style('stroke-width', "1px");

                        d3.select(this)
                            .classed("clicked1", true)
                            .style('stroke', '#b10026')
                            .style('stroke-width', "4px");

                        zipSelected = d.properties.zip;
                        console.log("zip1 : " + zipSelected);



                        zipHeading(zipSelected, '#zipHeading1');
                        insuranceChart(zipSelected, '#insurancePlot1');
                        populationNumber(zipSelected, '#totalPopulation1');
                        incomeChart(zipSelected, '#incomePlot1');
                        educationChart(zipSelected, '#educationrPlot1');
                        groceryNumber(zipSelected, '#groceryNumber1');
                        cancerPyramindChart(zipSelected, '#cancerPlots1');
                        raceChart(zipSelected, '#racePlot1');
                        lastChanged = 1;
                    }
                    else{

                        d3.selectAll(".clicked2")
                            .classed("clicked2", false)
                            .style('stroke', '#636363')
                            .style('stroke-width', "1px");

                        d3.select(this)
                            .classed("clicked2", true)
                            .style('stroke', '#b10026')
                            .style('stroke-width', "4px");



                        zipSelected2 = d.properties.zip;
                        console.log("zip2 : " + zipSelected2);



                        zipHeading(zipSelected2, '#zipHeading2');
                        insuranceChart(zipSelected2, '#insurancePlot2');
                        populationNumber(zipSelected2, '#totalPopulation2');
                        incomeChart(zipSelected2, '#incomePlot2');
                        educationChart(zipSelected2, '#educationrPlot2');
                        groceryNumber(zipSelected2, '#groceryNumber2');
                        cancerPyramindChart(zipSelected2, '#cancerPlots2');
                        raceChart(zipSelected2, '#racePlot2');
                        lastChanged = 2;
                    }

                }
                else{


                    d3.selectAll(".clicked1")
                        .classed("clicked1", false)
                        .style('stroke', '#636363')
                        .style('stroke-width', "1px");

                    d3.select(this)
                        .classed("clicked1", true)
                        .style('stroke', '#b10026')
                        .style('stroke-width', "4px");


                    zipSelected = d.properties.zip;
                    console.log("zip1 : " + zipSelected);
                    zipHeading(zipSelected, '#zipHeading1');
                    insuranceChart(zipSelected, '#insurancePlot1');
                    populationNumber(zipSelected, '#totalPopulation1');
                    incomeChart(zipSelected, '#incomePlot1');
                    educationChart(zipSelected, '#educationrPlot1');
                    groceryNumber(zipSelected, '#groceryNumber1');
                    cancerPyramindChart(zipSelected, '#cancerPlots1');
                    raceChart(zipSelected, '#racePlot1');

                }

                //
                //
                // if(iscompare ==1){
                //     zipSelected2 =  d.properties.zip;
                //     console.log("zip2 : " + zipSelected2);
                //     zipHeading(zipSelected2);
                //     insuranceChart(zipSelected2);
                //     incomeChart(zipSelected2);
                //     educationChart(zipSelected2);
                //     groceryNumber(zipSelected2);
                //     cancerPyramindChart(zipSelected2, '#cancerPlots1');
                //     raceChart(zipSelected2);
                // }
                // else{
                //     zipSelected = d.properties.zip;
                //     console.log("zip1 : " + zipSelected);
                //     zipHeading(zipSelected);
                //     insuranceChart(zipSelected);
                //     incomeChart(zipSelected);
                //     educationChart(zipSelected);
                //     groceryNumber(zipSelected);
                //     cancerPyramindChart(zipSelected, '#cancerPlots1');
                //     raceChart(zipSelected);
                //
                // }
            })
            .attr('opacity',1);
    }


    d3.select("#cancer-range").on("input", function () {

        var sliderValue = d3.select("#cancer-range").property("value")/100;

        svg.selectAll('.region-path')
            .transition()
            .duration(300)
            .ease("linear")
            .style("opacity", sliderValue);


        document.getElementById("cancer-slider-number").innerText = sliderValue});


        //add a legend
    function legendUpdate(cancerType){
        var w = 120, h= 200;
        d3.selectAll('.legend').remove();
        d3.selectAll('.cancer-legend-heading').remove();

        d3.select(".map").append('g')
            .attr("width",40)
            .attr("height",60)
            .attr("class","text cancer-legend-heading")
            .append('text')
            .attr("x","3%")
            .attr("y","55%")
            .attr("font-size",'15px')
            .text('Cancer Incidences');
            // .call(wrap, 40);


        var key = d3.select(".map")
            .append("g")
            .attr("width",w)
            .attr("height",h)
            .attr("class","legend");

        var legend = key.append("defs")
            .append("svg:linearGradient")
            .attr("id","gradient")
            .attr("x1","100%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        legend.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#252525")
            .attr("stop-opacity", 1);

        legend.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#f7f7f7")
            .attr("stop-opacity", 1);




        key.append("rect")
            .attr("width", w - 100)
            .attr("height", h)
            .style("fill", "url(#gradient)")
            // .style("font-color","2px")
            .attr("transform", "translate(30,380)");


        if(cancerType == "Total Cancer"){
            var y = d3.scale.linear()
                .range([h, 0])
                .domain([0,2200
                ]);
        }
        else if(cancerType=="Cervix"){

            var y = d3.scale.linear()
                .range([h, 0])
                .domain([0,40]);
        }
        else if(cancerType == "Nervous"){
            var y = d3.scale.linear()
                .range([h, 0])
                .domain([0,40
                ]);
            }
        else if(cancerType == "Colorectal"){
            var y = d3.scale.linear()
                .range([h, 0])
                .domain([0,300]);
        }
        else if(cancerType == "Lung and Bronchus"){
            var y = d3.scale.linear()
                .range([h, 0])
                .domain([0,400]);
           }
        else{
            var y = d3.scale.linear()
                .range([h, 0])
                .domain([0,100
                ]);
        }


        var yAxis = d3.svg.axis().scale(y).orient("right").ticks(8).tickSize(8,0);
        // d3.axisRight(y);

        key.append("g")
            .attr("class", "yaxis")
            .attr("transform", "translate(42,380)")
            .call(yAxis);




    }

//dropdown value change



// grocery on side bar tab
    grocery = d3.select('#grocery-side-bar')
        .append("button")
        .attr("type","button")
        .attr("class","groceryButton")
        .text("Grocery")
        .on('click', showGrocerySideBar);

    //Grocery Data




    function  showGrocerySideBar(){
        if(groceryFlag == 0){

            d3.select(".groceryButton")
                .style("background-color", "#a1d99b");

            d3.csv('data/groceryStores.csv', function(grocery) {

                groceryFlag = 1;
                groceryByZIP = d3.nest()
                    .key(function (d) {
                        return d.ZIPCODE;
                    })
                    .rollup(function (v) {
                        return v.length
                    })
                    .entries(grocery);


                var groceryByLoc = [];

                d3.csv('data/zipLocations.csv', function (zipLocation) {


                    for (var i = 0; i < groceryByZIP.length; i++) {
                        for (var j = 0; j < zipLocation.length; j++) {
                            if (groceryByZIP[i]["key"] == zipLocation[j]['ZIP']) {
                                groceryByLoc.push([groceryByZIP[i]["key"], groceryByZIP[i]["values"], zipLocation[j]["long"], zipLocation[j]["lat"]])
                            }
                        }
                    }

                    var circle = svg.selectAll("circle")
                        .data(groceryByLoc).enter()
                        .append("circle")
                        .attr("class", "groceryCircle")
                        .attr("cx", function (d) {
                            d = [d[2], d[3]];
                            return projection(d)[0]; })
                        .attr("cy", function (d) {
                            d = [d[2], d[3]];
                            return projection(d)[1];})
                        .attr("r", function (d) {
                            if (d[1] > 0 && d[1] <= 5) {
                                return "2px";}
                            else if (d[1] > 5 && d[1] <= 19) {
                                return "5px";}
                            else {
                                return "12px";}
                        })
                        .attr("fill", "#006d2c")
                        .attr("opacity", 1);
                            // function (d) {
                            // if (d[1] > 0 && d[1] <= 5) {
                            //     return 1;}
                            // else if (d[1] > 5 && d[1] <= 19) {
                            //     return 0.7;}
                            // else {
                            //     return 0.4;}
                            // });


                    // var legendGrocery = d3.select("#sidebar-right").
                    // append('svg').
                    // attr("width", $("#sidebar-right").width()).
                    // attr("height", 50).
                    // attr('class', 'grocery-legend').
                    // attr("transform", "translate(0,80)").
                    // append("g");
                    //
                    // legendGrocery.selectAll('circle')
                    //     .enter()
                    //     .append("circle")
                    //     .attr("class","grocery legend")
                    //     .attr("cx", function (d) {
                    //         d = [d[2], d[3]];
                    //         return projection(d)[0]; })
                    //     .attr("cy", function (d) {
                    //         d = [d[2], d[3]];
                    //         return projection(d)[1];})
                    //     .attr("r", function (d) {
                    //         if (d[1] > 0 && d[1] <= 5) {
                    //             return "2px";}
                    //         else if (d[1] > 5 && d[1] <= 19) {
                    //             return "5px";}
                    //         else {
                    //             return "12px";}
                    //     })
                    //     .attr("fill", "#006d2c")
                    //     .attr("opacity", 1);

                    // for (var i = 0; i < 5; i++) {
                    //     legendIncome.append("g:circle").
                    //     attr("x", i*27).
                    //     attr("height", 20).
                    //     attr("width", 27).
                    //     style("fill", colorRange[i])
                    //         .style("opacity", "0.9");
                    //     // attr("transform", "translate(10,100)");//color
                    //
                    //
                    //
                    //     legendText = ['+50% ', ' Avg', '-25%', '-50%', '-75%']
                    //     legendIncome.append("text")
                    //     // .data(legendText)
                    //         .attr("x", i* 27)
                    //         .attr("y", 30)
                    //         .attr("dy", ".35em")
                    //         .style("text-anchor", "start")
                    //         .style("font" ,"10px sans-serif")
                    //         .text(String(legendText[i]));
                    //
                    // };

                    d3.select("#sidebar-right")
                        .append('svg')
                        .attr("width",$("#sidebar-right").width())
                        .attr("height",25)
                        .attr("transform", "translate(0,80)")
                        .attr("id", "grocery-legend-text")
                        .append('g')
                        .attr("class","text")
                        .append('text')
                        .attr('x', 0)
                        .attr('y', "55%")
                        .style("text-anchor", "start")
                        .attr("font-size",'15px')
                        .text('Grocery Stores');


                    var legendGrocery = d3.select("#sidebar-right").
                    append('svg').
                    attr("width", $("#sidebar-right").width()).
                    attr("height", 100).
                    attr('class', 'grocery-legend').
                    attr("transform", "translate(0,80)").
                    append("g");
                    var data = [];


                    for (var i = 0; i < 3; i++) {

                        legendGrocery
                            .append("circle").
                        attr("cy",
                            function (d) {
                                if (i==0) {
                                    return 10;}
                                else
                                {return i*30;}
                            }).
                        attr("cx", 15).
                        attr("r", function (d) {
                            if (i==0) {
                                return "2px";}
                            else if (i==1) {
                                return "5px";}
                            else {
                                return "12px";}
                        }).
                        style("fill", "green")
                            .style("opacity", "0.9");
                        // attr("transform", "translate(10,100)");//color



                        legendText = ['<= 5', '> 5 & <= 19', '> 20']


                        legendGrocery.append("text")
                        // .data(legendText)
                            .attr("y", function (d) {
                                if (i==0) {
                                    return 10;}
                                else
                                {return i*30;}
                            })
                            .attr("x", 30)
                            .attr("dy", ".35em")
                            .style("text-anchor", "start")
                            .style("font" ,"10px sans-serif")
                            .text(String(legendText[i]));

                    };
                })
            })
        }
        else{
            groceryFlag = 0;

            d3.select(".groceryButton")
                .style("background-color", "white");

            svg.selectAll(".groceryCircle").remove();


            d3.selectAll('.grocery-legend').remove()
            d3.selectAll('#grocery-legend-text').remove()
        }




        d3.select("#grocery-range").on("input", function () {

            var sliderValue = d3.select("#grocery-range").property("value")/100;

            svg.selectAll('.groceryCircle')
                .transition()
                .duration(300)
                .ease("linear")
                .style("opacity", sliderValue);

            document.getElementById("grocery-slider-number").innerText = sliderValue


        });


    }
//Grocery on side bar ends

//Income on side bar
    incomeSideBar = d3.select('#income-side-bar')
        .append("button")
        .attr("type","button")
        .attr("class","incomeButton")
        .text("Income")
        .on('click', showIncomeSideBar);


    function showIncomeSideBar() {

        if(incomeFlag == 0){

            d3.select(".incomeButton")
                .style("background-color", "#a1d99b");

            incomeFlag = 1;
            d3.csv('data/filteredIncome.csv', function (income) {


                var colorRange = ["#045a8d","#fdcc8a","#fc8d59","#e34a33","#b30000"];
                var color = d3.scale.quantize()
                    .domain([-.75, .40])
                    .range(["#b30000","#e34a33", "#fc8d59", "#fdcc8a", "#045a8d"]);


                income.forEach(function (d) {
                    d.percent = (d.medianIncome - 83890)/83890 ;
                })


                svg.append('g')
                    .selectAll('path')
                    .data(json.features)
                    .enter().append('path')
                    .attr('d', path)
                    .attr('class','income-path')
                    .transition()
                // svg.selectAll("circle")
                //     .data(json.features).enter()
                //     .append("circle")
                //     .attr('class','income-path')
                //     .attr("cx", function (d) {
                //         // d = [d[2], d[3]];
                //         return path.centroid(d)[0]; })
                //     .attr("cy", function (d) {
                //         // d = [d[2], d[3]];
                //         return path.centroid(d)[1];})
                //     .attr("r", "2px")

                    //
                    .attr("transform", function (d) {

                        var centroid = path.centroid(d),
                            x = centroid[0],
                            y = centroid[1];
                        if (isNaN(x) || isNaN(y))
                            return null;
                        else {
                            scale_factor = 0.2
                            return "translate(" + x + "," + y + ")"
                                + "scale(" + scale_factor + ")"
                                + "translate(" + -x + "," + -y + ")";
                            }
                    })
                    .style('fill', function(d){
                        var incomePercent;
                        for(var i =0; i < income.length ; i++){
                           if(income[i].zip == +(d.properties.zip)){
                               incomePercent = income[i].percent;
                           }
                        }

                        return color(incomePercent)
                    });

                // console.log(color.range[0])

                //
                // d3.select("svg").append('g')
                //     .attr("width",40)
                //     .attr("height",50)
                //     .attr("class","text")
                //     .attr("id", "income-legend-text")
                //     .append('text')
                //     .attr("x","19%")
                //     .attr("y","71%")
                //     .attr("font-size",'15px')
                //     .text('Income');
                //
                //
                // var legendIncome = d3.select("svg").
                //                 append('g').
                //                 attr("width", 30).
                //                 attr("height", 100).
                //                 attr('class', 'income-legend').
                //                 attr("transform", "translate(100,480)");
                //
                //                 for (var i = 0; i < 5; i++) {
                //                     legendIncome.append("g:rect").
                //                     attr("y", i*20).
                //                     attr("height", 20).
                //                     attr("width", 20).
                //                     style("fill", colorRange[i]);
                //                     // attr("transform", "translate(100,480)");//color
                //                 };


                d3.select("#sidebar-right")
                    .append('svg')
                    .attr("width",$("#sidebar-right").width())
                    .attr("height",25)
                    .attr("transform", "translate(0,80)")
                    .attr("id", "income-legend-text")
                    .append('g')
                    .attr("class","text")
                    .append('text')
                    .attr('x', 0)
                    .attr('y', "45%")
                    .style("text-anchor", "start")
                    .attr("font-size",'15px')
                    .text('Income');


                var legendIncome = d3.select("#sidebar-right").
                append('svg').
                attr("width", $("#sidebar-right").width()).
                attr("height", 50).
                attr('class', 'income-legend').
                attr("transform", "translate(0,80)").
                append("g");


                for (var i = 0; i < 5; i++) {
                    legendIncome.append("g:rect").
                    attr("x", i*27).
                    attr("height", 20).
                    attr("width", 27).
                    style("fill", colorRange[i])
                        .style("opacity", "0.9");
                    // attr("transform", "translate(10,100)");//color



                    legendText = ['+50% ', ' Avg', '-25%', '-50%', '-75%']
                    legendIncome.append("text")
                        // .data(legendText)
                        .attr("x", i* 27)
                        .attr("y", 30)
                        .attr("dy", ".35em")
                        .style("text-anchor", "start")
                        .style("font" ,"10px sans-serif")
                        .text(String(legendText[i]));

                };


            })




    }
        else{
            incomeFlag = 0;

            d3.select(".incomeButton")
                .style("background-color", "white");

            d3.selectAll('.income-path').remove()
            d3.selectAll('.income-legend').remove()
            d3.selectAll('#income-legend-text').remove()

        }


        d3.select("#income-range").on("input", function () {

            var sliderValue = d3.select("#income-range").property("value")/100;

            svg.selectAll('.income-path')
                .transition()
                .duration(300)
                .ease("linear")
                .style("opacity", sliderValue);

            document.getElementById("income-slider-number").innerText = sliderValue


        });

        }



//Income on side bar ends

//Education on side bar
    educationSideBar = d3.select('#education-side-bar')
        .append("button")
        .attr("type","button")
        .attr("class","educationButton")
        .text("Education")
        .on('click', showEducationSideBar);




    function showEducationSideBar() {

        if(educationFlag == 0) {
            educationFlag = 1;

            d3.select(".educationButton")
                .style("background-color", "#a1d99b");

            d3.csv('data/filteredEducationTotal.csv', function (edTotal) {
                console.log(edTotal)
                //
                // edTotal.forEach(function (d) {
                //     d.scale = d.total_educated_population;
                // })

                // d3.csv('data/filteredIncome.csv', function (income) {


                    // var colorRange = ["#045a8d", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000"];
                    // var color = d3.scale.quantize()
                    //     .domain([-.75, .40])
                    //     .range(["#b30000", "#e34a33", "#fc8d59", "#fdcc8a", "#045a8d"]);

                    //
                    // income.forEach(function (d) {
                    //     d.percent = (d.medianIncome - 83890) / 83890;
                    // })


                    var color = d3.scale.quantile()
                        // .range(["#eff3ff","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#084594"]);
                        .range(["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3"]);

                    color.domain([600, 85000]);
                    //
                    // color.domain([
                    //     d3.min(edTotal, function(d){ return d.total_educated_population; }),
                    //     d3.max(edTotal, function(d){ return d.total_educated_population; })
                    // ]);

                    console.log(d3.min(edTotal, function(d){ return d.total_educated_population; }))
                    console.log(d3.max(edTotal, function(d){ return d.total_educated_population; }))

                    svg.append('g')
                        .selectAll('path')
                        .data(json.features)
                        .enter().append('path')
                        .attr('d', path)
                        .attr('class', 'education-path')
                        .transition()

                        .attr("transform", function (d) {

                            var centroid = path.centroid(d),
                                x = centroid[0],
                                y = centroid[1];
                            if (isNaN(x) || isNaN(y))
                                return null;
                            else {

                                // for (var i = 0; i < edTotal.length; i++) {
                                //     // console.log(scale)
                                //     if (edTotal[i].zip == +(d.properties.zip)) {
                                //         var scale = edTotal[i].scale;
                                //     }
                                // }
                                var scale = 0.965;
                                // console.log(scale)
                                return "translate(" + x + "," + y + ")"
                                    + "scale(" + scale + ")"
                                    + "translate(" + -x + "," + -y + ")";
                            }


                            // .scale(width *85)
                            //         .translate([width/1.6, height/2.7]);

                        })
                        .style('fill', function (d) {
                            var educatedpeople;
                            for (var i = 0; i < edTotal.length; i++) {
                                if (edTotal[i].zip == +(d.properties.zip)) {
                                    educatedpeople = edTotal[i].total_educated_population;
                                }
                            }
                            console.log(educatedpeople);
                            return color(educatedpeople);
                        })
                        .style("opacity", 1);
                        // .style("stroke", "#636363")
                        // .style('stroke-width', "0.5px");

                    // d3.selectAll('.income-legend').remove()
                    //
                    // var legendIncome = d3.select("#sidebar-right").
                    // append('svg').
                    // attr("width", $("#sidebar-right").width()).
                    // attr("height", 50).
                    // attr('class', 'income-legend').
                    // attr("transform", "translate(0,80)").
                    // append("g");
                    //
                    //
                    // for (var i = 0; i < 5; i++) {
                    //     legendIncome.append("g:rect").
                    //     attr("x", i*27).
                    //     attr("height", 20).
                    //     attr("width", 27).
                    //     style("fill", colorRange[i])
                    //         .style("opacity", "0.9");
                    //     // attr("transform", "translate(10,100)");//color
                    //
                    //
                    //
                    //     legendText = ['+50% ', ' Avg', '-25%', '-50%', '-75%']
                    //     legendIncome.append("text")
                    //     // .data(legendText)
                    //         .attr("x", i* 27)
                    //         .attr("y", 30)
                    //         .attr("dy", ".35em")
                    //         .style("text-anchor", "start")
                    //         .style("font" ,"10px sans-serif")
                    //         .text(String(legendText[i]));
                    //
                    // };

                var w = 120, h= 120;
                // d3.selectAll('.legend').remove();
                // d3.selectAll('.cancer-legend-heading').remove();

                d3.select(".map").append('g')
                    .attr("width",40)
                    .attr("height",50)
                    .attr("class","text education-legend-heading")
                    .append('text')
                    .attr("x","20%")
                    .attr("y","68%")
                    .attr("font-size",'12px')
                    .text('People Educated');


                var key = d3.select(".map")
                    .append("g")
                    .attr("width",w)
                    .attr("height",h)
                    .attr("class","education-legend");

                var legend = key.append("defs")
                    .append("svg:linearGradient")
                    .attr("id","education-gradient")
                    .attr("x1","100%")
                    .attr("y1", "0%")
                    .attr("x2", "100%")
                    .attr("y2", "100%")
                    .attr("spreadMethod", "pad");

                legend.append("stop")
                    .attr("offset", "0%")
                    .attr("stop-color", "#6a51a3")
                    .attr("stop-opacity", 1);

                legend.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", "#f2f0f7")
                    .attr("stop-opacity", 1);


                key.append("rect")
                    .attr("width", w - 100)
                    .attr("height", h)
                    .style("fill", "url(#education-gradient)")
                    // .style("font-color","2px")
                    .attr("transform", "translate(100,460)");



                var y = d3.scale.linear()
                    .range([h, 0])
                    .domain([0, 85000]);

                var yAxis = d3.svg.axis().scale(y).orient("right").ticks(6).tickSize(6,0);
                // d3.axisRight(y);

                key.append("g")
                    .attr("class", "yaxis")
                    .attr("transform", "translate(115,460)")
                    .call(yAxis);

                })



            // })
        }
        else{
            educationFlag = 0;

            d3.select(".educationButton")
                .style("background-color", "white");

            d3.selectAll('.education-path').remove()
            d3.selectAll('.education-legend').remove()
            d3.selectAll('.education-legend-heading').remove()

        }

        d3.select("#education-range").on("input", function () {

            var sliderValue = d3.select("#education-range").property("value")/100;

            svg.selectAll('.education-path')
                .transition()
                .duration(300)
                .ease("linear")
                .style("opacity", sliderValue);

            document.getElementById("education-slider-number").innerText = sliderValue


        });

    }

//Education on side bar ends


    // aboutSideBar = d3.select('#about-side-bar')
    //     .append("button")
    //     .attr("type","button")
    //     .attr("class","aboutButton")
    //     .text("About")
    //     .on('click', showAboutSideBAr);




});
//end of d3 json file


function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    })
}


//population chart starts

function populationNumber(zipSelect,container) {


    // if(iscompare == 0){
    d3.select(container).selectAll('.populationNumber').remove();
    // }
    d3.csv('data/filteredPopulation.csv', function (population) {

        var populationCount = 0;
        for (var i = 0; i < population.length; i++) {
            if (population[i]['zip']==zipSelect){

                populationCount = population[i]['totalPopulation'];
                console.log(zipSelect);
            }
        }
        console.log(populationCount);


        d3.select(container)
            .append('svg')
            .attr('width', $(container).width())
            .attr('height',$(container).height())
            .attr('class','populationNumber')
            .append("text")
            .attr('x', "50%")
            .attr('y', "30%")
            .style("text-anchor", "middle")
            // .attr('fill', '#006d2c')
            .text(function(d){
                return "People Count: " + populationCount
            });

    })
}

//population chart ends





//read the income file and def income function
//median income = 83890;
//max median income = 150000;
//min median income = 19000;
function incomeChart(zipSelect, container){

    // if(iscompare == 1){
    //
    // }
    // else{
        d3.select(container).selectAll('.incomeNumber').remove();
        d3.selectAll('.income-heading').remove();

    // }


    d3.csv('data/filteredIncome.csv',function(income){

        // console.log(income);
        var medianIncome = 0;
        for (var i = 0; i < income.length; i++) {
            if (income[i]['zip']==zipSelect){

                medianIncome = income[i]['medianIncome'];
                console.log(zipSelect);
            }
        }
        // console.log(medianIncome);
        var data = [medianIncome,83890];

        var x = d3.scale.linear()
            .domain([0, 83890])
            .range([0, 150]);


        d3.select("#incomeHeading1")
            .append('svg')
            .attr('width', $("#incomeHeading1").width())
            .attr('height',$("#incomeHeading1").height())
            .attr('class','income-heading')
            .append('text')
            .attr('x', "48%")
            .attr('y', "50%")
            .style("text-anchor", "middle")
            .attr('fill', 'black')
            .text("Average Income");

        var tooltipIncomePlot = d3.select("#tooltip-income-plot")
            .attr("class", "tooltip")
            .style("opacity", 0);

        var widthIncome = $(container).width();
        d3.select(container)
            .append('svg')
            .attr('width', $(container).width())
            .attr('height',$(container).height())
            .attr('class','incomeNumber')
            .append('text')
            .attr('x', "50%")
            .attr('y', "70%")
            .style("text-anchor", "middle")
            .attr('fill', 'black')
            .text(function (d) {
                return "Average Income: " + medianIncome + " $"
            })

            // .append("g")
            // .attr("transform",'translate(' + widthIncome/3 + ',0)')
            // .selectAll('rect')
            // .data(data)
            // .enter().append("rect")
            // .attr("class", "inner-income-rect")
            // .attr("width",x)
            // .attr("height",8)
            // .attr("rx", 5) // rounded corners
            // .attr("ry", 5)
            // .attr('fill','#ec7014')
            // .on("mouseover", function (d) {
            //
            //     tooltipIncomePlot.transition()
            //         .duration(200)
            //         .style("opacity",0.9);
            //
            //     tooltipIncomePlot.html("Median Income: " + medianIncome + " $" )
            //         .style("left", (d3.event.pageX) + "px")
            //         .style("top", (d3.event.pageY+18) + "px");
            // })
            // .on("mouseout", function(d) {
            //     tooltipIncomePlot.transition()
            //         .duration(500)
            //         .style("opacity", 0);
            //
            // });

        // d3.select(container).selectAll("rect.inner-income-rect:nth-of-type(2)")
        //     .attr("fill","#fdd0a2")
        //     .attr('opacity','0.5');

    });
}
//education function
function educationChart(zipSelect, container){

    // if(iscompare == 0){
        d3.select(container).selectAll('.waffleChart').remove();
    // }

    d3.csv('data/filteredEducation.csv', function(education){

        var ed;
        for (var i = 0; i < education.length; i++) {
            if (education[i]['zip']==zipSelect){

                ed = education[i];
                // console.log(ed);
            }
        }

//waffleChart
        var total = 0;
        var width,
            height,
            widthSquares = 10,
            heightSquares = 10,
            squareSize = 8,
            squareValue = 0,
            gap = 0.6,
            theData = [];
        waffles = [];

        total = parseInt(ed['highSchoolGraduate'])+parseInt(ed['associateDegree'])+parseInt(ed['bachelorDegree'])+parseInt(ed['graduateDegree']);
        // console.log(total);

        squareValue = total / (widthSquares*heightSquares);

        theData = [parseInt(ed['highSchoolGraduate']),parseInt(ed['associateDegree']),parseInt(ed['bachelorDegree']),parseInt(ed['graduateDegree'])];
        // console.log(squareValue)


        theData.forEach(function(d, i)
        {
            // console.log(d/squareValue)
            var unit = Math.round(d/squareValue);
            // console.log(unit)
            waffles = waffles.concat(
                Array(unit+1).join(1).split('').map(function()
                {
                    return {  squareValue:squareValue,
                        units: unit,
                        value: d,
                        groupIndex: i};
                })
            );
        });
// console.log(waffles)

        width = (squareSize*widthSquares) + widthSquares*gap + 25;
        height = (squareSize*heightSquares) + heightSquares*gap + 25;


        var color = d3.scale.category10();

        var waffleChart = d3.select(container)
            .append('svg')
            .attr('class','waffleChart')
            .attr("width",width)
            .attr("height",height);


        waffleChart.append('g')
            .selectAll("div")
            .data(waffles)
            .enter()
            .append('rect')
            .attr("width",squareSize)
            .attr("height",squareSize)
            .attr("fill", function(d)
            {
                return color(d.groupIndex);
            })
            .attr("x",function(d,i){
                col = Math.floor(i/heightSquares);
                return (col*squareSize) + (col*gap);

            })
            .attr("y", function(d, i)
            {
                row = i%heightSquares;
                return (heightSquares*squareSize) - ((row*squareSize) + (row*gap));
            })
            .attr("opacity",0.8)
            .attr("rx", 3) // rounded corners
            .attr("ry", 3)
            .append("title")
            .text(function (d,i)
            {
                if(d.groupIndex == 0){
                    return "High School Graduates: " + " | " +  d.value + " , " + d.units + "%"
                }
                else if(d.groupIndex == 1){
                    return "Associate Degree: " +  " | " +  d.value + " , " + d.units + "%"}
                else if(d.groupIndex == 2){
                    return "Bachelor Degree: " +  " | " +  d.value + " , " + d.units + "%"
                }
                else{
                    return "Graduate or Higher Degree: " +  " | " +  d.value + " , " + d.units + "%"
                }
            });






    })
}


//insurance Chart
function insuranceChart(zipSelect, container){
    // if(iscompare == 0){
        d3.select(container).selectAll('.insuranceChart').remove();
    // }



    d3.csv('data/filteredInsurance.csv', function(insurance){

        var insValue;
        for (var i = 0; i < insurance.length; i++) {
            if (insurance[i]['zip']==zipSelect){
                insValue = insurance[i]['percentInsured'];
            }
        }


        var margin = {
            top: 15,
            right: 10,
            bottom: 50,
            left: 80
        };

        d3.select(container)
            .append('svg')
            .attr('width', $(container).width())
            .attr('height',$(container).height())
            .attr('class','insuranceChart')
            .append("text")
            .attr('x', "50%")
            .attr('y', "70%")
            // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .style("text-anchor", "middle")
            // .attr('fill', '#df65b0')
            .text(function(d){
                return "People Insured: " + insValue + "%";
            })
            // .call(wrap, );



    })
}



//    show grcoery in details
function groceryNumber(zipSelect,container) {


    // if(iscompare == 0){
        d3.select(container).selectAll('.groceryNumber').remove();
    // }
    d3.csv('data/groceryStores.csv', function (grocery) {

        groceryByZIP = d3.nest()
            .key(function (d) { return d.ZIPCODE })
            .rollup(function (v) { return v.length })
            .entries(grocery);

        var groceryValue;
        for (var i = 0; i < groceryByZIP.length; i++){
            if (groceryByZIP[i]["key"] == zipSelect){
                groceryValue = groceryByZIP[i]["values"];
            }
        }


        d3.select(container)
            .append('svg')
            .attr('width', $(container).width())
            .attr('height',$(container).height())
            .attr('class','groceryNumber')
            .append("text")
            .attr('x', "50%")
            .attr('y', "70%")
            .style("text-anchor", "middle")
            // .attr('fill', '#006d2c')
            .text(function(d){
                console.log(groceryValue)
                if(typeof groceryValue === "undefined"){
                    return "Grocery Stores: " + 0;
                }
                else{
                return "Grocery Stores: " + groceryValue;}
            });

    })
}
//    show grcoery in details end

// cancer Pyramind Chart starts
function cancerPyramindChart(zipSelect, container) {

    // if(iscompare == 0){
    d3.select(container).select('.cancerPlots').remove();
    // }
    var width = $(container).width()/1.2;
    var height = $(container).height()/1.2;

    var margin = {
        top: 30,
        right: 50,
        bottom: 50,
        left: 30
    };

    margin.middle = 60;

    var regionWidth = width/2 - margin.middle;

    var pointA = regionWidth,
        pointB = width - regionWidth;

    d3.json('data/cancerTypesCount.json', function (cancerTypesCount) {

    console.log(cancerTypesCount);
        var cancerCount = [];
        for(var i=0; i<cancerTypesCount.length; i++) {
            if (cancerTypesCount[i].zip == zipSelect) {
                // console.log(cancerTypesCount[i].zip)
                cancerCount = (cancerTypesCount[i].properties);
            }
        }

    var maxValue = Math.max(
        d3.max(cancerCount, function (d) { return d.male}),
        d3.max(cancerCount, function (d) { return d.female})
    );
        console.log(cancerCount)

    var stackedCancerChart = d3.select(container)
        .append("svg")
        .attr('class','cancerPlots')
        .attr("width", margin.left + width + margin.right )
        .attr("height", margin.top + height + margin.bottom )
        .append("g")
        .attr('class', 'cancer-plot-inner-region')
        .attr('transform','translate(' + margin.left + ',0)');

// SET UP SCALES

// the xScale goes from 0 to the width of a region
//  it will be reversed for the left x-axis

    var xScale = d3.scale.linear()
        .domain([0,400])
            // , d3.max(cancerCount, function (d) { return d.Males + d.Females})])
        .range([0,width])
        .nice();

    // var xScaleLeft = d3.scale.linear()
    //     .domain([0, 200])
    //     .range([regionWidth, 0]);
    //
    // var xScaleRight = d3.scale.linear()
    //     .domain([0, 200])
    //     .range([0, regionWidth]);

    var yScale = d3.scale.ordinal()
        .domain(cancerCount.map(function(d) { return d.type; }))
        .rangeRoundBands([height,0], 0.1);


    var color = d3.scale.ordinal()
        .range(["#C9A0A9","#84AFDD"]);



    var segments = ['Females','Males'];
    cancerCount.sort(function(a, b) { return b.total - a.total; });

    color.domain(segments)

    var layers = d3.layout.stack()(segments.map(function (c) {
        return cancerCount.map(function (d){
            return {x: d['type'], y: +d[c], component: c};
        })
    }))
    console.log(layers);




        stackedCancerChart.append('g')
        .selectAll('g')
        .data(layers)
        .enter().append('g')

        .attr('class', 'cancerTypeStackedChart')
        .attr('fill', function (d,i) {
            return color(i)
        })
        .selectAll('rect')
        .data(function (d) {
            return d
        })
        .enter().append("rect")
        .attr("y", function(d) { return yScale(d.x); })
        .attr("x", function(d) {return xScale(d.y0); })
        .attr("width", function(d) {return xScale(d.y) })
        .attr("height", yScale.rangeBand())
        .on("mouseover", function (d) {

            tooltipCancerPlot.transition()
                .duration(200)
                .style("opacity",0.9);

            tooltipCancerPlot.html(d.component+ ": " + d.y )
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY+18) + "px");
        })
        .on("mouseout", function(d) {
            tooltipCancerPlot.transition()
                .duration(500)
                .style("opacity", 0);

        });



// SET UP AXES
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('right')
        .tickSize(4,0);
        // .tickPadding(margin.middle - 4);
//
//     var yAxisRight = d3.svg.axis()
//         .scale(yScale)
//         .orient('left')
//         .tickSize(4,0)
//         .tickFormat('');
//
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .ticks(5)
        .tickFormat(d3.format(''));
//
//     var xAxisLeft = d3.svg.axis()
//     // REVERSE THE X-AXIS SCALE ON THE LEFT SIDE BY REVERSING THE RANGE
//         .scale(xScale.copy().range([pointA, 0]))
//         .orient('bottom')
//         .ticks(3)
//         .tickFormat(d3.format(''));

    // MAKE GROUPS FOR EACH SIDE OF CHART
// scale(-1,1) is used to reverse the left side so the bars grow left instead of right
//     var leftBarGroup = pyramidChart.append('g')
//         .attr('transform', translation(pointA, 0) + 'scale(-1,1)');
//     var rightBarGroup = pyramidChart.append('g')
//         .attr('transform', translation(pointB, 0));
//
//     // DRAW AXES
//     d3.select('#cancerTypes1').append('g')
//         .attr('class', 'axis y left')
//         .attr('transform', 'translate(0, 0)')
//         .call(yAxis)
//         .selectAll('text')
//         .attr('transform', 'translate(' + $('#cancerTypes1').width() + ', 0)')
//         .style('text-anchor', 'middle')
//         .call(wrap, $('#cancerTypes1').width());

//
//
//
// //
    stackedCancerChart.append('g')
        .attr('class', 'axis y cancertype')
        .attr('transform', 'translate(0, 0)')
        .call(yAxis);

    stackedCancerChart.append('g')
        .attr('class', 'axis x')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis);
//
//     pyramidChart.append('g')
//         .attr('class', 'axis x right')
//         .attr('transform', translation(pointB, height))
//         .call(xAxisRight);

    var tooltipCancerPlot = d3.select("#tooltip-cancer-plot")
        .attr("class", "tooltip")
        .style("opacity", 0);

//----------------------------------------------------
//     var segments = ['male', 'female']

        // var series = d3.layout.stack().keys(cancerCount.columns.slice(1))(cancerCount)
        // console.log(series)
    //
    //     var layers = d3.layout.stack()(segments.map(function (c) {
    //         return cancerCount.map(function (d) {
    //             return {x: [d.type], y: +d[c], component: c};
    //         });
    //     }));
    //
    //     console.log(layers);
    //
    //     // color.domain(segmentsStacked);
    //
    //     var tooltipRacePlot = d3.select("#tooltip-race-plot")
    //         .attr("class", "tooltip")
    //         .style("opacity", 0);
    //
    //     // xScale.domain([0, d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})]).nice();
    //     xScale.domain([0, 100]).nice();
    //     yScale.domain(layers[0].map(function(d) { return d.x; }));
    //
    //
    //     d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})
    //
    //     //----------------------------------------------------
    //
    //     leftBarGroup.selectAll('.bar.left')
    //     .data(layers)
    //     .enter().append('rect')
    //     .attr('class', 'bar left')
    //         .attr("y", function(d) { return yScale(d.x); })
    //         .attr("x", function(d) {return xScale(d.y0); })
    //         .attr("width", function(d) {return xScale(d.y); })
    //         .attr("height", yScale.rangeBand())
    //     // .attr('x', 0)
    //     // .attr('y', function(d) { return yScale(d.type); })
    //     // .attr('width', function(d) { return xScale(d.male); })
    //     // .attr('height', yScale.rangeBand())
    //     .on("mouseover", function (d) {
    //
    //         tooltipCancerPlot.transition()
    //             .duration(200)
    //             .style("opacity",0.9);
    //
    //         tooltipCancerPlot.html("Males: " + d.male )
    //             .style("left", (d3.event.pageX) + "px")
    //             .style("top", (d3.event.pageY+18) + "px");
    //     })
    //     .on("mouseout", function(d) {
    //         tooltipCancerPlot.transition()
    //             .duration(500)
    //             .style("opacity", 0);
    //
    //     });
    //
    // rightBarGroup.selectAll('.bar.right')
    //     .data(cancerCount)
    //     .enter().append('rect')
    //     .attr('class', 'bar right')
    //     .attr('x', 0)
    //     .attr('y', function(d) { return yScale(d.type); })
    //     .attr('width', function(d) { return xScale(d.female); })
    //     .attr('height', yScale.rangeBand())
    //     .on("mouseover", function (d) {
    //
    //         tooltipCancerPlot.transition()
    //             .duration(200)
    //             .style("opacity",0.9);
    //
    //         tooltipCancerPlot.html("Females: " + d.female )
    //             .style("left", (d3.event.pageX) + "px")
    //             .style("top", (d3.event.pageY+18) + "px");
    //     })
    //     .on("mouseout", function(d) {
    //         tooltipCancerPlot.transition()
    //             .duration(500)
    //             .style("opacity", 0);
    //
    //     });
    //
    //
    // function translation(x,y) {
    //     return 'translate(' + x + ',' + y + ')';
    // }
    //
    })

}
// cancer Pyramind Chart ends


//Race distribution chart starts
function raceChart(zipSelect,container) {

    // if(iscompare == 0){
        d3.select(container).selectAll('.racePlot').remove();
        d3.selectAll('.raceHeading').remove();
        d3.selectAll('.raceLabel').remove();
    // }



    d3.select('#raceHeading1')
        .append('svg')
        .attr('width', $('#raceHeading1').width())
        .attr('height',$('#raceHeading1').height())
        .attr('class','raceHeading')
        .append('text')
        .attr('x', "50%")
        .attr('y', "70%")
        .style("text-anchor", "middle")
        .attr('fill', 'black')
        .text("Race Distribution");




    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = $(container).width() - margin.left - margin.right,
        height = $(container).height() - margin.top - margin.bottom;


    var raceChart = d3.select(container)
        .append("svg")
        .attr("width", $(container).width())
        .attr("height", $(container).height())
        .attr("class", "racePlot")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xScale = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var yScale = d3.scale.linear()
        .rangeRound([0, height]);

    var color = d3.scale.ordinal()
        .range(["#80b1d3","#8dd3c7", "#bebada", "#fb8072", "#b3de69", "#fdb462"]);
        // .range(["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc"]);
        // .range(["#c7001e", "#f6a580", "#cccccc", "#92c6db", "#086fad", "#99000d"]);


    // var yAxis = d3.svg.axis()
    //     .scale(yScale)
    //     .orient("left")
    //     .tickSize(3.6)
    //     .tickFormat(d3.format(".2s")); // for the stacked totals version
    //
    //
    // var xxAxis = d3.svg.axis()
    //     .scale(xScale)
    //     .orient("bottom");



    var stack = d3.layout.stack();
    var segmentsStacked = ['White', 'African American', 'Native Americans', 'Asian', 'Native Hawaiian', 'Others'];

    d3.csv("data/filteredRace.csv", function(race) {

        console.log(race);
        var raceOriginalDataZipSelect;
        // var raceTemp = [];
        var raceCount = [];
        for(var i =0; i<race.length;i++){

            if(+(race[i]["zip"]) == zipSelect){
                var total = +(race[i]["White"]) + +(race[i]["African American"]) + +(race[i]["Native Americans"]) + +(race[i]["Asian"]) + +(race[i]["Native Hawaiian"]) + +(race[i]["Others"]);
                // console.log(total)
                // var total = 114129;
                raceOriginalDataZipSelect = race[i];
                race[i]["White"] = ((+(race[i]["White"])/total) *100).toFixed(2);
                race[i]["African American"] = ((+(race[i]["African American"])/total) *100).toFixed(2);
                race[i]["Native Americans"] = ((+(race[i]["Native Americans"])/total) *100).toFixed(2);
                race[i]["Asian"] = ((+(race[i]["Asian"])/total) *100).toFixed(2);
                race[i]["Native Hawaiian"] = ((+(race[i]["Native Hawaiian"])/total) *100).toFixed(2);
                race[i]["Others"] = ((+(race[i]["Others"])/total) *100).toFixed(2);

                raceCount.push(race[i]);
            }
        }

        console.log(raceOriginalDataZipSelect)

        var layers = d3.layout.stack()(segmentsStacked.map(function (c) {
            return raceCount.map(function (d) {
                return {x: +[d.zip], y: +d[c], component: c};
            });
        }));

    console.log(layers);

    color.domain(segmentsStacked);

        var tooltipRacePlot = d3.select("#tooltip-race-plot")
            .attr("class", "tooltip")
            .style("opacity", 0);

    // xScale.domain([0, d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})]).nice();
    yScale.domain([0, 100]).nice();
    xScale.domain(layers[0].map(function(d) { return d.x; }));


       d3.max(layers, function(d) {return d[0]["y"] + d[0]["y0"];})


        var layer = raceChart.selectAll(".layers")
        .data(layers)
        .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d,i) {
                return color(i);
        });
        // .attr("transform", "translate(0,0)");

    layer.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return xScale(d.x); })
        .attr("y", function(d) {return yScale(d.y0 ); })
        .attr("height", function(d) {return yScale(d.y + d.y0); })
        .attr("width", xScale.rangeBand())
        .on("mouseover", function (d) {

            tooltipRacePlot.transition()
                .duration(200)
                .style("opacity",0.9);
                var raceTooltipValue = (d["y"] * (total/100)).toFixed(0);
                // var raceTooltipValue = Math.round((d["y"] * (total/100)).toFixed(0) / 1000) *1000;
            tooltipRacePlot.html(d["component"] + " : " + raceTooltipValue )
                .style("left", (d3.event.pageX-30) + "px")
                .style("top", (d3.event.pageY+18) + "px");
        })
        .on("mouseout", function(d) {
            tooltipRacePlot.transition()
                .duration(500)
                .style("opacity", 0);

        });;

    // raceChart.append("g")
    //     .attr("class","x axis")
    //     .attr("transform", "translate(0,0)")
    //     .attr("opacity", "0.5")
    //     .call(yAxis);
    //
    //
    // raceChart.append("g")
    //     .attr("class", "axis axis--y")
    //     .attr("transform", "translate(" + 0 + ",0)")
    //     .call(xAxis);


        var dataL = 0;
        var offset = 40;

    var raceLegend = d3.select('#raceLabel1')
        .append('svg')
        .attr('width', $('#raceLabel1').width())
        .attr('height',$('#raceLabel1').height())
        .attr('class','raceLabel')
        .append("g")
        .attr("transform", "translate(25," + margin.top + ")")
        .selectAll("g")
        .data(segmentsStacked)
        .enter().append("g")
        .attr("transform", function(d, i) {
            if (i === 0) {
                dataL = d.length + offset;
                return "translate(5,0)"
            } else {
                var newdataL = dataL;
                // console.log(d.length)
                dataL +=  d.length + offset;
                return "translate(5," + (newdataL) + ")"
            }

        });

        // Create rectangles for each legend g
        // Pass rect index to Z color ordinal scale
        raceLegend.append("rect")
            .attr("x", 0)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", color);

        // var dataL = 0;
        // var offset = 80;

        // Create text for each legend g
        // Use the data that it inherts to create the SVG text
        raceLegend.append("g")
            .attr("transform", "translate(20,0)")
            .append("text")
            .attr("class", "text")
            .attr("text-anchor", "start")
            .attr("x", 30)
            .attr("y", 10)
            .attr("dy", "0.32em")
            .text(function(d) { return d; })
            .call(wrap, offset);

    });

}
//Race distribution chart ends

//compare tabs
function compareZip(){

    iscompare = 1;
    // updateMap(cancerType);
    d3.select('.compareButton')
        .style('background-color',"#9ecae1");

    //
    // $('#zipHeading1').addClass('compare');
    // $('#cancerPlots1').addClass('compare');
    // $('#groceryNumber1').addClass('compare');
    // $('#incomePlot1').addClass('compare');
    // $('#insurancePlot1').addClass('compare');
    // $('#racePlot1').addClass('compare');
    // $('#educationPlot1').addClass('compare');

    // console.log(zipSelected)
    // console.log(zipSelected2)

    if(zipSelected == ""){

    }
    else {
        zipHeading(zipSelected, '#zipHeading1');
        insuranceChart(zipSelected, '#insurancePlot1');
        populationNumber(zipSelected, '#totalPopulation1');
        incomeChart(zipSelected, '#incomePlot1');
        educationChart(zipSelected, '#educationrPlot1');
        groceryNumber(zipSelected, '#groceryNumber1');
        cancerPyramindChart(zipSelected, '#cancerPlots1');
        raceChart(zipSelected, '#racePlot1');

        lastChanged = 1;
    }


}


//overview tab
function overview(){
    iscompare = 0;

    d3.select('.compareButton')
        .style('background-color',"white");

    // d3.select('.resetButton')
    //     .style('background-color',"#9ecae1");

    // d3.selectAll('.waffleChart').remove();
    // d3.selectAll('.insuranceChart').remove();
    // d3.selectAll('.incomeChart').remove();
    // d3.selectAll('.zipHeading').remove();

    d3.selectAll('.zipHeading').remove();
    d3.selectAll('.populationNumber').remove();
    d3.selectAll('.cancerPlots').remove();
    d3.selectAll('.incomeNumber').remove();
    d3.selectAll('.income-heading').remove();
    d3.selectAll('.waffleChart').remove();
    d3.selectAll('.insuranceChart').remove();
    d3.selectAll('.racePlot').remove();
    d3.selectAll('.raceHeading').remove();
    d3.selectAll('.raceLabel').remove();
    d3.selectAll('.groceryNumber').remove();


    d3.selectAll(".clicked1")
        .classed("clicked1", false)
        .style('stroke', '#636363')
        .style('stroke-width', "1px");

    d3.selectAll(".clicked2")
        .classed("clicked2", false)
        .style('stroke', '#636363')
        .style('stroke-width', "1px");

    //
    // $('#zipHeading1').removeClass('compare');
    // $('#cancerPlots1').removeClass('compare');
    // $('#groceryNumber1').removeClass('compare');
    // $('#incomePlot1').removeClass('compare');
    // $('#insurancePlot1').removeClass('compare');
    // $('#racePlot1').removeClass('compare');
    // $('#educationPlot1').removeClass('compare');


    zipSelected2 = "";
    zipSelected = "";



}


//View Heading
function zipHeading(zipSelect, container){
    // if(iscompare == 0){
        d3.select(container).selectAll('.zipHeading').remove();
    // }

    d3.select(container)
        .append('svg')
        .attr('width',$(container).width())
        .attr('height',$(container).height())
        .attr('class','zipHeading')
        .append("text")
        .attr('x', "50%")
        .attr('y', "40%")
        .style("text-anchor", "middle")
        .attr('fill', 'black')
        .attr('font-size', "large")
        .text(function(d){
            return "Zip: " + zipSelect;
        });

}
