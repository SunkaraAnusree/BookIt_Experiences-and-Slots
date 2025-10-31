export type Experience = {
  _id?: string;  // for MongoDB usage
  id?: number;   // optional, in case of static data too
  title: string;
  place: string;
  price: number;
  image: string;
  short: string;
};