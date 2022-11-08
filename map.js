// Se crea un objeto mapa, se le asigna al elemento contenedor 'map' y se fijan su punto central y nivel de zum iniciales
	var map = L.map('map').setView([16.75973, -93.11308], 13);

	// Se añaden al objeto mapa las teselas de mapa a partir de OpenStreetMap y la información correspondiente de atribución 
	var open= L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: 'Datos &copy; <a href="http://osm.org/copyright" target="blanck">Colaboradores de OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright" target="blanck">ODbL</a>) | Teselas <a href="https://github.com/gravitystorm/openstreetmap-carto" target="blanck">OSM Carto</a> &copy; Randy Allan y otros colaboradores (<a href="https://creativecommons.org/licenses/by-sa/2.0/deed.es" target="blanck">CC BY-SA 2.0</a>)'
	}).addTo(map)
	
	var carto = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",{
		"attribution": "\u0026copy; \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eOpenStreetMap\u003c/a\u003e contributors \u0026copy; \u003ca href=\"http://cartodb.com/attributions\"\u003eCartoDB\u003c/a\u003e, CartoDB \u003ca href =\"http://cartodb.com/attributions\"\u003eattributions\u003c/a\u003e", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
    ).addTo (map);;

    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
    }).addTo (map);


     var baseMaps = {
	"<b>Imagen de satélite</b>": googleSat,
	"<b>Mapa OpenStreetMap</b>": open,
	"<b>Mapa en tonos claros</b>": carto
     };

    L.control.layers(baseMaps).addTo (map);

	// Se crea un icono personalizado
		var panIcon = L.icon({
			iconUrl: 'pan_dulce.svg',
			iconSize: [50,50]
			});;
			
	// Se crea una capa de datos con marcadores y ventana emergente personalizados
		var panaderias= L.geoJson(bd_pan2, {
		    onEachFeature: onEachFeature,
			pointToLayer: function(feature,latlng){
			var marker = L.marker(latlng,{icon: panIcon});
			////marker.bindPopup(feature.properties.nom_estab);  ////.bindPopup("Nombre: " + feature.properties.nom_estab);
			return marker;
			}});
			////map.addLayer(panaderias) 

 ////Se crea y añade una capa de agrupación de marcadores   		
	var clusters = L.markerClusterGroup({ showCoverageOnHover: false });
	clusters.addLayer(panaderias);
	map.addLayer(clusters);

///// /////////////////         FUNCION MOUSE OVER / MOUSE OUT

 function onEachFeature(feature, layer) {
        layer.bindPopup("<br><b>Nombre :</b> "+
		feature.properties.nom_estab+"<br><b> Colonia :</b> "+
		feature.properties.nomb_asent);
        layer.on('mouseover', function(e) {
          this.openPopup();
        });
        layer.on('mouseout', function(e) {
          this.closePopup();
        });
      }; 
