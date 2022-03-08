import { useState } from 'react';

import Home from './components/home/Home';

function App() {
  const [login, setLogin] = useState(true);

  return (
    <div className="bg-[#E2DDD3] h-screen w-full flex flex-col p-4 justify-between items-center">
      {login ? <Home /> : <Auth setLogin={setLogin} />}
    </div>
  );
}

export default App;
