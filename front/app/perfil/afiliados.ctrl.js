(function(angular, go) {
  "use strict";

  angular.module('appRMA')
  .controller('AfiliadosCtrl', AfiliadosCtrl);

  AfiliadosCtrl.$inject = [
    'loginControlService', 'httpService', '$localStorage'
  ];

  function AfiliadosCtrl(
    loginControlService, httpService, $localStorage
  ) {
    var ctrl = this;
    ctrl.loginControl = loginControlService;

    ctrl.data = {};

    httpService.post('perfil/getAffiliates', {
      id: $localStorage.userData.id
    }).then(function(data) {
      setAfiliados(data);
    });


    var $ = go.GraphObject.make;
    var myDiagram = $(go.Diagram, "myDiagramDiv", {
      initialContentAlignment: go.Spot.Center,
      maxSelectionCount: 1,
      validCycle: go.Diagram.CycleDestinationTree,
      layout: $(go.TreeLayout, {
                treeStyle: go.TreeLayout.StyleLastParents,
                arrangement: go.TreeLayout.ArrangementHorizontal,
                angle: 90,
                layerSpacing: 35,
                alternateAngle: 90,
                alternateLayerSpacing: 35,
                alternateAlignment: go.TreeLayout.AlignmentBus,
                alternateNodeSpacing: 20
              }),
    });

    function textStyle() {
      return { font: "9pt  Segoe UI,sans-serif", stroke: "#000" };
    }

    var levelColors = ["#AC193D/#BF1E4B", "#2672EC/#2E8DEF"];

   myDiagram.layout.commitNodes = function() {
     go.TreeLayout.prototype.commitNodes.call(myDiagram.layout);

     myDiagram.layout.network.vertexes.each(function(v) {
       console.log(v);
       if (v.node) {
         var level = v.level == 0 ? 0 : 1;
         var colors = levelColors[level].split("/");
         var shape = v.node.findObject("SHAPE");
         if (shape) {
           shape.fill = $(go.Brush, "Linear", {
             0: colors[0],
             1: colors[1],
             start: go.Spot.Left,
             end: go.Spot.Right
           });
         }
       }
     });
   };

    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        {
          // mouseDragEnter: function (e, node, prev) {},
          // mouseDragLeave: function (e, node, next) {},
          // mouseDrop: function (e, node) {}
        },
        $(go.Shape, "Rectangle",
          {
            name: "SHAPE", fill: "#eee", stroke: '1px',
            // set the port properties:
            portId: "", fromLinkable: false, toLinkable: false, cursor: ""
          }),
        $(go.Panel, "Horizontal",
          $(go.Panel, "Table",
            {
              maxSize: new go.Size(190, 999),
              margin: new go.Margin(5, 5, 5, 3),
              defaultAlignment: go.Spot.Left
            },
            $(go.RowColumnDefinition, { column: 1, width: 4 }),
            $(go.TextBlock, textStyle(), {
              row: 0,
              column: 0
            }, new go.Binding("text", "key", function(v) {return "ID: " + v;})),
            $(go.TextBlock, textStyle(), {
                row: 1, column: 0, columnSpan: 5,
                font: "12pt Segoe UI,sans-serif",
                editable: true, isMultiline: false,
                minSize: new go.Size(10, 16)
              }, new go.Binding("text", "name").makeTwoWay()
            )
          )  // end Table Panel
        ) // end Horizontal Panel
      );  // end Node

      function setAfiliados(data) {
        myDiagram.model = go.Model.fromJson({
          "class": "go.TreeModel",
          "nodeDataArray": data
        });
      }
  }
})(angular, go);
