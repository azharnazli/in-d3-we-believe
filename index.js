let dataset = [...data]

let tooltip = d3.select('body').append('div').attr('class', 'tooltip')

let svgWidth = data.length * 21
let svgHeight = 700

let size = data.map( el => el.Age)

let yScale = d3.scaleLinear()
              .domain([0, d3.max(size)])
              .range([680,10])

let xScale = d3.scaleLinear()
              .domain([1, 60])
              .range([0,svgWidth-75])


let colorScale = d3.scaleLinear()
                .domain([0, d3.max(size)])
                .range(['pink','red'])


let svg = d3.select('#chartArea')
    .append('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style('background', '#eaeaea')
let g = svg.append('g').attr('transform', 'translate(70,0)')
    g.append('g')
    .call(d3.axisLeft(yScale).tickFormat(function(d){
      return d
    })
    .ticks(10))
    .append('text')
    .attr('y', 6)
    .attr('dy', '1rem')
    .attr('text-anchor', 'end')
    .text('value')

    g.append("g")
    .append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "end")
    .attr("y", 0)
    .attr("dy", "-3rem")
    .attr("x", -(svgHeight / 2 - 50))
    .attr("transform", "rotate(-90)")
    .text("Age")

    g.append("g")
    .append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("dx", "-3rem")
    .attr("y", -(svgHeight / 2 - 50))
    .attr("transform", "rotate(-90)")
    .text("Customer")

    g.append('g')
    .call(d3.axisBottom(xScale))
    
    
    g.append('g')
    .append('text')
    .attr('y', 0)
    .attr('dy','1rem')
    .attr('text-anchor','end')
    

let barChart = g.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr('x', function(d,i){
      return i * 20
    })
    .attr('y', function(d) {
      return yScale(d.Age)

    })
    .attr('fill','red')
    .attr('width', function(d,i){
      return 10 +'px'
    })
    .attr('height', function(d){
      return 700 - yScale(d.Age)
    })
    .attr('fill', function(d) {
      return colorScale(d.Age)
    })
    .style('opacity', 0.8)
    .on('mouseover', function(d){
      tooltip
        .style('left', d3.event.pageX - 150 + "px")
        .style('top', d3.event.pageY - 150 + "px")
        .style('display', 'inline-block')
        .html(`Gender: ${d.Gender}  <br/>
              Annual Income:  $${d["Annual Income (k$)"]}.000  <br/>
              Age: ${d.Age}  `)
    })
    .on('mouseleave', function(d) {
      tooltip
      .style('display', 'none')
    })