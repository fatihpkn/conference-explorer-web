import NewsletterForm from "@/features/newsletter/components/NewsletterForm";

export default function Newsletter() {
  return (
    <section className="w-full bg-primary/5 border-t border-default py-20">
      <div className="max-w-360 mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold font-display mb-6 text-foreground">
          Gelişmeleri Kaçırma
        </h2>
        <p className="text-default-foreground text-lg max-w-2xl mx-auto mb-10">
          Yeni konferanslar ve etkinlikler hakkında bildirim al.
        </p>
        <NewsletterForm />
      </div>
    </section>
  );
}
