import { chunk } from "jsr:@std/collections";

const parseInput = (input) =>
  input.trim().split("").map(x => parseInt(x));

const convertToLayers = (imageData, width, height) =>
  chunk(imageData, width * height);

const getPixels = (layers) => {
const finalImage = layers[0].map((_, i) => {
  const layer = layers.find(l => l[i] !== 2);
  return layer ? layer[i] : 2;
});

return finalImage;
}

const getFinalImage = (layers,width) => {
const pixels= getPixels(layers);
return chunk(pixels, width)
    .map(row => row.map(p => (p === 0 ? "◼️" : "▫️")).join(""))
    .join("\n");
  }

const main = () => {
  const input = Deno.readTextFileSync("./input2.txt");
  // const input ='0222112222120000'
  const imageData = parseInput(input);
  const layers = convertToLayers(imageData,25,6);
  const finalImage = getFinalImage(layers,25);
 console.log(finalImage);
};

main();
