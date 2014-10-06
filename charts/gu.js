(function() {
    'use strict';

    var model = raw.model();

    var x = model.dimension();
    x.title('X axis');
    x.types(Number);

    var y = model.dimension();
    y.title('Y axis');
    y.types(Number);

    model.map(function(data) {
        return data.map(function(d) {
            return {
                x: +x(d),
                y: +y(d)
            };
        });
    });

    var chart = raw.chart();
    chart.title('Example bar chart');
    chart.description('Testing out a custom chart');
    chart.model(model);

    var width = chart.number();
    width.title('Width');
    width.defaultValue(640);

    var height = chart.number();
    height.title('Height');
    height.defaultValue(480);

    var margin = chart.number();
    margin.title('Margin');
    margin.defaultValue(20);

    /**
     * @param {svg} section D3 SVG selection
     * @param {object} data Data structure from model.map
     */
    chart.draw(function(section, data) {
        section.attr('width', width());
        section.attr('height', height());

        var xScale = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.x;})])
            .range([margin(), width() - margin()]);

        var yScale = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.y;})])
            .range([margin(), height() - margin()]);

        
        section.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', function(d) { return xScale(d.x); })
            .attr('cy', function(d) { return yScale(d.y); })
            .attr('r', 5);
    });



}());

