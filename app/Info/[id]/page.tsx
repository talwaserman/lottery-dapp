import NavButton from "../../shared/NavButton";
import { getItemById } from "../../lib/services/itemsService";
import { redirect } from "next/navigation";

interface IProps {
  params: {
    id: string;
  };
}

export default async function Info({ params }: IProps) {
  const itemInfo = params.id ? await getItemById(params.id) : null;
  if (!itemInfo) {
    redirect("/ItemList");
  }
  const { id, name, description } = itemInfo;
  return (
    <div className="flex min-h-screen p-10 flex-col">
      <div>
        <NavButton location={"ItemList"} description={"Back to Item list"} />
      </div>

      <section className="gap-2 flex-col border-solid border-slate-300 border-2 w-fit p-4 mt-2 rounded">
        <div>{`Id: ${id}`}</div>
        <div>{`Name: ${name}`}</div>
        <div>{`Description: ${description}`}</div>
      </section>
    </div>
  );
}
