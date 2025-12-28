import { chunk } from "jsr:@std/collections";

const parseInput = (input) => [...input].map(x => +x);

const convertToLayers = (imageData, width, height) =>
  chunk(imageData, width * height);

const countZeros = (layer) =>
  layer.filter(pix => pix === 0).length;

const countOnesAndTwos = (layer) => {
  const ones = layer.filter(p => p === 1).length;
  const twos = layer.filter(p => p === 2).length;
  return [ones, twos];
};

const findLayerWithFewestZeros = (layers) =>
  layers.reduce((fewest, layer) =>
    countZeros(layer) < countZeros(fewest) ? layer : fewest
  );

const main = () => {
  const input = Deno.readTextFileSync("./input1.txt");
  const imageData = parseInput(input);
  const layers = convertToLayers(imageData, 25, 6);

  const fewestZerosLayer = findLayerWithFewestZeros(layers);
  const [ones, twos] = countOnesAndTwos(fewestZerosLayer);

  console.log(ones * twos);
};

main();
