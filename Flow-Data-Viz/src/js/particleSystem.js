"use strict";

/* Get or create the application global variable */
var App = App || {};

var ParticleSystem = function() {

    // setup the pointer to the scope 'this' variable
    var self = this;

    // data container
    var data = [];
    var bounds = {};
    var pointCloud ;
    var color = d3.scaleLinear()
                .domain([0,40])
                .range(["#9ecae1", "#084594"]);

    var greyColor = d3.scaleLinear()
                    .domain([0,40])
                    .range(["#ffffff", "#525252"])

    var darkColor = d3.scaleLinear()
                    .domain([0,40])
                    .range(["#a50f15", "#67000d"]);



    // scene graph group for the particle system
    var sceneObject = new THREE.Group();

    // bounds of the data


    // create the containment box.
    // This cylinder is only to guide development.
    // TODO: Remove after the data has been rendered
    self.drawContainment = function() {

        // get the radius and height based on the data bounds
        var radius = (bounds.maxX - bounds.minX)/2.0 + 1;
        var height = (bounds.maxY - bounds.minY) + 1;

        // create a cylinder to contain the particle system
        var geometry = new THREE.CylinderGeometry( radius, radius, height, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );
        var cylinder = new THREE.Mesh( geometry, material );

        // add the containment to the scene
        sceneObject.add(cylinder);
    };


    // creates the particle system
    self.createParticleSystem = function() {

        // use self.data to create the particle system
//        console.log(data)
        var geometry = new THREE.Geometry();


        for (var i =0; i < data.length; i++){
            geometry.vertices.push(
                new THREE.Vector3(data[i].X, data[i].Y-5, data[i].Z))
            geometry.colors.push(new THREE.Color(color(data[i].concentration)))
        }

        var material = new THREE.PointsMaterial({size : 0.04, vertexColors: THREE.VertexColors})
        pointCloud = new THREE.Points(geometry, material)
        sceneObject.add(pointCloud)
        }

        var plane_geometry = new THREE.PlaneGeometry( 15, 11, 0 );
        var plane_material = new THREE.MeshBasicMaterial( {color: '#e5f5f9', side: THREE.DoubleSide, transparent: true, opacity:0.24} );

        var plane = new THREE.Mesh( plane_geometry, plane_material );
//        plane.position.z = -3.31702;
        sceneObject.add( plane );


        function getFilteredData(zPosition){

            var filteredData = []
            var fcolor = [];

    //        console.log(zPosition)
            for(var i=0; i<data.length; i++){
                var temp = Math.abs(data[i].Z - zPosition)
                if(temp < 0.04){
    //                var colors = new THREE.Color(color(data[i].concentration))
//

                    filteredData.push(data[i])
                    fcolor.push(new THREE.Color(darkColor(data[i].concentration)))
                    }
                else
                {
                    fcolor.push(new THREE.Color(greyColor(data[i].concentration)))
                }};
            pointCloud.geometry.colors = fcolor
            pointCloud.geometry.colorsNeedUpdate = true;



            d3.selectAll(".svg > *").remove();

            d3.select('.svg').append('g')
                .selectAll('circle').data(filteredData)
                .enter().append('circle')
                .attr('cx', function(d){return  ((d.X - bounds.minX) / (bounds.maxX - bounds.minX) * 700);})
                .attr('cy', function(d){return  ((d.Y - bounds.minY) / (bounds.maxY - bounds.minY) * 600);})
                .attr('r','5')
                .attr('fill', function(d){return color(d.concentration)})



        };

        document.addEventListener("keydown", function keyPress(event){
            var key = event.keyCode;
            if(key == 83){
                plane.position.z += 0.05;
                var zPosition =  plane.position.z;
                getFilteredData(zPosition);

            }
            else if(key == 65){

                plane.position.z -=0.05;
                var zPosition =  plane.position.z;
                getFilteredData(zPosition);

            }
        }, false)

    // data loading function
    self.loadData = function(file){

        // read the csv file
        d3.csv(file)
        // iterate over the rows of the csv file
            .row(function(d) {

                // get the min bounds
                bounds.minX = Math.min(bounds.minX || Infinity, d.Points0);
                bounds.minZ = Math.min(bounds.minZ || Infinity, d.Points1);
                bounds.minY = Math.min(bounds.minY || Infinity, d.Points2);

                // get the max bounds
                bounds.maxX = Math.max(bounds.maxX || -Infinity, d.Points0);
                bounds.maxZ = Math.max(bounds.maxZ || -Infinity, d.Points1);
                bounds.maxY = Math.max(bounds.maxY || -Infinity, d.Points2);

                // add the element to the data collection
                data.push({
                    // concentration density
                    concentration: Number(d.concentration),
                    // Position
                    X: Number(d.Points0),
                    Z: Number(d.Points1),
                    Y: Number(d.Points2),
                    // Velocity
                    U: Number(d.velocity0),
                    V: Number(d.velocity1),
                    W: Number(d.velocity2)
                });
            })
            // when done loading
            .get(function() {
                // draw the containment cylinder
                // TODO: Remove after the data has been rendered
//                self.drawContainment();

                // create the particle system
                self.createParticleSystem();
            });
    };

    // publicly available functions
    var publiclyAvailable = {

        // load the data and setup the system
        initialize: function(file){
            self.loadData(file);
        },

        // accessor for the particle system
        getParticleSystems : function() {
            return sceneObject;
        }
    };

    return publiclyAvailable;

};