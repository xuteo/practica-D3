const width = 800
const height = 500
const margin = {
    top: 10,
    bottom: 40,
    left: 40, 
    right: 10
}

const svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g")

//set x range
let x = d3.scaleLinear().range([0, width])
let y = d3.scaleBand().range([height, 0]).padding(0.2) 

let currentData 

d3.csv("data.csv").then(data => {
        
    data = d3.nest()
            .key(d => d.winner)
            .entries(data)

    console.log(data)
    currentData = data
    console.log(currentData)

    // array para el axis y
    let paises = []
    // paises = escalaY
    let ganador

    // function escalaY(){

    //     for (let i = 0; i < currentData.length; i++) {
    //         //console.log(currentData[i].values)
    //         ganador = currentData.map((d,j) => d['values'][0]) 
    //         paises.push(ganador[i].winner)
    //         return paises
    //     } 
    //     //-------
    //   }
      

    for (let i = 0; i < currentData.length; i++) {
        //console.log(currentData[i].values)
        ganador = currentData.map((d,j) => d['values'][0]) 
        paises.push(ganador[i].winner)
    } console.log(paises)
    //-------
    
    x.domain([0, d3.max(currentData.map((d, i) => d['values']['length']))]) 
    console.log(`d3max para x domain is: ${d3.max(currentData.map((d, i) => d['values']['length']) )}`)  
    y.domain(paises.map(d => d.values))

    elementGroup
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
     .attr("class", ganador.map(d =>d.winner))
     .attr("x", 0)
     .attr("y", d => y(paises.map(d => d.values))) // set the attribute 'y' to the value of the funtion 'y' for the iterated element
     .attr("width", d => x(d['values']['length'])) // set the attribute 'width' to the value of the funtion 'x' for the iterated element
     .attr("height", y.bandwidth()) //set the attribute 'hieght' with the method bandwidth() of bandscale function
})