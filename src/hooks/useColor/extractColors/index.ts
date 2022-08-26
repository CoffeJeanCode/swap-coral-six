import { extractColorsFromSrc } from 'extract-colors';

interface Colors {
  /**
   * Color in hexadecimal string
   * @example '#62342b'
   */
  hex: string;
  /**
   * Red canal from 0 to 255
   * @example 98
   */
  red: number;
  /**
   * Green canal from 0 to 255
   * @example 52
   */
  green: number;
  /**
   * Blue canal from 0 to 255
   * @example 43
   */
  blue: number;
  /**
   * Area of the color and his neighbouring colors from 0 to 1
   * @example 0.5915
   */
  area: number;
  /**
   * Color saturation from 0 to 1
   * @example 0.2156862
   */
  saturation: number;
}

const filterHexColors = (colors: Colors[]) => {
  let result = [];

  for (const iterator of colors) {
    const hex = (iterator.red + iterator.green + iterator.blue) / 3;
    const isAccept = hex < 200 && hex > 30;
    if (isAccept) {
      result.push(iterator);
    }
  }
  return result;
};

const getColorImage = async (src: string) => {
  const colors = await extractColorsFromSrc(src, {
    crossOrigin: 'Anonymous'
  });

  return filterHexColors(colors);
};
export default getColorImage;
