import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface CategoryButtonProps {
  names: Category[];
}

export default function CategoryButton({ names }: CategoryButtonProps) {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      {names.map((category, index) => (
        <Link
          key={category.id || index}
          href={`/checkout/${category.id}`}
          className="w-[344px] h-[40px] flex text-[16px] text-[#7E7E83] pl-3 bg-white hover:bg-gray-100 duration-300 justify-start items-center shadow-none focus:bg-[#F4F4F4] focus:text-black cursor-pointer rounded-md"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
