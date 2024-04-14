import List from "./components/List";

export default function ItemsList() {
  return (
    <div className="flex min-h-screen p-10 flex-col">    
      <h1 className="mb-5">This is the Item list page</h1>
      <List></List>
    </div>
  );
}
