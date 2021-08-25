$('.carousel-drama, .carousel-suspense, .carousel-comedia').slick({
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    slidesToShow: 1,
});

const mensagemErro = document.getElementById('mensagemErro')

const api = () => {
    let dramalist = "";
    let suspenselist = "";
    let comedialist = "";
    const url = 'https://sky-frontend.herokuapp.com/movies';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Que pena as séries não foram encontradas | ${response.status}`);
            }
            else{

                response.json()
                        .then(data => {
                        console.log(data)
                        for (let i = 0; i < 31; i++) {
                            console.log(data.contents[i].categories)
                            data.contents[i].categories.includes("Drama") ? dramalist += '<div class="m-2"><img class="rounded " src= "' + data.contents[i].images[0].url + '"></div>' : dramalist += ''
                            data.contents[i].categories.includes("Suspense") ? suspenselist += '<div class="m-2"><img class="rounded" src= "' + data.contents[i].images[0].url + '"></div>' : suspenselist += ''
                            data.contents[i].categories.includes("Comédia") ? comedialist += '<div class="m-2"><img class="rounded " src= "' + data.contents[i].images[0].url + '"></div>' : comedialist += ''
                        }
                        $('.carousel-drama').append(dramalist);
                        $('.carousel-drama')[0].slick.refresh();
                        $('.carousel-suspense').append(suspenselist);
                        $('.carousel-suspense')[0].slick.refresh();
                        $('.carousel-comedia').append(comedialist);
                        $('.carousel-comedia')[0].slick.refresh();
                    })
            }
        })

        .catch( error => {
            mensagemErro.innerHTML = `${error}`
            mensagemErro.style.backgroundColor = 'rgb(204, 12, 12)';
        })
}


api();
