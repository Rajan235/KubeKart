import Image from "next/image";

type Props = {
  name: string;
  price: string;
  image: string;
};

export default function ProductCard({ name, price, image }: Props) {
  return (
    <div className="rounded-lg shadow-md p-4 bg-white hover:shadow-xl transition">
      <div className="aspect-square relative w-full mb-4">
        <Image src={image} alt={name} fill className="object-contain rounded" />
      </div>
      <h3 className="text-lg font-semibold text-olive mb-1">{name}</h3>
      <p className="text-sm text-olive/70">${price}</p>
    </div>
  );
}
