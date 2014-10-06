(function() {
    'use strict';

    var model = raw.model();
    
    var x = model.dimension();
    x.title('X axis');
    x.types(String);

    var y = model.dimension();
    y.title('Y axis');
    y.types(Number);
    
    var color = model.dimension();
    color.title('Colours');



    model.map(function(data) {
        return data.map(function(d) {
            return {
                color: color(d),
                label: x(d),
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
    margin.defaultValue(0);

    var colours = chart.color();
    colours.title('Colours');

    var heading = chart.string();
    heading.title('Heading');
    heading.defaultValue('Heady here ta');

    var subHeading = chart.string();
    subHeading.title('Sub-heading');
    subHeading.defaultValue('What the chart is about. %');

    var source = chart.string();
    source.title('Source');
    source.defaultValue('Source name');


    /**
     * Colours
     */
    var COLOUR_BLACK = 'rgb(35, 31, 32)';
    var COLOUR_LIGHT_GREY = 'rgb(224, 230, 232)';
    var COLOUR_LIGHT_BLUE = 'rgb(102, 204, 216)';
    var COLOUR_DARK_GREY = 'rgb(63, 70, 77)';
    var COLOUR_DARK_BLUE = 'rgb(17, 62, 116)';


    /**
     * @param {svg} section D3 SVG selection
     * @param {object} data Data structure from model.map
     */
    chart.draw(function(section, data) {
        
        var margins = {
            top: 80,
            right: margin(),
            bottom: 40,
            left: margin()
        };
        
        var barWidth = Math.round(width() / data.length); 

        section.attr('width', width());
        section.attr('height', height());
        section.style('fill', '#FFF');


        colours.domain(data.map(function (d){ return d.color; }));
        
        var xScale = d3.scale.ordinal()
            .domain(data.map(function(d) { return d.label; }))
            .rangeRoundBands([0, width()]);

        var yScale = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.y;})])
            .range([0, height() - (margins.top + margins.bottom)]);    
            
        var bar = section.selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', function(d, i) {
                return 'translate(' + (i * barWidth) + ', 0)';
            });
       
        // Add bars
        bar.append('rect')
            .attr('y', function(d) { return (height() - margins.bottom)  - yScale(d.y); })
            .attr('x', 0)
            .attr('width', barWidth - 5)
            .attr('height', function(d) { return yScale(d.y); })
            .style('fill', function (d) { return colours()(d.color); }); //COLOUR_LIGHT_GREY);

        // Add labels
        bar.append('text')
            .attr('y', function(d) { return ((height() - margins.bottom) - yScale(d.y)) + 40; })
            .attr('x', (barWidth - 5) / 2)
            .style('font-family', 'DE4 Display Egyptian Medium')
            .style('font-size', '30px')
            .style('text-anchor', 'middle')
            .style('fill', COLOUR_BLACK)
            .text(function(d) { return d.y; });

        // X axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom');

        var xAxisNodes = section.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + (height() - margins.bottom) + ')')
            .call(xAxis);

        xAxisNodes.selectAll('text')
            .style('fill', COLOUR_BLACK)
            .style('font-family', 'AS32 Agate Sans');

        xAxisNodes.selectAll('path line')
            .style({ fill: 'none', stroke: '#000'});

        // Heading border
        section.append('rect')
            .attr('width', 220)
            .attr('height', 5)
            .attr('transform', 'translate(0, 0)')
            .style('fill', COLOUR_LIGHT_BLUE);
            
        // Heading
        section.append('text')
            .attr('class', 'heading')
            .attr('transform', 'translate(0, 35)')
            .style('font-family', 'de5 display egyptian semibold')
            .style('font-size', '30px')
            .style('fill', COLOUR_DARK_BLUE)
            .text('In the numbers');

        section.append('text')
            .attr('class', 'heading')
            .attr('transform', 'translate(220, 35)')
            .style('font-family', 'de5 display egyptian semibold')
            .style('font-size', '30px')
            .style('fill', COLOUR_LIGHT_BLUE)
            .text(heading());
        
        // Sub-heading
        section.append('text')
            .attr('class', 'subheading')
            .attr('transform', 'translate(0, 65)')
            .style('font-family', 'DE4 Display Egyptian Medium')
            .style('font-size', '23px')
            .style('fill', COLOUR_DARK_GREY)
            .text(subHeading());
        
        // Source
        section.append('text')
            .attr('class', 'source')
            .attr('transform', 'translate(0, ' + (height()) +  ')')
            .style('font-size', '10px')
            .style('fill', COLOUR_BLACK)
            .style('font-family', 'AS32 Agate Sans')
            .text('SOURCE: ' + source());
        
        section.append('rect')
            .attr('class', 'source')
            .attr('width', width())
            .attr('height', 1)
            .attr('transform', 'translate(0, ' + (height() - 12 ) +  ')')
            .style('fill', COLOUR_BLACK);

    });

}());

