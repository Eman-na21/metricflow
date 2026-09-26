import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialCustomers, type Customer } from "@/data/mockData";

export type SessionUser = { name: string; email: string; company: string };

type AppState = {
  ready: boolean;
  theme: "light" | "dark";
  toggleTheme: () => void;
  user: SessionUser | null;
  signIn: (user: SessionUser) => void;
  signOut: () => void;
  trialActive: boolean;
  trialPlan: string | null;
  startTrial: (plan: string) => void;
  endTrial: () => void;
  customers: Customer[];
  addCustomer: (c: Omit<Customer, "id">) => void;
  updateCustomer: (c: Customer) => void;
  deleteCustomer: (id: string) => void;
};

const AppContext = createContext<AppState | null>(null);

const KEY = "metricflow.state.v1";

type Persisted = {
  theme: "light" | "dark";
  user: SessionUser | null;
  trialPlan: string | null;
  customers: Customer[];
};

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<SessionUser | null>(null);
  const [trialPlan, setTrialPlan] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Persisted>;
        if (saved.theme) setTheme(saved.theme);
        if (saved.user) setUser(saved.user);
        if (saved.trialPlan) setTrialPlan(saved.trialPlan);
        if (saved.customers?.length) setCustomers(saved.customers);
      }
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const payload: Persisted = { theme, user, trialPlan, customers };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(payload));
    } catch {
      /* storage full or unavailable */
    }
  }, [ready, theme, user, trialPlan, customers]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  const addCustomer = useCallback((c: Omit<Customer, "id">) => {
    setCustomers((prev) => [{ ...c, id: `c-${Date.now()}` }, ...prev]);
  }, []);

  const updateCustomer = useCallback((c: Customer) => {
    setCustomers((prev) => prev.map((item) => (item.id === c.id ? c : item)));
  }, []);

  const deleteCustomer = useCallback((id: string) => {
    setCustomers((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const value = useMemo<AppState>(
    () => ({
      ready,
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      user,
      signIn: setUser,
      signOut: () => setUser(null),
      trialActive: trialPlan !== null,
      trialPlan,
      startTrial: setTrialPlan,
      endTrial: () => setTrialPlan(null),
      customers,
      addCustomer,
      updateCustomer,
      deleteCustomer,
    }),
    [ready, theme, user, trialPlan, customers, addCustomer, updateCustomer, deleteCustomer],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppStoreProvider");
  return ctx;
}
