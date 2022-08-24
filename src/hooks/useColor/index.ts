import getColorImage from '@Hooks/useColor/vibrant';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'react';

export const defaultImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/800px-A_black_image.jpg?20201103073518';

export const getColor = async (url: string, maxColors?: number) =>
  await getColorImage({
    maxColors: maxColors ?? 2,
    rgb: false,
    src: url
  });

const COLOR_IMG_ATOM = atomWithStorage('IMAGESWAP', defaultImage);
export const COLOR_ATOM = atom(
  async (get) => (await getColor(get(COLOR_IMG_ATOM))) ?? ['#000000']
);

const UseColor = ({ url }: { url?: string }) => {
  const setColorURL = useSetAtom(COLOR_IMG_ATOM);
  const [color] = useAtom(COLOR_ATOM);
  useEffect(() => {
    setColorURL(url as string);
  }, [url]);
  return color;
};

export default UseColor;
