// ✅ التأكد من الاستيراد الصحيح
"use client"
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function reduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
