import { useState, useEffect } from 'react';
import { supabase } from './supabase/supabaseClient';
import Login from './views/Login';
import AdminView from './views/AdminView';
import UserView from './views/UserView';
import type { Session } from '@supabase/supabase-js';

function App() {

  interface UserData {
    id: string;
    username: string;
    full_name: string;
    email: string;
    role: 'ADMIN' | 'SUPERVISOR' | 'MECANICO';
    area: 'MECANICA' | 'LABORATORIO' | 'BODEGA';
    active: boolean;
  }

  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtén sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchRole(session.user.id);
      setLoading(false);
    });

    // Escucha cambios en autenticación (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchRole(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (userId:string) => {
    const { data, error } = await supabase
      .from('users_db')
      .select('id, username, full_name, email, role, area, active')
      .eq('id', userId)
      .single() as {data: UserData | null; error:any};

    if (error) {
    console.error('Error fetching user data:', error);
  } else if (data) {
    setUserData(data);
  }
};

  if (loading) return <div>Cargando...</div>;

  if (!session) {
    return <Login />;
  }
  
  if (!userData || !userData.active) {
  return <div>Usuario inactivo o datos no disponibles</div>;
}

  return (
    <div className="p-4">
      <h1>Bienvenido, {session.user.email}</h1>
      <p>Tu rol: {userData.role || 'Cargando...'}</p>
      {/* Mostrar/ocultar views según rol */}
      {userData.role === 'ADMIN' && <AdminView />}
      {userData.role === 'MECANICO' && <UserView />}
      <button onClick={() => supabase.auth.signOut()} className="bg-red-500 text-white p-2 mt-4">
        Cerrar Sesión
      </button>
    </div>
  );
}

export default App;