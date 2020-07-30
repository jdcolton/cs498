var margin = 50;
var width = 1500;
var height = 1000;
var radius = 3
var years = [1993, 1998, 2003, 2008]
var colors = ["black", "blue", "green", "red"]
var screen_counter = 0

var x = d3.scaleLinear(10)
.domain([0,25000])
.range([0,width]);
                    
var y = d3.scaleLinear(10)
.domain([0,10000])
.range([height,0]);;

var svg = d3.select("body").append("svg")

svg.attr("width",width + 2*margin)
.attr("height",height + 2*margin)

d3.select("svg").append("g")
.attr("transform", "translate(" + margin + "," + margin + ")")
.call(d3.axisLeft(y));

d3.select("svg").append("g")
.attr("transform", "translate(" + margin + "," + (height + margin) + ")")
.call(d3.axisBottom(x));

d3.select('body')
.append('div')
.attr('id', 'tooltip')
.attr('style', 'position: absolute; opacity: 0;');

var data_file_name = 'https://raw.githubusercontent.com/jdcolton/cs498/master/LMWPIDweb_2.csv'
var circles

async function setup_data() {
    if (screen_counter < 4) {
        
        dataset = await d3.csv(data_file_name)

        circles = svg.append("g")
        .attr("transform","translate(" + margin + "," + margin + ")")
        .selectAll()
        .data(dataset)
        .enter().append("circle")
        .filter(function(d) { return d.bin_year == years[screen_counter] })
        .attr("cx",function(d, i) { return x(d.RRmean) })
        .attr("cy",function(d, i) { return y(d.RRinc) })
        .attr("r",function(d, i) { return radius })
        .style("fill", colors[screen_counter])

        circles.on("mouseover", function(d) {      
            d3.select('#tooltip')
            .transition()
            .duration(200)
            .style('opacity', 1)
            .text(d.country) })
        .on('mousemove', function() {
            d3.select('#tooltip')
            .style('left', (d3.event.pageX+10) + 'px')
            .style('top', (d3.event.pageY+10) + 'px') })
        .on("mouseout", function(d) {       
            d3.select('#tooltip')
            .style('opacity', 0) })

        document.getElementById("year").innerHTML = "Current Year: " + years[screen_counter];
        screen_counter = screen_counter + 1
        console.log(screen_counter)
        
        if (screen_counter == 4) {
            document.getElementById("button").innerHTML = "Refresh browser to restart slideshow";
        }
    }
    else {
        console.log(screen_counter)
    }
}

setup_data()

function update_data() {
    setup_data()
}