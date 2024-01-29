import MainLayout from "./components/layOut/MainLayout";
import ProtectedRoute from "./components/layOut/ProtectedRoute";

const App = () => {
  return (
    <div >
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    </div>
  );
};

export default App;
