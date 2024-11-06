export default function HalloWorld() {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-4  top-0 h-screen">
        <h2 className="text-xl font-bold mb-4">Gylmyn</h2>
        <ul>
          <li className="mb-2">HOME</li>
          <li className="mb-2">PRODUCT</li>
          <li className="mb-2">ABOUT</li>
        </ul>
      </div>
      <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Body Content</h1>
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vero
          sequi veniam debitis unde nihil alias provident dolore nesciunt ab!
        </p>
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vero
          sequi veniam debitis unde nihil alias provident dolore nesciunt ab!
        </p>
      </div>
    </div>
  );
}
