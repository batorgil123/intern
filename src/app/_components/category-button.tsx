import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface CategoryButtonProps {
  names: Category[];
  currentCategoryId?: string;
}

export default function CategoryButton({ names, currentCategoryId }: CategoryButtonProps) {
  return (
    <div className="w-full h-fit flex flex-col gap-3 overflow-y-auto">
      {names.map((category) => {
        const isActive = currentCategoryId === category.id;
        return (
          <Link
            key={category.id}
            href={`/checkout/${category.id}`}
            className={`w-[344px] h-[40px] flex text-[16px] pl-3 duration-300 justify-start items-center shadow-none cursor-pointer rounded-md font-inter font-regular text-[16px] ${
              isActive
                ? "bg-[#F4F4F4] text-black font-semibold"
                : "text-[#7E7E83] bg-white hover:bg-gray-100"
            }`}
          >
            {category.name}
          </Link>
        );
      })}
    </div>
  );
}
