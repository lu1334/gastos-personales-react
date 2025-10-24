import { Link, Outlet, useLocation } from "react-router-dom";

export function Layout() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && (
        <ul>
          <li>
            <Link to="formulario">Gastos</Link>
          </li>
        </ul>
      )}

      <Outlet />
    </>
  );
}
