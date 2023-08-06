import Dog from "./components/Dog";
import DogSelect from "./components/DogSelect";

import { useDogFact, useDogImageUrl } from "./hooks/dogHooks";

const pathForRandom = { path: ["breeds", "image", "random"] }

export default function App() {
  const [dogImageUrl] = useDogImageUrl(pathForRandom)
  const [dogFact] = useDogFact({ imageUrl: dogImageUrl })

  return (
    <div className="App">
      <header>
        <h1>Todo sobre perritos 🐶</h1>
        <br></br>
        <section>
          <h3>Perrito aleatorio</h3>
          <Dog imageUrl={dogImageUrl} fact={dogFact}></Dog>
        </section>
      </header>

      <main>
        <DogSelect></DogSelect>
      </main>
    </div>
  );
}