import Link from "next/link";

type ButtonProp = {
  color: string;
  label: string;
  redirect?: string;
  fontStyle?: number;
};
export default function Button({
  color,
  label,
  redirect = "/",
  fontStyle = 400,
}: ButtonProp) {
  return (
    <Link href={redirect}>
      <button
        style={{ backgroundColor: color, fontWeight: fontStyle }}
        className="text-xl px-6 py-2 text-white rounded-full"
      >
        {label}
      </button>
    </Link>
  );
}
