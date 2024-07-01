const educationData = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyData = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
let country
let education
//fetch data
    fetch(countyData)
    .then((response) => { return response.json()})
    .then((data, error) => {
        if(error) {
            console.log(error)
        }else {
            country = topojson.feature(data, data.objects.counties).features
            fetch(educationData)
            .then((response) => {return response.json()})
            .then((data, error) => {
                if(error) {
                    console.log(error);
                }else {
                  education = data
                  const w = 1100
                  const h = 600
                  const p = 60
        const tooltip = d3.select("#tooltip")
        const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)
                  .attr("padding", p)
         svg.selectAll("path")
                  .data(country)
                  .enter()
                  .append("path")
                  .attr("d", d3.geoPath())
                  .attr("class", "county")
                  .attr("fill", (d) => {
                    let county = education.find((p) => {
                      return p['fips'] === d['id']
                    })
                    let percentage = county["bachelorsOrHigher"]

                    if(percentage <= 15) {
                        return "lightgreen"
                    }else if(percentage <= 30) {
                        return "rgb(65, 171, 93)"
                    }else if(percentage <= 50) {
                        return "rgb(35, 139, 69)"
                    }else {
                        return "rgb(0, 109, 44)"
                    }
                  })
                  .attr("data-fips", (d) => {
                      return d['id']
                  })
                  .attr("data-education", (d) => {
                    let county = education.find((p) => {
                        return p['fips'] === d['id']
                      })
                      let percentage = county["bachelorsOrHigher"]
                      return percentage
                  })
                  .append("title")
                  .text((d) => {
                    let county = education.find((p) => {
                        return p['fips'] === d['id']
                    })
                    return county["area_name"] + " " + "county" + "," + " " + county["state"] + ":" + " " + county['fips']
                  })
                }
            })

        }
      
      
    })
