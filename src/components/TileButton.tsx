import Image from "next/image";

export const TileButton = (props: { text: string }) => {
  return (
    <>
      <div className="flex h-[20px] min-w-20 md:col-span-2 col-span-4  mr-44 items-center justify-end gap-2 text-gray-900  border-gray-300 font-semibold text-md px-2  rounded-full w-32 cursor-pointer transition-transform transform hover:scale-105">
        {props.text}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          color="black"
        >
          <path
            color="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </>
  );
};
