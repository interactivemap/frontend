import { compose, mapProps } from 'recompose';
import { featureCollection } from '@turf/helpers';
import { SourceOptionData } from 'react-mapbox-gl/lib/util/types'; // This type is very similar to FeatureCollection from @turf/helpers

import withCurrentDate, {
  WithCurrentDateProps
} from '../../CurrentDate/decorators/withCurrentDate';
import withCurrentNation, {
  WithCurrentNationProps
} from '../../Nation/decorators/withCurrentNation';
import { WithFetchTerritoriesProps } from './withFetchTerritories';

export interface OnlyCurrentGeojsonProps {
  currentGeojson: SourceOptionData;
}

/**
 * Filter the territories to only show those that are active given the date in
 * the URL.
 */
export default compose(
  withCurrentDate,
  withCurrentNation,
  mapProps<
    {},
    WithCurrentDateProps & WithCurrentNationProps & WithFetchTerritoriesProps
  >(({ currentDate, currentNation, territories, ...otherProps }) => ({
    ...otherProps,
    currentGeojson: featureCollection(
      territories
        .filter(
          ({ endDate, nation, startDate }) =>
            currentDate >= startDate &&
            currentDate <= (endDate || new Date()) &&
            nation === currentNation
        )
        .map(territory => ({
          ...territory,
          properties: { color: territory.color, nation: territory.nation },
          type: 'Feature' as 'Feature'
        }))
    )
  }))
);
