import {fetcher, handle} from '@utils/apiFetcher';

const fetchPricingItems = async () => {
  try {
    const [pricingRes, pricingErr] = await handle(
      fetcher({
        endPoint: '/packages?sort=1',
        method: 'GET',
      }),
    );
    if (!pricingErr) {
      const {data, statusCode} = pricingRes;
      if (statusCode <= 300 && data) {
        const {list: pricingData = []} = data;
        return pricingData;
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch {
    return null;
  }
};
const colorMap = {
  euphoria: {
    mild: '#FEDAD1',
    dark: '#FA6400',
  },
  bliss: {
    mild: '#E9E5F6',
    dark: '#2D1096',
  },
  delight: {
    mild: '#D3FED1',
    dark: '#6DD400',
  },
};

export {colorMap, fetchPricingItems};
