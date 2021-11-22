
import Header from "./common/components/header";
import VaultWrapper from "./common/wrapper/vaultWrapper";
import Alert from "./common/components/alert";
import Sidebar from "./common/components/sidebar";

function App() {
  return (
    <div >
      <Header/>
      <Alert/>
      <Sidebar/>
      <VaultWrapper/>
    </div>
  );
}

export default App;
