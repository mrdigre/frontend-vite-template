import AppBar from "./AppBar";

export default function AppLayout({ children }) {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  );
}
