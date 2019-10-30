var map, view, graphicsLayer, activeGraphic, graphicsLayerLine, layer_1, layer_2, layer_3, layerList, legend, state, active_transact, pointGraphic, container,
    selected__contour, contour, Elevation, chart, seriesA, clearContent, addLoader, exp, wind, printWidget, window


require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Legend",
    "esri/geometry/Point",
    "esri/widgets/Expand",
    "esri/widgets/Track",
    "esri/layers/support/LabelClass",
    "esri/widgets/Print",
    // "esri/geometry/geometryEngine"
], function(Map, MapView, FeatureLayer, GraphicsLayer, Graphic, QueryTask, Query, BasemapToggle, Legend, Point, Expand, Track, LabelClass, Print) {



    map = new Map({
        basemap: "satellite"
    });

    view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-79.47034228448162, 33.00128049734469], // longitude, latitude
        zoom: 9,
        highlightOptions: {
            color: [255, 255, 0, 1],
            haloOpacity: 0.9,
            fillOpacity: 0.9
        }
    });




    var basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "streets"
    });

    view.ui.add(basemapToggle, "top-right");
    view.ui.remove("attribution");

    var track = new Track({
        view: view
    });
    view.ui.add(track, "top-left");


    // var print = new Print({
    //     view: view
    // });
    // // Adds widget below other elements in the top left corner of the view
    // view.ui.add(print, {
    //     position: "top-left"
    // });

    // function hideAddressBar() {
    //     // console.log(document.querySelector('.body').style.width)
    //     if (document.querySelector('body').style.width <= 600 + 'px') {
    //         if (document.documentElement.scrollHeight < window.outerHeight / window.devicePixelRatio)
    //             document.documentElement.style.height = (window.outerHeight / window.devicePixelRatio) + 'px';
    //         setTimeout(window.scrollTo(1, 1), 0);
    //         // document.querySelector('.title').style.backgroundColor = 'yellow'

    //     }
    // }



    // window.addEventListener("load", function() { hideAddressBar(); });
    // window.addEventListener("orientationchange", function() { hideAddressBar(); });


    selected__contour = 'upper'
    state = []
    state.printPosition = 'up'
    state.getAllYearsPointsForChart = []
    Elevation = [0, 0]
    contour = [0, 0]

    // state.graph = 'Up'
    state.transact_points = ['https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/0']
    state.selected__year = '2014'

    const beachLabelClass = new LabelClass({
        labelExpressionInfo: { expression: "$feature.NAME" },
        symbol: {
            type: "text",
            color: "black",
            font: { size: 8, weight: "bold" },
            haloSize: 2,
            haloColor: "white",



        },
        maxScale: 0,
        labelPlacement: "center-right"
    });
    var beachPoints = new FeatureLayer({
        url: `https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/5`,
        outFields: '*',
        labelingInfo: beachLabelClass
    });
    map.add(beachPoints);

    // var monument = new FeatureLayer({
    //     url: "https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/23",
    //     // outFields: '*',
    //     // labelingInfo: beachLabelClass
    // });
    // map.add(monument);


    let selected_2014_Layers = [

        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/2', //transact
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/1', //overLcontig
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/3', //gaps



    ]

    let selected_2015_Layers = [
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/8', //transact
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/7', //overLcontig
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/9', //gaps

    ]

    let selected_2016_Layers = [
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/13', //transact
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/12', //overLcontig
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/14', //gaps

    ]

    let selected_2017_Layers = [
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/17', //transact
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/16', //overLcontig
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/18', //gaps

    ]

    let selected_2018_Layers = [
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/21', //transact
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/20', //overLcontig
        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/22', //gaps
    ]

    // let selected_2019_Layers = [

    //     'https://giswebtest.dhec.sc.gov/arcgis/rest/services/environment/BERM16A/MapServer/8',//transact
    //     'https://giswebtest.dhec.sc.gov/arcgis/rest/services/environment/BERM16A/MapServer/7',//overLcontig
    //     'https://giswebtest.dhec.sc.gov/arcgis/rest/services/environment/BERM16A/MapServer/9',//gaps

    // ]

    let selected_all_Layers = [

        'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/10', //all transacts


    ]

    layerList = [layer_1, layer_2, layer_3]
        // localStorage.baseURL = JSON.stringify(layerList)


    drawLayers(selected_2014_Layers)
    if (document.querySelector('.year-2014').style != undefined) {
        document.querySelector('.year-2014').style.background = '#F05C5A';
    }



    function drawLayers(year) {
        state.Active_URL = year
        reset()
        for (let i = 0; i < year.length; i++) {
            layerList[i] = new FeatureLayer({
                url: year[i],
                outFields: '*'
            });
            map.add(layerList[i]);
        }



        if (!legend) {
            legend = new Expand({
                content: new Legend({
                    view: view,
                    style: "classic",
                    layout: "auto"
                }),
                view: view,
                expanded: false
            });
            view.ui.add(legend, "bottom-right");

        } else {
            view.ui.remove(legend);
            legend = new Expand({
                content: new Legend({
                    view: view,
                    style: "classic",
                    layout: "auto"
                }),
                view: view,
                expanded: false
            });
            view.ui.add(legend, "bottom-right");

        }

    }

    clearContent = function() {
        document.querySelector('.graph').innerHTML = ''
        contour = [0, 0]
    }


    addLoader = function() {
        contour = [0, 0]
        if (state.selected__year != '2019') {
            let img = document.createElement('img')
            img.src = "./img/blue-loader.gif"
            img.setAttribute('class', 'loader')
            document.querySelector('.graph').appendChild(img)
        } else if (state.selected__year === '2019') {

            let loaderComment = document.createElement('div')
            loaderComment.textContent = 'Data not available.'
            loaderComment.setAttribute('class', 'loaderComment')
            let img = document.createElement('img')
            img.src = "./img/blue-loader.gif"
            img.setAttribute('class', 'loader')
            document.querySelector('.graph').appendChild(img)
            document.querySelector('.graph').appendChild(loaderComment)
        }




    }

    // clearLoader = function() {
    //     const loader = document.querySelector('.loader')
    //     const loaderParent = loader.parentNode
    //     loaderParent.removeChild(loader)
    //     console.log(loaderParent)
    // }


    const hideAlert = () => {
        const el = document.querySelector('.alert');
        if (el) el.parentElement.removeChild(el);
    };

    const showAlert = (type, msg) => {
        hideAlert();
        const markup = `<div class="alert alert--${type}">${msg}</div>`;
        document.querySelector('.body').insertAdjacentHTML('afterbegin', markup);
        window.setTimeout(hideAlert, 5000);
        return
    };






    view.on("click", function(event) {


        view.hitTest(event).then(function(response) {

            if (response.results.length) {
                var graphic = response.results.filter(function(result) {

                    return result.graphic.layer === beachPoints || result.graphic.layer === layerList[0] || result.graphic.layer === selected_all_Layers;
                })[0].graphic;


                let list = graphic.attributes['NAME'] || graphic.attributes['TRAN_ID'];

                if (list = graphic.attributes['NAME']) {

                    state.selectedBeach = list
                    view.whenLayerView(graphic.layer).then(function(layerView) {

                        graphicsLayer.removeAll()

                    })
                    if (graphicsLayerLine) {
                        graphicsLayerLine.removeAll()
                    }


                    var search = new ProcessBerm()

                    var newquery = search.createQuery(list)

                    newquery.queryTask.execute(newquery.query).then(function(results) {

                        search.addPolygonGraphics(results)

                    });
                } else if (list = graphic.attributes['TRAN_ID']) {
                    clearContent()
                    addLoader()
                    reset()
                    state.active_transact = list
                    if (graphicsLayerLine) {
                        graphicsLayerLine.removeAll()
                    }

                    if (state.selected__year != 'all') {

                        active_transact(list)

                    } else if (state.selected__year === 'all') {
                        clearContent()
                        addLoader()
                        var search = new ProcessBerm()

                        var linequery = search.createTransactQueryAll(list)

                        linequery.tranqueryTask.execute(linequery.tranquery).then(function(results) {

                            search.addLineGraphics(results)

                        });


                        plotLineGraph(list)

                    }



                }

            }
        });
    });

    function plotLineGraph(list) {
        const compare2014 = []
        const compare2015 = []
        const compare2016 = []
        const compare2017 = []
        const compare2018 = []
            // const compare2019 = []
        const url_2014 = state.transact_points[0]
        const url_2015 = state.transact_points[1]
        const url_2016 = state.transact_points[2]
        const url_2017 = state.transact_points[3]
        const url_2018 = state.transact_points[4]

        var paths = []

        var search = new ProcessBerm();
        const getResolvedPoints = async() => {
            // var search = new ProcessBerm();
            compare2014.push(await search.getAllYearsPointsForChart(list, url_2014))
            compare2015.push(await search.getAllYearsPointsForChart(list, url_2015))
            compare2016.push(await search.getAllYearsPointsForChart(list, url_2016))
            compare2017.push(await search.getAllYearsPointsForChart(list, url_2017))
            compare2018.push(await search.getAllYearsPointsForChart(list, url_2018))
            renderComparisonElevationProfileChart(list, compare2014[0], compare2015[0], compare2016[0], compare2017[0], compare2018[0])
        }

        getResolvedPoints()
        graphSlideUp()


    }

    active_transact = function(list) {
        if (state.selected__year != 'all') {
            var search = new ProcessBerm()
                // console.log(search)
            var newtranquery = search.createTransactQuery(list)

            var sel_ptquery = search.pointsQuery(list, state.transact_points)



            newtranquery.tranqueryTask.execute(newtranquery.tranquery).then(function(results) {
                graphSlideUp()

                search.addLineGraphics(results)


            });

            sel_ptquery.ptqueryTask.execute(sel_ptquery.ptquery).then(function(results) {
                state.active__points = results

                let path = []

                state.transactID = results.features[0].attributes
                for (let i = 0; i < results.features.length; i++) {
                    let pointAttribute = results.features[i].attributes

                    pointx = pointAttribute["POINT_X"];
                    pointy = pointAttribute["POINT_Y"];
                    pointelev = pointAttribute["Elevation"];
                    pointdist = pointAttribute["DFM"];
                    pointstatid = pointAttribute["STATIC_ID"];
                    path.push({ lon: pointx, lat: pointy, y: pointelev, x: pointdist, name: `Elevation: ${pointelev} ft`, statid: pointstatid });
                }

                // console.log(path)
                renderElevationProfileChart(path)
            });
        } else if (state.selected__year === 'all') {

            var search = new ProcessBerm()

            var linequery = search.createTransactQueryAll(list)

            linequery.tranqueryTask.execute(linequery.tranquery).then(function(results) {

                search.addLineGraphics(results)

            });


            plotLineGraph(list)
        }
    }



    // wind = function() {



    // if (typeof(highchartsExport) === 'undefined') {
    //     window.highchartsExport = new ExportInitializator();
    // }












    function renderElevationProfileChart(points) {
        let data = [];

        function pushdata(points) {
            points.forEach(function(el) {
                data.push({ x: el.x, y: el.y, lon: el.lon, lat: el.lat, statid: el.statid, name: `Elevation:${el.y.toFixed(2)} ft` })
            })
        }
        pushdata(points)

        // main_series = data
        state.pointsPlottedForAreaChart = data
        container = document.getElementById('graph')

        //AREA CHART
        chart = new Highcharts.Chart({



            chart: {
                type: 'area',
                backgroundColor: '#006699',
                border: 'transparent',
                zoomType: 'x',
                marginBottom: 42,
                renderTo: container
            },


            title: {
                text: `${state.transactID.BEACH}-Transect ${state.transactID.TRAN_ID}, Collected ${state.transactID.COL_DATE}`,
                margin: 10,
                style: {
                    color: '#FFFFFF',
                    fontSize: '12px'
                }
            },
            xAxis: {
                title: {
                    text: 'Distance (ft)',
                    margin: 0,
                    style: {
                        color: '#FFFFFF'
                    }
                },
                labels: {
                    style: {
                        color: '#FFFFFF'
                    }
                },

            },
            yAxis: {
                title: {
                    text: 'Elevation (ft)',

                    style: {
                        color: '#FFFFFF'
                    }
                },
                labels: {
                    style: {
                        color: '#FFFFFF'
                    }
                },
                tickInterval: 5,
                allowDecimals: false
            },
            legend: {
                enabled: false
            },
            tooltip: {
                crosshairs: [true, false],
                formatter: function() {
                    return this.point.name
                }
            },

            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,

                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                },
                series: {
                    name: 'Elevation',
                    cursor: 'pointer',
                    turboThreshold: 0,
                    point: {
                        events: {
                            mouseOver: function(e) {

                                if (this.statid != undefined) {
                                    // console.log(this)
                                    var point = new Point(this.lon, this.lat);
                                    var simpleMarkerSymbol = {
                                        type: "simple-marker",
                                        color: [255, 0, 0],
                                        outline: {
                                            color: [0, 0, 0],
                                            width: 2
                                        }
                                    };

                                    pointGraphic = new Graphic({
                                        geometry: point,
                                        symbol: simpleMarkerSymbol
                                    });
                                    if (point) {
                                        view.graphics.removeAll(pointGraphic);
                                        view.graphics.add(pointGraphic);
                                    }
                                } else {

                                    let seriesB = state.active__points.features.find((el) => el.attributes.DFM === this.x)
                                    let seriesBpt = seriesB.attributes

                                    var point = new Point(seriesBpt.POINT_X, seriesBpt.POINT_Y);
                                    var simpleMarkerSymbol = {
                                        type: "simple-marker",
                                        color: [255, 0, 0],
                                        outline: {
                                            color: [0, 0, 0],
                                            width: 2
                                        }
                                    };

                                    pointGraphic = new Graphic({
                                        geometry: point,
                                        symbol: simpleMarkerSymbol
                                    });
                                    if (point) {
                                        view.graphics.removeAll(pointGraphic);
                                        view.graphics.add(pointGraphic);
                                    }
                                    // console.log(seriesB)
                                }
                            },
                            click: function(e) {
                                // console.log(this)

                                if (e.point.statid != undefined) {



                                    var point = this;
                                    // console.log(this)
                                    var xValue = point.x;
                                    var xAxis = point.series.xAxis;
                                    if (selected__contour === 'upper') {
                                        chart.xAxis[0].removePlotLine(`myPlotLineId${contour[0]}`);
                                        document.getElementById('UP__ID').innerHTML = this.statid
                                        let elev = document.getElementById('UP__ELEV').innerHTML = (this.y).toFixed(2)
                                        let dist = document.getElementById('UP__DIST').innerHTML = (this.x).toFixed(2)
                                        contour[0] = this.statid
                                        Elevation[0] = this.y
                                        state.max_contour = {
                                            Elevation: elev,
                                            Distance: dist,
                                            id: this.statid
                                        }

                                        xAxis.addPlotLine({
                                            value: xValue,
                                            width: 2,
                                            color: 'red',
                                            zIndex: 300,
                                            id: `myPlotLineId${this.statid}`
                                        })


                                    } else if (selected__contour === 'lower') {

                                        chart.xAxis[0].removePlotLine(`myPlotLineId${contour[1]}`);
                                        document.getElementById('LOW__ID').innerHTML = this.statid
                                        let elev = document.getElementById('LOW__ELEV').innerHTML = (this.y).toFixed(2)
                                        let dist = document.getElementById('LOW__DIST').innerHTML = (this.x).toFixed(2)
                                        Elevation[1] = this.y
                                        contour[1] = this.statid
                                        state.min_contour = {
                                            Elevation: elev,
                                            Distance: dist,
                                            id: this.statid
                                        }
                                        xAxis.addPlotLine({
                                            value: xValue,
                                            width: 2,
                                            color: 'green',
                                            zIndex: 300,
                                            id: `myPlotLineId${this.statid}`
                                        })
                                    }



                                } else if (e.point.statid == undefined) {

                                    if (selected__contour === 'upper') {
                                        // let selectedpts = main_series.find((el) => (el.x).toFixed(2) === (this.x).toFixed(2))
                                        let bulkSelected = state.active__points.features.find((el) => el.attributes.DFM === this.x)
                                        let selectedpt = bulkSelected.attributes

                                        var xValue = selectedpt.DFM;
                                        var xAxis = chart.axes[0].series.xAxis

                                        chart.axes[0].removePlotLine(`myPlotLineId${contour[0]}`);


                                        document.getElementById('UP__ID').innerHTML = selectedpt.STATIC_ID
                                        document.getElementById('UP__ELEV').innerHTML = (selectedpt.Elevation).toFixed(2)
                                        document.getElementById('UP__DIST').innerHTML = (selectedpt.DFM).toFixed(2)
                                        Elevation[0] = selectedpt.Elevation
                                        contour[0] = selectedpt.STATIC_ID
                                        state.max_contour = {
                                            Elevation: selectedpt.Elevation,
                                            Distance: selectedpt.DFM,
                                            id: selectedpt.STATIC_ID
                                        }
                                        chart.axes[0].addPlotLine({
                                            value: xValue,
                                            width: 2,
                                            color: 'red',
                                            zIndex: 300,
                                            id: `myPlotLineId${selectedpt.STATIC_ID}`
                                        })


                                    } else if (selected__contour === 'lower') {
                                        let bulkSelected = state.active__points.features.find((el) => el.attributes.DFM === this.x)
                                        let selectedpt = bulkSelected.attributes

                                        var xValue = selectedpt.DFM;
                                        var xAxis = chart.axes[0].series.xAxis

                                        chart.axes[0].removePlotLine(`myPlotLineId${contour[1]}`);


                                        document.getElementById('LOW__ID').innerHTML = selectedpt.STATIC_ID
                                        document.getElementById('LOW__ELEV').innerHTML = (selectedpt.Elevation).toFixed(2)
                                        document.getElementById('LOW__DIST').innerHTML = (selectedpt.DFM).toFixed(2)
                                        Elevation[1] = selectedpt.Elevation
                                        contour[1] = selectedpt.STATIC_ID

                                        state.min_contour = {
                                            Elevation: selectedpt.Elevation,
                                            Distance: selectedpt.DFM,
                                            id: selectedpt.STATIC_ID
                                        }


                                        chart.axes[0].addPlotLine({
                                            value: xValue,
                                            width: 2,
                                            color: 'green',
                                            zIndex: 300,
                                            id: `myPlotLineId${selectedpt.STATIC_ID}`
                                        })




                                    }

                                }
                            }
                        }
                    },
                    events: {
                        mouseOut: function() {
                            view.graphics.removeAll(pointGraphic);
                        }
                    },


                },


            },
            ///////////////////////////////////////

            series: [{ name: 'Elevation', data: data, color: '#ddcbbb', negativeFillColor: '#99d0f3' }],
            // seriesA = chart.series[0].name === 'Elevation'
            // }
        });



        // console.log(chart.series[0].name)
    }


    //PLOT LINE CHART

    const renderComparisonElevationProfileChart = function(list, year2014, year2015, year2016, year2017, year2018) {

        const year2014Points = []
        const year2015Points = []
        const year2016Points = []
        const year2017Points = []
        const year2018Points = []

        function pushdata(year, points) {
            year.forEach(function(el) {
                points.push({ x: el.x, y: el.y, lon: el.lon, lat: el.lat, statid: el.statid, name: `Elevation:${el.y.toFixed(2)} ft` })
            })
        }
        pushdata(year2014, year2014Points)
        pushdata(year2015, year2015Points)
        pushdata(year2016, year2016Points)
        pushdata(year2017, year2017Points)
        pushdata(year2018, year2018Points)




        container = document.getElementById('graph')

        chart = new Highcharts.Chart({



            chart: {
                type: 'spline',
                backgroundColor: '#006699',
                border: 'transparent',
                zoomType: 'x',
                marginBottom: 42,
                renderTo: container
            },


            title: {
                text: `Transect ${list} Comparison`,
                margin: 10,
                style: {
                    color: '#FFFFFF',
                    fontSize: '13px'
                }
            },
            xAxis: {
                title: {
                    text: 'Distance (ft)',
                    margin: 0,
                    style: {
                        color: '#FFFFFF'
                    }
                },
                labels: {
                    style: {
                        color: '#FFFFFF'
                    }
                },

            },
            yAxis: {
                title: {
                    text: 'Elevation (ft)',

                    style: {
                        color: '#FFFFFF'
                    }
                },
                labels: {
                    style: {
                        color: '#FFFFFF'
                    }
                },
                tickInterval: 5,
                allowDecimals: false
            },
            legend: {
                enabled: true,
                itemStyle: {
                    color: '#FFFFFF'
                },
                align: 'center',
                verticalAlign: 'top',
                floating: true,
                x: 300,
                y: 0
            },
            tooltip: {
                crosshairs: [true, false],
                formatter: function() {
                    return this.point.name
                }
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,

                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                },
                series: {
                    turboThreshold: 0,
                    point: {
                        events: {

                        }
                    }

                }
            },
            events: {

            },

            series: [{ name: '2014', data: year2014Points, color: '#FFA500' }, { name: '2015', data: year2015Points, color: '#2FFF00' }, { name: '2016', data: year2016Points, color: '#ff00ff' },
                { name: '2017', data: year2017Points, color: '#fffc00' }, { name: '2018', data: year2018Points, color: '#8B008B' }
            ],


        });




    }










    // function Toggleprint() {
    //     $(document).ready(function() {


    //         $('.print__main').width(20 + 'vw')
    //             // $('.print__main').height(40 + 'vh')
    //         $('.print__main').slideToggle(200)

    //         let isPositionUp = document.getElementById('print').classList.toggle('item-u')
    //         if (!isPositionUp) {
    //             document.getElementById('print').style.backgroundColor = "#F05C5A";
    //         } else {
    //             document.getElementById('print').style.backgroundColor = "transparent";
    //         }

    //     })
    // }



    function graphSlideUp() {
        $(document).ready(function() {
            $('.chart').slideDown(1000)
            state.graph = 'Up'

        })
    }

    function graphSlidedown() {
        $(document).ready(function() {
            $('.chart').slideUp(1000)
        })
    }


    view.on("pointer-move", function(event) {
        let search = new ProcessBerm()
        search.findNearestGraphic(event)
    });

    function SlideDownVolumeBtn() {
        $(document).ready(function() {
            $('.volume__calculator').slideUp(1000)

        })
    }


    function toggleVolumeBtn() {
        $(document).ready(function() {
            $('.volume__calculator').slideToggle(500)

        })
    }

    class ProcessBerm {
        constructor() {
            this.item = []
            this.AllYearsPointsForChart = []
        }
        createTransactQuery(list) {



            var pointUrl = `https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/${layerList[0].layerId}`;
            var tranqueryTask = new QueryTask({
                url: pointUrl
            });

            var tranquery = new Query();
            tranquery.returnGeometry = true;
            tranquery.outFields = ["*"];
            tranquery.where = `TRAN_ID='${list}'`;
            this.tranquery = tranquery;
            this.tranoutFields = tranquery.outFields
            this.tranqueryTask = tranqueryTask;
            return {
                tranquery: this.tranquery,
                tranqueryTask: this.tranqueryTask

            }


        }
        createTransactQueryAll(list) {

            var transactUrl = `https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/10`;
            var tranqueryTask = new QueryTask({
                url: transactUrl
            });

            var tranquery = new Query();
            tranquery.returnGeometry = true;
            tranquery.outFields = ["*"];
            tranquery.where = `TRAN_ID='${list}'`;
            this.tranquery = tranquery;
            this.tranoutFields = tranquery.outFields
            this.tranqueryTask = tranqueryTask;
            return {
                tranquery: this.tranquery,
                tranqueryTask: this.tranqueryTask

            }
        }
        createQuery(list) {
            var pointUrl = "https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/4";
            var queryTask = new QueryTask({
                url: pointUrl
            });

            var query = new Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            query.where = `NAME='${list}'`;
            this.query = query;
            this.outFields = query.outFields
            this.queryTask = queryTask;
            return {
                query: this.query,
                queryTask: this.queryTask

            }

        }
        pointsQuery(TRAN_ID, pointUrl) {
            var ptqueryTask = new QueryTask({
                url: pointUrl
            });

            var ptquery = new Query();
            ptquery.returnGeometry = true;
            ptquery.outFields = ["*"];
            ptquery.where = `TRAN_ID='${TRAN_ID}'`;
            this.ptquery = ptquery;
            this.outFields = ptquery.outFields
            this.ptqueryTask = ptqueryTask;

            return {
                ptquery: this.ptquery,
                ptqueryTask: this.ptqueryTask

            }


        }
        findNearestGraphic(event) {
            return view.hitTest(event).then(function(response) {
                var graphic;

                if (response.results.length) {
                    graphic = response.results.filter(function(result) {
                        return (result.graphic.layer === layerList[0] || beachPoints);
                    })[0].graphic;
                }
                if (graphic) {
                    if (!activeGraphic || (activeGraphic.attributes.OBJECTID !== graphic.attributes.OBJECTID)) {
                        $('#viewDiv').css('cursor', 'pointer')
                    } else {
                        $('#viewDiv').css('cursor', 'default')
                    }
                } else {
                    $('#viewDiv').css('cursor', 'default')
                }
            });

        }
        addPolygonGraphics(results) {
            graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);

            results.features.forEach(function(feature) {

                var g = new Graphic({
                    geometry: feature.geometry,
                    attributes: feature.attributes,
                    symbol: {
                        type: "simple-fill",
                        rings: feature.geometry.rings,
                        color: [227, 139, 79, 0.8],
                        style: "none",
                        outline: {
                            color: [0, 255, 255],
                            width: 6
                        }
                    },

                });

                graphicsLayer.add(g);
                view.goTo(g)
            });
        }
        addLineGraphics(results) {

            graphicsLayerLine = new GraphicsLayer();
            map.add(graphicsLayerLine);
            results.features.forEach(function(feature) {

                var gl = new Graphic({
                    geometry: feature.geometry,
                    attributes: feature.attributes,
                    symbol: {
                        type: "simple-line",
                        paths: feature.geometry.paths,
                        color: [203, 236, 15, 0.6],
                        width: 10,
                    },

                });

                graphicsLayerLine.add(gl);
                view.goTo(gl)
            });
        }
        getAllYearsPointsForChart(list, url) {

            var sel_ptquery = this.pointsQuery(list, url)

            return sel_ptquery.ptqueryTask.execute(sel_ptquery.ptquery).then((results) => {
                let path = []

                state.active__points = results
                state.transactID = results.features[0].attributes
                for (let i = 0; i < results.features.length; i++) {
                    let pointAttribute = results.features[i].attributes
                    pointx = pointAttribute["POINT_X"];
                    pointy = pointAttribute["POINT_Y"];
                    pointelev = pointAttribute["Elevation"];
                    pointdist = pointAttribute["DFM"];
                    pointstatid = pointAttribute["STATIC_ID"];
                    path.push({ lon: pointx, lat: pointy, y: pointelev, x: pointdist, name: `Elevation: ${pointelev} ft`, statid: pointstatid });
                }


                return path
            });


        }

    }

    let t = document.querySelector('.nav').addEventListener('click', function(e) {
        let list = e.target.closest('.b-list')
        let down = e.target.closest('.b-down')
        let print = e.target.closest('#print')
        let help = e.target.closest('#help')
            // let exportMap = e.target.closest('#submitBtn')
        if (list) {
            clearContent()
            addLoader()
            state.selectedBeach = list.innerHTML
            var search = new ProcessBerm()
            var newquery = search.createQuery(list.innerHTML)
            SlideDownVolumeBtn()
            if (graphicsLayer) {
                graphicsLayer.removeAll();

            }

            if (graphicsLayerLine) {
                graphicsLayerLine.removeAll()
            }
            if (state.graph === 'Up') {
                graphSlidedown()
                state.graph = 'Down'
                container.innerHTML = "";

            }


            document.querySelector('.btn__calculator').classList.remove('btn__calculator-active')


            newquery.queryTask.execute(newquery.query).then(function(results) {

                search.addPolygonGraphics(results)

            });

        } else if (help) {

            let isPositionOut = document.getElementById('help').classList.toggle('item-out')

            if (!isPositionOut) {

                document.querySelector('.help__main').style.width = 0;
                $('.help__main').animate({ width: "90vw" }, 200)
                document.getElementById('help').style.backgroundColor = "#F05C5A";
                $('.help__main').show()
                $('.help__main-content').show()

            } else {
                document.getElementById('help').style.backgroundColor = "transparent";
                $('.help__main').animate({ width: "0vw" }, 200)

            }

        } else if (print) {
            Toggleprint()


        }




    })




    function Toggleprint() {
        $(document).ready(function() {


            let isPositionUp = document.getElementById('print').classList.toggle('item-u')

            if (!isPositionUp) {

                view.when(function() {
                    printWidget = new Print({
                        view: view,
                        // specify your own print service
                        // printServiceUrl: "https://gis.dhec.sc.gov/gisserver/rest/services/environment/bermTemplate/GPServer/Export%20Web%20Map"
                        printServiceUrl: "https://gis.dhec.sc.gov/gisserver/rest/services/environment/printMimic/GPServer/Export%20Web%20Map"
                    });


                    // canvas.height= printWidget.templateOptions.height
                    // canvas.width= printWidget.templateOptions.width

                    if (window.chart) {

                        // console.log(window.chart)
                        // let ht = $('.print__main-preview').height()
                        // let wd = $('.print__main-preview').width()

                        var svg = window.chart.getSVG({
                                exporting: {
                                    sourceHeight: 200,
                                    sourceWidth: printWidget.templateOptions.width
                                }
                            })
                            // console.log(svg)
                            // let canvas = document.createElement('canvas')
                            // let canvas = `<canvas id="canvas></canvas>`
                            // canvas.id = 'canvas'
                        let canvas = document.getElementById("canvas")

                        // console.log(canvg(document.getElementById("canvas"), svg))
                        canvg(canvas, svg)
                            // console.log(canvas)
                            // var image = canvas.toDataURL("image/png")

                        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
                        // document.write('<img src="' + image + '"/>');

                        // window.location.href = image
                        // document.write('<img src="./image/' + image + '"/>');
                        // console.log(svg)
                        // printWidget.templateOptions.title = window.location
                        console.log(printWidget)
                        view.ui.add(printWidget, "top-right");


                    } else {
                        view.ui.add(printWidget, "top-right");
                    }


                });
                document.getElementById('print').style.backgroundColor = "#F05C5A";
            } else {
                document.getElementById('print').style.backgroundColor = "transparent";

                view.ui.remove(printWidget);
            }

        })
    }





    function reset() {
        if (chart) {
            document.getElementById('upper').checked = true
            document.getElementById('lower').checked = false
            chart.xAxis[0].removePlotLine(`myPlotLineId${contour[0]}`);
            chart.xAxis[0].removePlotLine(`myPlotLineId${contour[1]}`);
            selected__contour = 'upper'
            Elevation = [0, 0]
            contour = [0, 0]

            document.getElementById('UP__ID').innerHTML = `&mdash;`
            document.getElementById('UP__ELEV').innerHTML = `&mdash;`
            document.getElementById('UP__DIST').innerHTML = `&mdash;`
            document.getElementById('LOW__ID').innerHTML = `&mdash;`
            document.getElementById('LOW__ELEV').innerHTML = `&mdash;`
            document.getElementById('LOW__DIST').innerHTML = `&mdash;`
            document.querySelector('.output').textContent = ''
            if (state.max_contour || state.min_contour) {
                state.max_contour.Distance = '';
                state.max_contour.Elevation = '';
                state.max_contour.id = '';
                state.min_contour.Distance = '';
                state.min_contour.Elevation = '';
                state.min_contour.id = '';
            }


            if (chart.series[1]) {
                chart.series[1].remove()

            }

        }
    }



    document.querySelector('.chart-head').addEventListener('click', function(e) {
        let close__btn = e.target.closest('.btn__close');
        let volume__calculator_btn = e.target.closest('.btn__calculator');
        let year__selection = e.target.closest('.btn__year');
        if (year__selection) {
            let y = document.querySelectorAll('.btn__year').forEach(function(el) {
                el.style.background = 'none';

            })
            document.querySelector(`.${year__selection.classList[1]}`).style.background = '#F05C5A';
            let Year = selected__year = year__selection.classList[1].split('-')[1]
            if (Year === '2014') {
                contour = [0, 0]
                state.selected__year = Year
                clearContent()
                addLoader()

                layerList.forEach(function(el) {
                    map.remove(el)

                })

                if (graphicsLayerLine) {
                    graphicsLayerLine.removeAll()
                }


                state.transact_points = ['https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/0']
                drawLayers(selected_2014_Layers)
                active_transact(state.active_transact)

            } else if (Year === '2015') {
                contour = [0, 0]
                state.selected__year = Year,
                    clearContent()
                addLoader()
                layerList.forEach(function(el) {
                    map.remove(el)

                })

                if (graphicsLayerLine) {
                    graphicsLayerLine.removeAll()
                }


                state.transact_points = ['https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/6']
                drawLayers(selected_2015_Layers)
                active_transact(state.active_transact)

            } else if (Year === '2016') {
                contour = [0, 0]
                state.selected__year = Year
                clearContent()
                addLoader()
                layerList.forEach(function(el) {
                    map.remove(el)

                })

                if (graphicsLayerLine) {
                    graphicsLayerLine.removeAll()
                }

                state.transact_points = ['https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/11']
                drawLayers(selected_2016_Layers)
                active_transact(state.active_transact)

            } else if (Year === '2017') {
                contour = [0, 0]
                state.selected__year = Year
                clearContent()
                addLoader()
                layerList.forEach(function(el) {
                    map.remove(el)

                })
                if (graphicsLayerLine) {
                    graphicsLayerLine.removeAll()
                }

                state.transact_points = ['https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/15']
                drawLayers(selected_2017_Layers)
                active_transact(state.active_transact)

            } else if (Year === '2018') {
                contour = [0, 0]
                state.selected__year = Year
                clearContent()
                addLoader()
                layerList.forEach(function(el) {
                    map.remove(el)

                })

                if (graphicsLayerLine) {
                    graphicsLayerLine.removeAll()
                }

                state.transact_points = ['https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/19']
                drawLayers(selected_2018_Layers)
                active_transact(state.active_transact)

            } else if (Year === '2019') {
                contour = [0, 0]
                state.selected__year = Year
                clearContent()
                addLoader()
                layerList.forEach(function(el) {
                    map.remove(el)

                })


                if (graphicsLayerLine) {
                    graphicsLayerLine.removeAll()
                }

                // state.selected__year = Year
                // state.transact_points=['https://giswebtest.dhec.sc.gov/arcgis/rest/services/environment/BERM16A/MapServer/19']
                // drawLayers(selected_2019_Layers)
                // active_transact(state.active_transact)




            } else if (Year === 'all') {
                contour = [0, 0]
                state.selected__year = Year
                clearContent()
                addLoader()
                layerList.forEach(function(el) {
                    map.remove(el)

                })



                if (graphicsLayerLine) {
                    graphicsLayerLine.removeAll()
                }
                // console.log(state)
                state.selected__year = Year
                    // console.log(state)
                state.transact_points = [
                    'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/0',
                    'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/6',
                    'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/11',
                    'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/15',
                    'https://gis.dhec.sc.gov/gisserver/rest/services/environment/BERM16A/MapServer/19'

                ]

                drawLayers(selected_all_Layers)
                plotLineGraph(state.active_transact)
                active_transact(state.active_transact)

                // if (highlight) {
                //     highlight.remove();
                // }
                // view.whenLayerView(graphic.layer).then(function(layerView) {

                //     highlight = layerView.highlight(graphic);


                // })

                // active_transact(state.active_transact)

            }




        } else if (volume__calculator_btn) {
            volume__calculator_btn.classList.toggle('btn__calculator-active')
            toggleVolumeBtn()

            $(document).ready(function() {
                $('input[type=radio]').click(function() {
                    selected__contour = this.id;
                });
            });


        } else if (close__btn) {
            SlideDownVolumeBtn()
            graphSlidedown()
            document.querySelector('.btn__calculator').classList.remove('btn__calculator-active')

        }


    })


    //VOLUME CALCULATIONS
    document.querySelector('.button-box').addEventListener('click', (e) => {
        let calculate_btn = e.target.closest('.button-box__calc')
        let reset_btn = e.target.closest('.button-box__reset')
        if (!state.max_contour || !state.min_contour) {
            showAlert('error', 'Both upper and lower contours should be selected on chart. Please check.')
            return
        }

        if (calculate_btn) {
            const start_point = state.active__points.features.findIndex((el) => el.attributes.STATIC_ID === state.max_contour.id)
            const end_point = state.active__points.features.findIndex((el) => el.attributes.STATIC_ID === state.min_contour.id)
            if (contour[0] === 0) {
                showAlert('error', 'Please select an upper contour.')
                return
            } else if (contour[1] === 0) {
                showAlert('error', 'Please select a lower contour.')
                return
            } else if (start_point > end_point) {
                showAlert('error', 'Distance to upper contour should be less than distance to lower contour. Please check')
                return
            }

            const new_Array = state.active__points.features.slice(start_point, end_point * 1 + 1)

            if (chart.series[1]) {
                chart.series[1].remove()

            }
            calculateVolume(new_Array)

        } else if (reset_btn) {

            reset()
        }
    })

    function calculateVolume(new_Array) {
        // console.log(new_Array)

        var areaAtEachPoint = []
        var newSeries = []
        let lower_contour = Math.min.apply(null, Elevation);

        new_Array.map((el) => {

            newSeries.push({
                y: el.attributes.Elevation * 1 < lower_contour ? y = lower_contour : y = el.attributes.Elevation * 1,
                x: el.attributes.DFM

            })

            let Area
            if ((el.attributes.Elevation * 1) < (lower_contour)) {
                Area = 0
            } else {

                Area = (el.attributes.Elevation * 1 - lower_contour) * 1
            }

            const obj = {
                area: Area,
                DFM: el.attributes.DFM
            }
            areaAtEachPoint.push(obj)
        })
        const computedVolume = []
        for (let i = 0; i < areaAtEachPoint.length - 1; i++) {
            let area_1 = areaAtEachPoint[i].area
            let area_2 = areaAtEachPoint[i + 1].area
            let distance_1 = areaAtEachPoint[i].DFM
            let distance_2 = areaAtEachPoint[i + 1].DFM
            let resultant_distance = distance_2 - distance_1
            let volume = 0.5 * (area_1 + area_2) * resultant_distance

            computedVolume.push(volume)

        }



        let computed_Total = computedVolume.reduce((acc, cv) => {
            return acc + cv
        }, 0)
        let results = (computed_Total * 0.037037).toFixed(2)
        document.querySelector('.output').textContent = results

        chart.addSeries({

            name: 'shaded_area',
            type: 'area',
            color: '#F05C5A',
            threshold: `${lower_contour}`,
            data: newSeries,

        });

        $(this).attr('disabled', true);



    }







    // let exportMap = e.target.closest('#submitBtn')



    // document.getElementById('submitBtn').addEventListener('click', function(e) {

    //     // view.when(function() {
    //     //     var print = new Print({
    //     //         view: view,
    //     //         // specify your own print service
    //     //         printServiceUrl: "https://gis.dhec.sc.gov/gisserver/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
    //     //     });

    //     //     // Add widget to the top right corner of the view
    //     //     view.ui.add(print, "top-right");
    //     // });



    //     if (window.chart) {
    //         let ht = $('.print__main-preview').height()
    //         let wd = $('.print__main-preview').width()
    //         let svg = window.chart.getSVG({
    //             exporting: {
    //                 sourceHeight: ht,
    //                 sourceWidth: wd
    //             }
    //         })

    //         canvg(document.getElementById('canvas'), svg);

    //         var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
    //         // document.write('<img src="' + image + '"/>');
    //         // console.log(image)
    //         // window.location.href = image
    //         // document.write('<img src="./image/' + image + '"/>');


    //     } else {
    //         showAlert('error', 'Print functionality is still under implementation')
    //     }



    // })

});