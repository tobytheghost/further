import Table from "./components/Table";

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen flex-col">
      <span className="font-bold text-2xl pb-4">Hello Further!</span>
      <div className="overflow-x-hidden bg-cover flex max-w-full">
        <Table />
      </div>
    </div>
  );
};

export default App;
