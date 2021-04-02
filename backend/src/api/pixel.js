import DB from 'db';

export default async (req, res) => {
  const pixels = await DB.pixel.findMany();
  
  res.json(pixels);
}