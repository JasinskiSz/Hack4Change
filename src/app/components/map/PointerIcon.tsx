import markerIconPng from 'leaflet/dist/images/marker-icon.png';
declare module 'leaflet' {
  export namespace AwesomeMarkers {
    function icon(options: IconOptions): Icon;
  }
}
import L, { Icon } from 'leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.js';

export const redIcon = L.AwesomeMarkers.icon({
  icon: 'coffee',
  markerColor: 'red',
  prefix: 'fa',
});

export const orangeIcon = L.AwesomeMarkers.icon({
  icon: 'coffee',
  markerColor: 'orange',
  prefix: 'fa',
});

export const greenIcon = L.AwesomeMarkers.icon({
  icon: 'coffee',
  markerColor: 'green',
  prefix: 'fa',
});
export const PointerIcon = new Icon({ iconUrl: markerIconPng.src, iconSize: [25, 41], iconAnchor: [12, 41] });
