/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *

 */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MapView,{ PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import polyUtil from 'polyline-encoded';
import Map from './components/map'

// const styles = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });


// const encoded = "yr`oAm`k{dEksAstD~e@iW`e@{UxtAqr@pd@sVrOmItC}GZ}GJwDeSmWkm@gb@qKuEyCwE}AgHJiH\\kE{BaRoCoEsGcLiE{N{AmQvB{QbFkN|E}FzMcPtQmTh|A_iBfCcDzHcKpJaMr\\w_@t\\i`@hb@gg@lAkJRqJg@wJeCoMgQ{f@qHsTuC_FiMsT_S_ViVkPkfAyi@oXiNq{@q_@qn@cU{SsGgEqAiDeAcTsGcd@eMoF{AoBi@uGkB}d@uMwDoA_EsA{QiG_VyJaSkLkQuN}CgDqJkKqDsFqE_H}CuE}CyEsBsGcDeKuK}f@}FiJ_FaEkKiEgHcAe~@xMsr@`LqMrB_En@gAy`@kBkVwE{W_^gbAkHg[aFeQaRe^_Nea@iEwYJkYsAyj@KiRkGglAcDqn@KiUrDkc@nFkY`Lo]lIeQfJgOfcAyhAzJ}KtPsTjIuQxFaQrBcN|E{u@rDgh@hBuYjDy_@zHoUbI}O|PwSkDuBiP_K{]cTq_Ack@ixAe|@_L}G{LoHynBujAsh@iZiRqK}|@ig@xg@wo@v{@_gA~q@g}@fUgZp^{`@gDqLv`@oNfTwH~LcIl@gEy@{PqU_V_`@cuAvHwJt^_MvXgMxCaD"
// const latlngs = polyUtil.decode(encoded, {
//   precision: 6
// }).map(([latitude, longitude]) => ({
//   latitude,
//   longitude
// }));

// function getRegionForCoordinates(points) {
//   // points should be an array of { latitude: X, longitude: Y }
//   let minX, maxX, minY, maxY;

//   // init first point
//   ((point) => {
//     minX = point.latitude;
//     maxX = point.latitude;
//     minY = point.longitude;
//     maxY = point.longitude;
//   })(points[0]);

//   // calculate rect
//   points.map((point) => {
//     minX = Math.min(minX, point.latitude);
//     maxX = Math.max(maxX, point.latitude);
//     minY = Math.min(minY, point.longitude);
//     maxY = Math.max(maxY, point.longitude);
//   });

//   const midX = (minX + maxX) / 2;
//   const midY = (minY + maxY) / 2;
//   const deltaX = (maxX - minX);
//   const deltaY = (maxY - minY);

//   return {
//     latitude: midX,
//     longitude: midY,
//     latitudeDelta: deltaX,
//     longitudeDelta: deltaY
//   };
// }

const App = () => {
  return (
      <Map/>
  //   <MapView
  //     provider={PROVIDER_GOOGLE}
  //     style={styles.map}
  //     region={getRegionForCoordinates(latlngs)}
  //   >
  //   <Polyline
	// 	coordinates={latlngs}
	// 	strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
	// 	strokeColors={[
	// 		'#7F0000',
	// 		'#00000000', // no color, creates a "long" gradient between the previous and next coordinate
	// 		'#B24112',
	// 		'#E5845C',
	// 		'#238C23',
	// 		'#7F0000'
	// 	]}
	// 	strokeWidth={6}
	// />
  //   </MapView>
  );
};

export default App;
