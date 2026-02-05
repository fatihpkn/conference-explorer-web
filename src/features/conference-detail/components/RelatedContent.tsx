"use client";

export default function RelatedContent() {
  return (
    <div className="bg-linear-to-br from-primary/10 to-transparent p-6 rounded-xl border border-primary/20">
      <h3 className="text-lg font-bold mb-4">Daha fazla mı istiyorsunuz?</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
        Bu konferans <span className="font-bold">Teknoloji Konferansları</span>{" "}
        serisinin bir parçası.
      </p>
      <button className="w-full py-2 bg-primary text-white rounded-lg font-bold hover:brightness-110 transition-all">
        Tüm Seri Konferanslarını Görüntüle
      </button>
    </div>
  );
}
