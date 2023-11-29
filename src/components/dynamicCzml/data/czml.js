export var czml = [
    {
        "id": "document",
        "name": "polygon",
        "version": "1.0",
        "clock": {
            "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
            "currentTime": "2012-08-04T16:00:00Z",
            "multiplier": 10
        }
    },
    {
        "id": "shape2",
        "name": "Red box with black outline",
        "availability": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
        /*"position" : {
            "cartographicDegrees" : [-66.62557, 516.92809, 100.0]
        },*/
        "box": {
            "dimensions": {
                "cartesian": [30.0, 30.0]
            },
            "material": {
                "stripe": {
                    "orientation": "VERTICAL",
                    "evenColor": {
                        "rgba": [10, 211, 250, 0]
                    },
                    "oddColor": {
                        "rgba": [10, 211, 250, 255]
                    },
                    "offset": {
                        "number": 1
                    },
                    "repeat": 0.5
                }
            },
        },
        "path": {
            "material": {
                "solidColor": {
                    "color": {
                        "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                        "rgba": [255, 0, 0, 128]
                    }
                }
            },
            "width": [{
                "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                "number": 3.0
            }],
            "show": [{
                "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                "boolean": true
            }]
        },
        "position": {
            "interpolationAlgorithm": "LAGRANGE",
            "interpolationDegree": 1,
            "epoch": "2012-08-04T16:00:00Z",
            "cartographicDegrees": [
                0.0, 118.87841653400005, 30.95679870500004, 0.0,
                10.0, 118.87826541800007, 30.95680770900003, 0.0,
                20.0, 118.8774481050001, 30.956860625000047, 0.0,
                30.0, 118.87660414600009, 30.956910105000077, 0.0,
                40.0, 118.8759846580001, 30.95694296000005, 0.0,
                50.0, 118.87542502500003, 30.956978761000073, 0.0,
                60.0, 118.87473380100005, 30.957024103000037, 0.0

            ]
        }
    }];