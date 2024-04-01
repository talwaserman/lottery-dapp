import List from "./components/List";
import NavButton from '../shared/NavButton';

export default function ItemsList() {
  return (
    <div className="flex min-h-screen p-10 flex-col">    
      <NavButton location={''} description="Go to home page"/> 
      <h1 className="mb-5">This is the Item list page</h1>
      <List></List>
    </div>
  );
}
