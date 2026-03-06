"use client";

import { SignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SignUpWithFallback() {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowHelp(true), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-start gap-6">
      <SignUp />
      {showHelp && (
        <div className="card max-w-md p-4 text-center text-sm text-slate-600">
          <p className="font-medium text-slate-800">ฟอร์มสมัครไม่โหลด?</p>
          <p className="mt-2">
            ใน Clerk Dashboard ไปที่ <strong>Configure → Domains</strong> แล้วเพิ่มโดเมน{" "}
            <strong>https://viralhooklab.com</strong>
          </p>
        </div>
      )}
    </div>
  );
}
