import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTrackingMapPage from './AdminTrackingMapPage';

const SESSION_KEY = 'bs_admin_tracking_authed';
const SESSION_PW_KEY = 'bs_admin_tracking_pw';

const AdminTrackingGate: React.FC = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const run = async () => {
      try {
        const already = typeof window !== 'undefined' ? window.sessionStorage.getItem(SESSION_KEY) : null;
        const savedPw = typeof window !== 'undefined' ? window.sessionStorage.getItem(SESSION_PW_KEY) : null;

        // If we think we're authed but we lost the password (e.g. after code changes),
        // treat it as not authed and re-prompt.
        let password = already === '1' ? savedPw : null;

        // If we have a password (saved or newly entered), verify it once against the API.
        const verify = async (pw: string) => {
          const r = await fetch(`/api/admin/tracking-map?password=${encodeURIComponent(pw)}`, { method: 'GET' });
          return r.ok;
        };

        if (password && (await verify(password.trim()))) {
          window.sessionStorage.setItem(SESSION_KEY, '1');
          window.sessionStorage.setItem(SESSION_PW_KEY, password.trim());
          setReady(true);
          return;
        }

        // Clear any stale session and re-auth
        window.sessionStorage.removeItem(SESSION_KEY);
        window.sessionStorage.removeItem(SESSION_PW_KEY);

        password = window.prompt('Admin password required');
        if (!password) {
          navigate('/', { replace: true });
          return;
        }
        password = password.trim();

        if (!(await verify(password))) {
          window.alert('Unauthorized');
          navigate('/', { replace: true });
          return;
        }

        window.sessionStorage.setItem(SESSION_KEY, '1');
        window.sessionStorage.setItem(SESSION_PW_KEY, password);
        setReady(true);
      } catch {
        navigate('/', { replace: true });
      }
    };

    run();
  }, [navigate]);

  if (!ready) return null;
  return <AdminTrackingMapPage />;
};

export default AdminTrackingGate;


