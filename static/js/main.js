$(document).ready(function () {

    $("#searchForm").on("submit", function(e) {
        e.preventDefault();
        resetResults();
        searchPokemon();
    });

    $("#compareForm").on("submit", function(e) {
        e.preventDefault();
        resetResults();
        comparePokemon();
    });

    $("#resetButton").click(function(e){
        resetResults();
    });

    var searchPokemon = function() {
        var pokemon = $("#pokemonName").val();
        if (pokemon.toLowerCase() == "gihad") {
            pokemon = "exeggcute";
        }
        else if (pokemon.toLowerCase() =="omer") {
            pokemon = "mewtwo";
        }
        else if (pokemon.toLowerCase() == "guy") {
            pokemon = "snorlax";
        }
    
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/",
            //data: {request : "req"},
            method: "GET",
            error: function(res) {
                console.log("error in ajax call");
                console.log(res);
            }
        }).then(function(res) { 
            console.log(res);
            var pokemonName = $("<h>" + res['name'] + "</h>");
            var spriteFront = $("<img src=" + res['sprites']['front_default'] + ">");
            $("#pokemon_image").append(pokemonName);
            $("#pokemon_image").append(spriteFront);

            makeGraph(res['stats']);
        });
    }

    var comparePokemon = function() {
        var pokemon1 = $("#pokemonName1").val();
        var pokemon2 = $("#pokemonName2").val();
        if (pokemon1.toLowerCase() == "gihad") {
            pokemon1 = "exeggcute";
        }
        else if (pokemon1.toLowerCase() =="omer") {
            pokemon1 = "mewtwo";
        }
        else if (pokemon1.toLowerCase() == "guy") {
            pokemon1 = "snorlax";
        }
    
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + pokemon1 + "/",
            //data: {request : "req"},
            method: "GET",
            error: function(res) {
                console.log("error in outer ajax call");
                console.log(res);
            }
        }).then(function(res) { 
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/" + pokemon2 + "/",
            //data: {request : "req"},
            method: "GET",
            error: function(res2) {
                console.log("error in inner ajax call");
                console.log(res2);
            }
            }).then(function(res2) {
                console.log(res2)
                var pokemonName1 = $("<h>" + res['name'] + "</h>");
                var spriteFront1 = $("<img src=" + res['sprites']['front_default'] + ">");
                var pokemonName2 = $("<h>" + res2['name'] + "</h>");
                var spriteFront2 = $("<img src=" + res2['sprites']['front_default'] + ">");
                $("#pokemon_image").append(pokemonName1);
                $("#pokemon_image").append(spriteFront1);
                $("#pokemon_image").append(pokemonName2);
                $("#pokemon_image").append(spriteFront2);

                makeComparisonGraph(res, res2);
            });
        });
    }

    var makeGraph = function(data) {
        var stats_graph = c3.generate({
            bindto: '#chart',
            title: {
                text: 'Base Stats'
            },
            data: {
                //x: 'x',
                columns: [
                    //['x', 'Speed', 'Sp. Def', 'Sp. Atk', 'Def', 'Atk', 'HP'],

                    // ['Speed', res['stats'][0]['base_stat'], 0, 0, 0, 0, 0],
                    // ['Sp. Def', 0, res['stats'][1]['base_stat'], 0, 0, 0, 0],
                    // ['Sp. Atk', 0, 0, res['stats'][2]['base_stat'], 0, 0, 0],
                    // ['Def', 0, 0, 0, res['stats'][3]['base_stat'], 0, 0],
                    // ['Atk', 0, 0, 0, 0, res['stats'][4]['base_stat'], 0],
                    // ['HP', 0, 0, 0, 0, 0, res['stats'][5]['base_stat']]

                    ['Speed', data[0]['base_stat']],
                    ['Sp. Def', data[1]['base_stat']],
                    ['Sp. Atk', data[2]['base_stat']],
                    ['Def', data[3]['base_stat']],
                    ['Atk', data[4]['base_stat']],
                    ['HP', data[5]['base_stat']]
                ],
                type: 'bar'
            },
            // bar: {
            //     width: {
            //         ratio: 0.9
            //     }
            // },
            axis: {
                rotated: true
            }
        });
    }

    var makeComparisonGraph = function(pokemon1, pokemon2) {
        data1 = pokemon1['stats'];
        data2 = pokemon2['stats'];
        var stats_graph = c3.generate({
            bindto: '#chart',
            title: {
                text: 'Base Stats'
            },
            data: {
                //x: 'x',
                columns: [
                    //['x', 'Speed', 'Sp. Def', 'Sp. Atk', 'Def', 'Atk', 'HP'],

                    [pokemon1['name'], data1[0]['base_stat'], data1[1]['base_stat'], data1[2]['base_stat'], data1[3]['base_stat'], data1[4]['base_stat'], data1[5]['base_stat']],
                    [pokemon2['name'], data2[0]['base_stat'], data2[1]['base_stat'], data2[2]['base_stat'], data2[3]['base_stat'], data2[4]['base_stat'], data2[5]['base_stat']]
                ],
                type: 'bar',
                // groups: [
                //     ['Speed', 'Sp.Def', 'Sp.Atk', 'Def', 'Atk', 'HP']
                // ]
            },
            // bar: {
            //     width: {
            //         ratio: 0.9
            //     }
            // },
            axis: {
                x: {
                    type: 'category',
                    //categories: ['Stat']
                    categories: ['Speed', 'Sp. Def', 'Sp. Atk', 'Def', 'Atk', 'HP']
                },
                rotated: true
            }
        });
    }

    var resetResults = function() {
        $("#pokemon_image").empty();
        $("#chart").empty();
    }
});