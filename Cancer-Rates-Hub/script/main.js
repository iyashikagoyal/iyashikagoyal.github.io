var data;
var cancerType ="Total Cancer";
var zipSelected ="";
var zipSelected2 = "";
var iscompare = 0;
var lastChanged = 2;
var groceryFlag = 0;
var incomeFlag = 0;
var educationFlag = 0;


var color = d3.scale.quantile()
        .range(["#ffffff","f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252"]);

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
d3.json("data/mapChicago.geojson", function(json) {

     var dropdownChange = function() {
        var cancerType = d3.select(this).property('value');
        updateMap(cancerType);
        legendUpdate(cancerType);

        if(educationFlag == 1){
            educationFlag = 0;
            showEducationSideBar();
        }

        if(groceryFlag == 1){
            groceryFlag = 0;
            showGrocerySideBar();
        }

        if(incomeFlag == 1){
            incomeFlag = 0;
            showIncomeSideBar();
        }
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
                    if(typeof d.properties.totalCancer === "undefined"){d.properties.totalCancer = 0;}
                    var val = d.properties.totalCancer/ d.properties.totalPopulation * 10000;
                    color.domain([100,400]);
                    return color(val);}
                else if(cancerType=="Cervix"){
                    color.domain([0,8]);
                    if(typeof d.properties.cervix === "undefined"){d.properties.cervix = 0;}
                    var val = d.properties.cervix/ d.properties.totalPopulation * 10000;

                    return color(val);}
                else if(cancerType == "Nervous"){
                    if(typeof d.properties.nervous === "undefined"){d.properties.nervous = 0;}
                    var val = d.properties.nervous/ d.properties.totalPopulation * 10000;

                    color.domain([0,8]);
                    return color(val);}
                else if(cancerType == "Colorectal"){
                    if(typeof d.properties.colorectal === "undefined"){d.properties.colorectal = 0;}
                    var val = d.properties.colorectal/ d.properties.totalPopulation * 10000;

                    color.domain([0,55]);
                    return color(val);}
                else if(cancerType == "Lung and Bronchus"){
                    if(typeof d.properties.totalCancer === "lungBron"){d.properties.lungBron = 0;}
                    var val = d.properties.lungBron/ d.properties.totalPopulation * 10000;

                    color.domain([0,66]);
                    return color(val);}
                else{
                    if(typeof d.properties.breastInSitu === "undefined"){d.properties.breastInSitu = 0;}
                    var val = d.properties.breastInSitu/ d.properties.totalPopulation * 10000;

                    color.domain([0, 25]);
                    return color(val);}
            })
            .style("stroke", "#636363")
            .style('stroke-width', "1px")
            .on('mouseover', function(d){
                tooltip.transition()
                    .duration(200)
                    .style("opacity",0.9);

                if(cancerType=="Total Cancer"){

                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidences: " + d.properties.totalCancer + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Cancer Rate: " + Math.round(d.properties.totalCancer/d.properties.totalPopulation *10000)  )
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else if(cancerType=="Cervix"){
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidences: " + d.properties.cervix + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Cancer Rate: " + Math.round(d.properties.cervix/d.properties.totalPopulation *10000))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else if(cancerType == "Nervous"){
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidences: " + d.properties.nervous + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Cancer Rate: " + Math.round(d.properties.nervous/d.properties.totalPopulation *10000))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else if(cancerType == "Colorectal"){
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidences: " + d.properties.colorectal + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Cancer Rate: " + Math.round(d.properties.colorectal/d.properties.totalPopulation *10000))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else if(cancerType == "Lung and Bronchus"){
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidences: " + d.properties.lungBron + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Cancer Rate: " + Math.round(d.properties.lungBron/d.properties.totalPopulation *10000))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY+18) + "px");}
                else{
                    tooltip.html("Zip: \n" + d.properties.zip + "<br>" + "Cancer Incidences: " + d.properties.breastInSitu + "<br>" + "Total Population: " + d.properties.totalPopulation + "<br>"
                        + "Cancer Rate: " + Math.round(d.properties.breastInSitu/d.properties.totalPopulation *10000))
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
                    groceryNumber(zipSelected, '#groceryNumber1');
                    cancerPyramindChart(zipSelected, '#cancerPlots1');
                    raceChart(zipSelected, '#racePlot1');

                }
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
            .text('Cancer Rates (per 10000)');



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
                .domain([100,400]);
        }
        else if(cancerType=="Cervix"){

            var y = d3.scale.linear()
                .range([h, 0])
                .domain([0,8]);
        }
        else if(cancerType == "Nervous"){
            var y = d3.scale.linear()
                .range([h, 0])
                .domain([0,10]);
            }
        else if(cancerType == "Colorectal"){
            var y = d3.scale.linear()
                .range([h, 0])
                .domain([0,60]);
        }
        else if(cancerType == "Lung and Bronchus"){
            var y = d3.scale.linear()
                .range([h, 0])
                .domain([0,70]);
           }
        else{
            var y = d3.scale.linear()
                .range([h, 0])
                .domain([0,25]);
        }


        var yAxis = d3.svg.axis().scale(y).orient("right").ticks(8).tickSize(8,0);


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

 function  showGrocerySideBar(){
        if(groceryFlag == 0){

            svg.selectAll(".groceryCircle").remove();


            d3.selectAll('.grocery-legend').remove()
            d3.selectAll('#grocery-legend-text').remove()

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

                        legendText = ['<= 5', '> 5 & <= 19', '> 20']


                        legendGrocery.append("text")
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

            d3.selectAll('.income-path').remove()
            d3.selectAll('.income-legend').remove()
            d3.selectAll('#income-legend-text').remove()


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


                    legendText = ['+50% ', ' Avg', '-25%', '-50%', '-75%']
                    legendIncome.append("text")
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

        incomeSlider();
    }

    function incomeSlider() {
        d3.select("#income-range").on("input", function () {

            var sliderValue = d3.select("#income-range").property("value") / 100;

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

            d3.selectAll('.education-path').remove()
            d3.selectAll('.education-legend').remove()
            d3.selectAll('.education-legend-heading').remove()

            d3.select(".educationButton")
                .style("background-color", "#a1d99b");

            d3.csv('data/filteredEducationTotal.csv', function (edTotal) {

                    var color = d3.scale.quantile()
                       .range(["#f2f0f7","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3"]);

                    color.domain([65, 97]);


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
                                var scale = 0.965;
                                return "translate(" + x + "," + y + ")"
                                    + "scale(" + scale + ")"
                                    + "translate(" + -x + "," + -y + ")";
                            }
                        })
                        .style('fill', function (d) {
                            var educatedPeopleRate;
                            for (var i = 0; i < edTotal.length; i++) {
                                if (edTotal[i].zip == +(d.properties.zip)) {
                                    educatedPeopleRate = edTotal[i].total_educated_population/edTotal[i].totalPopulation * 100;
                                }
                            }
                            console.log(educatedPeopleRate);
                            return color(educatedPeopleRate);
                        })
                        .style("opacity", 1);


                var w = 120, h= 120;

                d3.select(".map").append('g')
                    .attr("width",40)
                    .attr("height",50)
                    .attr("class","text education-legend-heading")
                    .append('text')
                    .attr("x","20%")
                    .attr("y","68%")
                    .attr("font-size",'12px')
                    .text('Education Rate(per 100)');


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
                    .domain([60, 100]);

                var yAxis = d3.svg.axis().scale(y).orient("right").ticks(6).tickSize(6,0);

                key.append("g")
                    .attr("class", "yaxis")
                    .attr("transform", "translate(115,460)")
                    .call(yAxis);

                })

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

    d3.select(container).selectAll('.populationNumber').remove();


    d3.csv('data/filteredPopulation.csv', function (population) {

        var populationCount = 0;
        for (var i = 0; i < population.length; i++) {
            if (population[i]['zip']==zipSelect){

                populationCount = population[i]['totalPopulation'];
                console.log(zipSelect);
            }
        }

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

function incomeChart(zipSelect, container){

    d3.select(container).selectAll('.incomeNumber').remove();
    d3.selectAll('.income-heading').remove();



    d3.csv('data/filteredIncome.csv',function(income){


        var medianIncome = 0;
        for (var i = 0; i < income.length; i++) {
            if (income[i]['zip']==zipSelect){

                medianIncome = income[i]['medianIncome'];
                console.log(zipSelect);
            }
        }

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

    });
}

//insurance Chart
function insuranceChart(zipSelect, container){

    d3.select(container).selectAll('.insuranceChart').remove();




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
            .style("text-anchor", "middle")
            .text(function(d){
                return "People Insured: " + insValue + "%";
            })
    })
}


//    show grocery in details
function groceryNumber(zipSelect,container) {

    d3.select(container).selectAll('.groceryNumber').remove();

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
                // console.log(groceryValue)
                if(typeof groceryValue === "undefined"){
                    return "Grocery Stores: " + 0;
                }
                else{
                return "Grocery Stores: " + groceryValue;}
            });

    })
}
//show grocery in details end

// cancer Pyramind Chart starts
function cancerPyramindChart(zipSelect, container) {


    d3.select(container).select('.cancerPlots').remove();

    var width = $(container).width()/1.2;
    var height = $(container).height()/1.2;

    var margin = {
        top: 30,
        right: 50,
        bottom: 50,
        left: 30
    };

    d3.json('data/cancerTypesCount.json', function (cancerTypesCount) {

        var cancerCount = [];
        for(var i=0; i<cancerTypesCount.length; i++) {
            if (cancerTypesCount[i].zip == zipSelect) {
                cancerCount = (cancerTypesCount[i].properties);
            }
        }

    var stackedCancerChart = d3.select(container)
        .append("svg")
        .attr('class','cancerPlots')
        .attr("width", margin.left + width + margin.right )
        .attr("height", margin.top + height + margin.bottom )
        .append("g")
        .attr('class', 'cancer-plot-inner-region')
        .attr('transform','translate(' + margin.left + ',0)');

// SET UP SCALES

    var xScale = d3.scale.linear()
        .domain([0,400])
        .range([0,width])
        .nice();

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

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .ticks(5)
        .tickFormat(d3.format(''));



    stackedCancerChart.append('g')
        .attr('class', 'axis y cancertype')
        .attr('transform', 'translate(0, 0)')
        .call(yAxis);

    stackedCancerChart.append('g')
        .attr('class', 'axis x')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis);



    var tooltipCancerPlot = d3.select("#tooltip-cancer-plot")
        .attr("class", "tooltip")
        .style("opacity", 0);

    })

}
// cancer Pyramind Chart ends


//Race distribution chart starts
function raceChart(zipSelect,container) {


    d3.select(container).selectAll('.racePlot').remove();
    d3.selectAll('.raceHeading').remove();
    d3.selectAll('.raceLabel').remove();


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


    var stack = d3.layout.stack();
    var segmentsStacked = ['White', 'African American', 'Native Americans', 'Asian', 'Native Hawaiian', 'Others'];

    d3.csv("data/filteredRace.csv", function(race) {


        var raceOriginalDataZipSelect;

        var raceCount = [];
        for(var i =0; i<race.length;i++){

            if(+(race[i]["zip"]) == zipSelect){
                var total = +(race[i]["White"]) + +(race[i]["African American"]) + +(race[i]["Native Americans"]) + +(race[i]["Asian"]) + +(race[i]["Native Hawaiian"]) + +(race[i]["Others"]);

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


        var layers = d3.layout.stack()(segmentsStacked.map(function (c) {
            return raceCount.map(function (d) {
                return {x: +[d.zip], y: +d[c], component: c};
            });
        }));



    color.domain(segmentsStacked);

        var tooltipRacePlot = d3.select("#tooltip-race-plot")
            .attr("class", "tooltip")
            .style("opacity", 0);

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

                tooltipRacePlot.html(d["component"] + " : " + raceTooltipValue )
                .style("left", (d3.event.pageX-30) + "px")
                .style("top", (d3.event.pageY+18) + "px");
        })
        .on("mouseout", function(d) {
            tooltipRacePlot.transition()
                .duration(500)
                .style("opacity", 0);

        });;



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

        raceLegend.append("rect")
            .attr("x", 0)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", color);

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

    d3.select('.compareButton')
        .style('background-color',"#9ecae1");


    if(zipSelected == ""){

    }
    else {
        zipHeading(zipSelected, '#zipHeading1');
        insuranceChart(zipSelected, '#insurancePlot1');
        populationNumber(zipSelected, '#totalPopulation1');
        incomeChart(zipSelected, '#incomePlot1');
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


    zipSelected2 = "";
    zipSelected = "";



}


//View Heading
function zipHeading(zipSelect, container){

    d3.select(container).selectAll('.zipHeading').remove();


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
